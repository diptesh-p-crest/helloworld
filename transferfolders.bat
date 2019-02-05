cls
@ECHO OFF
ECHO. ***********************************
ECHO. ** Tranfer Files to appropriate folder **
ECHO. *******************************
ECHO. ***********************************
ECHO. ** Tranfer MODULES Files **
ECHO. *******************************
xcopy /I vendor\spectersolutions\notificationpack\src\Notification modules\Settings
ECHO. ***********************************
ECHO. ** Tranfer TEMPLATE Files **
ECHO. *******************************
xcopy /I vendor\spectersolutions\notificationpack\src\NotificationTemplates Smarty\templates
ECHO. ***********************************
ECHO. ** Tranfer IMAGES Files **
ECHO. *******************************
xcopy /I vendor\spectersolutions\notificationpack\src\Images\Specter-notification.png themes\softed\images\Specter-notification.png
ECHO. ***********************************
ECHO. ** Tranfer CSS Files **
ECHO. *******************************
xcopy /I vendor\spectersolutions\notificationpack\src\CSS\Notification.css themes\softed\Notification.css
ECHO. ***********************************
ECHO. ** Tranfer JS Files **
ECHO. *******************************
xcopy /I vendor\spectersolutions\notificationpack\src\JS\Notification.js include\js\Notification.js
ECHO. ***********************************
ECHO. ** Tranfer CRON Files **
ECHO. *******************************
xcopy /I vendor\spectersolutions\notificationpack\src\Cron\CronNotification.php CronNotification.php
ECHO. ***********************************
ECHO. ** Tranfer UTILS Files **
ECHO. *******************************
xcopy /I vendor\spectersolutions\notificationpack\src\Utils\NotificationUtils.php include\utils\NotificationUtils.php