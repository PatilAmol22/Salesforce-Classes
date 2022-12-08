public class CallBy {
    public void mainValueMethod(){
        String websiteUrl = 'www.ApexHours.com';
        system.debug('Before value Call:'+ websiteUrl);
        passByValueCall(websiteUrl);
        System.debug('After value Call:'+ websiteUrl);
    }
    private void passByValueCall(String websiteUrlValue){
        websiteUrlValue = 'www.salesforce.com';
    }
    public void mainReferenceMethod(){
        Account a = new Account();
        a.Name ='Test Account';
        a.Website = 'www.ApexHours.com';
        
        system.debug('Before Reference call:'+ a);
        passByRefCall(a);
        System.debug('After Reference Call:'+a);
    } 
    private void passByRefCall(Account a){
        a.Website = 'www.salesforce.com';
    }
}