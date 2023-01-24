public with sharing class Fileuploadcttrl {
    @AuraEnabled(cacheable=true)
    public static Map<ID, ContentVersion> fetchFiles(String recordId) {
        // Get record file IDs        
        List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
        List<ID> fileIDs = new List<ID>();
        for (ContentDocumentLink docLink : files) {
            fileIDs.add(docLink.ContentDocumentId);
        }
 
        List<ContentVersion> docs = [SELECT ContentDocumentId,Title 
            FROM ContentVersion WHERE ContentDocumentId IN : fileIDs];
        Map<ID, ContentVersion> mapIdTitle = new Map<ID, ContentVersion>();
        for (ContentVersion docLink : docs) {
            mapIdTitle.put(docLink.ContentDocumentId, docLink);
        }
        return mapIdTitle;
    }

    @AuraEnabled
    public static void deleteContentDocument(Id recordId) {
        delete [SELECT Id FROM ContentDocument WHERE ID=:recordId];
    }
}