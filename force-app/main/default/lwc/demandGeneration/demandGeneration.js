import { LightningElement, track, api, wire } from 'lwc';
import getDemandGeneration from '@salesforce/apex/DemandGeneration.getDemandGeneration';
import updateDemandGeneration from '@salesforce/apex/DemandGeneration.updateDemandGeneration';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Credit_Letter__c from '@salesforce/schema/Demand_Generation__c.Credit_Letter__c';
import Type__c from '@salesforce/schema/Demand_Generation__c.Type__c';
import Event_Type__c from '@salesforce/schema/Demand_Generation__c.Event_Type__c';
import Status__c from '@salesforce/schema/Demand_Generation__c.Status__c';
import Sub_Status__c from '@salesforce/schema/Demand_Generation__c.Sub_Status__c';
import Payment_to_Supplier__c from '@salesforce/schema/Demand_Generation__c.Payment_to_Supplier__c';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';



export default class DemandGeneration extends LightningElement {

   @track creditOption=[];
   @track type=[];
   @track eventType=[];
   @track eventMaster=[];
   @track status=[];
   @track subStatus=[];
   @track paymentToSuplier=[];
   @track serarchField = 'Distributor__c';
   
    @wire(getPicklistValues, {recordTypeId: '012000000000000AAA', fieldApiName: Credit_Letter__c })
    propertyOrFunction({error,data}){ 
     if(data)
     {
        console.log('data is1',data);
        this.creditOption=data.values;
     }
     
    };
    
    @wire(getPicklistValues, {recordTypeId: '012000000000000AAA', fieldApiName: Type__c })
    propertyOrFunction1({error,data}){ 
     if(data)
     {
        console.log('data is2',data);
        this.type=data.values;
     }
     
    };

    @wire(getPicklistValues, {recordTypeId: '012000000000000AAA', fieldApiName: Event_Type__c })
    propertyOrFunction2({error,data}){ 
     if(data)
     {
        console.log('data is3',data);
        this.eventType=data.values;
     }
     
    };
    
    @wire(getPicklistValues, {recordTypeId: '012000000000000AAA', fieldApiName: Event_Type__c })
    propertyOrFunction7({error,data}){ 
     if(data)
     {
        console.log('data is3',data);
        this.eventMaster=data.values;
     }
     
    };


    @wire(getPicklistValues, {recordTypeId: '012000000000000AAA', fieldApiName: Status__c })
    propertyOrFunction3({error,data}){ 
     if(data)
     {
        console.log('data is4',data);
        this.status=data.values;
     }
     
    };
    
    @wire(getPicklistValues, {recordTypeId: '012000000000000AAA', fieldApiName: Sub_Status__c })
    propertyOrFunction4({error,data}){ 
     if(data)
     {
        console.log('data is5',data);
        this.subStatus=data.values;
     }
     
    };
  
    @wire(getPicklistValues, {recordTypeId: '012000000000000AAA', fieldApiName: Payment_to_Supplier__c })
    propertyOrFunction5({error,data}){ 
     if(data)
     {
        console.log('data is5',data);
        this.paymentToSuplier=data.values;
     }
     
    };



    @track demand={};
    
    connectedCallback() {
    this.getDemand();
    }

    getDemand() {
            getDemandGeneration({})
                .then((data) => {
                    this.demand = data;
                    console.log('Demnad data is', data);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    console.log('Finally');
                })
        }

        @track value;
        @track allValues=[];

        handleChange(event)
        {
          this.value=event.target.value;
          this.demand.eventType=this.value;
          if(!this.allValues.includes(this.value))
            this.allValues.push(this.value);
            

          this.modifyOptions();
        }
      
        handleRemove(event)
        {
          this.value='';
          const valueRemoved=event.target.name;
          this.allValues.splice(this.allValues.indexOf(valueRemoved),1);
          this.modifyOptions();
        }
      
        modifyOptions()
        {
          this.eventType=this.eventMaster.filter(elem=>{
            if(!this.allValues.includes(elem.value))
              return elem;
          })
        }
         
        
      

        updatevalue(event)
        {
          console.log('the updated value is'+event.target.value);
          console.log('the updated name is'+event.target.name);

          let value=event.target.value;
          let field=event.target.name;
          if(field=='Document Number(SAP)')
          {
            this.demand.SapDocumentNumber=value;
          }
          if(field=='Distributor Name')
          {
            this.demand.distributorName=value;
          }
          
          if(field=='Type')
          {
            this.demand.type=value;
          }
          if(field=='Event Name')
          {
            this.demand.eventName=value;
          }
          
          if(field=='Status')
          {
            this.demand.status=value;
          }
          if(field=='Sub Status')
         {
            this.demand.subStatus=value;
          }
          if(field=='Error Message')
          {
            this.ErrorMessage=value;
          }
          if(field=='Participate Profile')
          {
            this.demand.participateProfile=value;
          }
          if(field=='Total Value R$')
          {
            this.demand.totalValue=value;
            console.log('total value is',this.TotalValueR$);
          }
          if(field=='Planned Value R$')
          {
            this.demand.plannedValue=value;
          }
          if(field=='Budget Available R$')
          {
            this.demand.budgetAvailable=value;
          }
          if(field=='Actual Budget R$')
          {
            this.demand.actualBudget=value;
          }
          if(field=='Balance $')
          {
            this.demand.balance=value;
          }
          if(field=='Important Information')
          {
            this.demand.importantInformation=value;
          }
          if(field=='Credit Letter')
          {
            this.demand.creditLetter=value;
          }
          if(field=='Payment to Supplier')
          {
            this.demand.paymenttoSupplier=value;
          }

          
          
          

        }

        handleSave(event)
        {
         updateDemandGeneration({wrapperdata : JSON.stringify(this.demand)})
            .then(result => {
                console.log('data length',result.length);
                if(result.length>0){
                    if(result == 'success'){
                          console.log('in Success'); 
                          this.showToastmessage('Success','Success msg..','Success');                    
                    }
                    else{
                       console.log('in Else Part');
                       this.showToastmessage('ErrorT','FailToCreateRecord','Error');
                    }
                    
                }                
                    
            })
            .catch(error => {
                
            console.log('in Catch BLock');
               
            })
         
        }

        showToastmessage(title,message,varient){
         this.dispatchEvent(
             new ShowToastEvent({
                 title: title,
                 message: message,
                 variant: varient,
             }),
         );
     }     
     

     handleAccountSelected(event){
      this.flag = 'None';
      this.accountName = event.detail.recName;
      this.accountId = event.detail.recId;
      this.demand.distributorName=this.accountName;
  
  }

     handleRemoveAccount(event){
      this.flag = 'None';
      this.accountName = '';
      this.accountId = '';
  }







}