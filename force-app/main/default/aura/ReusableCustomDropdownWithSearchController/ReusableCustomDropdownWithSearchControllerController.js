({
	doInit : function(component, event, helper) {
        helper.getgetSObjectList(component);
    },
    
    handleOnChange : function(component, event, helper) {
        let selectedValue = event.getParam('value');
        let selectedLabel = event.getParam('label');
        component.set("v.selected",selectedLabel);
    }
})