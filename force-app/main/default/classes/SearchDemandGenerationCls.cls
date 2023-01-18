public with sharing class SearchDemandGenerationCls {
    @AuraEnabled(cacheable=true)
    public static Rebate_Contract__c getSearchDemandGeneration(Id racId) {
            return [SELECT Name,(SELECT Id,SAP_Document_Number__c, Planned_Value__c, Actual_Budget__c, Status__c
                 FROM Demand_Generations__r) FROM Rebate_Contract__c
                 WHERE Id =:racId];
    }
}