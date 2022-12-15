({
    createAcc : function(component, event, helper,name,accNum,phone,accDate,accOwnership) {
        var action = component.get('c.createAccounts'); 
        action.setParams({
            "name":name,
            "accNum":accNum,
             "phone":phone,
            "accDate":accDate,
            "accOwnership":accOwnership
        });
        action.setCallback(this, function(a){
            var state = a.getState(); 
            if(state == 'SUCCESS') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Success',
                    message: 'Account is created.',
                    duration:' 500',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'pester'
                });
                
                toastEvent.fire();  
            }else{
                var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
            title : 'Error',
            message: 'Please Enter Value',
            duration:' 500',
            key: 'info_alt',
            type: 'error',
            mode: 'pester'
        });
        toastEvent.fire();
            }
            
        });
        $A.enqueueAction(action);
    },
    
    getAllAcc:function(component, event, helper){
        var action = component.get('c.getAllData'); 
        
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                component.set('v.getAllData', a.getReturnValue());
            }
        });
        $A.enqueueAction(action); 
    },
    
    Delete:function(component, event, helper,recId){
        var action = component.get('c.deleteAccount'); 
        action.setParams({
            "recId" : recId
        });
        action.setCallback(this, function(a){
            var state = a.getState(); 
            if(state == 'SUCCESS') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Success',
                    message: 'Account Deleted Succesfully.',
                    duration:' 500',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'pester'
                });
                toastEvent.fire();            
            }
        });
        $A.enqueueAction(action);
    },
    
    getSingleRecord:function(component, event, helper,recId){
        var action = component.get('c.getSingleRecord'); 
        action.setParams({
            "recId" : recId
        });
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                var retData = a.getReturnValue();
                component.set("v.AccountName",retData.Name);
                component.set("v.AccountNumber",retData.AccountNumber);
                component.set("v.Phone",retData.Phone);
                component.set("v.Date",retData.Date__c); 
                component.set("v.AccountOwnership",retData.Ownership);
                component.set("v.tmpRecId",retData.Id);
                
            }
        });
        $A.enqueueAction(action);
    },
    
    updateData:function(component, event, helper,editRecId){
        var action = component.get('c.updateSingleRecord');
        
        action.setParams({
            "editRecId" : editRecId,
            "name" : component.get("v.AccountName"),
            "accNum" :  component.get("v.AccountNumber"),
            "phone": component.get("v.Phone"),
            "accDate" : component.get("v.Date"),
            "accOwnership" : component.get("v.AccountOwnership")
            
        });
        action.setCallback(this, function(a){
            var state = a.getState(); 
            if(state == 'SUCCESS') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Success',
                    message: 'Account Updated Successfully.',
                    duration:' 500',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'pester'
                });
                toastEvent.fire();               }
        });
        $A.enqueueAction(action);
    },
    //promt cancle
   canceldelete:function(component, event, helper,recId){
        action.setCallback(this, function(a){
            var state = a.getState(); 
            if(state == 'null') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message: 'Account Deleted Succesfully.',
                    duration:' 500',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();               }
        });
        $A.enqueueAction(action);
    },
    
    getAllData: function(component, pageNumber, pageSize) {
        var action = component.get("c.getAccountData");
        action.setParams({
            "pageNumber": pageNumber,
            "pageSize": pageSize
        });
        action.setCallback(this, function(result) {
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                component.set("v.getAllData", resultData.getAllData);
                component.set("v.PageNumber", resultData.pageNumber);
                component.set("v.TotalRecords", resultData.totalRecords);
                component.set("v.RecordStart", resultData.recordStart);
                component.set("v.RecordEnd", resultData.recordEnd);
                component.set("v.TotalPages", Math.ceil(resultData.totalRecords / pageSize));
            }
        });
        $A.enqueueAction(action);
    },
    
    sortColumnData: function(component, event) {
        var accountList = component.get("v.getAllData");
        var isSortAsc = component.get("v.isSortAsc");
        var sortingField = component.get("v.selectedSortingField");
        accountList.sort(function(a, b){
            var s1 = a[sortingField] == b[sortingField];
            var s2 = (!a[sortingField] && b[sortingField]) || (a[sortingField] < b[sortingField]);
            return s1? 0: (isSortAsc?-1:1)*(s2?1:-1);
        });
        component.set("v.getAllData", accountList);
        component.set("v.isSortAsc", !isSortAsc);
    },
    
  deleteSelectedHelper: function(component, event, deleteRecordsIds) {
  //call apex class method
  var action = component.get('c.deleteRecords');
  // pass the all selected record's Id's to apex method 
  action.setParams({
   "lstRecordId": deleteRecordsIds
  });
  action.setCallback(this, function(response) {
   //store state of response
   var state = response.getState();
   if (state === "SUCCESS") {
    console.log(state);
    if (response.getReturnValue() != '') {
     // if getting any error while delete the records , then display a alert msg/
     alert('The following error has occurred. while Delete record-->' + response.getReturnValue());
    } else {
     console.log('check it--> delete successful');
    }
    // call the onLoad function for refresh the List view    
    this.onLoad(component, event);
   }
  });
  $A.enqueueAction(action);
 },
 
})