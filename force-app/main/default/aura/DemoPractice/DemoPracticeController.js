({
    handleClick : function(component, event, helper) {
        var add = component.get("v.PropertyAddress");
        var name = component.get("v.propertyName");
        helper.createProperty(component, event, helper,add,name);
        helper.getAllData(component, event, helper);
        
    },
    
    /*for reading Data*/
    doInit: function(component, event, helper) {
        helper.getAllData(component, event, helper);
    },
    
    /*Handle Delete Event*/
    handleDelete:function(component, event, helper){
        var recId = event.getSource().get("v.value");
        helper.getDelete(component, event, helper,recId);
        helper.getAllData(component, event, helper);
    },
    
     /*Handle Edit Event*/
    handleEdit:function(component, event, helper){
        component.set("v.showSubmitButton",false);
        component.set("v.showEditButton",true);
        var recId = event.getSource().get("v.value");
        helper.getSingleRecord(component, event, helper,recId);        
    },
    
     /*Handle Edit Button*/
    submitEdit:function(component, event, helper){
        var editRecId = component.get("v.tmpRecId");
        helper.updateData(component, event, helper,editRecId);
        helper.getAllData(component, event, helper);
        component.set("v.showSubmitButton",true);
        component.set("v.showEditButton",false);
    }
})