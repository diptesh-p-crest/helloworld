<table id="notification_product_datatable_grid" cellpadding="5" cellspacing="1" width="98%" class="table table-bordered">
    <thead>
        <tr>
            <td><span class="moduleName" style="padding-left:10px">Search</span><br></td>
            <td colspan="2"><b>Product# : </b><input type="text" name="search_product_number" id="search_product_number" value="">&nbsp;&nbsp;&nbsp;&nbsp;<b>Product Name : </b><input type="text" name="search_product_name" id="search_product_name" value="">&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="Search" class="btn btn-outline-warning btn-sm"  onclick="return search_notification_products('');" title="Search">&nbsp;<input type="button" value="Show All" class="btn btn-outline-warning btn-sm"  onclick="return search_notification_products('showall');" title="Show All"></td>
        </tr>
        <tr>
            <th><b>Selected Products:</b></th>
            <th colspan="2">
                <div id="selected_notification_product_buttonlist"></div>
            </th>
        </tr>
        <tr class="lvtCol">
            <th style="width:22px;" class="donotsort">
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

