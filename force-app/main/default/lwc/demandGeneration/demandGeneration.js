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
import Demand_Generation from '@salesforce/label/c.Demand_Generation';
import Contract_Number from '@salesforce/label/c.Contract_Number';
import Document_Number_SFDC from '@salesforce/label/c.Document_Number_SFDC';
import Document_Number_SAP from '@salesforce/label/c.Document_Number_SAP';
import Distributor_Name from '@salesforce/label/c.Distributor_Name';
import Type from '@salesforce/label/c.Type';
import Event_Name from '@salesforce/label/c.Event_Name';
import Event_Type from '@salesforce/label/c.Event_Type';
import Status from '@salesforce/label/c.Status';
import Sub_Status from '@salesforce/label/c.Sub_Status';
import Error_Message from '@salesforce/label/c.Error_Message';
import Participate_Profile from '@salesforce/label/c.Participate_Profile';
import Total_Value_R from '@salesforce/label/c.Total_Value_R';
import Planned_Value_R from '@salesforce/label/c.Planned_Value_R';
import Budget_Available_R from '@salesforce/label/c.Budget_Available_R';
import Actual_Budget_R from '@salesforce/label/c.Actual_Budget_R';
import Balance_new from '@salesforce/label/c.Balance_new';
import Important_Information from '@salesforce/label/c.Important_Information';
import Credit_Letter from '@salesforce/label/c.Credit_Letter';
import Payment_to_Supplier from '@salesforce/label/c.Payment_to_Supplier';
import Submit from '@salesforce/label/c.Submit';
import Cancel from '@salesforce/label/c.Cancel';


export default class DemandGeneration extends LightningElement {

   @track creditOption=[];
   @track type=[];
   @track eventType=[];
   @track eventMaster=[];
   @track status=[];
   @track subStatus=[];
   @track paymentToSuplier=[];
   @track filter1 = '';
   @track acc ={id:'',name:'',disable : false};
   @track _newdgid;
   @track _newdgname;
   
   @track labels = {
    Demand_Generation:Demand_Generation,
    Contract_Number:Contract_Number,
    Document_Number_SFDC:Document_Number_SFDC,
    Document_Number_SAP:Document_Number_SAP,
    Distributor_Name:Distributor_Name,
    Type:Type,
    Event_Name:Event_Name,
    Event_Type:Event_Type,
    Status:Status,
    Sub_Status:Sub_Status,
    Error_Message:Error_Message,
    Participate_Profile:Participate_Profile,
    Total_Value_R:Total_Value_R,
    Planned_Value_R:Planned_Value_R,
    Budget_Available_R:Budget_Available_R,
    Actual_Budget_R:Actual_Budget_R,
    Balance_new:Balance_new,
    Important_Information:Important_Information,
    Credit_Letter:Credit_Letter,
    Payment_to_Supplier:Payment_to_Supplier, 
    Submit:Submit,
    Cancel:Cancel

    }
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
    @track recordId='';
    @track demandname='';
    
    connectedCallback() {
    this.getDemand();
    this.recordId=this._newdgid;
    this.demandname=this._newdgname;

    this.filter1 = `Account.Sales_Org_Code__c = '5191' and Name !='' ORDER BY Name ASC NULLS LAST limit 500`;

    console.log('parent record in connected',this.recordId);
    console.log('parent record name connected',this.demandname);
    
    }
    renderedCallback()
    {
      this.recordId=this._newdgid;
      this.demandname=this._newdgname;  

      console.log('parent record id in render',this.recordId);
      console.log('parent record name in render',this.demandname);
            
    }
    
     get newdgid()
     {
        return this._newdgid;
        }
    @api set newdgid(value)
     {
       this._newdgid=value;
       

     }
     get newdgname()
     {
        return this._newdgname;
        }
    @api set newdgname(value)
     {
       this._newdgname=value;
       

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

          
          if(!this.allValues.includes(this.value))
            this.allValues.push(this.value);

          // this.demand.eventType=this.allValues.join(';').toString();
           console.log('picklist value is',this.demand.eventType);
          
          this.modifyOptions();
        }
      
        handleRemove(event)
        {
          this.value='';
          const valueRemoved=event.target.name;
          this.allValues.splice(this.allValues.indexOf(valueRemoved),1);
          //this.demand.eventType=this.allValues.join(';').toString();
          this.modifyOptions();
        }
      
        modifyOptions()
        {
          this.eventType=this.eventMaster.filter(elem=>{
            if(!this.allValues.includes(elem.value))
            this.demand.eventType=this.allValues.join(';').toString();
              return elem;
          })
        }
         
        
      

        updatevalue(event)
        {
          console.log('the updated value is'+event.target.value);
          console.log('the updated name is'+event.target.name);

          let value=event.target.value;
          let field=event.target.name;
          this.demand.contractName=this.recordId;
          console.log('contract id is',this.demand.contractName);
          if(field=='Document Number(SAP)')
          {
            this.demand.SapDocumentNumber=value;
          }
        //  if(field=='Distributor Name')
        //  {
        //    this.demand.distributorName=value;
        //  }
          
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
      console.log();

      
  }

     handleRemoveAccount(event){
      this.flag = 'None';
      this.accountName = '';
      this.accountId = '';
  }
  
  
  handleAccount(event){
    this.acc.id = event.detail.recId;
    this.acc.name = event.detail.recName;
    this.demand.distributorName=this.acc.id;
  
    console.log('the account id is',this.acc.name);
    console.log(`Id ${this.acc.id} name ${this.acc.name}`);
}



  handleRemoveSalesRep(){
    console.log('Remove called')
    this.acc.id = '';
    this.acc.name = '';
  }


}