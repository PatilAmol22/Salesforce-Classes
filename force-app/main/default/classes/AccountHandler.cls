public class AccountHandler {
    public static Account insertNewAccount(String name ) {
        Account a = new Account();
        a.Name = name;
        
        try
        {
            insert a;
            system.debug('Amol Patil');
        } catch (Exception e) {
            return null;
        }
        return a;
        
    }
}