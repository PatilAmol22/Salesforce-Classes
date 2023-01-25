@RestResource(urlMapping='/SampleRestAPI/*')
global with sharing class SampleRestAPIRestController {
    
    
    @HttpPost
    global static void doPost(String SfId) {
        system.debug('id>>'+SfId);
        RestResponse res = RestContext.response ;
        Savepoint sp = Database.setSavepoint();
        
        try {
            //validations
            if (String.isBlank(SfId)) {
                res.responseBody = Blob.valueOf(JSON.serialize(new errorMessageWrapperClass('Missing Required fields','SfId is required!!')));
                res.statusCode = 400; return ;
            }
            
            List<Account> accList = [SELECT Id, Name FROM Account WHERE Id =: SfId];
            if(accList != null && !accList.isEmpty()){
                res.responseBody = Blob.valueOf(JSON.serialize(new SuccessResponse(accList.get(0).Name, accList.get(0).Id)));
                res.statusCode = 200;
            } else {
                res.responseBody = Blob.valueOf(JSON.serialize(new errorMessageWrapperClass('Not Found:','NOT Found')));
                res.statusCode = 404;
            }
        } catch(Exception e) {
            res.responseBody = Blob.valueOf(JSON.serialize(new errorMessageWrapperClass('Unknown Error: ', e.getMessage())));
            res.statusCode = 500;
        }
    }
    
    //Wrapper class for Error response
    global class errorMessageWrapperClass {
        public String errorType {get;set;}
        public String errorMessage {get;set;}
        
        public errorMessageWrapperClass (String errorType, String errorMessage){
            this.errorType = errorType ;
            this.errorMessage = errorMessage ;
        }
    }
    
    //Wrapper class for response
    global class SuccessResponse {
        public String Name {get;set;}
        public String SfId {get;set;}
        
        public SuccessResponse (String Name, String SfId){
            this.Name = Name ;
            this.SfId = SfId ;
        }
    }
    
}