public class AccHandler {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchKey, String sortBy, String sortDirection) {        
       String query = 'select Id,Name,AccountNumber,Phone,Email__c,Type,Date__c,Ownership from Account ';            
        if (String.isNotEmpty(searchKey)) {
            String key = '%' + searchKey + '%';
            query += 'WHERE Name LIKE :key OR Phone LIKE :key OR Email__c LIKE :key OR Ownership LIKE :key';
            //custom.field
        }
        if (String.isNotEmpty(sortBy) && String.isNotEmpty(sortDirection)){
            query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }        
        return Database.query(query);
    }
  
    @AuraEnabled(Cacheable = true)
    public static list<Account> retriveAccs(String strAccName) {
        strAccName = '%' + strAccName + '%';
        list<Account> lstAccs = [SELECT  Id, Name, Industry, Phone, Type From Account WHERE Name LIKE :strAccName];

        if(lstAccs.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return lstAccs; 
    }

   /*  @AuraEnabled
    public static List<Account> getAccountsLWC(string searchText, string searchType){
        List<Account> AccList = new List<Account>();
        String searchKey = searchText+ '%';
 
        String query = 'Select Id,Name,AccountNumber,Phone,Email__c,Type,Date__c,Ownership  FROM Account';
        if (String.isNotEmpty(searchText)) {
            if(searchType == 'Name'){
                query += ' and (name like: searchText)';
            } else if(searchType == 'Phone'){
                query += ' and (Phone LIKE: searchText)';
            } else if(searchType == 'Number'){
                query += ' and (AccountNumber like: searchText)';
            }
        }
        return Database.query(query);
        query += ' limit 1000';
        List<Account> lacc =  Database.query(query);
        for(Account a: lacc){
            AccList.add(new Account(a));
        }
        return new Result(lacc.size(),AccList);
        
    }*/
   
    /*public class Result{
        @AuraEnabled public Integer totalAccount;
        @AuraEnabled public List<Account> lstAccounts;
        public Result(Integer totalAccount, List<Account> lstAccounts){
            this.totalAccount = totalAccount;
            this.lstAccounts = lstAccounts;
        }
    }*/
    
        /* @AuraEnabled(Cacheable = true)
       public static list<Account> getAccounts(String strAccName) {
        strAccName = '%' + strAccName + '%';
        list<Account> lstAccs = [select Id,Name,AccountNumber,Phone,Email__c,Type,Date__c,Ownership from Account  WHERE Name LIKE :strAccName];

        if(lstAccs.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return lstAccs; 
    }*/
    
    @AuraEnabled
    public static void deleteAccounts(List<Id> lstAccIds){
        try {
            List<Account> lstAccToDelete = new List<Account>();
            System.debug('lstConIds  ---->' + lstAccIds );
            for (Account a :[select Id,Name,AccountNumber,Phone,Email__c,Type,Date__c,Ownership from Account where Id in :lstAccIds]) {
                lstAccToDelete.add(a);
                
            }
            if (lstAccToDelete.size()> 0){
                delete lstAccToDelete;
            }
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
      @AuraEnabled
    public static void deleteSelectedAccounts(List<Account> accountLst) {
        delete accountLst;
    }
     @AuraEnabled(cacheable=true)
    public static List<Account> getACC(String accId) {
        return [
            SELECT Id,Name,AccountNumber,Phone,Email__c,Type,Date__c,Ownership FROM Account WHERE Id = :accId
            WITH SECURITY_ENFORCED
        ];
    }
    
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountSearch(String nameSearch,String Phone,String AccountEmail) {
        boolean flag=false;
        String query = 'SELECT Id,Name,AccountNumber,Phone,Email__c,Date__c,Ownership FROM Account';
        if(nameSearch!=null || Phone!=null || AccountEmail!=null){
            query += ' WHERE ';
        }
        
        if ( nameSearch != null && nameSearch != '' ) {
            query += '  Name=\''+nameSearch+'\'';
            flag=true;
        }
        if ( Phone != null && Phone != '' ) {
            if(flag){
                query += ' AND Phone=\''+Phone+'\'';
            }else{
                query += ' Phone=\''+Phone+'\'';
                flag=true;
            }
        }
        if ( AccountEmail != null && AccountEmail != '' ) {
            if(flag){
                query += ' AND  Email__c=\''+AccountEmail+'\'';
            }else{
                query += '  Email__c=\''+AccountEmail+'\'';
            }
        }
        query = query + ' LIMIT 10000';
         system.debug('query---'+query);
        return Database.query( query );
    } 
 }