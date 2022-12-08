import { LightningElement,track } from 'lwc';
import getAccountList from '@salesforce/apex/ImparativeDemoClass.getAccountList';


const columns = [
    {label:'Account Id', fieldName:'Id'},
    {label:'Account Name', fieldName:'Name'},
];

export default class ImparativeDemo extends LightningElement {

    @track columns = columns;
    @track data=[];

    connectedCallback(){
        getAccountList()
        .then(result => {
            this.data = result;
        })
        .catch( error => {
            console.log("Error Occurred");
        })
    }
}