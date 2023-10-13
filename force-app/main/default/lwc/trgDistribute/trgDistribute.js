import { LightningElement} from 'lwc';
import modal from "@salesforce/resourceUrl/Loadstyle";
import { loadStyle } from "lightning/platformResourceLoader";


export default class DistributeTargetAssignment extends LightningElement {

//@track listOfDistribute;
ShowDistributionPeriod = false;
ShowDistributionmodal = true;
popupName = '';
listOfDistribute = [];
    keyIndex = 0;

connectedCallback() {
    loadStyle(this, modal);
    this.handleAddRow();
    }


handleConfig(event){
    this.ShowDistributionPeriod = !this.ShowDistributionPeriod;
    console.log('Name ',event.target.dataset.name);
    this.popupName = event.target.dataset.name;
    this.ShowDistributionmodal = false;

}

handleAddRow() {
    let objRow = {
        Name: '',
        TargetPercentage: '',
        TargetCurrencyValue: '',
        id: ++this.keyIndex
    }

    this.listOfDistribute = [...this.listOfDistribute, Object.create(objRow)];
}

handleRemoveRow(event) {
    console.log("Inside Remove")
    this.listOfDistribute = this.listOfDistribute.filter((ele) => {
        // eslint-disable-next-line radix
        return parseInt(ele.id) === parseInt(event.currentTarget.dataset.index);
    });

    if (this.listOfDistribute.length === 0) {
        this.handleAddRow();
    }
}


closeModal() {
// to close modal set openSuperAdminModel tarck value as false
this.ShowDistributionPeriod = false;
this.ShowDistributionmodal = false;
}
submitDetails() {
// to close modal set openSuperAdminModel tarck value as false
//Add your code to call apex method or do some processing
this.ShowDistributionPeriod = false;
}

}