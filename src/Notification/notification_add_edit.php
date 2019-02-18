<?php
require_once('include/utils/utils.php');
require_once('include/utils/NotificationUtils.php');
require_once('Smarty_setup.php');

global $app_strings,$mod_strings,$currentModule,$theme,$current_language,$global_fuse5_date_format;

$theme_path = "themes/" . $theme . "/";
$image_path = $theme_path . "images/";

$smarty = new vtigerCRM_Smarty;

$notificationid = $_REQUEST['notificationid'];
if($notificationid != '')
{  
    $notification_detail = getnotification_detail($notificationid);
    $notification_detail['message'] = str_replace(['{','}'], ['&#123;','&#125;'], $notification_detail['message']);
    $smarty->assign("notification_detail", $notification_detail);
    
    if($notification_detail['start_date'] == '0000-00-00') 
    {
        $notification_detail['start_date'] = "";
        $smarty->assign("formatted_start_date", "");
    }
    else
    {       
        $smarty->assign("formatted_start_date", dateformatconvert($notification_detail['start_date'], 'yyyy-mm-dd', $global_fuse5_date_format));
    }
    
    if($notification_detail['end_date'] == '0000-00-00')
    {
        $notification_detail['end_date'] = "";
        $smarty->assign("formatted_end_date", ""); 
    }
    else
    {
       $smarty->assign("formatted_end_date", dateformatconvert($notification_detail['end_date'], 'yyyy-mm-dd', $global_fuse5_date_format)); 
    }
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