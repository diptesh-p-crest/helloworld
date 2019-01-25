# General Notification

-> Make sure composer installed on your computer

-> Create one file composer.json in your root folder

-> Add following code JSON in composer.json file

{
  "require": {
    "spectersolutions/notificationpack":"dev-master@dev"
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

3)