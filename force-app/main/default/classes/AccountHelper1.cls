public with sharing class AccountHelper1 {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(List<Id> acId) {
        return [SELECT Id, Name, Type, AnnualRevenue,
                Phone, Email__c
            FROM Account
            WHERE Id IN:acId];
    }
}
