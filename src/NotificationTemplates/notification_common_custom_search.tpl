<div class="">
    <div class="pageHeader" style="text-align:left">
        Search
    </div>
    <br/>
    <div class="form-horizontal">
        <div class="row">
            <div class="col">
                <label class="control-label" for="searchinput"><b><u>Notification Name</u></b></label>
                <div class="">    
                    <input type="text" placeholder="" class="form-control"  name="srch_notificationname" id="srch_notificationname" value="">
                </div>
            </div>
            <div class="col">
                <label class="control-label" for="searchinput"><b><u>Trigger Type</u></b></label>
                <div class="">
                    <select name="srch_trigger_type" id="srch_trigger_type">
                        <option value=""></option>
                        <option value="sms">SMS</option>
                        <option value="email">E-Mail</option>
                        <option value="app">In Application Notification</option>
                    </select>
                </div>
            </div> 
            <div class="col">
                <label class="control-label" for="searchinput"><b><u>Trigger On</u></b></label>
                <div class="">
                    <select name="srch_trigger_on" id="srch_trigger_on">
                        <option value=""></option>
                        <option value="sales">Sales</option>
                        <option value="salesevents">Sales Events</option>
                        <option value="installs">Installs</option>
                    </select>
                </div>
            </div>
            <div class="col">
                <label class="control-label" for="searchinput"><b><u>Trigger For</u></b></label>
                <div class="">
                    <select name="srch_trigger_for" id="srch_trigger_for">
                        <option value=""></option>
                        <option value="productsale">Product Sales</option>
                        <option value="volume">Volume</option>
                        <option value="absence">Absence</option>                        
                    </select>
                </div>
            </div>
        </div>
        <div class="row"> 
            <div class="col">
                <input type="button" value="Search" class="btn btn-outline-warning btn-sm"  onclick="return search_notification('');" title="Search">
                <input type="button" value="Show All" class="btn btn-outline-warning btn-sm"  onclick="return search_notification('showall');" title="Show All">
            </div>
        </div>
    </div>
    </div>
</div>