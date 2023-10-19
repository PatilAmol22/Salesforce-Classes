import { LightningElement,api,track} from 'lwc';
import modal from "@salesforce/resourceUrl/Loadstyle";
import saveData from '@salesforce/apex/TRG_DistributeController.saveData'; 

import { loadStyle } from "lightning/platformResourceLoader";


// eslint-disable-next-line @lwc/lwc/no-leading-uppercase-api-name
export default class DistributeTargetAssignment extends LightningElement {

@track listOfDistribution;
@track listOfDistributionperiod;
@api showDistributionmodal;
showDistributionPeriod = false;
popupName = '';
@track PBookId = '';
@track productItem ='Id != null';

connectedCallback() {
loadStyle(this, modal);
let listOfDistribution = [];
let listOfDistributionperiod = [];
this.createRow1(listOfDistribution);
this.createRow2(listOfDistributionperiod);
this.listOfDistribution = listOfDistribution;
this.listOfDistributionperiod = listOfDistributionperiod;

}

createRow1(listOfDistribution) {
    let accObject = {};
    if(listOfDistribution.length > 0) {
        accObject.index = listOfDistribution[listOfDistribution.length - 1].index + 1;
    } else {
        accObject.index = 1;
    }
    accObject.AccountName = null;
    accObject.TargetPercentage = null;
    accObject.TargetCurrencyValue = null;
    listOfDistribution.push(accObject);
}

createRow2(listOfDistributionperiod) {
    let prodObject = {};
    if(listOfDistributionperiod.length > 0) {
        prodObject.index = listOfDistributionperiod[listOfDistributionperiod.length - 1].index + 1;
    } else {
        prodObject.index = 1;
    }

    prodObject.PriceBook = '';
    prodObject.ProductName = '';
    prodObject.ListPrice = null;
    prodObject.TargetPercentage = null;
    prodObject.TargetCurrencyValue = null;
    prodObject.TargetValue = null;
    listOfDistributionperiod.push(prodObject);
}

handleAddRow1() {
    this.createRow1(this.listOfDistribution);
}

handleAddRow2() {
    this.createRow2(this.listOfDistributionperiod);
}


//remove method for Account
handleRemoveRow1(event) {
    let toBeDeletedRowIndex1 = event.target.name;
    console.log('In Remove==',toBeDeletedRowIndex1)

    let listOfDistribution = [];
    for(let i = 0; i < this.listOfDistribution.length; i++) {
        let tempRecord = Object.assign({}, this.listOfDistribution[i]); 
        if(tempRecord.index !== toBeDeletedRowIndex1) {
            listOfDistribution.push(tempRecord);
        }
    }

    for(let i = 0; i < listOfDistribution.length; i++) {
        listOfDistribution[i].index = i + 1;
    }

    this.listOfDistribution = listOfDistribution;
}

//remove method for Product
handleRemoveRow2(event) {
    let toBeDeletedRowIndex2 = event.target.name;
    console.log('In Remove2==',toBeDeletedRowIndex2)

    let listOfDistributionperiod = [];
    for(let i = 0; i < this.listOfDistributionperiod.length; i++) {
        let tempRecord = Object.assign({}, this.listOfDistributionperiod[i]); 
        if(tempRecord.index !== toBeDeletedRowIndex2) {
            listOfDistributionperiod.push(tempRecord);
        }
    }

    for(let i = 0; i < listOfDistributionperiod.length; i++) {
        listOfDistributionperiod[i].index = i + 1;
    }

    this.listOfDistributionperiod = listOfDistributionperiod;
}

handleConfig(event){
this.showDistributionPeriod = !this.showDistributionPeriod;
console.log('Name ',event.target.dataset.name);
this.popupName = event.target.dataset.name;
// eslint-disable-next-line @lwc/lwc/no-api-reassignments
this.showDistributionmodal = false;
}

closeModal() {
this.showDistributionPeriod = false;
// eslint-disable-next-line @lwc/lwc/no-api-reassignments
this.showDistributionmodal = false;
}

async submitDetails() {
this.showDistributionPeriod = false;

let inputWrapper = [];

for(let i=0;i<this.listOfDistribution.length;i++){
    inputWrapper = [...inputWrapper,{AccountName:this.listOfDistribution[i].AccountName,TargetPercentage:this.listOfDistribution[i].TargetPercentage,TargetCurrencyValue:this.listOfDistribution[i].TargetCurrencyValue}]
}
let result = saveData({iWrap:inputWrapper})
console.log("Result is:=="+result);

}

handleInputChange(event){
    // eslint-disable-next-line no-alert
   // alert('Selected Record Value on Parent Component is ' +  JSON.stringify(event.detail.selectedRecord));
    
    let index = event.target.dataset.id;
    let fieldName = event.target.name;
    let value = event.target.value;

    for(let i = 0; i < this.listOfDistribution.length; i++) {
        if(this.listOfDistribution[i].index === parseInt(index)) {
            this.listOfDistribution[i][fieldName] = value;

            if(this.listOfDistribution[i]['AccountName'] != null && this.listOfDistribution[i]['TargetPercentage'] != null){
                console.log('inside total>>>'+this.listOfDistribution[i]['AccountName']+'>>'+this.listOfDistribution[i]['TargetPercentage'])
                //this.listOfDistribution[i]['Total'] = this.listOfDistribution[i]['Account Name']*this.listOfDistribution[i]['Target Percentage']
                //console.log('???'+this.listOfDistribution[i]['Total'])
            }
        }
    }
    console.log('data==',JSON.stringify(this.listOfDistribution))
}

//Lookup for Account 
handleLookupSelection(event){
    console.log(JSON.stringify(event.detail.selectedRecord));
    console.log(event.target.dataset.id);

    let index = event.target.dataset.id;
    let fieldName = event.target.name;
    let value = event.detail.selectedRecord.Name;

    for(let i = 0; i < this.listOfDistribution.length; i++) {
        if(this.listOfDistribution[i].index === parseInt(index)) {
            this.listOfDistribution[i][fieldName] = value;
        }
    }

    console.log('data111==',JSON.stringify(this.listOfDistribution))
}


//Lookup For PRoduct
handleselectChange(event){
console.log('event11:', event.detail.recName);

    let index = event.target.dataset.id;
    let fieldName = event.target.name;
    let value =  event.detail.recName;

    if(fieldName == 'PriceBook'){
        this.PBookId = event.detail.recId;
        this.productItem = 'Id IN (SELECT Product2Id FROM PricebookEntry WHERE Pricebook2Id =\''+this.PBookId+'\')';
    for(let i = 0; i < this.listOfDistributionperiod.length; i++) {
        if(this.listOfDistributionperiod[i].index === parseInt(index)) {
            this.listOfDistributionperiod[i][fieldName] = value;
            this.listOfDistributionperiod[i]['ProductName'] = '';

        }
    }
}

    if(fieldName == 'ProductName'){
        for(let i = 0; i < this.listOfDistributionperiod.length; i++) {
            if(this.listOfDistributionperiod[i].index === parseInt(index)) {
                this.listOfDistributionperiod[i][fieldName] = value;
            }
        }
    }
  console.log('list of26525 ==',JSON.stringify(this.listOfDistributionperiod))

}

//product
removehandler(event){
    console.log('variable:', event.detail);
    let index = event.target.dataset.id;
    let fieldName = event.target.name;
   
    for(let i = 0; i < this.listOfDistributionperiod.length; i++) {
        if(this.listOfDistributionperiod[i].index === parseInt(index)) {
            this.listOfDistributionperiod[i][fieldName] = '';
        }
    }
  console.log('list of26525 ==',JSON.stringify(this.listOfDistributionperiod))

}
    

}
