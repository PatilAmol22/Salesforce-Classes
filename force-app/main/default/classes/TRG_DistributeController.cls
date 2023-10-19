public with sharing class TRG_DistributeController {
    @AuraEnabled
    public static boolean saveData(List<InputWrapper> iWrap){
        List<Target__c> listToReturn = new List<Target__c>();
        boolean pm = false;
        try{
            for(InputWrapper i : iWrap){
                Target__c targ = new Target__c();
                targ.Name = i.AccountName;
                targ.AssignedTargetPercentage__c = decimal.valueof(i.TargetPercentage);
                targ.TargetCurrencyValue__c = decimal.valueof(i.TargetCurrencyValue);
                listToReturn.add(targ);
            }
            insert listToReturn;
            pm = true;
        }catch(Exception e){
            system.debug('error='+e);
            pm = false;
        }
        return pm;
    }
    public class InputWrapper{
        @AuraEnabled
        public String AccountName{get;set;}
        @AuraEnabled
        public String TargetPercentage{get;set;}
        @AuraEnabled
        public String TargetCurrencyValue{get;set;}
      
    }
}