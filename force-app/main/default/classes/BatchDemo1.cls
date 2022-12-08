public class BatchDemo1 implements Database.Batchable<sObject>{
    
    private Integer magicNum = 0;
    
    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator('Select Id,Name from Account');
    }
    public void execute(database.BatchableContext bc,List<Account> scope){
        System.debug('In the execute method');
        for(Integer i = 0;i < 5;i++){
            magicNum =i;
        }
    }
    public void finish(database.BatchableContext bc){
        System.debug('Inside The Finish Method');
       System.debug('magicNum:' + magicNum);
    }
}