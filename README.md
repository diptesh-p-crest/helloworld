# General Notification

-> Make sure composer installed on your computer

-> Create one file composer.json in your root folder

-> Add following code JSON in composer.json file

{
  "require": {
    "spectersolutions/notificationpack":"dev-master@dev",
    "twilio/sdk" : "5.*"
  },
  "repositories": [
    {
       "type": "vcs",
       "url": "https://github.com/diptesh-p-crest/helloworld.git" 
    }
  ]
}

-> In Command prompt go to the Project directory

-> If its first time then run ==> composer install

-> Late run ==> composer update

-> Finally run transferfolders.bat (it will copy down require files to appropriate folders)

Manual Steps:
------------
1) To activate General Notification ICON, Copy following Code to Smarty\templates\Settings.tpl in Communication section after the last &lt;li&gt; tag.

{if file_exists('Smarty/templates/NotificationTemplates/generalNotification.tpl')}
    {include file='NotificationTemplates/generalNotification.tpl'}
{/if}

2) Using <b>PHINX</b> create new SQL file and copy down migrate <b>UP</b> and <b>Down</b> functions from notification_sql.php SQL to newly created SQL file. Finally Migrate the SQL.

3) Need to remove "Iframe" value from "jscalendar\calendar.js" file on line 1487.

4) Add this line on the top of utils.php "require_once 'include/NotificationUtils.php';"

5) In "modules\SalesOrder\saveFinalizeSOFunctions.php" search for this loop
    for ($i = 1; $i <= $soparams['totalProductCount']; $i++) 
    
    And call the functions <b>check_and_save_to_notification_list($dlAccountId, $soparams["hdnProductId$i"]);</b>