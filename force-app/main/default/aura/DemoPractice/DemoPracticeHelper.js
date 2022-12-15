({
    createProperty : function(component, event, helper,add,name) {
        var action = component.get('c.createProp'); 
        action.setParams({
            "name" : name,
            "add" : add
        });
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                alert('Data inserted');
            }
        });
        $A.enqueueAction(action);
        
    },
    
    getAllData:function(component, event, helper){
        var action = component.get('c.getAllData'); 
        
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                component.set('v.propList', a.getReturnValue());
            }
        });
        $A.enqueueAction(action); 
    },
    getDelete:function(component, event, helper,recId){
        var action = component.get('c.deleteProperty'); 
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
                component.set("v.PropertyAddress",retData.Street_Address__c);
                component.set("v.propertyName",retData.Name);
                component.set("v.tmpRecId",retData.Id);
                
            }
        });
        $A.enqueueAction(action);
    },
    
    
    updateData:function(component, event, helper,editRecId){
         var action = component.get('c.updateSingleData');
         
        
        action.setParams({
           "editRecId" : editRecId,
            "name" : component.get("v.propertyName"),
            "add" :  component.get("v.PropertyAddress")
        });
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                alert('Data updated successfully');
                
            }
        });
        $A.enqueueAction(action);
    }
})