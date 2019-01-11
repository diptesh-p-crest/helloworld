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
1) To activate General Notification ICON, Copy following Code to Smarty\templates\Settings.tpl in Communication section after the last <li> tag.

{if file_exists('Smarty/templates/NotificationTemplates/generalNotification.tpl')}
    {include file='NotificationTemplates/generalNotification.tpl'}
{/if}