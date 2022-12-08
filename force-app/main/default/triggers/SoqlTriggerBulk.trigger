trigger SoqlTriggerBulk on Account(after update) {  
    List<Account> acctsWithOpps =
        [select Id,(select Id,Name,CloseDate from Opportunities)
         from Account where Id IN : Trigger.New];
    for (Account a: acctsWithOpps){
        Opportunity[]relatedOpps = a.Opportunities;  
    }
}