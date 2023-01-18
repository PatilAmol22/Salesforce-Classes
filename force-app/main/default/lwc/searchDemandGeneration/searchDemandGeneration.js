import { LightningElement, api, track, wire} from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { NavigationMixin } from 'lightning/navigation';
import modal from "@salesforce/resourceUrl/Loadstyle";
import getSearchDemandGeneration from '@salesforce/apex/SearchDemandGenerationCls.getSearchDemandGeneration';
import { loadStyle } from "lightning/platformResourceLoader";

const VALUE = [  
{label:'Document Number SAP',fieldName:'SAP_Document_Number__c'},     
{label:'Planned Value',fieldName:'Planned_Value__c'},
{label:'Actual Value',fieldName:'Actual_Budget__c'},
{label:'Status',fieldName:'Status__c'},
{label:'Action',fieldName:'DemandGenerartionURL',type: 'url', typeAttributes:{label:'View',target:'_blank'}}
];  

export default class SearchDemandGeneration extends NavigationMixin(LightningElement){

balance='';
show=false;    
showComponent = false;
columns = VALUE;
@api recordId;
@track data = [];
accSet=[];
recId;
@track DGData=[];

connectedCallback() {
    loadStyle(this, modal);
  }

@wire(getSearchDemandGeneration,{racId:'$recordId'})
getSearchDemand({data, error}){

if(data){
    console.log("Data=",data);
    this.data = data;  
    let instance = window.location.origin;//Showing HTTP Url
    var tempDGList = [];  
    for (var i = 0; i < this.data.Demand_Generations__r.length; i++) {  
     let tempRecord = Object.assign({}, this.data.Demand_Generations__r[i]); //Clonning Object   
     tempRecord.DemandGenerartionURL = instance +"/" + tempRecord.Id;  
     tempDGList.push(tempRecord);  
    }  
    this.DGData = tempDGList; 
    // console.log("Data:",data)
    // this.DGData = this.data.Demand_Generations__r;
    // console.log('DGData:',this.DGData)
   // Object.keys(this.DGData).forEach(item => 
  // item['DemandGenerartionURL'] = '/lightning/r/Demand_Generation__c/' +item['Id'] +'/view');
    
    }
    else if(error){
    console.log("Error Occurred")
    }

}

closeModal(){
this.dispatchEvent(new CloseActionScreenEvent());
}

handleClick(){
this.showComponent = true;
}

navigateToEditTab() {
this[NavigationMixin.Navigate]({
type: 'standard__navItemPage',
attributes: {
    apiName: 'Demand_Generation'
},
});
}
}