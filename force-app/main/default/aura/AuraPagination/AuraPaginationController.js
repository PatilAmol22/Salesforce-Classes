({
    doInit: function (component, event, helper) {
        // Set the columns of the Table 
        component.set('v.isSending',true);
        component.set('v.columns', [
            {label: 'Account Name', fieldName: 'Name', type: 'text', sortable : true},
            {label: 'AccountNumber', fieldName: 'AccountNumber', type: 'text', sortable : true},
            {label: 'Phone', fieldName: 'Phone', type: 'Phone', sortable : true},
            {label: 'website', fieldName: 'website', type: 'URL', sortable : true},
            {label: 'Billing Address', fieldName: 'BillingAddress', type: 'Address', sortable : true},
            {label: 'Shipping Address', fieldName: 'ShippingAddress', type: 'Address', sortable : true},
            
            
        ]);
            helper.FetchAccount(component);
            },
            getSelectedName: function (component, event) {
            var selectedRows = event.getParam('selectedRows');
                       
           
        },
 
     next: function (component, event, helper) {
    helper.next(component, event);
    },
        
    previous: function (component, event, helper) {
        helper.previous(component, event);
    },
})