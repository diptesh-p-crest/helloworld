<?php
require "vendor/autoload.php";
use Twilio\Rest\Client;

function set_local_TimeZone()
{
    global $adb, $locTimeZoneArr;

    $gettimezone = "SELECT timezone FROM vtiger_location WHERE 1 LIMIT 1";
    $resTZ = $adb->pquery($gettimezone, array(), true, "Error exporting : " . "<BR>$gettimezone");
    $locDetails = $adb->fetch_array($resTZ);
    $sql = 'set session time_zone = "' . $locTimeZoneArr[$locDetails['timezone']][0] . '"';
    $adb->pquery($sql, array());
    date_default_timezone_set($locTimeZoneArr[$locDetails['timezone']][1]);    
}    

function custom_alphabetical_search_for_notification($searchonfield)
{
     $str = '';
     foreach(range('A','Z') as $key=>$val)
     {
        $str .= ' <td align="center" class="searchAlph" onclick="custom_alphabetical_search(\''.$val.'\',\''.$searchonfield.'\')">'.$val.'</td>';
     }

     return $str;
}    

function getnotification_detail($notificationid)
{
    global $adb;

    $qry = "SELECT * FROM notifications WHERE deleted = '0' AND notificationid = '".$notificationid."' ";
    $res = $adb->pquery($qry);
    if($adb->num_rows($res) > 0)
    {
        $notification = array();
        $notification = $adb->fetchByAssoc($res);

        $productIds = $notification['selected_products'];
        
        if($productIds != "")
        {
            $qry = "SELECT p.productid, p.productname FROM vtiger_products 
                    WHERE productid IN (".$productIds.") and deleted=0";
                    
            $res = $adb->pquery($qry);
            
            if($adb->num_rows($res) > 0)
            {
                while ($row = $adb->fetchByAssoc($res))
                {
                    $notification['productidlist'][] = $row['productid'];
                }

                $notification['productidjson'] = json_encode($notification['productidlist']);
            }
        }
        return $notification;
    }
    
    return false;
}

function sendSMS($to, $message) 
{
    global $adb;
    
    $message = preg_replace('/<[^>]+>/', ' ', $message);
    $resSMSdetail = $adb->pquery("SELECT * FROM notification_sms_config WHERE active = 'Y'",array());  
    $to = preg_replace("|[^\d]+|imsU", "", $to);
    
    if($adb->num_rows($resSMSdetail) > 0) 
    { 
        //Your Account SID and Auth Token from twilio.com/console
        $sid = $adb->query_result($resSMSdetail, 0, 'accountid');
        $token = $adb->query_result($resSMSdetail, 0, 'key');

        $client = new Client($sid, $token);
        try
        {
            $twilio_number = '+1'.$adb->query_result($resSMSdetail, 0, 'phonenumber');
            $sto = '+1'.$to;
            
            $execution = $client->messages->create($sto, ['from' => $twilio_number,'body' => $message]);
            $data = [
                        'status' => true,
                        'messageid' => $execution->sid
                    ];
        } 
        catch(Twilio\Exceptions\RestException  $e ) 
        {
            $data = [
                        'status' => false,
                    ];
        }
        
        return $data;
    }
}

function getAccountFields()
{
    global $adb;
    $accountFieldList = [];
    
    $res_acc = $adb->pquery("SELECT fieldname, fieldlabel FROM vtiger_field WHERE `tablename` LIKE '%vtiger_account%' AND displaytype IN ('1','2','3') ORDER BY fieldlabel", []);
    if($adb->num_rows($res_acc))
    {
        while($rowAcc = $adb->fetchByAssoc($res_acc))
        {
            $accountFieldList[$rowAcc['fieldname']] = $rowAcc['fieldlabel'];
        }
    }
    
    return $accountFieldList;
}

function getProductFields()
{
    global $adb;
    $ProductFieldList = [];
    
    $res_product = $adb->pquery("SELECT fieldname, fieldlabel FROM vtiger_field WHERE `tablename` IN ('vtiger_productcf', 'vtiger_products') AND displaytype IN ('1','2','3') ORDER BY fieldlabel", []);
    if($adb->num_rows($res_product))
    {
        while($rowPrd = $adb->fetchByAssoc($res_product))
        {
            $ProductFieldList[$rowPrd['fieldname']] = $rowPrd['fieldlabel'];
        }
    }
    
    return $ProductFieldList;
}

function getProductInformation($pId)
{
    global $adb;
    
    $res_product = $adb->pquery("SELECT * FROM vtiger_productcf pcf INNER JOIN vtiger_products p ON p.productid = pcf.productid WHERE p.productid = ?", [$pId]);
    $rowPrd = $adb->fetchByAssoc($res_product);
    
    return $rowPrd;
}

function replace_mapping_info($messageBody, $Prod_Cust_info)
{
    foreach($Prod_Cust_info as $fieldName => $fieldVal)
    {
        $messageBody = preg_replace("|{{".$fieldName."}}|im", $fieldVal, $messageBody);
        $messageBody = preg_replace("|&#123;&#123;".$fieldName."&#125;&#125;|im", $fieldVal, $messageBody);
    }
    return $messageBody;
}

function check_and_save_to_notification_list($customerID, $productId, $trigger_on_value, $referenceValue)
{
    global $adb;

    set_local_TimeZone();
    $currentDateTime = date("Y-m-d H:i:s");

    if($referenceValue != "")
    {
        $referenceValue = "Reference : ".$referenceValue;
    }
    
    $finalNotificationList = [];
    if($productId != "")
    {
        $resProductNotification = $adb->pquery("SELECT * FROM notifications WHERE selected_products LIKE '%\"$productId\"%' AND deleted = '0' AND trigger_on = '$trigger_on_value'");
        $ProductInfo = getProductInformation($productId);      
        
        if($adb->num_rows($resProductNotification) > 0)
        {
            while($rowNotification = $adb->fetchByAssoc($resProductNotification))
            {   
                $finalNotificationList[] = $rowNotification;
            }
        }
    }
    if($customerID != "")
    {
        $resCustomerNotification = $adb->pquery("SELECT * FROM notifications WHERE selected_customers LIKE '%\"$customerID\"%' AND deleted = '0' AND trigger_on = '$trigger_on_value'");
        $CustomerInfo = getAccountFullDetails($customerID);
        
        if($adb->num_rows($resCustomerNotification) > 0)
        {
            while($rowNotification = $adb->fetchByAssoc($resCustomerNotification))
            {   
                $finalNotificationList[] = $rowNotification;
            }
        }
    }
    
    foreach($finalNotificationList as $rowNotification)
    {
        $messageBody = replace_mapping_info($rowNotification['message'], $CustomerInfo);
        $messageBody = replace_mapping_info($messageBody, $ProductInfo);
            
        if($rowNotification['trigger_when_option'] != 'immediately')
        {
            $trigger_date = date("Y-m-d H:i:s",strtotime('+'.$rowNotification['trigger_when_value'].' '.$rowNotification['trigger_when_option'], strtotime($currentDateTime)));
            
            $adb->pquery("INSERT INTO `notification_list` 
                    (`notificationid`, `date_of_trigger`, `customer_name`, `customer_number`, `related_productnumber`, `related_product_id`,`finished`, `finish_date_time`, `response`, `reference_trigger_on_value`) 
                    VALUES (?,?,?,?,?,?,?,?,?,?)", 
                    [$rowNotification['notificationid'], $trigger_date, $CustomerInfo['accountname'], $customerID, $ProductInfo['cf_782'], $productId, "N", '0000-00-00 00:00:00', $response, $referenceValue]
                    );
        } 
                        
    }  
}

function send_sms_to_customer($notificationID, $referenceValue="")
{
    global $adb;

    set_local_TimeZone();
    $currentDateTime = date("Y-m-d H:i:s"); 
    
    $resNotification = $adb->pquery("SELECT * FROM notifications WHERE notificationid = ?", [$notificationID]);
    $notificationDetails = $adb->fetchByAssoc($resNotification);
    
    $customerList = json_decode(decode_html($notificationDetails['selected_customers']), true);

    if(!empty($customerList))
    {
        foreach($customerList as $customerID => $customerDetails)
        {
            $CustomerInfo = getAccountFullDetails($customerID);
            
            $messageBody = replace_mapping_info($notificationDetails['message'], $CustomerInfo);
            
            if($notificationDetails['trigger_type'] == 'sms' && $CustomerInfo['phone'] != '')
            {
                if($referenceValue != "")
                    $messageBody = $referenceValue." ".$messageBody;
                
                $response = sendSMS($CustomerInfo['phone'], $messageBody);
            }
            elseif($notificationDetails['trigger_type'] == 'email' && $CustomerInfo['email1'] != '')
            {
                if($referenceValue != "")
                    $messageBody = $referenceValue."<br/><br/>".$messageBody;
                
                $response = send_email($CustomerInfo['email1'], $notificationDetails['notificationname'], $messageBody);
            }           
            
            $response = json_encode($response);
            
            $adb->pquery("INSERT INTO `notification_list` 
                    (`notificationid`, `date_of_trigger`, `customer_name`, `customer_number`, `related_productnumber`, `related_product_id`,`finished`, `finish_date_time`, `response`) 
                    VALUES (?,?,?,?,?,?,?,?,?)", 
                    [$notificationDetails['notificationid'], $currentDateTime, $CustomerInfo['accountname'], $customerID, "", "", "Y", $currentDateTime, $response]
                    );
        }
    }
}
?>