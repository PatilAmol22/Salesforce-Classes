global class  StateFulDemo implements Database.Batchable<sObject>, Database.Stateful {
    
    private Integer magicNum = 0;
    
    global Database.QueryLocator start(Database.BatchableContext bc){
        System.debug('In the Start Method');
        return Database.getQueryLocator('Select Id,Name From Account Limit 100');
            }
    
    global void execute (Database.BatchableContext bc,List<Account> scope){
        System.debug('In The Execute method');
        for(Integer i = 1; i <= 5;i++){
            magicNum++;
    }
}

   global void Finish(Database.BatchableContext bc){
    System.debug('In The Finish Method ');
    System.debug('magicNum' + magicNum);
}
}