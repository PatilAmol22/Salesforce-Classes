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
                alert('Account Inserted');
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

    getDelete:function(component, event, helper,recId){
        var action = component.get('c.deleteAccount'); 
        action.setParams({
           "recId" : recId
        });
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                alert('Data Deleted');
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
                component.set("v.Phone",retData.Phone);
                component.set("v.AccountName",retData.Name);
                component.set("v.AccountNumber",retData.AccountNumber);
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
            var state = a.getState(); //Respons state
            if(state == 'SUCCESS') {
                alert('Data updated successfully');
                
            }
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
    }
    
    })