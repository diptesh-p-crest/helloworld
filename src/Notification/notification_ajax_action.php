<?php
require_once('include/utils/utils.php');

$maintask = $_REQUEST['maintask'];

switch ($maintask)
{
    case 'getfilter_product':
            productgroup_getfilter_product();
            break;
    case 'display_productlist':
            notification_displayproductlist();
            break; 
    case 'display_customerlist':
            notification_displaycustomerlist();
            break;
    case 'notification_save':
          notification_save();
          break;
    case 'notification_table':
            notification_table();
        break;
    case 'notification_datatable':    
        notification_datatable();
        break;
    case 'notification_delete':
        notification_delete();
        break;
    case 'notification_checkduplicate':
        notification_checkduplicate();
        break;
	case 'sms_config':
        sms_config();
        break;
    case 'sms_config_datatable':
        sms_config_datatable();
        break;  
    case 'smsconfig_save':
        smsconfig_save();
        break;
    case 'delete_smsconfig':
        delete_smsconfig();
        break;
}

function smsconfig_save()
{
    global $adb;
    
    $accountid = $_REQUEST['accountid'];    
    $key = $_REQUEST['key'];
    $phonenumber = $_REQUEST['phonenumber'];
    $smsconfigid = $_REQUEST['smsconfigid']; 
    $activeInactive = $_REQUEST['activeInactive']; 

	if(empty($smsconfigid))
    {
        $qry = "INSERT INTO notification_sms_config SET 
                `accountid` = ?,        
                `key` = ?,        
                `phonenumber` = ?,
                `active` = ?";
        
        $adb->pquery($qry,array($accountid,$key,$phonenumber,$activeInactive));
        
        $smsconfigid = $adb->get_insert_id();       
    }
    else
    {
        $qry = "UPDATE notification_sms_config SET 
             `accountid` = ?,        
             `key` = ?,        
             `phonenumber` = ?,
             `active` = ?		
             WHERE `smsconfigid` = ?";
        $adb->pquery($qry,array($accountid, $key, $phonenumber, $activeInactive, $smsconfigid));            
    } 

    if($activeInactive == "Y")
    {
        $qry = "UPDATE notification_sms_config SET `active` = ? WHERE `smsconfigid` <> ?";
        $adb->pquery($qry,array('N', $smsconfigid));         
    }
}

function sms_config()
{
    require_once('Smarty_setup.php');
    $smarty = new vtigerCRM_Smarty;
   
    $smarty->display('NotificationTemplates/notification_sms_config.tpl');
}

function sms_config_datatable()
{
    global $adb;
    
    $columns = array(
        0 => '`accountid`',
        1 => '`key`',
        2 => '`phonenumber`',
        3 => '`active`',
    ); 
    
    $qry = "SELECT count(smsconfigid) as numofitems
            FROM notification_sms_config as pg
            WHERE 1 ";
     
    
    $res = $adb->pquery($qry);
    $total_record = $adb->query_result($res, 0, 'numofitems');    
    $arrsmsconfig = array();
    
    if ($total_record > 0)
    {
        $qry = "SELECT * FROM notification_sms_config WHERE 1 ";            
        
        $qry .= " ORDER BY " . $columns[$_REQUEST['order'][0]['column']] . "   " . $_REQUEST['order'][0]['dir'] . " ";    
        
        
        $qry .= " LIMIT " . $_REQUEST['start'] . " ," . $_REQUEST['length'] . " ";  
                
        $res_limit = $adb->pquery($qry);
        
		$orderBy = $columns[$_REQUEST['order'][0]['column']] . "   " . $_REQUEST['order'][0]['dir'] . " ";
		
        $total_record_with_pagination = $adb->num_rows($res_limit);
        
        if ($total_record_with_pagination > 0)
        {
            $cnt = 1;
			$all_ids = "";
            while ($row = $adb->fetchByAssoc($res_limit))
            {
                $temp_array = array();
                
                $smsconfigid = $row['smsconfigid'];
				$all_ids .= $smsconfigid.';';
                $temp_array['DT_RowId'] = 'row_'.$smsconfigid;
                
                $temp_array[] = $row['accountid'];
                
                $temp_array[] = $row['key'];
                
                $temp_array[] = $row['phonenumber'];
                
                $temp_array[] = $row['active'] == "Y" ? "Active" : "Inactive";
                
                $edit_icon = '<button class="btn btn-outline-warning btn-sm" type="button" title="Edit" onclick="update_smsconfig(\''.$row['smsconfigid'].'\',\''.$row['accountid'].'\',\''.$row['key'].'\',\''.$row['phonenumber'].'\',\''.$row['active'].'\');">EDIT</span></button>';
                $delete_icon = '<button class="btn btn-outline-danger btn-sm" type="button" title="Delete" onclick="delete_smsconfig(\''.$row['smsconfigid'].'\');">DELETE</span></button>';
                
                $temp_array[] = $edit_icon.'&nbsp;'.$delete_icon;
                
                $arrsmsconfig[] = $temp_array;
                $cnt++;
            }
        }    
    }
	
	$_SESSION['nav_start'] = $_REQUEST['start'];
	$json_data = array(
        "draw" => intval($requestData['draw']),
        "recordsTotal" => intval($total_record), 
        "recordsFiltered" => intval($total_record),
		"orderBycond" => $orderBy,
		"all_ids" => $all_ids,
        "data" => $arrsmsconfig
    );	
    echo json_encode($json_data);   
}

function delete_smsconfig()
{
    global $adb;    
    $adb->pquery("DELETE FROM notification_sms_config WHERE smsconfigid = ?", array($_REQUEST['smsconfigid'])); 
}

function notification_checkduplicate()
{
    global $adb;

    $qry = "SELECT count(notificationid) FROM notifications WHERE notificationname = ? and notificationid <> ?";

    $res = $adb->pquery($qry,array($_REQUEST['notificationname'], $_REQUEST['notificationid']));
    $totalcount = $adb->query_result($res, 0, 'totalcount');
    
    echo $totalcount;
}

function notification_delete()
{
    global $adb;    
    $notificationid_listArr=explode(',',$_REQUEST['notificationid_list']);
    $notificationid_listArr = array_filter($notificationid_listArr);            

    if(count($notificationid_listArr) > 0)
    {
        $qry = "UPDATE notifications SET deleted='1' WHERE notificationid IN ('".join("','",$notificationid_listArr)."')";            
        $adb->pquery($qry);      
    }
}

function notification_datatable()
{
    global $adb;
    
    $columns = array(
        1 => 'LENGTH(notificationname),notificationname',
        2 => 'trigger_type',
        3 => 'trigger_on',
    ); 
    
    $where_search = '';
    if($_REQUEST['custom_searchtype'] == 'basicsearch')
    {
        $custom_basic_searchstring = $_REQUEST['custom_basic_searchstring'];
        $custom_basicsearch_fieldname = $_REQUEST['custom_basicsearch_fieldname'];
        $custom_basicsearch_option = $_REQUEST['custom_basicsearch_option'];
        
        
        $where_search  .= ' AND ';
        if($custom_basicsearch_option == 'beginwith')
        {
            $where_search .= " ".$custom_basicsearch_fieldname." like '".$custom_basic_searchstring."%' ";
        }
        else            
        {            
            $where_search .= " ".$custom_basicsearch_fieldname." = '".$custom_basic_searchstring."' ";    
        }
        
    }
    else if($_REQUEST['custom_searchtype'] == 'advancesearch')
    {
        
        $advancesearchdata = $_REQUEST['advancesearchdata'];
        if(count($advancesearchdata) > 0)
        {
           
           $custom_where_data =  custom_advancesearch_build_where($advancesearchdata);
           if(count($custom_where_data) > 0) 
           {
               
               if($_REQUEST['custom_advancesearch_option'] == 'match_all')
               {
                
                $custom_where_data_str  = ' ( '.implode(" and ",$custom_where_data).' ) '; 
               }
               else
               {
                   $custom_where_data_str  = ' ( '.implode(" or ",$custom_where_data).' ) '; 
               }
               
               $where_search  .= ' AND ';
               
               $where_search .= $custom_where_data_str;
           }
            
        }
    }
    
    $qry = "SELECT count(notificationid) as numofproducts
            FROM notifications as pg
            WHERE deleted = '0' ".$where_search." ";
     
    
    $res = $adb->pquery($qry);
    $total_record = $adb->query_result($res, 0, 'numofproducts');    
    $arrNotificationrow = array();
    
    if ($total_record > 0)
    {
        $qry = "SELECT * FROM notifications WHERE deleted = '0' ".$where_search." ";            
        
        $qry .= " ORDER BY " . $columns[$_REQUEST['order'][0]['column']] . "   " . $_REQUEST['order'][0]['dir'] . " ";    
        
        
        $qry .= " LIMIT " . $_REQUEST['start'] . " ," . $_REQUEST['length'] . " ";        
        
                
        $res_limit = $adb->pquery($qry);
        
		$orderBy = $columns[$_REQUEST['order'][0]['column']] . "   " . $_REQUEST['order'][0]['dir'] . " ";
		
        $total_record_with_pagination = $adb->num_rows($res_limit);
        
        if ($total_record_with_pagination > 0)
        {
            $cnt = 1;
			$all_ids = "";
            while ($row = $adb->fetchByAssoc($res_limit))
            {
                $temp_array = array();
                
                $notificationid = $row['notificationid'];
				$all_ids .= $notificationid.';';
                $temp_array['DT_RowId'] = 'row_'.$notificationid;
                
                $temp_array[] = '<input type="checkbox" name="check_' . $notificationid . '" id="check_' . $notificationid . '" class="notification_checkbox" onclick="maintain_notification_checkbox_datatable
(this,\'selected_record_datatable_json\',\'selected_product_buttonlist\',\'check_all\',\'notification_checkbox\')" value="' . $productgroupid . '"  data-notificationname="'.$row['notificationname'].'" data-selectedbuttoninfo="'.$row['notificationname'].'">';                
                
                
                $temp_array[] = '<a href="javascript:;" onclick="add_edit_notification(\''.$row['notificationid'].'\');">'.$row['notificationname'].'</a>';
                
                $temp_array[] = $row['trigger_type'];
                
                $temp_array[] = $row['trigger_on'];
                
                $temp_array[] = $row['trigger_for'];
                
                $edit_icon = '<button class="btn btn-outline-warning btn-sm" type="button" title="Edit" onclick="add_edit_notification(\''.$row['notificationid'].'\');">EDIT</span></button>';                       
                
                $delete_icon = '<button class="btn btn-outline-danger btn-sm" type="button" title="Delete" onclick="delete_notification(\''.$row['notificationid'].'\');">DELETE</span></button>';
                
                $temp_array[] = $edit_icon.'&nbsp;'.$delete_icon;
                
                $arrNotificationrow[] = $temp_array;
                $cnt++;
            }
        }    
    }
	
	$_SESSION['nav_start'] = $_REQUEST['start'];
	$_SESSION[$_REQUEST['module']]['export_where'] = str_replace("AND","",$where_search);
    $json_data = array(
        "draw" => intval($requestData['draw']),
        "recordsTotal" => intval($total_record), 
        "recordsFiltered" => intval($total_record),
		"where_export" => str_replace("AND","",$where_search),
		"orderBycond" => $orderBy,
		"all_ids" => $all_ids,
        "data" => $arrNotificationrow
    );	
    echo json_encode($json_data);   
}

function notification_table()
{
    require_once('Smarty_setup.php');
    $smarty = new vtigerCRM_Smarty;
    
    
    $custom_search_option_array = array();
    $custom_search_option_array[] = array('fieldname'=>'notificationname','text'=>'Notification Name','fieldtype'=>'string','default_selected'=>'yes','display_in'=>'both');
    $custom_search_option_array[] = array('fieldname'=>'trigger_type','text'=>'Trigger Type','fieldtype'=>'string','display_in'=>'both');
    $custom_search_option_array[] = array('fieldname'=>'trigger_on','text'=>'Trigger On','fieldtype'=>'string','display_in'=>'both');


    $smarty->assign("custom_search_option_array", $custom_search_option_array);
    $smarty->assign("custom_search_callfrom", 'notification');

    $custom_alphabetical_search_data = custom_alphabetical_search_for_notification('notificationname');
    $smarty->assign("custom_alphabetical_search_data", $custom_alphabetical_search_data);
    
    $smarty->display('NotificationTemplates/notification_list.tpl');
}

function notification_save()
{
    global $adb;
    //adb_debug();
    $notificationname = $_REQUEST['notificationname'];    
    $trigger_type = $_REQUEST['trigger_type'];
    $trigger_on = $_REQUEST['trigger_on'];
    $trigger_for = $_REQUEST['trigger_for'];    
    $trigger_when_value = $_REQUEST['trigger_when_value'];
    $trigger_when_option = $_REQUEST['trigger_when_option'];
    $message = fck_from_html($_REQUEST['message']);
    $notificationid = $_REQUEST['notificationid'];	
    $ProductList = $_REQUEST['selected_products'];
    $CustomerList = $_REQUEST['selected_customers'];
    $startDate = $_REQUEST['strdate'];
    $EndDate = $_REQUEST['enddate'];
    
    if($_REQUEST['optionVal'] == 'products') $optionVal = "P";
    if($_REQUEST['optionVal'] == 'customer') $optionVal = "C";
    
	if(empty($notificationid))
    {
        $qry = "INSERT INTO notifications SET 
        notificationname = ?,        
        trigger_type = ?,        
        trigger_on = ?,
        trigger_for = ?,
        trigger_when_value = ?,
        trigger_when_option = ?,
        message = ?,
        product_customer = ?,
        selected_products = ?,
        selected_customers = ?,
        start_date = ?,
        end_date = ?
        ";
        
        $adb->pquery($qry,array($notificationname,$trigger_type,$trigger_on,$trigger_for,$trigger_when_value,$trigger_when_option,$message, $optionVal,$ProductList,$CustomerList,$startDate,$EndDate));
        
        $notificationid = $adb->get_insert_id();       
    }
    else
    {
        $qry = "UPDATE notifications SET 
         notificationname = ?,        
        trigger_type = ?,        
        trigger_on = ?,
        trigger_for = ?,
        trigger_when_value = ?,
        trigger_when_option = ?,
        message = ?,
        product_customer = ?,
        selected_products = ?,
        selected_customers = ?,
        start_date = ?,
        end_date = ?		
        WHERE notificationid = ?";
        $adb->pquery($qry,array($notificationname,$trigger_type,$trigger_on,$trigger_for,$trigger_when_value,$trigger_when_option,$message,$optionVal,$ProductList,$CustomerList,$startDate,$EndDate,$notificationid));            
    }    
    
    if($trigger_when_option == 'immediately')
    {   
        send_sms_to_customer($notificationid);
    }
}

function notification_displaycustomerlist()
{
    global $adb;
    
    $customeridjson = trim($_REQUEST['customerjson']);       
    
    $columns = array(
        1 => 'LENGTH(cf_658),cf_658',        
        2 => 'accountname'        
    );  
    
    $arrcustomerow = array();   
    $customeridarray = json_decode($customeridjson,true);    
    $customeridstr = implode(",",$customeridarray);
    
    $qry = "SELECT count(acc.accountid) AS numofcustomer
            FROM vtiger_account AS acc
            INNER JOIN vtiger_accountscf AS acf ON acf.accountid = acc.accountid
            WHERE acc.deleted = '0'";
    
    $res = $adb->pquery($qry);
    $total_record = $adb->query_result($res, 0, 'numofcustomer');    
    
    if ($total_record > 0)
    {
		$qry = "SELECT acc.accountid, acc.accountname, cf_658 as accountnumber
                FROM vtiger_account AS acc
                INNER JOIN vtiger_accountscf AS acf ON acf.accountid = acc.accountid
                WHERE acc.deleted = '0'";
        
        $qry .= " ORDER BY " . $columns[$_REQUEST['order'][0]['column']] . "   " . $_REQUEST['order'][0]['dir'] . " ";
        $qry .= " LIMIT " . $_REQUEST['start'] . " ," . $_REQUEST['length'] . " ";
                
        $res = $adb->pquery($qry);
        $res_limit = $adb->pquery($qry);
        
        $total_record_with_pagination = $adb->num_rows($res_limit);
        
        if ($total_record_with_pagination > 0)
        {
            $cnt = 1;
            while ($row = $adb->fetchByAssoc($res_limit))
            {
                $temp_array = array();
                $accountid = $row['accountid'];
                $temp_array['DT_RowId'] = 'row_'.$accountid;                
                
                $temp_array[] = '<input type="checkbox" name="check_' . $accountid . '" id="check_' . $accountid . '" class="notification_customer_list_checkbox" onclick="maintain_checkbox_datatable_notification
(this,\'selected_record_notification_customer_datatable_json\',\'selected_notification_customer_buttonlist\',\'customer_check_all\',\'notification_customer_list_checkbox\')" value="' . $accountid . '"  data-accountnumber="'.$row['accountnumber'].'" data-selectedbuttoninfo="'.$row['accountnumber'].'">';
                
                $temp_array[] = '<a target="_blank" href="index.php?action=DetailView&module=Accounts&record=' . $row['accountid'] . '">' . $row['accountnumber'] . '</a>';
                $temp_array[] = $row['accountname'];
                
                $arrcustomerow[] = $temp_array;
                $cnt++;
            }
        }    
    }
    

    $json_data = array(
        "draw" => intval($_REQUEST['draw']),
        "recordsTotal" => intval($total_record), 
        "recordsFiltered" => intval($total_record),
        "data" => $arrcustomerow
    );

    echo json_encode($json_data);
}

function notification_displayproductlist()
{
    global $adb;
    
    $productidjson = trim($_REQUEST['productidjson']);       
    
    $columns = array(
        1 => 'LENGTH(cf_784),cf_784',        
        2 => 'productname'        
    );  
    
    $arrproductrow = array();   
    $productidarray = json_decode($productidjson,true);    
    $productidstr = implode(",",$productidarray);
    
    $qry = "SELECT count(p.productid) AS numofproducts
            FROM vtiger_products AS p
            INNER JOIN vtiger_productcf AS pcf ON pcf.productid = p.productid
            WHERE p.deleted = '0'";
    
    $res = $adb->pquery($qry);
    $total_record = $adb->query_result($res, 0, 'numofproducts');    
    
    if ($total_record > 0)
    {
		$qry = "SELECT p.productid, p.productname, cf_784 as productnumber
                FROM vtiger_products AS p
                INNER JOIN vtiger_productcf AS pcf ON pcf.productid = p.productid 
                WHERE p.deleted = '0'";
        
        $qry .= " ORDER BY " . $columns[$_REQUEST['order'][0]['column']] . "   " . $_REQUEST['order'][0]['dir'] . " ";
        $qry .= " LIMIT " . $_REQUEST['start'] . " ," . $_REQUEST['length'] . " ";
                
        $res = $adb->pquery($qry);
        $res_limit = $adb->pquery($qry);
        
        $total_record_with_pagination = $adb->num_rows($res_limit);
        
        if ($total_record_with_pagination > 0)
        {
            $cnt = 1;
            while ($row = $adb->fetchByAssoc($res_limit))
            {
                $temp_array = array();
                $productid = $row['productid'];
                $temp_array['DT_RowId'] = 'row_'.$productid;                
                
                $temp_array[] = '<input type="checkbox" name="check_' . $productid . '" id="check_' . $productid . '" class="notification_list_checkbox" onclick="maintain_checkbox_datatable_notification
(this,\'selected_record_notification_product_datatable_json\',\'selected_notification_product_buttonlist\',\'product_check_all\',\'notification_list_checkbox\')" value="' . $productid . '"  data-productnumber="'.$row['productnumber'].'" data-selectedbuttoninfo="'.$row['productnumber'].'">';
                
                $temp_array[] = '<a target="_blank" href="index.php?action=DetailView&module=Products&record=' . $row['productid'] . '">' . $row['productnumber'] . '</a>';
                $temp_array[] = $row['productname'];
                
                $arrproductrow[] = $temp_array;
                $cnt++;
            }
        }    
    }
    

    $json_data = array(
        "draw" => intval($_REQUEST['draw']),
        "recordsTotal" => intval($total_record), 
        "recordsFiltered" => intval($total_record),
        "data" => $arrproductrow
    );

    echo json_encode($json_data);
}
