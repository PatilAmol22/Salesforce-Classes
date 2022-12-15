({
    createAcc : function(component, event, helper,name,accNum,phone) {
        var action = component.get('c.createAccounts'); 
        action.setParams({
            "name":name,
             "accNum":accNum,
            "phone":phone
        });
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                alert('Account Inserted');
            }
        });
        $A.enqueueAction(action);
    },
   getAllAccounts:function(component, event, helper){
        var action = component.get('c.getAllAccounts'); 
        
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                component.set('v.accList', a.getReturnValue());
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
            var state = a.getState(); 
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
            var state = a.getState();
            if(state == 'SUCCESS') {
                var retData = a.getReturnValue();
                component.set("v.AccountName",retData.Name);
                component.set("v.AccountNumber",retData.AccountNumber);
                component.set("v.Phone",retData.Phone);
                component.set("v.tmpRecId",retData.Id);
                
            }
        });
        $A.enqueueAction(action);
    },
    updateData:function(component, event, helper,editRecId){
         var action = component.get('c.updateSingleData');
         
        action.setParams({
           "editRecId" : editRecId,
            "name" : component.get("v.AccountName"),
            "accNum" :  component.get("v.AccountNumber"),
            "phone": component.get("v.Phone")
        });
        action.setCallback(this, function(a){
            var state = a.getState();
            if(state == 'SUCCESS') {
                alert('Data updated successfully');
                
            }
        });
        $A.enqueueAction(action);
    },
})