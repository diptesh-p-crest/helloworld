//Add jq code in this file

jq(document).ready(function(){        
    
});

function check_numeric(inputVal)
{
    var patt = /^\d+$/i;
    return patt.test(inputVal);
}

function search_notification(optionVal)
{
    datatable_postdata = {};
        
    if(optionVal != 'showall')
    {
        var notificationname = jq.trim(jq('#srch_notificationname').val());
        var trigger_type = jq.trim(jq('#srch_trigger_type').val());
        var trigger_on = jq.trim(jq('#srch_trigger_on').val());
        var trigger_for   = jq.trim(jq('#srch_trigger_for').val());
        
        if(notificationname == '' && trigger_type == '' && trigger_on == '' && trigger_for == '')
        {
            alert("Please enter search value");
            return false;
        }
        
        datatable_postdata.notificationname = notificationname;
        datatable_postdata.trigger_type = trigger_type;
        datatable_postdata.trigger_on = trigger_on;
        datatable_postdata.trigger_for = trigger_for;        
    }
    
    get_notification_datatable(datatable_postdata);    
}

function SMSConfig()
{
    jq("#status").show();
    jq('#notification_tab li').each(function(index, ele) {
        jq(this).removeClass('active');
    });
    jq('#li_notification_smsconfig').addClass('active');
    
    jq.ajax({
        type: "POST",
        url: "index.php?module=Settings&action=SettingsAjax&file=notification_ajax_action&ajax=true&maintask=sms_config",
        data: '',
        success: function(response) {
            jq("#status").hide();
            jq('#notification_data').html(response);

            get_SMSConfig_datatable();
        }
    });
}

function get_SMSConfig_datatable()
{
    var datatable_postdata = {}
    if (jq.fn.dataTable.isDataTable('#smsconfig_list_datatable_grid'))
    {
        jq('#smsconfig_list_datatable_grid').DataTable().destroy();
    }

    jq('#smsconfig_list_datatable_grid').DataTable({
        "processing": true,
        "serverSide": true,
        "bStateSave": true,
        "searching": false,
        "pagingType": "full_numbers",
        "order": [[0, 'asc']],
        "iDisplayLength":15,
        "lengthMenu": [[5,15,25,50,100], [5,15,25,50,100]],
        "language": {
            "emptyTable": "No SMS Config Found!",
        },
        "columnDefs": [
            {"orderable": false, "targets": [4]}
        ],
        "ajax": {
            url: "index.php?module=Settings&action=SettingsAjax&file=notification_ajax_action&ajax=true&maintask=sms_config_datatable",
            type: "post",
            data: datatable_postdata,
            dataFilter: function(data){
                var newData = JSON.parse(data);
                jq("#orderby").val(newData.orderBycond);
                jq("#all_ids").val(newData.all_ids);
                return  data;
            },
            error: function() {

            }
        },
        "rowCallback": function(row, data, dataIndex){
        },
        drawCallback: function(settings) {
            var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
            pagination.toggle(this.api().page.info().pages > 1);
        }
    });
}

function smsconfig_save()
{
    var accountid = jq.trim(jq('#accountid').val());
    var key = jq.trim(jq('#key').val());
    var phonenumber = jq.trim(jq('#phonenumber').val());
    var smsconfigid = jq('#smsconfigid').val();
    var activeInactive = jq('#activeInactive').val();

     
    if(accountid == '')
    {
        alert('Please enter Account ID');
        jq('#accountid').focus();
        return false;
    }
    else if(key == '')
    {
        alert('Please enter Key');
        jq('#key').focus();
        return false;
    }
    else if(phonenumber == '' || !check_numeric(phonenumber) || phonenumber.length > 10 || phonenumber.length < 10)
    {
        alert('Please enter 10 digit numeric value for Phone Number');
        jq('#phonenumber').focus();
        return false;
    }
    
    if(activeInactive == "Y")
    {
        if(!confirm("It will make all other entries 'InActive' to make this entry 'Active'.\n Are you Sure?"))
        {
            return false;
        }
    }
      
    jq("#status").show();
    var postdata = 'maintask=smsconfig_save&accountid='+accountid+'&key='+key+'&phonenumber='+phonenumber+'&activeInactive='+activeInactive+'&smsconfigid='+smsconfigid;

    jq.ajax({
        type: "POST",
        url: "index.php?module=Settings&action=SettingsAjax&file=notification_ajax_action",
        data: postdata,
        success: function(response) {
            jq("#status").hide();
            SMSConfig();
        }
    });
}

function delete_smsconfig(smsconfigid)
{
    if(confirm("Are you sure?"))
    {
        jq("#status").show();
        var postdata = 'maintask=delete_smsconfig&smsconfigid='+smsconfigid;

        jq.ajax({
            type: "POST",
            url: "index.php?module=Settings&action=SettingsAjax&file=notification_ajax_action",
            data: postdata,
            success: function(response) {
                jq("#status").hide();
                SMSConfig();
            }
        });
    }
    else
    {
        return false;
    }
}

function update_smsconfig(smsconfigid,accountid,key,phonenumber,active)
{
    jq('#accountid').val(accountid);
    jq('#key').val(key);
    jq('#phonenumber').val(phonenumber);
    jq('#smsconfigid').val(smsconfigid);
    jq('#activeInactive').val(active);
}

function smsconfig_clear()
{
    jq('#accountid').val('');
    jq('#key').val('');
    jq('#phonenumber').val('');
    jq('#smsconfigid').val('');
    jq('#activeInactive').val("Y");
}

function notification_customerlistshow(postdata = {})
{
    jq('#notification_datatable_productlist').hide();
    jq('#notification_datatable_customerlist').show();
    var customeridjson =  JSON.stringify(jq.trim(jq('#customeridjson').val()));

	postdata.customeridjson = jq('#customeridjson').val();

	var currentpage = parseInt(jq('#currentpage').val());

    if (jq.fn.dataTable.isDataTable('#notification_customer_datatable_grid'))
    {
        jq('#notification_customer_datatable_grid').DataTable().destroy();
    }

    jq('#notification_customer_datatable_grid').DataTable( {
        "processing": true,
        "serverSide": true,
        "searching": false,
        "bDestroy":true,
        "displayStart":currentpage,
        "pagingType": "full_numbers",
        "order": [[1, 'asc']],
        "iDisplayLength":15,
        "lengthMenu": [[5,15,25,50,100], [5,15,25,50,100]],
        "language": {
            "emptyTable": "No customer found!",
        },
        "columnDefs": [
            {"orderable": false, "targets": [0,1]}
        ],
        "ajax":{
            url :"index.php?module=Settings&action=SettingsAjax&file=notification_ajax_action&maintask=display_customerlist",
            data: postdata,
            type: "post",
            error: function(){
            }
        },
        "rowCallback": function(row, data, dataIndex){ // preserve checkbox
                    var rowId = jq(row).find('input[name^="check"]').val();
                    var id_list = new Array();
                    id_list_arr_from_json = get_rows_selected_notification('selected_record_notification_customer_datatable_json');
                    if(jq.isArray(id_list_arr_from_json) && id_list_arr_from_json.length > 0){
                        id_list = id_list_arr_from_json;
                    }
                    if(jq.inArray(rowId, id_list) !== -1){
                        jq(row).addClass('selected');
                    }
                },
        "drawCallback": function(settings) {
                    var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                    pagination.toggle(this.api().page.info().pages > 1);
                    jq('#notification_customer_datatable_grid').DataTable().on('draw', function(){
                        make_checked_selected_checkbox_datatable_notification('selected_record_notification_customer_datatable_json','customer_check_all','notification_customer_list_checkbox');
                    });
                    
                    if(jq("#selected_record_notification_customer_datatable_json").val().length > 0)
                    {
                        var all_custom_attribute = JSON.parse(jq("#selected_record_notification_customer_datatable_json").val());
                        
                        jq.each(all_custom_attribute, function (key,val) 
                        {
                            if(jq('#div_selected_checkbox_button_'+key).length == 0)
                            {
                                var checkbox_id = 'check_'+key;
                                var button_html = ' <div class="btn-group buttongroupselected" id="div_selected_checkbox_button_'+key+'">';
                                button_html += '<button type="button" class="btn btn-warning btn-sm">'+val.accountnumber+'</button>';
                                button_html += '<button type="button" class="btn btn-danger" title="Delete Selected" onclick="remove_selected_checkbox_datatable_notification(\''+key+'\',\''+checkbox_id+'\',\'selected_record_notification_customer_datatable_json\',\'selected_notification_customer_buttonlist\',\'customer_check_all\',\'notification_customer_list_checkbox\');"><span class="glyphicon glyphicon-trash"></span></button></div> ';

                                jq('#selected_notification_customer_buttonlist').append(button_html);
                            }
                           
                        });
                    }  
                    
                    jq("#notification_edit_modal").animate({ scrollTop: jq(window).height() }, 1000);
                }
    } );

    jq('#notification_customer_datatable_grid tbody').on('click', 'input[type="checkbox"]', function(e) {  // preserve checkbox
        var $row = jq(this).closest('tr');
        if (this.checked)
        {
            jq(this).closest('tr').addClass('selected');
        }
        else
        {
            jq(this).closest('tr').removeClass('selected');
        }

    });

    jq('#notification_customer_datatable_grid').on('click', 'tbody td, thead th:first-child', function(e){
       if(e.target.nodeName == "TD")
       {
        jq(this).parent().find('input[type="checkbox"]').trigger('click');
       }
   });


    jq('thead input[name="customer_check_all"]', jq('#notification_customer_datatable_grid').DataTable().table().container()).on('click', function(e){
      if(this.checked){
         jq('#notification_customer_datatable_grid tbody input[type="checkbox"]:not(:checked)').trigger('click').closest('tr').addClass('selected');
      } else {
         jq('#notification_customer_datatable_grid tbody input[type="checkbox"]:checked').trigger('click').closest('tr').removeClass('selected');
      }
      e.stopPropagation();
   });


    jq('#notification_datatable_customerlist').show();    

}

function notification_productlistshow(postdata = {})
{
    jq('#notification_datatable_customerlist').hide();
    jq('#notification_datatable_productlist').show(); 
    
    var productidjson =  JSON.stringify(jq.trim(jq('#productidjson').val()));

	postdata.productidjson = jq('#productidjson').val();

	var currentpage = parseInt(jq('#currentpage').val());

    if (jq.fn.dataTable.isDataTable('#notification_product_datatable_grid'))
    {
        jq('#notification_product_datatable_grid').DataTable().destroy();
    }

    jq('#notification_product_datatable_grid').DataTable( {
        "processing": true,
        "serverSide": true,
        "searching": false,
        "bDestroy":true,
        "displayStart":currentpage,
        "pagingType": "full_numbers",
        "order": [[1, 'asc']],
        "iDisplayLength":15,
        "lengthMenu": [[5,15,25,50,100], [5,15,25,50,100]],
        "language": {
            "emptyTable": "No product found!",
        },
        "columnDefs": [
            {"orderable": false, "targets": [0,1]}
        ],
        "ajax":{
            url :"index.php?module=Settings&action=SettingsAjax&file=notification_ajax_action&maintask=display_productlist",
            data: postdata,
            type: "post",
            error: function(){
            }
        },
        "rowCallback": function(row, data, dataIndex){ // preserve checkbox
                    var rowId = jq(row).find('input[name^="check"]').val();
                    var id_list = new Array();
                    id_list_arr_from_json = get_rows_selected_notification('selected_record_notification_product_datatable_json');
                    if(jq.isArray(id_list_arr_from_json) && id_list_arr_from_json.length > 0){
                        id_list = id_list_arr_from_json;
                    }
                    if(jq.inArray(rowId, id_list) !== -1)
                    {
                        jq(row).addClass('selected'); 
                    }
                },
        "drawCallback": function(settings) {
                    var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                    pagination.toggle(this.api().page.info().pages > 1);
                    jq('#notification_product_datatable_grid').DataTable().on('draw', function(){
                        make_checked_selected_checkbox_datatable_notification('selected_record_notification_product_datatable_json','product_check_all','notification_list_checkbox');
                    });
                    
                    if(jq("#selected_record_notification_product_datatable_json").val().length > 0)
                    {
                        var all_custom_attribute = JSON.parse(jq("#selected_record_notification_product_datatable_json").val());
                        
                        jq.each(all_custom_attribute, function (key,val) 
                        {
                            if(jq('#div_selected_checkbox_button_'+key).length == 0)
                            {
                                var checkbox_id = 'check_'+key;
                                var button_html = ' <div class="btn-group buttongroupselected" id="div_selected_checkbox_button_'+key+'">';
                                button_html += '<button type="button" class="btn btn-warning btn-sm">'+val.productname+'</button>';
                                button_html += '<button type="button" class="btn btn-danger" title="Delete Selected" onclick="remove_selected_checkbox_datatable_notification(\''+key+'\',\''+checkbox_id+'\',\'selected_record_notification_product_datatable_json\',\'selected_notification_product_buttonlist\',\'product_check_all\',\'notification_list_checkbox\');"><span class="glyphicon glyphicon-trash"></span></button></div> ';

                                jq('#selected_notification_product_buttonlist').append(button_html);
                            }
                           
                        });
                    }
                    
                    jq("#notification_edit_modal").animate({ scrollTop: jq(window).height() }, 1000);
                }
    } );

    jq('#notification_product_datatable_grid tbody').on('click', 'input[type="checkbox"]', function(e) {  // preserve checkbox
        var $row = jq(this).closest('tr');
        if (this.checked)
        {
            jq(this).closest('tr').addClass('selected');
        }
        else
        {
            jq(this).closest('tr').removeClass('selected');
        }

    });

    jq('#notification_product_datatable_grid').on('click', 'tbody td, thead th:first-child', function(e){
       if(e.target.nodeName == "TD")
       {
        jq(this).parent().find('input[type="checkbox"]').trigger('click');
       }
   });


    jq('thead input[name="notification_check_all"]', jq('#notification_product_datatable_grid').DataTable().table().container()).on('click', function(e){
      if(this.checked){
         jq('#notification_product_datatable_grid tbody input[type="checkbox"]:not(:checked)').trigger('click').closest('tr').addClass('selected');
      } else {
         jq('#notification_product_datatable_grid tbody input[type="checkbox"]:checked').trigger('click').closest('tr').removeClass('selected');
      }
      e.stopPropagation();
   });


    jq('#notification_datatable_productlist').show();

}

function search_notification_products(optionVal)
{
    datatable_postdata = {};
        
    if(optionVal != 'showall')
    {
        var pname = jq.trim(jq('#search_product_name').val());
        var pnumber = jq.trim(jq('#search_product_number').val());
        
        if(pnumber == '' && pname == '')
        {
            alert("Please enter search parameters");
            return false;
        }
        
        datatable_postdata.search_product_name = pname;
        datatable_postdata.search_product_number = pnumber;
    }
    
    notification_productlistshow(datatable_postdata);   
}

function search_notification_customers(optionVal)
{
    datatable_postdata = {};
        
    if(optionVal != 'showall')
    {
        var cname = jq.trim(jq('#search_customer_name').val());
        var cnumber = jq.trim(jq('#search_customer_number').val());
        
        if(cname == '' && cnumber == '')
        {
            alert("Please enter search parameters");
            return false;
        }
        
        datatable_postdata.search_customer_name = cname;
        datatable_postdata.search_customer_number = cnumber;
    }
    
    notification_customerlistshow(datatable_postdata);   
}

function make_checked_selected_checkbox_datatable_notification(textarea_json_id,main_checkbox_id,individual_checkbox_classname)
{
    var encoded_data = jq.trim(jq('#'+textarea_json_id).val());

    if(encoded_data != '')
    {
        var json_obj = jq.parseJSON(encoded_data);

        jq('.'+individual_checkbox_classname).each(function(){

            var checkboxid = jq(this).attr('id');
            var selected_id = jq(this).val();
            if(json_obj[selected_id])
            {
                jq(this).prop('checked',true);
                jq(this).closest('tr').addClass('selected');

                jq.each(json_obj[selected_id], function (k,v) {

                    if(jq('#'+k+'_'+selected_id).length > 0)
                    {
                        jq('#'+k+'_'+selected_id).val(v);
                    }

                    jq('#'+checkboxid).data(k,v);
                })
            }
        });

        if (jq('.'+individual_checkbox_classname+':checked').length == jq('.'+individual_checkbox_classname).length )
        {
            jq("#"+main_checkbox_id).prop('checked', true);
        }
        else
        {
            jq("#"+main_checkbox_id).prop('checked', false);

        }
    }
}

function maintain_checkbox_datatable_notification(obj,textarea_json_id,div_id_selected_checkbox_buttonlist,main_checkbox_id,individual_checkbox_classname)
{
    var encoded_data = jq.trim(jq('#'+textarea_json_id).val());
    if(encoded_data != '')
    {
        var json_obj = jq.parseJSON(encoded_data);
    }
    else
    {
        var json_obj = {};
    }

    var selected_id = jq(obj).val();
    var chekbox_id = jq(obj).attr('id');
    if(obj.checked == true)
    {   
        jq(obj).closest('tr').addClass('selected');
        var tmp_obj = {};
        var all_custom_attribute = jq(obj).data();
        jq.each(all_custom_attribute, function (key,val) {

            if(key == 'selectedbuttoninfo')
            {
                if(jq('#div_selected_checkbox_button_'+selected_id).length == 0)
                {
                    var custom_dt_selected_info_val = val;

                        var button_html = ' <div class="btn-group buttongroupselected" id="div_selected_checkbox_button_'+selected_id+'">';
                        button_html += '<button type="button" class="btn btn-warning btn-sm">'+custom_dt_selected_info_val+'</button>';
                        button_html += '<button type="button" class="btn btn-danger" title="Delete Selected" onclick="remove_selected_checkbox_datatable_notification(\''+selected_id+'\',\''+chekbox_id+'\',\''+textarea_json_id+'\',\''+div_id_selected_checkbox_buttonlist+'\',\''+main_checkbox_id+'\',\''+individual_checkbox_classname+'\');"><span class="glyphicon glyphicon-trash"></span></button></div> ';

                    jq('#'+div_id_selected_checkbox_buttonlist).append(button_html);
                }
            }
            else
            {
                tmp_obj[key] = val;
            }

        });

        json_obj[selected_id] = tmp_obj;

        if(Object.keys(json_obj).length > 0)
        {
            var str = JSON.stringify(json_obj);
            jq('#'+textarea_json_id).val(str);
        }
        else
        {
            jq('#'+textarea_json_id).val('');
        }

        if (jq('.'+individual_checkbox_classname+':checked').length == jq('.'+individual_checkbox_classname).length )
        {
            jq("#"+main_checkbox_id).prop('checked', true);
        }

    }
    else
    {
        if (jq('.'+individual_checkbox_classname+':checked').length != jq('.'+individual_checkbox_classname).length )
        {
            jq("#"+main_checkbox_id).prop('checked', false);
            jq(obj).closest('tr').removeClass('selected');
        }


        if(jq('#div_selected_checkbox_button_'+selected_id).length > 0)
        {
            jq('#div_selected_checkbox_button_'+selected_id).remove();
        }


        delete json_obj[selected_id];


        if(Object.keys(json_obj).length > 0)
        {
            var str = JSON.stringify(json_obj);

            jq('#'+textarea_json_id).val(str);
        }
        else
        {
            jq('#'+textarea_json_id).val('');
        }
    }

    if(jq("#selected_record_datatable_json").length > 0)
    {
        if(jq("#selected_record_datatable_json").val() != "")
        {
            var selectedRowCnt = countObj(JSON.parse(jq("#selected_record_datatable_json").val()));
            
            if(jq("#selected_record_count").length > 0)
            {
                jq("#selected_record_count").html(selectedRowCnt);        
            }            
        }
        else
        {
            if(jq("#selected_record_count").length > 0)
            {
                jq("#selected_record_count").html("0");     
            }            
        }    
    }    
}

function remove_selected_checkbox_datatable_notification(pkvalue,individual_checkbox_id,textarea_json_id,div_id_selected_checkbox_buttonlist,main_checkbox_id,individual_checkbox_classname)
{
    var found_on_currentpage = false;
    jq('.'+individual_checkbox_classname).each(function(){
        if(jq(this).val() == pkvalue)
        {   jq(this).closest('tr').removeClass('selected');
            found_on_currentpage = true;
            this.checked = false;
            maintain_checkbox_datatable_notification(this,textarea_json_id,div_id_selected_checkbox_buttonlist,main_checkbox_id,individual_checkbox_classname);

        }
    });


    if(found_on_currentpage == false)
    {
        if(jq('#div_selected_checkbox_button_'+pkvalue).length > 0)
        {
            jq('#div_selected_checkbox_button_'+pkvalue).remove();
        }


        var encoded_data = jq.trim(jq('#'+textarea_json_id).val());
        if(encoded_data != '')
        {
            var json_obj = jq.parseJSON(encoded_data);
        }
        else
        {
            var json_obj = {};
        }

        delete json_obj[pkvalue];

        if(Object.keys(json_obj).length > 0)
        {
            var str = JSON.stringify(json_obj);
            jq('#'+textarea_json_id).val(str);
        }
        else
        {
            jq('#'+textarea_json_id).val('');
        }
    }
    
    if(jq("#selected_record_datatable_json").length > 0)
    {
        if(jq("#selected_record_datatable_json").val() != "")
        {
            var selectedRowCnt = countObj(JSON.parse(jq("#selected_record_datatable_json").val()));
            
            if(jq("#selected_record_count").length > 0)
            {
                jq("#selected_record_count").html(selectedRowCnt);        
            }            
        }
        else
        {
            if(jq("#selected_record_count").length > 0)
            {
                jq("#selected_record_count").html("0");
            }            
        }    
    }    
}

function notification_checkduplicate()
{
    var notificationname = jq.trim(jq('#notificationname').val());
    var hdn_notificationname = jq.trim(jq('#hdn_notificationname').val());
    var notificationid = jq('#notificationid').val();
    var responseVal = true;
    if(notificationname != '' && notificationname != hdn_notificationname)
    {
        jq("#status").show();
        var postdata = 'notificationname='+notificationname+'&notificationid='+notificationid;
            jq.ajax({
                type: "POST",
                url: "index.php?module=Settings&action=SettingsAjax&file=notification_ajax_action&maintask=notification_checkduplicate",
                data: postdata,
                async: false,
                success: function(response) 
                {
                    jq("#status").hide();
                    if(response > 0)
                    {
                        responseVal = false;
                        alert("Notification Name already exists");
                        return responseVal;
                    }
                }
            });
    }
    
    return responseVal;
}

function close_notification_modal()
{
    jq('#notification_edit_modal').modal('hide');

    jq('#notification_tab li').each(function(index, ele) {
        jq(this).removeClass('active');
    });
    jq('#li_notificationlist').addClass('active');
}

function htmlEntities_replace(str) 
{
    return String(str).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/\\/g, '');
}

function notification_save()
{
    if(notification_checkduplicate())
    {    
        var notificationname = jq.trim(jq('#notificationname').val());
        var trigger_type = jq.trim(jq('#trigger_type').val());
        var trigger_on = jq.trim(jq('#trigger_on').val());
        var trigger_for   = jq.trim(jq('#trigger_for').val());
        var trigger_when_value = jq('#trigger_when_value').val();
        var trigger_when_option = jq('#trigger_when_option').val();
        
        if(trigger_type != 'email')
            var message = jq('#sms_message').val();
        else
            var message = FCKeditorAPI.GetInstance('email_message').GetXHTML();
        
        var notificationid = jq('#notificationid').val();
        var strdate = jq('#hdnstrdate').val();
        var enddate = jq('#hdnenddate').val();
        
        if(notificationname == '')
        {
            alert('Please enter Notification Name');
            jq('#notificationname').focus();
            return false;
        }
        else if(trigger_type == '')
        {
            alert('Please Select Trigger Type');
            jq('#trigger_type').focus();
            return false;
        }
        else if(trigger_on == '')
        {
            alert('Please Select Trigger On');
            jq('#trigger_on').focus();
            return false;
        }
        else if(message  == '')
        {
            alert('Please Enter a message in text area which will use while sending email and SMS');
            jq('#message').focus();
            return false;
        }
        
        
        if(trigger_type == 'sms')
        {
            var stripped_message = htmlEntities_replace(message.replace(/<[^>]+>/img, ""));
            if(String(stripped_message).length > 120)
            {
                alert("Message limit for SMS type is 120 characters only");
                jq('#sms_message').focus();
                return false;
            }
        }
        
        if(trigger_when_value != '' || trigger_when_option != '')
        {
            var patt = /^\d+$/i;
            if(trigger_when_option == 'immediately' && jq.trim(jq('#trigger_when_value').val()) != "" && jq.trim(jq('#trigger_when_value').val()) != "0")
            {
                jq('#trigger_when_value').val('');
                alert("Please leave blank for 'Immediately' option");
                jq('#trigger_when_value').focus();
                return false;
            }
            if(trigger_when_option != 'immediately' && (jq.trim(jq('#trigger_when_value').val()) == "" || jq.trim(jq('#trigger_when_value').val()) == "0" || !check_numeric(jq('#trigger_when_value').val())))
            {
                alert("Please enter Numeric value for option other than 'Immediately' in Trigger When field.");
                jq('#trigger_when_value').focus();
                return false;
            }
        }
        else
        {
            alert("Please select appropriate Trigger When");
            jq('#trigger_when_value').focus();
            return false;
        }
        
        if(!jq("#rad_product").is(":checked") && !jq("#rad_customer").is(":checked"))
        {
            alert("Please select Related Product or Customer");
            return false;
        }
        
        if(jq("#rad_product").is(":checked") && jq('#selected_record_notification_product_datatable_json').val() == "")
        {
            alert("Please select Products");
            return false;
        }   

        if(jq("#rad_customer").is(":checked") && jq('#selected_record_notification_customer_datatable_json').val() == "")
        {
            alert("Please select Customers");
            return false;
        }
        
        var optionVal = "";
        if(jq("#rad_product").is(":checked"))
        {
            var selected_products = jq('#selected_record_notification_product_datatable_json').val();
            var selected_customers = "";
            optionVal = 'products';
        }
        else if(jq("#rad_customer").is(":checked"))
        {
            var selected_customers = jq('#selected_record_notification_customer_datatable_json').val();
            var selected_products = "";
            optionVal = 'customer';
        }
        
        if((strdate != "" && enddate == "") || (strdate == "" && enddate != ""))
        {
            alert("You need enter both Start and End Date OR leave both blank");
            return false;
        }
        else if(strdate != "" && enddate != "")
        {
            if(new Date(strdate) >= new Date(enddate))
            {
                alert("End Date should be greater than Start Date");
                return false;
            }
        }
        
        jq("#status").show();
        var postdata = 'maintask=notification_save&notificationname='+encodeURIComponent(notificationname)+'&trigger_type='+trigger_type+'&trigger_on='+trigger_on+'&trigger_for='+trigger_for+'&trigger_when_value='+trigger_when_value+'&trigger_when_option=' + trigger_when_option +'&message='+encodeURIComponent(message)+'&notificationid='+notificationid+'&optionVal='+optionVal+'&selected_products='+selected_products+'&selected_customers='+selected_customers+'&strdate='+strdate+'&enddate='+enddate;

        jq.ajax({
            type: "POST",
            url: "index.php?module=Settings&action=SettingsAjax&file=notification_ajax_action",
            data: postdata,
            success: function(response) {
                jq("#status").hide();
                close_notification_modal();
                get_notification();
            }
        });
    }
}

function add_edit_notification(notificationid)
{
    jq('#notification_tab li').each(function(index, ele) {
        jq(this).removeClass('active');
    });
    jq('#li_notification').addClass('active');

    var postdata = 'notificationid=' + notificationid;
    jq("#status").show();
    jq.ajax({
        type: "POST",
        url: "index.php?module=Settings&action=SettingsAjax&file=notification_add_edit&ajax=true",
        data: postdata,
        success: function(response) {

            if (notificationid != '')
            {
                jq('#notification_edit_data').empty().html(response);
                jq('#notification_edit_modal_title').html('Update Notification');

                jq('#notification_edit_modal').modal({
                    backdrop: 'static'
                });

                jq('#notification_edit_modal').on('shown.bs.modal', function() {
                    jq(this).find('.modal-dialog').css({width:'auto',height:'auto'});
                    jq(this).css({'padding-left':'17px'});
                    jq('#notificationname').focus();
                });
                showHideFCKEditor(jq("#trigger_type").val());
            }
            else
            {
                jq('#notification_data').empty().html(response);
                jq('#notificationname').focus();
            }

            jq("#status").hide();

        }
    });    
    
}

function get_notification()
{
    jq("#status").show();
    jq('#notification_tab li').each(function(index, ele) {
        jq(this).removeClass('active');
    });
    jq('#li_notificationlist').addClass('active');
    
    jq.ajax({
        type: "POST",
        url: "index.php?module=Settings&action=SettingsAjax&file=notification_ajax_action&ajax=true&maintask=notification_table",
        data: '',
        success: function(response) {
            jq("#status").hide();
            jq('#notification_data').html(response);

            get_notification_datatable();

        }
    });
}

function notification_customsearch_filter_data_object()
{
    var datatable_postdata = {}

    var custom_searchtype  = jq.trim(jq('#custom_searchtype').val());

    if(custom_searchtype != '' && custom_searchtype == 'basicsearch')
    {
        datatable_postdata.custom_searchtype = custom_searchtype;
        datatable_postdata.custom_basic_searchstring = jq.trim(jq('#custom_basic_searchstring').val());
        datatable_postdata.custom_basicsearch_fieldname = jq.trim(jq('#custom_basicsearch_fieldname').val());

        if(jq('#custom_basicsearch_beginwith').prop('checked') == true)
        {
            datatable_postdata.custom_basicsearch_option = jq.trim(jq('#custom_basicsearch_beginwith').val());
        }
        else
        {
            datatable_postdata.custom_basicsearch_option = jq.trim(jq('#custom_basicsearch_exactmatch').val());
        }
    }
    else if(custom_searchtype != '' && custom_searchtype == 'advancesearch')
    {
        datatable_postdata.custom_searchtype = custom_searchtype;
        if(jq('#custom_advancesearch_match_all').prop('checked') == true)
        {
            datatable_postdata.custom_advancesearch_option = jq.trim(jq('#custom_advancesearch_match_all').val());
        }
        else
        {
            datatable_postdata.custom_advancesearch_option = jq.trim(jq('#custom_advancesearch_match_any').val());
        }

        var custom_advancesearch_filter_counter = jq('#custom_advancesearch_filter_counter').val();

        var advancesearch_obj = {};

        var cnt = 0;
        for(var i = 1;i <= custom_advancesearch_filter_counter;i++)
        {
            if(jq('#custom_advancesearch_fieldname_'+i).length > 0)
            {
                var tmp_obj = {};
                tmp_obj.custom_advancesearch_fieldname = jq('#custom_advancesearch_fieldname_'+i).val();
                tmp_obj.custom_advancesearch_matching_filter = jq('#custom_advancesearch_matching_filter_'+i).val();
                tmp_obj.custom_advancesearch_searchstring = jq.trim(jq('#custom_advancesearch_searchstring_'+i).val());

                advancesearch_obj[cnt] = tmp_obj;
                cnt++;
            }
        }

        if(Object.keys(advancesearch_obj).length > 0)
        {
            datatable_postdata.advancesearchdata = advancesearch_obj;
        }
    }

    return datatable_postdata;
}

function get_notification_datatable(datatable_postdata = {})
{
    if (jq.fn.dataTable.isDataTable('#notification_list_datatable_grid'))
    {
        jq('#notification_list_datatable_grid').DataTable().destroy();
    }

    jq('#notification_list_datatable_grid').DataTable({
                "processing": true,
                "serverSide": true,
                "bStateSave": true,
                "searching": false,
                "pagingType": "full_numbers",
                "order": [[1, 'asc']],
                "iDisplayLength":15,
                "lengthMenu": [[5,15,25,50,100], [5,15,25,50,100]],
                "language": {
                    "emptyTable": "No Notification Found!",
                },
                "columnDefs": [
                    {"orderable": false, "targets": [0,5]}
                ],
                "ajax": {
                    url: "index.php?module=Settings&action=SettingsAjax&file=notification_ajax_action&ajax=true&maintask=notification_datatable",
                    type: "post",
                    data: datatable_postdata,
					dataFilter: function(data){
						var newData = JSON.parse(data);
						jq("#orderby").val(newData.orderBycond);
						jq("#where_export").val(newData.where_export);
						jq("#all_ids").val(newData.all_ids);
                        if(newData.all_ids == null)
                        {
                           jq("#check_all_notification").attr('disabled', true); 
                           jq("#check_all_notification").attr('checked', false);
                        }
                        else
                        {
                            jq("#check_all_notification").attr('disabled', false); 
                        }
						return  data;
					},
                    error: function() {

                    }
                },
                "rowCallback": function(row, data, dataIndex){
                },
                drawCallback: function(settings) {
                    var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                    pagination.toggle(this.api().page.info().pages > 1);
                   jq('#notification_list_datatable_grid').DataTable().on('draw', function(){
                        make_checked_selected_checkbox_datatable_notification('selected_record_datatable_json','check_all_notification','notification_checkbox');
                    });
                }
            });
}

function maintain_notification_checkbox_datatable(obj,textarea_json_id,div_id_selected_checkbox_buttonlist,main_checkbox_id,individual_checkbox_classname)
{
    var encoded_data = jq.trim(jq('#'+textarea_json_id).val());
    if(encoded_data != '')
    {
        var json_obj = jq.parseJSON(encoded_data);
    }
    else
    {
        var json_obj = {};
    }

    var selected_id = jq(obj).val();
    var chekbox_id = jq(obj).attr('id');
    if(obj.checked == true)
    {   jq(obj).closest('tr').addClass('selected');
        var tmp_obj = {};
        var all_custom_attribute = jq(obj).data();

        jq.each(all_custom_attribute, function (key,val) {
            if(key == 'selectedbuttoninfo')
            {
                if(jq('#div_selected_checkbox_button_'+selected_id).length == 0)
                {
                    var custom_dt_selected_info_val = val;

                        var button_html = ' <div class="btn-group buttongroupselected" id="div_selected_checkbox_button_'+selected_id+'">';
                        button_html += '<button type="button" class="btn btn-warning btn-sm">'+custom_dt_selected_info_val+'</button>';
                        button_html += '<button type="button" class="btn btn-danger" title="Delete Selected" onclick="remove_selected_checkbox_datatable_notification(\''+selected_id+'\',\''+chekbox_id+'\',\''+textarea_json_id+'\',\''+div_id_selected_checkbox_buttonlist+'\',\''+main_checkbox_id+'\',\''+individual_checkbox_classname+'\');"><span class="glyphicon glyphicon-trash"></span></button></div> ';

                    jq('#'+div_id_selected_checkbox_buttonlist).append(button_html);
                }
            }
            else
            {
                tmp_obj[key] = val;
            }

        });

        json_obj[selected_id] = tmp_obj;

        if(Object.keys(json_obj).length > 0)
        {
            var str = JSON.stringify(json_obj);
            jq('#'+textarea_json_id).val(str);
        }
        else
        {
            jq('#'+textarea_json_id).val('');
        }

        if (jq('.'+individual_checkbox_classname+':checked').length == jq('.'+individual_checkbox_classname).length )
        {
            jq("#"+main_checkbox_id).prop('checked', true);
        }

    }
    else
    {
        if (jq('.'+individual_checkbox_classname+':checked').length != jq('.'+individual_checkbox_classname).length )
        {
            jq("#"+main_checkbox_id).prop('checked', false);
            jq(obj).closest('tr').removeClass('selected');
        }


        if(jq('#div_selected_checkbox_button_'+selected_id).length > 0)
        {
            jq('#div_selected_checkbox_button_'+selected_id).remove();
        }


        delete json_obj[selected_id];


        if(Object.keys(json_obj).length > 0)
        {
            var str = JSON.stringify(json_obj);

            jq('#'+textarea_json_id).val(str);
        }
        else
        {
            jq('#'+textarea_json_id).val('');
        }
    }

    if(jq("#selected_record_datatable_json").length > 0)
    {
        if(jq("#selected_record_datatable_json").val() != "")
        {
            var selectedRowCnt = countObj(JSON.parse(jq("#selected_record_datatable_json").val()));
            
            if(jq("#selected_record_count").length > 0)
            {
                jq("#selected_record_count").html(selectedRowCnt);        
            }            
        }
        else
        {
            if(jq("#selected_record_count").length > 0)
            {
                jq("#selected_record_count").html("0");     
            }            
        }    
    }   
}

function get_rows_selected_notification(id)
{
    var rows_selected=[];
    if(jq('#'+id).val().length && jq('#'+id).val()!=undefined)
    {
        var encoded_data = jq.trim(jq('#'+id).val());
        if(encoded_data != '')
        {
           var json_obj = jq.parseJSON(encoded_data);
           jq.each(json_obj, function (key,val) {
               if (jq.inArray(key, rows_selected) === -1)
               {
                    rows_selected.push(key);
                }
           });
           return rows_selected;
        }

    }
    return false;
}

function delete_notification(notificationid)
{
    var notificationid_list = new Array();
    id_list_arr_from_json = get_rows_selected_notification('selected_record_datatable_json');
    if(jq.isArray(id_list_arr_from_json) && id_list_arr_from_json.length > 0)
    {
        notificationid_list = id_list_arr_from_json;
    }

    if (notificationid_list.length > 0 || notificationid != '')
    {

        result = confirm('Are you sure want to delete this notification?');
        if(result)
        {
            if (jq.inArray(notificationid, notificationid_list) === -1) 
            {
                notificationid_list.push(notificationid);
            }

            //Logic to go previous page if last page all record delete
            var info = jq('#notification_list_datatable_grid').DataTable().page.info();
            var currentpage = info.page;
            var load_prev_page = false;
            if (currentpage != 0)
            {
                var lastpage_record = info.end - info.start;
                var deleted_record = notificationid_list.length;
                if (deleted_record >= lastpage_record)
                {
                    load_prev_page = true;
                }
            }

            jq("#status").show();
            jq.ajax({
                type: "POST",
                url: "index.php?module=Settings&action=SettingsAjax&file=notification_ajax_action&maintask=notification_delete",
                data: 'notificationid_list=' + notificationid_list,
                success: function(response) 
                {
                        if(notificationid_list.length > 0)
                        {
                            jq.each(notificationid_list, function( index, id ) {
                                remove_selected_checkbox_datatable_notification(id,'check_'+id,'selected_record_datatable_json','selected_product_buttonlist','check_all','notification_checkbox');
                            });
                        }

                    jq("#status").hide();

                    if (load_prev_page == true)
                    {
                        jq('#notification_list_datatable_grid').DataTable().page(currentpage - 1).draw(false);
                    }
                    else
                    {
                        jq('#notification_list_datatable_grid').DataTable().ajax.reload(null, false); //paging is not reset on reload
                    }
                }
            });
        }
    }
    else
    {
        alert('Select any checkbox to delete notification');
        jq('#check_all').focus();
        return false;
    }
}

function custom_basicsearch_run_by_enter_key_notification(custom_search_callfrom,e)
{
    if(e.keyCode ===13)
    {
        custom_basicsearch_run_notification(custom_search_callfrom,'basicsearch');
    }
}

function custom_basicsearch_run_notification(custom_search_callfrom,custom_searchtype)
{
    if(custom_searchtype == 'basicsearch')
    {
        var custom_basic_searchstring  = jq.trim(jq('#custom_basic_searchstring').val());
        if(custom_basic_searchstring == '')
        {
            alert('Enter Search keyword!');
            jq('#custom_basic_searchstring').focus();
            return false;
        }
    }

    jq('#custom_searchtype').val(custom_searchtype);
    window[custom_search_callfrom]();
}

function custom_basicsearch_display_all_notification(custom_search_callfrom)
{   
    window[custom_search_callfrom]();
}

function check_all_datatable_notification(textarea_json_id,div_id_selected_checkbox_buttonlist,main_checkbox_id,individual_checkbox_classname)
{
    var check_status = jq('#'+main_checkbox_id).prop('checked');

    jq('.'+individual_checkbox_classname).each(function(){
        
        if(jq(this).prop('disabled') == false)
        {
            this.checked = check_status;
            maintain_checkbox_datatable_notification(this,textarea_json_id,div_id_selected_checkbox_buttonlist,main_checkbox_id,individual_checkbox_classname);
        }
        
    });

}

function updateMapSpan(obj, textID)
{
    if(jq(obj).val() != '')
    {
        jq("#"+textID).val("{{"+jq(obj).val()+"}}");
    }
    else
    {
        jq("#"+textID).val("");
    }
}

function showHideFCKEditor(optionVal)
{
    if(optionVal != 'email')
    {
        jq("#spn_smsMessage").show();
        jq("#spn_emailMessage").hide();
    }
    else
    { 
        jq("#spn_smsMessage").hide();
        jq("#spn_emailMessage").show();
    }
}

function checkcounter() 
{
    max = jq('#sms_message').attr("maxlength");
    var len = jq('#sms_message').val().length;
    if (len >= max)
    {
        jq('#spn_charCounter').text('you have reached the limit');
    } 
    else 
    {
        var char = max - len;
        jq('#spn_charCounter').text(char + ' characters left');
    }
}

function clear_form_elements(idVal) 
{
  jq("#"+idVal).find(':input').each(function() {
    switch(this.type) {
        case 'password':
        case 'text':
        case 'textarea':
        case 'file':
        case 'select-one':
        case 'select-multiple':
        case 'date':
        case 'number':
        case 'tel':
        case 'email':
            jq(this).val('');
            break;
        case 'checkbox':
        case 'radio':
            this.checked = false;
            break;
    }
  });
}