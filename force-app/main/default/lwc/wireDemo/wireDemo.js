import { LightningElement,wire,track } from 'lwc';
import getAccountlist from '@salesforce/apex/WireDemoClass.getAccountlist';

const columns = [
{label : 'Name',fieldName : "Name"},
{label :'Account Owner record ID', fieldName:'Id'},
];

export default class WireDemo extends LightningElement {
    @track columns = columns;
    @track data =[];

    @wire(getAccountlist)
    wiredAccount({data , error}){
        if(data){
           this.data = data;  
        }
        else if(error){
           console.log("Error Occurred")
        }
    }
}