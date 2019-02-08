<table id="notification_customer_datatable_grid" cellpadding="5" cellspacing="1" width="98%" class="table table-bordered">
    <thead>    
        <tr>
           <td><span class="moduleName" style="padding-left:10px">Search</span><br></td>
           <td colspan="2"><b>Customer# : </b><input type="text" name="search_customer_number" id="search_customer_number" value="">&nbsp;&nbsp;&nbsp;&nbsp;<b>Customer Name : </b><input type="text" name="search_customer_name" id="search_customer_name" value="">&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="Search" class="btn btn-outline-warning btn-sm"  onclick="return search_notification_customers('');" title="Search">&nbsp;<input type="button" value="Show All" class="btn btn-outline-warning btn-sm"  onclick="return search_notification_customers('showall');" title="Show All"></td>
        </tr>
        <tr>
            <th><b>Selected Customers:</b></th>
            <th colspan="2">
                <div id="selected_notification_customer_buttonlist"></div>
            </th>
        </tr>
        <tr class="lvtCol">
            <th width="2%" align="center" class="donotsort">
                <input type="checkbox" value="0" id="customer_check_all" name="customer_check_all" onclick="check_all_datatable_notification('selected_record_notification_customer_datatable_json','selected_notification_customer_buttonlist','customer_check_all','notification_customer_list_checkbox');">
            </th>            
            <th>Customer #</th>
            <th>Customer Name</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <td colspan="3">                    
                <input type="hidden" id="currentpage" name="currentpage" value="0">
                <textarea name="selected_record_notification_customer_datatable_json" id="selected_record_notification_customer_datatable_json" style="display:none;">{$notification_detail['selected_customers']}</textarea>
            </td>
        </tr>
    </tfoot>
</table>

