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
        endPointurl=[select EndPointUrl__c from RSOAndDGEndPoint__c where Name=:'NamedCredentialUrl'];
        String endurl=endPointurl.EndPointUrl__c;
        System.debug('End Point URl is'+endPointurl.EndPointUrl__c);
        
        if(racId ==null || racId =='')
        {   
            newRebate=null;
         }
        else
        {
         Rebate_Contract__c rebate=[select Name from Rebate_Contract__c where Name=:racId];
        System.debug('recid is'+rebate.Name);
        String record=rebate.Name;
         newRebate=record.leftPad(10, '0');
        System.debug('newRebate value is'+newRebate);
          
        }
        
      	HttpRequest req = new HttpRequest();
		req.setEndpoint(endurl);
		req.setMethod('POST');
		Http http = new Http();
		HTTPResponse res = http.send(req);
			System.debug(res.getBody());  
        	System.debug('response is'+res.getBody());
        	System.debug('Status Code'+res.getStatusCode());
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
    
    
    
	@AuraEnabled(cacheable=true)
	public static wrapperDemandGeneration1.wrapperDemandGeneration  fetchAvailableBudget(String authentication,String newRebate){
    
        System.debug('Authentication is'+authentication);
       
        
        wrapperDemandGeneration1.wrapperDemandGeneration wrap11=new  wrapperDemandGeneration1.wrapperDemandGeneration();
        System.debug('wrapper serialze11 string is before' +JSON.serialize(wrap11));
        wrap11.contractNumber='0000001013';
        wrap11.distributorSAPCode='5190';
        String str=JSON.serializePretty(wrap11);
        
        System.debug('wrapper serialze11 string is after' +JSON.serializePretty(wrap11));
        
        RSOAndDGEndPoint__c  endPointurl=new RSOAndDGEndPoint__c();
        endPointurl=[select EndPointUrl__c from RSOAndDGEndPoint__c where Name=:'fetchbalanceurl'];
        String endurl1=endPointurl.EndPointUrl__c;
        
        Http http = new Http();    
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endurl1);
        req.setMethod('GET');
        req.setHeader('Content-Type', 'application/json;charset=UTF-8');
        req.setHeader('Authorization','Bearer '+authentication); 
        req.setBody(str);
        HttpResponse res =  http.send(req);
        
   		Map<String, Object> result = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
        String totalValue =(String)result.get('totalValue');
        String budgetAvailable =(String)result.get('budgetAvailable');
        String errorMessage =(String)result.get('errorMessage');
        
        wrapperDemandGeneration1.wrapperDemandGeneration wrapafterres=new  wrapperDemandGeneration1.wrapperDemandGeneration();
        wrapafterres.resTotalValue='2000';
        wrapafterres.resBudgetAvailable='500';
        wrapafterres.resErrorMessage=errorMessage;
       // System.debug('wrapafterres is'+JSOn.serializePretty(wrapafterres));
        
        
        System.debug('total value is'+totalValue);
        System.debug('budgetAvailable value is'+budgetAvailable);
        System.debug('Response from Url'+res.toString());
        System.debug('Body from URl' +res.getBody());
            
        return wrapafterres;
        
	}
	 	
	
}