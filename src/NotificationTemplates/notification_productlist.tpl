<table id="notification_product_datatable_grid" cellpadding="5" cellspacing="1" width="98%" class="table table-bordered">
    <thead>
        <tr>
            <th><b>Selected Products:</b></th>
            <th colspan="2">
                <div id="selected_notification_product_buttonlist"></div>
            </th>
        </tr>
        <tr class="lvtCol">
            <th width="2%" align="center" class="donotsort">
                <input type="checkbox" value="0" id="product_check_all" name="product_check_all" onclick="check_all_datatable_notification('selected_record_notification_product_datatable_json','selected_notification_product_buttonlist','product_check_all','notification_list_checkbox');">
            </th>            
            <th>Product #</th>
            <th>Product Name</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <td colspan="3">                    
                <input type="hidden" id="currentpage" name="currentpage" value="0">
                <textarea name="selected_record_notification_product_datatable_json" id="selected_record_notification_product_datatable_json" style="display:none;">{$notification_detail['selected_products']}</textarea>
            </td>
        </tr>
    </tfoot>
</table>

