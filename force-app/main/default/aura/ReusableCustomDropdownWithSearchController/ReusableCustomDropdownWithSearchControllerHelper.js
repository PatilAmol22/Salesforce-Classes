({
	getgetSObjectList : function(component) {
		var action = component.get("c.getSObjectSelectList");
        action.setCallback(this, function(response) {
            let state = response.getState();
            console.log(state);
            if(state === "SUCCESS") {
                console.log(response.getReturnValue());
                component.set("v.options", response.getReturnValue());
                component.set("v.label", response.getReturnValue()[0].label);
                component.set("v.value", response.getReturnValue()[0].value);
                component.set("v.selected", response.getReturnValue()[0].label);
            }
        });
        $A.enqueueAction(action);
	}
})