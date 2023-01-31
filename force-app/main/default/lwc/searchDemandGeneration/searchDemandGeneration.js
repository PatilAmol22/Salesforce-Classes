import { LightningElement, api, track, wire} from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { NavigationMixin } from 'lightning/navigation';

//Style Load For Popup Size
import modal from "@salesforce/resourceUrl/Loadstyle"; 
import { loadStyle } from "lightning/platformResourceLoader";

// Apex Methods
import getSearchDemandGeneration from '@salesforce/apex/SearchDemandGenerationCls.getSearchDemandGeneration';
import fetchAvailableBudget from '@salesforce/apex/ServiceHelper.fetchAvailableBudget';


const VALUE = [  
{label:'Document Number SAP',fieldName:'SAP_Document_Number__c'},     
{label:'Planned Value',fieldName:'Planned_Value__c'},
{label:'Actual Budget',fieldName:'Actual_Budget__c'},
{label:'Status',fieldName:'Status__c'},
{label:'View',type: 'button', typeAttributes:{label:'View',name:'View',target:'_blank',variant: 'base'}},
{label:'Edit',type: 'button', typeAttributes:{label:'Edit',name:'Edit',target:'_blank',variant: 'base'}}
];  

export default class SearchDemandGeneration extends NavigationMixin(LightningElement){

@track balance;
show=false;    
showComponent = false;
columns = VALUE;
@api recordId;
@track data = [];
accSet=[];
recId;
@track DGData=[];
@track dgId;
@track dgname;
@track demandId;
@track disableButton = true;

// ShowDGComponent = false;
// @api LWCFunction()
// {
//   this.ShowDGComponent = true; 
// }

connectedCallback() {
  loadStyle(this, modal);

}

renderedCallback()
{
console.log('record id is 2',this.recordId);
this.dgId=this.recordId;
console.log('dgId:'+this.dgId);
}

@wire(getSearchDemandGeneration,{racId:'$recordId'})
getSearchDemand({data, error}){

if(data){
  console.log("Data=",data);
  this.data = data;
  this.dgname=this.data.Name;
  console.log('data name',this.dgname);
    
  let instance = window.location.origin;
  if(this.data.Demand_Generations__r != null){
    console.log('inside IF:',JSON.parse(JSON.stringify(this.data.Demand_Generations__r)))

this.DGData=JSON.parse(JSON.stringify(this.data.Demand_Generations__r));
  
    }
}
  else if(error){
  console.log("Error Occurred")
}

}

@wire(fetchAvailableBudget)
AvailableBudget({data, error}){
  if(data){
    console.log('inside AvailableBudget If:',data);
    this.balance=data.resBudgetAvailable;
    if(parseInt(this.balance) > 0){
      console.log('Inside Budget IF');
      this.disableButton = false;
    }
    else{
      console.log('Inside Budget ELSE ');
      this.disableButton = true;
    }
    
  }
  if(error){
    console.log('inside Error',error);
  }
}


closeModal(){
this.dispatchEvent(new CloseActionScreenEvent());
//this.ShowDGComponent = false;
}

handleClick(){
this.showComponent = true;
}

handleRowAction(event){
const actionName = event.detail.action.name;
const row = event.detail.row;
if(actionName==='View'){
  console.log('Inside Row Action ',JSON.stringify(row));
  this[NavigationMixin.Navigate]({
    type: 'standard__recordPage',
    attributes: {
        recordId: row.Id,
        actionName: 'view'
    }
  });
} else if(actionName==='Edit'){
  event.preventDefault();
    this.demandId = row.Id;
    this.handleNavigation(this.dgId,this.dgname,this.demandId);
}

}

navigateToEditTab(event) {
event.preventDefault();
this.handleNavigation(this.dgId,this.dgname,null);
}

handleNavigation(dgId,dgName,demandId){
console.log('Demand Generation ID is:'+demandId);
let compDetails = {
    componentDef: "c:demandGeneration",
    attributes: {
      newdgid:dgId,
      newdgname:dgName,
      newdgdata:demandId


    }
};
let encodedComponentDef = btoa(JSON.stringify(compDetails));
this[NavigationMixin.Navigate]({
    type: 'standard__webPage',
    attributes: {
        url: '/one/one.app#' + encodedComponentDef
    }
  })
}

}