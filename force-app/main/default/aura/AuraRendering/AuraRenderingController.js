({
	handleMenuSelect: function(component, event, helper) {

    var selectedMenu = event.detail.menuItem.get("v.value");
    console.log('selectedMenu-' + selectedMenu);
    switch(selectedMenu) {
        case "edit":
            var modalBody;
            var modalFooter;
            $A.createComponents(
                [
                    [component.get("v.bodyComponent"), { messageBody: component.get("v.bodyMessage"), }],
                    [component.get("v.FooterComponent"), {}]
                ],
                function (components, status) {
                    if (status === "SUCCESS") {  
                        modalBody = components[0];
                        modalFooter = components[1];
                        component.find('overlayLib').showCustomModal({
                            header: component.get("v.titleMessage"),
                            body: modalBody,
                            footer: modalFooter,
                            showCloseButton: true,
                            cssClass: "my-modal",
                            closeCallback: function () {
                                alert('You closed the alert!');
                            }
                        })
                    }
                }
            );
        break;

        case "delete":
            //do delete
            break;
    }
},
})