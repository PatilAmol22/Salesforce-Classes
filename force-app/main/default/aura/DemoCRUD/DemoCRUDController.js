({
    handleClick : function(component, event, helper) {
        
        var name=component.get("v.AccountName");
        var accNum=component.get("v.AccountNumber");
        var phone=component.get("v.Phone");
        var accDate=component.get("v.Date");
        var accOwnership=component.get("v.AccountOwnership"); 
        
        
        console.log('Name'+ name);
        helper.createAcc(component, event, helper,name,accNum,phone,accDate,accOwnership);
        helper.getAllAcc(component, event, helper);
        
        component.find("NAME").set("v.value","");
        component.find("NUMBER").set("v.value","");
        component.find("PHONE").set("v.value","");
        component.find("DATE").set("v.value","");
        component.find("pickType").set("v.value","");
    },
    
    /*for reading Data*/
    doInit: function(component, event, helper) {
        helper.getAllAcc(component, event, helper);
        
    },
    
    showSpinner: function(component, event, helper) {
        //g loading spinner 
        component.set("v.isSending", true); 
    },
    
    
    hideSpinner : function(component,event,helper){
        //  hiding spinner    
        component.set("v.isSending", false);
    },
    /*
    checkboxSelect: function(component, event, helper) {
        // on each checkbox selection update the selected record count 
        var selectedRec = event.getSource().get("v.value");
        var getSelectedNumber = component.get("v.selectedCount");
        if (selectedRec == true) {
            getSelectedNumber++;
        } else {
            getSelectedNumber--;
            component.find("selectAllId").set("v.value", false);
        }
        component.set("v.selectedCount", getSelectedNumber);
        // if all checkboxes are checked then set header checkbox with true   
        if (getSelectedNumber == component.get("v.totalRecordsCount")) {
            component.find("selectAllId").set("v.value", true);
        }
    },
    
    selectAllCheckbox: function(component, event, helper) {
        var selectedHeaderCheck = event.getSource().get("v.value");
        var updatedAllRecords = [];
        var updatedPaginationList = [];
        var getAllData = component.get("v.getAllData");
        var getAllData = component.get("v.getAllData");
        // play a for loop on all records list 
        for (var i = 0; i < getAllData.length; i++) {
            // check if header checkbox is 'true' then update all checkbox with true and update selected records count
            // else update all records with false and set selectedCount with 0  
            if (selectedHeaderCheck == true) {
                getAllData[i].isChecked = true;
                component.set("v.selectedCount", getAllData.length);
            } else {
                getAllData[i].isChecked = false;
                component.set("v.selectedCount", 0);
            }
            updatedAllRecords.push(getAllData[i]);
        }
        // update the checkbox for 'PaginationList' based on header checbox 
        for (var i = 0; i < getAllData.length; i++) {
            if (selectedHeaderCheck == true) {
                getAllData[i].isChecked = true;
            } else {
                getAllData[i].isChecked = false;
            }
            updatedPaginationList.push(getAllData[i]);
        }
        component.set("v.listOfAllAccounts", updatedAllRecords);
        component.set("v.PaginationList", updatedPaginationList);
    },*/
    
    checkboxSelect: function(component, event, helper) {
        // get the selected checkbox value  
        var selectedRec = event.getSource().get("v.value");
        // get the selectedCount attrbute value(default is 0) for add/less numbers. 
        var getSelectedNumber = component.get("v.selectedCount");
        // check, if selected checkbox value is true then increment getSelectedNumber with 1 
        // else Decrement the getSelectedNumber with 1     
        if (selectedRec == true) {
            getSelectedNumber++;
        } else {
            getSelectedNumber--;
        }
        // set the actual value on selectedCount attribute to show on header part. 
        component.set("v.selectedCount", getSelectedNumber);
    },
    
    // For select all Checkboxes 
    selectAll: function(component, event, helper) {
        //get the header checkbox value  
        var selectedHeaderCheck = event.getSource().get("v.value");
        // get all checkbox on table with "boxPack" aura id (all iterate value have same Id)
        // return the List of all checkboxs element 
        var getAllId = component.find("boxPack");
        // If the local ID is unique[in single record case], find() returns the component. not array   
        if(! Array.isArray(getAllId)){
            if(selectedHeaderCheck == true){ 
                component.find("boxPack").set("v.value", true);
                component.set("v.selectedCount", 1);
            }else{
                component.find("boxPack").set("v.value", false);
                component.set("v.selectedCount", 0);
            }
        }else{
            // check if select all (header checkbox) is true then true all checkboxes on table in a for loop  
            // and set the all selected checkbox length in selectedCount attribute.
            // if value is false then make all checkboxes false in else part with play for loop 
            // and select count as 0 
            if (selectedHeaderCheck == true) {
                for (var i = 0; i < getAllId.length; i++) {
                    component.find("boxPack")[i].set("v.value", true);
                    component.set("v.selectedCount", getAllId.length);
                }
            } else {
                for (var i = 0; i < getAllId.length; i++) {
                    component.find("boxPack")[i].set("v.value", false);
                    component.set("v.selectedCount", 0);
                }
            } 
        }  
        
    },
    //For Delete selected records 
    deleteSelected: function(component, event, helper) {
        // create var for store record id's for selected checkboxes  
        var delId = [];
        // get all checkboxes 
        var getAllId = component.find("boxPack");
        // If the local ID is unique[in single record case], find() returns the component. not array
        if(! Array.isArray(getAllId)){
            if (getAllId.get("v.value") == true) {
                delId.push(getAllId.get("v.text"));
            }
        }else{
            // play a for loop and check every checkbox values 
            // if value is checked(true) then add those Id (store in Text attribute on checkbox) in delId var.
            for (var i = 0; i < getAllId.length; i++) {
                if (getAllId[i].get("v.value") == true) {
                    delId.push(getAllId[i].get("v.text"));
                }
            }
        } 
        
        // call the helper function and pass all selected record id's.    
        helper.deleteSelectedHelper(component, event, delId);
        
    },
    
    
    
    /*Handle Delete Event*/
    handleDelete:function(component, event, helper){
        var recId = event.getSource().get("v.value");
        component.set('v.accId', recId);
        component.set('v.showConfirmDialog', true);
    },
    
    handleEdit:function(component, event, helper){
        component.set("v.showSubmitButton",false);
        component.set("v.showEditButton",true);
        var recId = event.getSource().get("v.value");
        helper.getSingleRecord(component, event, helper,recId);        
    },
    
    
    submitEdit:function(component, event, helper){
        var editRecId = component.get("v.tmpRecId");
        helper.updateData(component, event, helper,editRecId);
        helper.getAllAcc(component, event, helper);
        component.set("v.showSubmitButton",true);
        component.set("v.showEditButton",false);
        
        component.find("NAME").set("v.value","");
        component.find("NUMBER").set("v.value","");
        component.find("PHONE").set("v.value","");
        component.find("DATE").set("v.value","");
        component.find("pickType").set("v.value","");
        
    },
    
    handleNext: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.find("pageSize").get("v.value");
        pageNumber++;
        helper.getAllData(component, pageNumber, pageSize);
    },
    
    handlePrev: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.find("pageSize").get("v.value");
        pageNumber--;
        helper.getAllData(component, pageNumber, pageSize);
    },
    
    onSelectChange: function(component, event, helper) {
        var page = 0
        var pageSize = component.get("v.value");
        helper.getAllData(component, page, pageSize);
    },
    
    //For delet data code from handle delete paste hear
    Confirmdelete : function(component, event, helper) {
        var recId = component.get("v.accId"); 
        console.log(recId);
        helper.Delete(component, event, helper,recId);
        
        helper.getAllAcc(component, event, helper);
        
        component.find("NAME").set("v.value","");
        component.find("NUMBER").set("v.value","");
        component.find("PHONE").set("v.value","");
        component.find("DATE").set("v.value","");
        component.find("pickType").set("v.value","");
        
        console.log('Yes delete this Account');
        component.set('v.showConfirmDialog', false);
    },
    
    handlecanceldelete : function(component, event, helper) {
        console.log('No');
        component.set('v.showConfirmDialog', false);
        helper.canceldelete(component, event, helper);
    },
    
    handleSorting: function (component, event, helper) {
        var selectedItem = event.currentTarget;
        var selectedField = selectedItem.dataset.record;
        
        component.set("v.isSortByName", false);
        component.set("v.isSortByAccNo", false);
        component.set("v.isSortByPhone", false);
        component.set("v.isSortByDate", false);
        component.set("v.isSortByOwnership", false);
        
        component.set("v.selectedSortingField", selectedField);
        
        if(selectedField == 'Name'){
            component.set("v.isSortByName", true);
        }else if(selectedField == 'AccountNumber'){
            component.set("v.isSortByAccNo", true);
        }else if(selectedField == 'Phone'){
            component.set("v.isSortByPhone", true);
        }else if(selectedField == 'Phone'){
            component.set("v.isSortByDate", true);
        }else if(selectedField == 'Phone'){
            component.set("v.isSortByOwnership", true);
        }
        helper.sortColumnData(component, event);
    },
    
})