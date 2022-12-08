public class QueueableDemo implements System.Queueable{
    public void execute(System.QueueableContext context){
        System.debug('Inside execute method of Queueable Job');
        List<Account> listofAccounts = new List<Account>([select Id,Name from Account limit 10]);
        System.debug('listofAccount:' + listofAccounts);
    }

}