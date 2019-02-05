<div class="">
    <div style="margin: 0 auto;">
        <div id="custom_basicsearch">
            <table class="searchUIBasic table_separate" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td><span class="moduleName" style="padding-left:10px">Search</span><br></td>
                    <td><b>Search For :</b>&nbsp;<input type="text" name="custom_basic_searchstring" id="custom_basic_searchstring"  onkeypress="custom_basicsearch_run_by_enter_key_notification('{$custom_search_callfrom}',event);"></td>
                    <td>
                        <b>In :&nbsp;</b>
                            <select name="custom_basicsearch_fieldname" id="custom_basicsearch_fieldname">
                              {foreach from=$custom_search_option_array item=val key=k}
                                {if $val['display_in'] neq 'advancesearch'}
                                    <option value="{$val['fieldname']}" {if $val['default_selected'] eq 'yes'}selected{/if}>{$val['text']}</option>
                                {/if}
                              {/foreach}  
                            </select>
                    </td>
                    <td>
                        <input type="radio" name="custom_basicsearch_option" id="custom_basicsearch_beginwith" value="beginwith" checked><b>Begins With</b>
                        <input type="radio" name="custom_basicsearch_option" id="custom_basicsearch_exactmatch" value="exactmatch"> <b>Exact Match</b>
                    </td>

                    
                    {if $smarty.request.file eq 'uomqtypricing_ajax_action'}
                    <td>
                        <b>UOM TYPE:</b>
                        <select name="uomtype" id="uomtype" onchange="get_productlist_datatable()">
                            {{$uomtype_option}}
                        </select>
                    </td>
                    {/if}

                    <td>
                        <input type="button" id="custom_basicsearch_run_search"  value="Search Now" class="btn btn-outline-dark btn-sm" onclick="custom_basicsearch_run_notification('{$custom_search_callfrom}','basicsearch')">
                        
                        <input type="button" id="custom_basicsearch_run_all" value="Show All" class="btn btn-outline-dark btn-sm" onclick="custom_basicsearch_display_all_notification('{$custom_search_callfrom}')">
                    </td>
                </tr>  
                
                <tr>
                    <td colspan="8" class="small" align="center">
                        <table border="0" cellspacing="0" cellpadding="0" width="100%" class="">
                            <tr>
                                {$custom_alphabetical_search_data}
                            </tr>
                        </table>                        
                    </td>
                </tr>    
            </table>    
        </div>

        <div id="custom_advancesearch" style="display:none;">
            <table class="searchUIBasic table_separate" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td valign="top"><span class="moduleName">Search</span><br><a href="#" onclick="customsearch_hide_show('basicsearch')">Go To Basic Search</a></td>
                    <td>
                        <input type="radio" name="custom_advancesearch_option" id="custom_advancesearch_match_all" value="match_all" checked><b>Match All of the Following</b>
                    </td>
                    <td>
                        <input type="radio" name="custom_advancesearch_option" id="custom_advancesearch_match_any" value="match_any"> <b>Match Any of the Following</b>
                    </td>
                </tr>  
                <tr>
                    <td colspan="3">&nbsp;</td>
                </tr>        
                <tr>
                    <td colspan="3">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" id="custom_advancesearch_field_table" class="table">
                            
                            <tbody>
                            <tr id="custom_advancesearch_filter_tr_1">
                                    <td>
                                        <select name="custom_advancesearch_fieldname_1" id="custom_advancesearch_fieldname_1" onchange="display_matching_filter(this,1)">
                                          {foreach from=$custom_search_option_array item=val key=k}
                                            {if $val['display_in'] neq 'basicsearch'}
                                                <option value="{$val['fieldname']}" {if $val['default_selected'] eq 'yes'} selected default_selected="{$val['default_selected']}"{/if} data-fieldtype="{$val['fieldtype']}">{$val['text']}</option>
                                            {/if}
                                          {/foreach}  
                                        </select>
                                    </td>
                                    <td>
                                        <select name="custom_advancesearch_matching_filter_1" id="custom_advancesearch_matching_filter_1"></select>
                                    </td>
                                    <td>
                                        <input type="text" name="custom_advancesearch_searchstring_1" id="custom_advancesearch_searchstring_1" value="">
                                    </td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                            <tfoot>
                              <tr> 
                                <td colspan="4">
                                    <input type="hidden" name="custom_advancesearch_filter_counter" id="custom_advancesearch_filter_counter" value="1">
                                    <input name="custom_advancesearch_add_filter" value=" More "  class="btn btn-warning btn-xs" type="button" onclick="customsearch_advance_add_filter();">
                                    <input name="custom_advancesearch_run_search" value=" Search Now"  class="btn btn-warning btn-xs" type="button" onclick="custom_advancesearch_run('{$custom_search_callfrom}','advancesearch');">
                                </td>
                              </tr>
                            </tfoot>
                        </table>
                    </td>                    
                </tr>
            </table> 
            <select name="hidden_advance_matching_filter" id="hidden_advance_matching_filter" style="display:none;">
                <option value="contains" data-number="yes" data-string="yes">contains</option>
                <option value="does_not_contain" data-number="yes" data-string="yes">does not contain</option>
                <option value="is" data-number="yes" data-string="yes">is</option>
                <option value="is_not" data-number="yes" data-string="yes">is not</option>
                <option value="begins_with" data-string="yes">begins with</option>
                <option value="ends_with" data-string="yes">ends with</option>
                <option value="greater_than" data-number="yes">greater than</option>
                <option value="less_than" data-number="yes">less than</option>
                <option value="greater_or_equal" data-number="yes">greater or equal</option>
                <option value="less_or_equal" data-number="yes">less or equal</option>    
                </select>
        </div>
        <input type="hidden" name="custom_searchtype" id="custom_searchtype" value="">            
    </div>
</div>