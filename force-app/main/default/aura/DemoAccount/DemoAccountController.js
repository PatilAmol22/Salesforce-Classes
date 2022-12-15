({
    handleClick : function(component, event, helper) {
         var name=component.get("v.AccountName");
         var accNum=component.get("v.AccountNumber");
         var phone=component.get("v.Phone");
         var accDate=component.get("v.Date");
         var accOwnership=component.get("v.AccountOwnership");      
        helper.createAcc(component, event, helper,name,accNum,phone,accDate,accOwnership);
        helper.getAllAcc(component, event, helper);
    },
    
    /*for reading Data*/
    doInit: function(component, event, helper) {
        helper.getAllAcc(component, event, helper);
    },
    
    /*Handle Delete Event*/
    handleDelete:function(component, event, helper){
        var recId = event.getSource().get("v.value");
        helper.getDelete(component, event, helper,recId);
        helper.getAllAcc(component, event, helper);
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
    },
    
    handleNext: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.find("pageSize").get("v.value");
        pageNumber++;
        helper.getAllAcc(component, pageNumber, pageSize);
    },
     
    handlePrev: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.find("pageSize").get("v.value");
        pageNumber--;
        helper.getAllAcc(component, pageNumber, pageSize);
    },
     
    onSelectChange: function(component, event, helper) {
        var page = 0
        var pageSize = component.get("v.value");
        helper.getAllAcc(component, page, pageSize);
    },
})