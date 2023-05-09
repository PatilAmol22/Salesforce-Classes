/*******************************************************************************************
* @Name         DemandGeneration
* @Author       Prashant Kumbhar <prashant.kumbhar@skinternational.com>
* @Date         13/02/2023
* @Group        SKI
* @Description  This class contains all  methods related to DemandGeneration & SOR Inetgration.
*******************************************************************************************/
/* MODIFICATION LOG
* Version          Developer          Date               Description
*-------------------------------------------------------------------------------------------
*  1.0              Prashant         13/02/2023           Initial Creation                                                      
*******************************************************************************************/


Public Class ServiceHelper{
    @AuraEnabled
    public static String getAuthentication(String racId)
        
    {
        String authentication='';
        String newRebate='';
        System.debug('raecId is'+racId);
        RSOAndDGEndPoint__c  endPointurl=new RSOAndDGEndPoint__c();
        endPointurl=[select EndPointUrl__c from RSOAndDGEndPoint__c where Name=:'NamedCredentialUrl' limit 1];
        String endurl=endPointurl.EndPointUrl__c;
        System.debug('End Point URl is'+endPointurl.EndPointUrl__c);
        
        if(racId ==null || racId =='')
        {   
            newRebate=null;
         }
        else
        {
         //Rebate_Contract__c rebate=[select Name from Rebate_Contract__c where Name=:racId];
        //System.debug('recid is'+rebate.Name);
        String record=racId;
         newRebate=record.leftPad(10, '0');
        System.debug('newRebate value is'+newRebate);
          
        }
        
      	HttpRequest req = new HttpRequest();
		req.setEndpoint(endurl);
		req.setMethod('POST');
		Http http = new Http();
        HTTPResponse res=new HTTPResponse();
         if(!test.isRunningTest())
         {
           res = http.send(req);
			  
         }
        //Creating Fake response
        else if(test.isRunningTest())
        {
           res.setHeader('Content-Type', 'application/json');
           res.setBody('{"example":"test"}');
           res.setStatusCode(200);
        
			 
        }
		    System.debug(res.getBody());  
        	System.debug('response is'+res.getBody());
        	System.debug('Status Code'+res.getStatusCode());
        String   userId=userInfo.getUserId();
        //Calling Monitor Log
      //  ApexLog.webServiceLogDGSOR(req.getBody(),res.getBody(),res.getStatusCode(),'ServiceHelper','getAuthentication',null,userId);
 
        
        
        
        Map<String, Object> result = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
        String accessToken=''; 
        
        if(res.getStatusCode()==200)
        {
            System.debug('Authenticaation Successfull');
            accessToken=(String)result.get('access_token');
            System.debug('accesstokan is'+accessToken);
            if(accessToken !=null || accessToken !='')
            {
            authentication=accessToken;
            		 if(newRebate ==null || newRebate =='')
                 
            		 {
                       System.debug('null method');
             		 }
                	else
                		{
                  		fetchAvailableBudget(authentication,newRebate);
               		 }
            }
            else
            {
            authentication='ErrorAccessTokan';
            }   
            
        }
        else
        { 
          	System.debug('Authentication fail');  
            authentication='Error';
        }
        
    return authentication;     
    }
    
    
    
	@AuraEnabled
	public static fetchbudget  fetchAvailableBudget(String authentication,String newRebate){
    
        System.debug('Authentication is'+authentication);
       
        
        fetchbudget wrap11=new  fetchbudget();
        System.debug('wrapper serialze11 string is before' +JSON.serialize(wrap11));
        wrap11.contractNumber='0000001013';
        wrap11.distributorSAPCode='5190';
        String str=JSON.serializePretty(wrap11);
        
        System.debug('wrapper serialze11 string is after' +JSON.serializePretty(wrap11));
        
        RSOAndDGEndPoint__c  endPointurl=new RSOAndDGEndPoint__c();
        endPointurl=[select EndPointUrl__c from RSOAndDGEndPoint__c where Name=:'fetchbalanceurl' limit 1];
        String endurl1=endPointurl.EndPointUrl__c;
        
        Http http = new Http();    
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endurl1);
        req.setMethod('GET');
        req.setHeader('Content-Type', 'application/json;charset=UTF-8');
        req.setHeader('Authorization','Bearer '+authentication); 
        req.setBody(str);
        
        HttpResponse res=new HttpResponse();
        if(!test.isRunningTest())
        {
         res =  http.send(req);
            System.debug('in ftch');
        }
        else if(test.isRunningTest())
        {
           res.setHeader('Content-Type', 'application/json');
           res.setBody('{"example":"test"}');
           res.setStatusCode(200);
        
        }
        System.debug('fetch data in response'+res.getBody());
        String   userId=userInfo.getUserId();
        //Calling Monitor Log
       // ApexLog.webServiceLogDGSOR(req.getBody(),res.getBody(),res.getStatusCode(),'ServiceHelper','fetchAvailableBudget',null,userId);
 
   		Map<String, Object> result1 = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
        String totalValue =(String)result1.get('totalValue');
        String budgetAvailable =(String)result1.get('budgetAvailable');
        String errorMessage =(String)result1.get('errorMessage');
        
        fetchbudget wrapafterres=new  fetchbudget();
        wrapafterres.resTotalValue='2000';
        wrapafterres.resBudgetAvailable='500';
        wrapafterres.resErrorMessage=errorMessage;
       // System.debug('wrapafterres is'+JSOn.serializePretty(wrapafterres));
        
        
        System.debug('total value is'+totalValue);
        System.debug('budgetAvailable value is'+budgetAvailable);
        System.debug('Response from Url'+res.toString());
        System.debug('Body from URl' +res.getBody());
        System.debug('hardcoded wrapper is'+wrapafterres);
            
        return wrapafterres;
        
	}
  public class fetchbudget {
      @AuraEnabled
      public String contractNumber ;
      @AuraEnabled
      public String distributorSAPCode ;
       @AuraEnabled
      public String resTotalValue ;
       @AuraEnabled
      public String resBudgetAvailable ;
       @AuraEnabled
      public String resErrorMessage ;
                     
     }	 	
	
}