Public Class ServiceHelper{
    
	@AuraEnabled
	public static wrapperDemandGeneration1.wrapperDemandGeneration  fetchAvailableBudget(){
        	
        String json11 = '{'+
		''+
		''+
		'\"reqContractNumber\" : \"\",'+
		'\"reqDistributorSAPCode\" : \"100\",'+
		'\"reqDocumentNumberSFDC\" : \"\",'+
		'\"reqEventName\" : \"\",'+
		'\"reqCreationDate\" : \"\",'+
		'\"reqType\" : \"\",'+
		'\"reqEventType\" : \"\",'+
		'\"reqPlannedValue\" : \"\",'+
		'\"reqCreditLetter\" : \"\",'+
		'\"reqpaymentToSupplier\" : \"\",'+
		'\"reqDocumentNumberSAP\" : \"\",'+
		'\"reqStatusAwaitingMKTAccessApproval\" : \"\",'+
		'\"reqActualBudget\" : \"\",'+
		'\"reqStatusRejected\" : \"\",'+
		'\"reqStatusCancelled\" : \"\",'+
		''+
		''+
		''+
		'\"resContactNumber\" : \"\",'+
		'\"resTotalValue\" : \"150\",'+
		'\"resBudgetAvailable\" : \"115\",'+
		'\"resDocumentNumberSFDC\" : \"\",'+
		'\"resDocument NumberSAP\" : \"\",'+
		'\"resErrorMessage\" : \"Not any\",'+
		'\"resStatusAwaitingRealization\" : \"\",'+
		'\"resResultActualBudget\" : \"\",'+
		'\"resResultRejected\" : \"\",'+
		'\"resResultCancelled\" : \"\"'+
		'}';
        
		
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
       // HttpResponse response = http.send(request);
      //  System.debug('response is'+response.getBody());
        wrapperDemandGeneration1.wrapperDemandGeneration wrap=new  wrapperDemandGeneration1.wrapperDemandGeneration();    
        wrap =(wrapperDemandGeneration1.wrapperDemandGeneration) JSON.deserialize(json11,wrapperDemandGeneration1.wrapperDemandGeneration.Class);
        System.debug('wrap field is'+wrap);
 	
		return wrap;
	}
	@AuraEnabled
	public static wrapperDemandGeneration1.wrapperDemandGeneration  createDemand(){
		
		
 		String json11 = '{'+
		''+
		''+
		'\"reqContractNumber\" : \"\",'+
		'\"reqDistributorSAPCode\" : \"100\",'+
		'\"reqDocumentNumberSFDC\" : \"\",'+
		'\"reqEventName\" : \"\",'+
		'\"reqCreationDate\" : \"\",'+
		'\"reqType\" : \"\",'+
		'\"reqEventType\" : \"\",'+
		'\"reqPlannedValue\" : \"\",'+
		'\"reqCreditLetter\" : \"\",'+
		'\"reqpaymentToSupplier\" : \"\",'+
		'\"reqDocumentNumberSAP\" : \"\",'+
		'\"reqStatusAwaitingMKTAccessApproval\" : \"\",'+
		'\"reqActualBudget\" : \"\",'+
		'\"reqStatusRejected\" : \"\",'+
		'\"reqStatusCancelled\" : \"\",'+
		''+
		''+
		''+
		'\"resContactNumber\" : \"\",'+
		'\"resTotalValue\" : \"\",'+
		'\"resBudgetAvailable\" : \"\",'+
		'\"resDocumentNumberSFDC\" : \"\",'+
		'\"resDocumentNumberSAP\" : \"1547\",'+
		'\"resErrorMessage\" : \"Not any1\",'+
		'\"resStatusAwaitingRealization\" : \"\",'+
		'\"resResultActualBudget\" : \"\",'+
		'\"resResultRejected\" : \"\",'+
		'\"resResultCancelled\" : \"\"'+
		'}';
        
		
        
        Http http = new Http();
        wrapperDemandGeneration1.wrapperDemandGeneration wrap1=new  wrapperDemandGeneration1.wrapperDemandGeneration();    
        wrap1 =(wrapperDemandGeneration1.wrapperDemandGeneration) JSON.deserialize(json11,wrapperDemandGeneration1.wrapperDemandGeneration.Class);
        System.debug('wrap field is'+wrap1);
 	
		return wrap1;
		
	}
	
		public static String  updateStatusRealization(String request){
		String response ='';
		
 		// Start integration logic 
		
		// End integration logic

		return response;
	}
	
		public static String  updateActualBudget(String request){
		String response ='';
		
 		// Start integration logic 
		
		// End integration logic

		return response;
	}
	
		public static String  updateStatusRejected(String request){
		String response ='';
		
 		// Start integration logic 
		
		// End integration logic

		return response;
	}
	
		public static String  updateStatusCancelled(String request){
		String response ='';
		
 		// Start integration logic 
		
		// End integration logic

		return response;
	}
}