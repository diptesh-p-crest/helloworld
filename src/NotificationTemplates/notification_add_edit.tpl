<div class="form-horizontal">
    <div class="row">
        <div class="col">
            <label class="control-label" for="searchinput"><b><u>Notification Name</u></b></label>
            <div class="">    
                <input type="text" placeholder="" class="form-control"  name="notificationname" id="notificationname" value="{$notification_detail['notificationname']}">
                <input type="hidden" name="hdn_notificationname" id="hdn_notificationname" value="{$productgroup_detail['notificationname']}">
            </div>
        </div>
        <div class="col">
            <label class="control-label" for="searchinput"><b><u>Trigger Type</u></b></label>
            <div class="">
                <select name="trigger_type" id="trigger_type" onchange="showHideFCKEditor(this.value)">
                    <option value=""></option>
                    <option value="sms" {if $notification_detail['trigger_type'] eq 'sms'}selected{/if}>SMS</option>
                    <option value="email" {if $notification_detail['trigger_type'] eq 'email'}selected{/if}>E-Mail</option>
                    <option value="app" {if $notification_detail['trigger_type'] eq 'app'}selected{/if}>In Application Notification</option>
                </select>
            </div>
        </div> 
        <div class="col">
            <label class="control-label" for="searchinput"><b><u>Trigger On</u></b></label>
            <div class="">
                <select name="trigger_on" id="trigger_on">
                    <option value=""></option>
                    <option value="sales" {if $notification_detail['trigger_on'] eq 'sales'}selected{/if}>Sales</option>
                    <option value="salesevents" {if $notification_detail['trigger_on'] eq 'salesevents'}selected{/if}>Sales Events</option>
                    <option value="installs" {if $notification_detail['trigger_on'] eq 'installs'}selected{/if}>Installs</option>
                </select>
            </div>
        </div>
        <div class="col">
            <label class="control-label" for="searchinput"><b><u>Trigger For</u></b></label>
            <div class="">
                <select name="trigger_for" id="trigger_for">
                    <option value=""></option>
                    <option value="productsale" {if $notification_detail['trigger_for'] eq 'productsale'}selected{/if}>Product Sales</option>
                    <option value="volume" {if $notification_detail['trigger_for'] eq 'volume'}selected{/if}>Volume</option>
                    <option value="absence" {if $notification_detail['trigger_for'] eq 'absence"'}selected{/if}>Absence</option>                        
                </select>
            </div>
        </div>
        <div class="col">
            <label class="control-label" for="searchinput"><b><u>Trigger When</u></b></label>
            <div class="">
                <input type="text" placeholder="" class="form-control"  name="trigger_when_value" id="trigger_when_value" value="{$notification_detail['trigger_when_value']}" style="width:80px">&nbsp;&nbsp;
                <select name="trigger_when_option" id="trigger_when_option">
                    <option value="immediately" {if $notification_detail['trigger_when_option'] eq 'immediately'}selected{/if}>Immediately</option>
                    <option value="hours" {if $notification_detail['trigger_when_option'] eq 'hours'}selected{/if}>Hours Later</option>
                    <option value="days" {if $notification_detail['trigger_when_option'] eq 'days'}selected{/if}>Days Later</option>
                    <option value="weeks" {if $notification_detail['trigger_when_option'] eq 'weeks"'}selected{/if}>Weeks Later</option>
                    <option value="months" {if $notification_detail['trigger_when_option'] eq 'months"'}selected{/if}>Months Later</option>
                    <option value="years" {if $notification_detail['trigger_when_option'] eq 'years"'}selected{/if}>Years Later</option>
                </select>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">           
            <label class="control-label" for="searchinput"><b><u>Start Date</u></b></label>
            <div class="">
                <input type="text" name="strdate" id="strdate" class="small" readonly="readonly" value="{$formatted_start_date}"/>
                <input type='hidden' id='hdnstrdate' name='hdnstrdate' value="{$notification_detail['start_date']}">
                    <span id="jscal_strdate" class="fa-stack fa-md">
                    <i class="far fa-square fa-stack-2x"></i><i class="fas fa-calendar-alt fa-stack-1x"></i></i>
                    </span>
                    ({$global_fuse5_date_format})
                    {literal}
                    <script type="text/javascript">
                        var jsformat = parent.global_fuse5_date_format_js;

                        function catcalc(cal) {
                            var date = cal.date;
                            var time = date.getTime()
                            var date1 = new Date(time);
                            document.getElementById("hdnstrdate").value = date1.print("%Y-%m-%d");
                        }
                        
                        Calendar.setup({
                            inputField: "strdate",   // id of the input field
                            ifFormat: jsformat,       // format of the input field
                            showsTime: false,
                            timeFormat: "24",
                            button: "jscal_strdate",
                            onUpdate: catcalc,
                            dateStatusFunc: function isDisabled(date) {
                                var today = new Date();
                                if (date.getTime() < today.getTime())
                                    return true;
                                else
                                    return false;
                            }
                        });
                    </script>
                    {/literal}
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">            
            <label class="control-label" for="searchinput"><b><u>End Date</u></b></label>
            <div class="">
                <input type="text" name="enddate" id="enddate" class="small" readonly="readonly" value="{$formatted_end_date}"/>
                <input type='hidden' id='hdnenddate' name='hdnenddate' value="{$notification_detail['end_date']}">
                <span id="jscal_enddate" class="fa-stack fa-md">
                <i class="far fa-square fa-stack-2x"></i><i class="fas fa-calendar-alt fa-stack-1x"></i></i>
                </span>
                ({$global_fuse5_date_format})
                {literal}
                <script type="text/javascript">
                    var jsformat = parent.global_fuse5_date_format_js;

                    function catcalc(cal) {
                        var date = cal.date;
                        var time = date.getTime()
                        var date1 = new Date(time);
                        document.getElementById("hdnenddate").value = date1.print("%Y-%m-%d");
                    }

                    Calendar.setup({
                        inputField: "enddate",   // id of the input field
                        ifFormat: jsformat,       // format of the input field
                        showsTime: false,
                        timeFormat: "24",
                        button: "jscal_enddate",
                        onUpdate: catcalc,
                        dateStatusFunc: function isDisabled(date) {
                            var today = new Date();
                            if (date.getTime() < today.getTime())
                                return true;
                            else
                                return false;
                        }
                    });
                </script>
                {/literal}
            </div>
        </div>
    </div>
    <div class="row">           
        <div class="col">
            <label class="control-label" for="searchinput"><b><u>Message</u></b></label>
            <br><br>
            <span style="color:red">NOTE : choose field and get related fieldname to be use in message. While sending the notification the related field it will be replaced with respective field value. 
            <br>Example :  "&#123;&#123;cf_1243&#125;&#125;" will be replaced with "Contact's First Name" Value of Customer.
            </span>
            <div>
                <b>Get Product Field Map</b>
                <select name="productMap" id="productMap" onchange='updateMapSpan(this, "productMapSpan")'>
                    <option value="">--select--</option>
                    {foreach from=$PRODFIELDLIST item=fldCaption key=fieldId}
                        <option value="{$fieldId}">{$fldCaption}</option>
                    {/foreach}
                </select>
                <input type="text" id="productMapSpan" name="productMapSpan" />
                <br>
                <b>Get Customer Field Map</b>
                <select name="customerMap" id="customerMap" onchange='updateMapSpan(this, "customerMapSpan")'>
                    <option value="">--select--</option>
                    {foreach from=$ACCFIELDLIST item=fldCaption key=fieldId}    
                        <option value="{$fieldId}">{$fldCaption}</option>
                    {/foreach}
                </select>
                <input type="text" id="customerMapSpan" name="customerMapSpan" />
            </div>
            <div id="spn_emailMessage" style="display:none">
                <textarea name="email_message" id='email_message'style="width:90%;height:200px" class=small tabindex="5">{$notification_detail['message']}</textarea>
            </div>
            <div id="spn_smsMessage" style="display:block">
                <textarea name="sms_message" id='sms_message'style="width:90%;height:200px" class=small tabindex="5" maxlength='120' onkeyup="checkcounter();">{$notification_detail['message']}</textarea>
                <br/><span id="spn_charCounter"></span>
            </div>
        </div>
    </div>
    <div class="row"> 
        <div class="col">
            <label class="control-label"><b><u>Select Product or Customer</u></b></label>                             
                <input type="radio" name="prodorcustomer"  id="rad_product" value="product" onclick="notification_productlistshow()" {if $notification_detail['product_customer'] eq 'P'}checked{/if}>Product &nbsp;
                <input type="radio" name="prodorcustomer"  id="rad_customer" value="customer" onclick="notification_customerlistshow()" {if $notification_detail['product_customer'] eq 'C'}checked{/if}>Customer &nbsp;
        </div>
    </div>
    <div class="row">
        <div id="notification_datatable_productlist" style="display:none;"  class="col">
            <div class="panel panel-warning">
                <div class="panel-heading"><b>Product List</b></div>
                <div class="panel-body">{include file='NotificationTemplates/notification_productlist.tpl'}</div>
            </div>    
        </div>
    </div>
    <div class="row">
        <div id="notification_datatable_customerlist" style="display:none;"  class="col">
            <div class="panel panel-warning">
                <div class="panel-heading"><b>Customer List</b></div>
                <div class="panel-body">{include file='NotificationTemplates/notification_customerlist.tpl'}</div>
            </div>    
        </div>
    </div>   
    <div class="row"> 
        <div class="col">
            <input type="hidden" name="notificationid" id="notificationid" value="{$notificationid}">
            <input type="button" id="btn_notification_save" value="Save Notification" class="btn btn-outline-warning btn-sm"  onclick="return notification_save();" title="Save Notification">
        </div>
    </div>
</div>
<script type="text/javascript" src="include/fckeditor/fckeditor.js"></script>
<script type="text/javascript">

var oFCKeditor = null;

oFCKeditor = new FCKeditor( "email_message" ) ;

oFCKeditor.BasePath   = "include/fckeditor/" ;
oFCKeditor.ReplaceTextarea() ;

if("{$notification_detail['product_customer']}" == 'P')
{
    notification_productlistshow();
}
else if("{$notification_detail['product_customer']}" == 'C')
{
    notification_customerlistshow();
}
</script>