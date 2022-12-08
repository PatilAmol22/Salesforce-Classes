trigger OpportunityTrigger on Opportunity (after insert) {
    PriceBookEntry pbe = new PriceBookEntry();
    pbe.PriceBook2Id =  [SELECT Id FROM  PriceBook2 LIMIT 1][0].Id;
    pbe.Product2Id =[SELECT Id FROM Product2 LIMIT 1][0].Id;
    pbe.UnitPrice = 100;
    //insert pbe;
    
    OpportunityLineItem oli = new OpportunityLineItem();
    oli.PriceBookEntryId = [SELECT Id FROM PriceBookEntry WHERE Product2.Name = 'GenWatt Diesel 1000kW' LIMIT 1][0].Id;
    oli.OpportunityId = Trigger.new[0].Id;
    oli.Quantity = 5;
    oli.TotalPrice = 50000;
    insert oli;

}