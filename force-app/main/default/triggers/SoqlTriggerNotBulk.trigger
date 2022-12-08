trigger SoqlTriggerNotBulk on Account (after update ) {
    for (Account  a : Trigger.New ){
        Opportunity [] opps = [select Id,Name,CloseDate 
                               from Opportunity where AccountID=:a.Id];
        
        
    }

}