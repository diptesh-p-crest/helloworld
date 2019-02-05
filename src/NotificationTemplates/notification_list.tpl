{include file='NotificationTemplates/notification_common_custom_search.tpl'}
</br>
<table cellpadding="5" cellspacing="1" width="100%" class="table table-bordered">    
        <tr>
            <th width="10%"><b>Selected Notification:</b></th>
            <th width="90%">
                <div id="selected_product_buttonlist"></div>
            </th>
        </tr>
</table>        
<table id="notification_list_datatable_grid" cellpadding="5" cellspacing="1" class="table table-bordered">
    <thead>        
        <tr class="lvtCol">
            <th width="10%" align="center" class="donotsort">                
                <input type="checkbox" value="0" id="check_all" name="check_all" onclick="check_all_datatable_notification('selected_record_datatable_json','selected_product_buttonlist','check_all','notification_checkbox');">
            </th>            
            <th width="30%">Notification Name</th>
			<th width="20%">Trigger Type</th>    
			<th>Trigger On</th>    
            <th>Trigger For</th>
            <th class="donotsort">Action</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <td colspan="6">
                <input type="button" value="Delete Product Group" class="btn btn-outline-danger btn-sm" onclick="delete_notification('');">
                <textarea name="selected_record_datatable_json" id="selected_record_datatable_json" style="display:none;"></textarea>
            </td>
        </tr>
    </tfoot>
</table>

<div id="notification_edit_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">                
                <button type="button" class="close"  aria-hidden="true" onclick="close_notification_modal();">X</button>
                <h4 class="modal-title" id="notification_edit_modal_title">Update Notification</h4>
            </div>
            <div class="modal-body" id="notification_edit_data"></div>
        </div>
    </div>
</div>