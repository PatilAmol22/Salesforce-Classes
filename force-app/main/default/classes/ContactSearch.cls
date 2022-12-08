public class ContactSearch
{
    public static list<contact> searchForContacts(string a,string b)
    {
        list<contact> cntct=[select ID,FirstName,LastName 
                             from contact 
                             where (Lastname=:a and MailingPostalCode=:b)];
        return cntct;
    }

}