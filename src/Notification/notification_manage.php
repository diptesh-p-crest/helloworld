<?php

require_once('include/utils/utils.php');

require_once('Smarty_setup.php');

global $app_strings;
global $mod_strings;
global $currentModule;
global $theme;
$theme_path = "themes/" . $theme . "/";
$image_path = $theme_path . "images/";
global $current_language;

$smarty = new vtigerCRM_Smarty;


$smarty->assign("LIST_ENTRIES", $entries_list);
$smarty->assign("MOD", return_module_language($current_language, 'Smtp'));
$smarty->assign("IMAGE_PATH", $image_path);
$smarty->assign("APP", $app_strings);
$smarty->assign("CMOD", $mod_strings);
$smarty->assign("MODULE", $currentModule);



$smarty->display('NotificationTemplates/notification_manage.tpl');
?>