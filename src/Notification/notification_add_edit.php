<?php
require_once('include/utils/utils.php');
require_once('include/utils/NotificationUtils.php');
require_once('Smarty_setup.php');

global $app_strings,$mod_strings,$currentModule,$theme,$current_language;

$theme_path = "themes/" . $theme . "/";
$image_path = $theme_path . "images/";

$smarty = new vtigerCRM_Smarty;

$notificationid = $_REQUEST['notificationid'];
if($notificationid != '')
{  
    $notification_detail = getnotification_detail($notificationid);
    $notification_detail['message'] = str_replace(['{','}'], ['&#123;','&#125;'], $notification_detail['message']);
    $smarty->assign("notification_detail", $notification_detail);
}

$smarty->assign("notificationid", $notificationid);

$smarty->assign("MOD", return_module_language($current_language, 'Smtp'));
$smarty->assign("IMAGE_PATH", $image_path);
$smarty->assign("APP", $app_strings);
$smarty->assign("CMOD", $mod_strings);
$smarty->assign("MODULE", $currentModule);

$accFields = getAccountFields();
$ProdFields = getProductFields();

$smarty->assign("ACCFIELDLIST", $accFields);
$smarty->assign("PRODFIELDLIST", $ProdFields);

$smarty->display('NotificationTemplates/notification_add_edit.tpl');
?>