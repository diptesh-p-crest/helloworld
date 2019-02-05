<?php

require_once 'Smarty_setup.php';
require_once 'include/database/PearDatabase.php';

global $adb;
global $log;

$log->info("Inside Email Templates List View");

$sql = "SELECT * FROM notifications ORDER BY notificationid DESC";
$result = $adb->pquery($sql, array());
$temprow = $adb->fetch_array($result);

$edit = "Edit  ";
$del = "Del  ";
$bar = "  | ";
$cnt = 1;

require_once 'include/utils/UserInfoUtil.php';
global $app_strings,$app_list_strings,$mod_strings,$theme,$current_language;

$theme_path = "themes/" . $theme . "/";
$image_path = $theme_path . "images/";

$smarty = new vtigerCRM_Smarty;
$smarty->assign("UMOD", $mod_strings);

$smod_strings = return_module_language($current_language, 'Settings');
$smarty->assign("APP", $app_strings);
$smarty->assign("MOD", $smod_strings);
$smarty->assign("MODULE", 'Settings');
$smarty->assign("IMAGE_PATH", $image_path);
$smarty->assign("PARENTTAB", $_REQUEST['parenttab']);

$return_data = array();
if ($temprow != null) 
{
    do 
    {
        $templatearray = array();
        $templatearray['notificationname'] = $temprow["notificationname"];
        $templatearray['trigger_type'] = $temprow["trigger_type"];
        $templatearray['trigger_on'] = $temprow["trigger_on"];
        $templatearray['trigger_for'] = $temprow["trigger_for"];
        $templatearray['trigger_date'] = $temprow["trigger_date"];
        $return_data[] = $templatearray;
        $cnt++;
    } while ($temprow = $adb->fetch_array($result));
}

$log->info("Exiting Email Templates List View");

$smarty->assign("NOTIFICATION", $return_data);
$smarty->display("NotificationTemplates/CreateNotification.tpl");
