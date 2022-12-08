import { LightningElement,track,wire,api } from 'lwc';
import getContactDetails from '@salesforce/apex/datatableWithRowSelection.getContactDetails';

const columns = [
    {label:'Name', fieldName:'Name'},
    {label:'Phone',fieldName:'Phone'},
];

export default class DatatabelWithRowSelection extends LightningElement {

    @track ShowContact ='Show Contacts';
    @track isVisible = false;
    columns = columns;
    @track data = [];
    @api recordId;//Store Current Page Record ID
    @api searchKey='';

    //Get related ContactList From Apex Class
    connectedCallback(){
        getContactDetails({lwcRecordId : this.recordId })
        .then(response => {
            this.data = response;
        })
        .catch(error =>{
            console.log("Error:"+error);
        })
    } 

    //Search Functionality
    handleChanged(event){
     this.searchKey = event.target.searchKey;

     //Send Search Key Value To Apex Method
     getContactDetails({searchKey : this.searchKey ,lwcRecordId : this.recordId })
     .then(res => {
         this.data = res;
     })
     .catch(error => {
         console.log(error);
     })

    }

// Show/Hide Toggle Button Handled Functionality
    handleClick(event){
        const label = event.target.label;

        if(label === 'Show Contacts'){
            this.ShowContact = 'Hide Contacts';
            this.isVisible = true;
        }
        else if(label ==='Hide Contacts'){
            this.ShowContact = 'Show Contacts';
            this.isVisible = false;
        }
    }
}