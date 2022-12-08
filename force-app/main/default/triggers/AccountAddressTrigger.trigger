trigger AccountAddressTrigger on Account (before insert, before update) {

    for(Account a : Trigger.new){
        If (a.Match_Billing_Address__c == True) {
            a.ShippingPostalCode = a.BillingPostalCode;
        }   
    }

}