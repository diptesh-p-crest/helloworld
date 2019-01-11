cls
@ECHO OFF
ECHO. ***********************************
ECHO. ** Tranfer Files to setting Module and Template file to Smarty folder **
ECHO. *******************************
xcopy /I vendor\spectersolutions\notificationpack\src\Notification modules\Settings
xcopy /I vendor\spectersolutions\notificationpack\src\NotificationTemplates Smarty\templates
xcopy /I vendor\spectersolutions\notificationpack\src\Specter-notification.png themes\softed\images\Specter-notification.png