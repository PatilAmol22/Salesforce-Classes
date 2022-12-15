({
    handleClick : function(component, event, helper) {
        var name=component.get("v.AccountName");
        var phone=component.get("v.Phone");
        var accNum=component.get("v.AccountNumber");
        
        helper.createAcc(component, event, helper,name,accNum,phone);
        helper.getAllAccounts(component, event, helper);
        
    },
    
    doInit: function (component, event, helper) {
        helper.getAllAccounts(component, event, helper);
    },
    handleDelete:function(component, event, helper){
        var recId = event.getSource().get("v.value");
        helper.getDelete(component, event, helper,recId);
        helper.getAllAccounts(component, event, helper);
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
        helper.getAllAccounts(component, event, helper);
        component.set("v.showSubmitButton",true);
        component.set("v.showEditButton",false);
    }
    
})