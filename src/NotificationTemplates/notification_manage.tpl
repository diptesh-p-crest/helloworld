<script language="JavaScript" type="text/javascript" src="include/js/jquery_sortable/jquery-sortable-min.js"></script>
<script language="JavaScript" type="text/javascript" src="include/js/Notification.js"></script>
<script type="text/javascript" src="jscalendar/calendar.js"></script>
<script type="text/javascript" src="jscalendar/calendar-setup.js"></script>
<script type="text/javascript" src="jscalendar/lang/calendar-en.js"></script>
<link rel="stylesheet" type="text/css" media="all" href="themes/softed/Notification.css">
<link rel="stylesheet" type="text/css" media="all" href="jscalendar/calendar-win2k-cold-1.css">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="98%">
	<tbody>
		<tr>
			<td valign="top"><img src="{$IMAGE_PATH}showPanelTopLeft.gif"></td>
			<td class="showPanelBg" style="padding: 10px;" valign="top">	
                <div class="pageHeader">
                    General Notifications <br/><br/>
                </div>
                <div class="panel-heading">
                    <ul class="nav nav-tabs" id="notification_tab">
                        <li id="li_notificationlist" class="active">
                            <a href="#li_notificationlist" data-toggle="tab" title="Notifications List" onclick="get_notification();">
                                Notifications List 
                            </a>
                        </li>
                        <li id="li_notification">
                            <a href="#li_notification" data-toggle="tab" title="Notifications Create" onclick="add_edit_notification('');">
                                Create Notification
                            </a>
                        </li> 
                        <li id="li_notification_smsconfig">
                            <a href="#li_notification_smsconfig" data-toggle="tab" title="SMS Config (Twilio)" onclick="SMSConfig();">
                                SMS Config (Twilio)
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="panel-body">
                    <div class="tab-content" id="notification_data" style="color : #555555;padding-top: 28px;"></div>
                </div>
                <input id="all_ids" value="" name="all_ids" type="hidden">
                <input id="orderby" value="" name="orderby" type="hidden">
                <input id="where_export" value="" name="where_export" type="hidden">
            </td>
			<td valign="top"><img src="{$IMAGE_PATH}showPanelTopRight.gif"></td>
		</tr>
	</tbody>
</table>
{literal}
    <script language="javascript" type="text/javascript">
        var type = window.location.hash.substr(1);
        if(type == 'li_notificationlist')
            get_notification();
        else if(type == 'li_notification')
            add_edit_notification('');
        else if(type == 'li_notification_smsconfig')
            SMSConfig();
        else
            get_notification();
    </script>
{/literal}