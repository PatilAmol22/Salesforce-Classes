public class AccountProcessor 
{
    @future
    public static void countContacts(List<id> accountId) 
    {
        List<Account> lstAccount = [select id,Number_of_Contacts__c , (select id from contacts ) 
                                    from account where id in :accountId ];
        for( Account acc : lstAccount )
        {
            List<Contact> lstCont = acc.contacts ;
            
            acc.Number_of_Contacts__c = lstCont.size();
        }
        if(!lstAccount.isEmpty()){
            update lstAccount;
        }
    }
}