<?php 
if (!isset($_REQUEST['fileRunFrom']) || $_REQUEST['fileRunFrom'] == '') 
{
    chdir('../..');
}

require_once 'include/utils/utils.php';
require_once "modules/Emails/mail.php";
require_once "modules/Emails/class.phpmailer.php";

global $adb, $adbRead;

ini_set('memory_limit', '-1');
set_time_limit(0);
ini_set('max_execution_time', 0);

set_local_TimeZone();

$getTodayNotification = "SELECT nl.*, trigger_type, message, notificationname 
                        FROM notification_list nl
                        INNER JOIN notifications n ON n.notificationid = nl.notificationid 
                        WHERE DATE_FORMATE(date_of_trigger, '%Y-%m-%d') = ? ";

$resTodayNotification = $adb->pquery($getTodayNotification, [date("Y-m-d")]);

if($adb->num_rows($resTodayNotification) > 0)
{
    while($rowNotification = $adb->fetchByAssoc($resTodayNotification))
    {
        if($rowNotification['trigger_when_option'] == 'hours')
        {
            $curretDate = date("Y-m-d H:00:00");
            $TriggerDate = date("Y-m-d H:00:00",strtotime($rowNotification['date_of_trigger']));
        }
        else
        {
            $curretDate = date("Y-m-d");
            $TriggerDate = date("Y-m-d",strtotime($rowNotification['date_of_trigger']));
        }
        
        if($curretDateHour == $TriggerDate)
        {
            send_sms_to_customer($rowNotification['notificationid']);
        }
    }
}
?>
