public with sharing class SearchDemandGenerationCls {
    @AuraEnabled(cacheable=true)
    public static Rebate_Contract__c getSearchDemandGeneration(String racId) {
        try {

            return [SELECT Name,(SELECT Id,SAP_Document_Number__c, Planned_Value__c, Actual_Budget__c, Status__c
                 FROM Demand_Generations__r) FROM Rebate_Contract__c
                 WHERE Name =:racId];
                } catch (Exception e) {
               System.debug('@@@@==>'+e);
               return null;
                }
    }
    
}