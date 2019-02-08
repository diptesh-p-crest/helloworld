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

-> Later run ==> composer update

-> Finally copy  \vendor\spectersolutions\notificationpack\transferfolders.bat on root and double click (it will copy down require files to appropriate folders)

Manual Steps:
------------
1) To activate General Notification ICON, Copy following Code to Smarty\templates\Settings.tpl in Communication section after the last &lt;li&gt; tag.

{if file_exists('Smarty/templates/NotificationTemplates/generalNotification.tpl')}
    {include file='NotificationTemplates/generalNotification.tpl'}
{/if}

Enter following line in "Smarty\templates\HeaderSubMenu.tpl" in Calender condition
<li>
    <a href="index.php?module=Settings&action=notification_manage&parenttab=Settings">Notification</a>
</li>

2) Using <b>PHINX</b> create new SQL file and copy down migrate <b>UP</b> and <b>Down</b> functions from \vendor\spectersolutions\notificationpack\src\DBChanges\notification_sql.php SQL to newly created SQL file. Finally Migrate the SQL.

3) Need to remove "Iframe" value from "jscalendar\calendar.js" file on line 1487.

4) Add this line on the top of utils.php "require_once 'include/utils/NotificationUtils.php';"

5) In "modules\SalesOrder\saveFinalizeSOFunctions.php" search for this loop
    for ($i = 1; $i <= $soparams['totalProductCount']; $i++) 
    
    And call the functions Like for Sales Trigger <b>check_and_save_to_notification_list($dlAccountId, $soparams["hdnProductId$i"], "sales", $dlSONumber);</b>
    
    $dlAccountId ==> Account / Customer ID
    $soparams["hdnProductId$i"] ==> Product ID
    "sales" ==> Trigger On Value ("sales", "salesevents", "installs") 
    $dlSONumber ==> This value would be SalesOrder No , Sales Event Name OR Install Name (as per the Trigger On Value).
    
6) In include/utils/commonfunctions.php -- need to make change to send HTML Emails

like this

$mail->MsgHTML(html_entity_decode($message));
$mail->IsHTML(true); // send as HTML

IsHTML will call later the MsgHTML and need to use html_entity_decode
