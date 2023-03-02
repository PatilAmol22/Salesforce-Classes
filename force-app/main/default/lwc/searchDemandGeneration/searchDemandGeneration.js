import { LightningElement, api, track, wire} from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { NavigationMixin } from 'lightning/navigation';

//Style Load For Popup Size
import modal from "@salesforce/resourceUrl/Loadstyle";
import { loadStyle } from "lightning/platformResourceLoader";

// Apex Methods
import getSearchDemandGeneration from '@salesforce/apex/SearchDemandGenerationCls.getSearchDemandGeneration';
import fetchAvailableBudget from '@salesforce/apex/ServiceHelper.fetchAvailableBudget';
import getAuthentication from '@salesforce/apex/ServiceHelper.getAuthentication';

import uId from '@salesforce/user/Id';
import Userprofile from '@salesforce/schema/User.Profile.Name'
import { getRecord } from 'lightning/uiRecordApi';


//Custom Labels
import Demand_Generation from '@salesforce/label/c.Demand_Generation';
import Contract_Number from '@salesforce/label/c.Contract_Number';
import Budget_Balance from '@salesforce/label/c.Budget_Balance';
import New from '@salesforce/label/c.New';
import close from '@salesforce/label/c.Close';
import Document_Number_SAP from '@salesforce/label/c.Document_Number_SAP';
import Planned_Value_R from '@salesforce/label/c.Planned_Value_R';
import Actual_Budget_R from '@salesforce/label/c.Actual_Budget_R';
import Status from '@salesforce/label/c.Status';
import Edit from '@salesforce/label/c.Edit';
import View from '@salesforce/label/c.View';

const VALUE = [  
  {label:Document_Number_SAP,fieldName:'SAP_Document_Number__c'},     
  {label:Planned_Value_R,fieldName:'Planned_Value__c'},
  {label:Actual_Budget_R,fieldName:'Actual_Budget__c'},
  {label:Status,fieldName:'Status__c'},
  {label:View,type: 'button', typeAttributes:{label:View,name:'View',target:'_blank',variant: 'base'}},
  {label:Edit,type: 'button', typeAttributes:{label:Edit,name:'Edit',target:'_blank',variant: 'base'},
  cellAttributes:{class:{fieldName:'buttonCss'}}}
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
@track ShowDGComponent;
@track rebateId;
@track profileName = false;
@track secretkey;

//Custom Labels
label = {
  Demand_Generation,
  Contract_Number,
  Budget_Balance,
  New,
  close,
  Document_Number_SAP,
  Planned_Value_R,
  Actual_Budget_R,
  Status,
  Edit,
  View
};

 @api lWCFunction(isTrueDgCmp,dgrecId)
 {
  console.log('variables are ==>',isTrueDgCmp,dgrecId);
 this.ShowDGComponent = isTrueDgCmp;
 this.recordId = dgrecId;
 getSearchDemandGeneration({racId:this.recordId}).then(result=>{
  try{
    console.log("Data=",result);
    this.data = result;
    this.dgname=this.data.Name;
    this.rebateId=this.data.Id;
    console.log('data name',this.dgname);
     
    if(this.data.Demand_Generations__r != null){
      console.log('inside IF:',JSON.parse(JSON.stringify(this.data.Demand_Generations__r)))

      this.DGData=(JSON.parse(JSON.stringify(this.data.Demand_Generations__r))).map(item=>{
        let hideEditButton = (item.Status__c === 'Open' || item.Status__c ==='Pending') ? 'hideEditButton' : '';
        return {...item,
                'buttonCss':hideEditButton
        }
      })
   
      }
    }catch(error){
      console.log('catch>>',error)
    }
 })
 }

connectedCallback() {
  console.log('when is loaded:');
  loadStyle(this, modal);
  this.getauthentication();

}


renderedCallback()
{
console.log('record id is',this.recordId);
this.dgId=this.recordId;
console.log('dgId:'+this.dgId);
this.getauthentication();
}


@wire(getRecord, { recordId: uId, fields: [Userprofile] })
userDetails({ error, data }) {
  if (data) {
    console.log('profile in wire', data.fields.Profile.displayValue);
    if (data.fields.Profile.displayValue == 'Brazil Sales Person') {
      this.profileName = true;
    }

  } else if (error) {
    this.error = error;
  }
}

/*@wire(fetchAvailableBudget)
AvailableBudget({data, error}){
  if(data){
    console.log('inside AvailableBudget If:',data);
    //Prashant
    this.balance=data.resBudgetAvailable;
    //this.balance='500';
    console.log('inside this.balance==:',this.balance);
    // eslint-disable-next-line radix
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
}*/


closeModal(){
this.dispatchEvent(new CloseActionScreenEvent());
this.ShowDGComponent = false;
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
    this.handleNavigation(this.rebateId,this.dgname,this.demandId);
}

}

navigateToEditTab(event) {
event.preventDefault();
this.handleNavigation(this.rebateId,this.dgname,null);
}

handleNavigation(rebateId,dgName,demandId){
console.log('Demand Generation ID is:'+demandId);
let compDetails = {
    componentDef: "c:demandGeneration",
    attributes: {
      newdgid:rebateId,
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

//Added by Prashant
getauthentication() {
  getAuthentication({racId:this.recordId}).then((data) => {
    console.log('secret key is',data);
    this.secretkey=data;
    fetchAvailableBudget({authentication:this.secretkey,newRebate:this.recordId})
    .then(res=>{
      if(res){
        console.log('inside AvailableBudget If:',res);
        //Prashant
        this.balance=res.resBudgetAvailable;
        //this.balance='500';
        console.log('inside this.balance==:',this.balance);
        // eslint-disable-next-line radix
        if(parseInt(this.balance) > 0){
          console.log('Inside Budget IF');
          this.disableButton = false;
        }
        else{
          console.log('Inside Budget ELSE ');
          this.disableButton = true;
        }
       
      }
    })
     
  })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log('In Final Block of fetch Balance Method');
    })
}
}