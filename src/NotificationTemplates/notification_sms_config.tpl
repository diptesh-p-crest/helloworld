<div class="form-horizontal">
    <div class="row">
        <div class="col">
            <label class="control-label" for="searchinput"><b>Account Id</b></label>
            <div class="">    
                <input type="text" class="form-control"  name="accountid" id="accountid" value="{$sms_config_detail['accountid']}">
            </div>
        </div>
        <div class="col">
            <label class="control-label" for="searchinput"><b>Key</b></label>
            <div class="">
                <input type="text" class="form-control" name="key" id="key" value="{$sms_config_detail['key']}">
            </div>
        </div> 
        <div class="col">
            <label class="control-label" for="searchinput"><b>Phone Number</b></label>
            <div class="">
                <input type="text" class="form-control"  name="phonenumber" id="phonenumber" value="{$sms_config_detail['phonenumber']}">
                <input type="hidden" name="hdn_phonenumber" id="hdn_phonenumber" value="{$sms_config_detail['phonenumber']}">
            </div>
        </div>
        <div class="col">
            <label class="control-label" for="searchinput"><b>Active/InActive</b></label>
            <div class="">
                <select name="activeInactive" id="activeInactive">
                    <option value="Y" {if $sms_config_detail['active'] eq 'Y' || $sms_config_detail['active'] eq ''}selected{/if}>Active</option>
                    <option value="N" {if $sms_config_detail['active'] eq 'N'}selected{/if}>InActive</option>
                </select>
            </div>
        </div>
    </div>   
    <div class="row"> 
        <div class="col">
            <input type="button" id="btn_smsconfig_save" value="Save" class="btn btn-outline-warning btn-sm"  onclick="return smsconfig_save();" title="Save">
            <input type="button" id="btn_smsconfig_clear" value="Clear" class="btn btn-outline-danger btn-sm"  onclick="return smsconfig_clear();" title="Clear">
            <input type="hidden" name="smsconfigid" id="smsconfigid" value="{$sms_config_detail['smsconfigid']}">
        </div>
    </div>
</div>
<table id="smsconfig_list_datatable_grid" cellpadding="5" cellspacing="1" class="table table-bordered">
    <thead>        
        <tr class="lvtCol">
            <th width="30%">Account Id</th>
			<th width="20%">Key</th>    
			<th>Phone number</th>    
            <th>Active / Inactive</th>
            <th class="donotsort">Action</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <td colspan="5">&nbsp;</td>
        </tr>
    </tfoot>
</table>
<script type="text/javascript">
</script>