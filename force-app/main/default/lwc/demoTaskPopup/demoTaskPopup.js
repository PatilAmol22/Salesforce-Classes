import { LightningElement, api, track,wire} from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import getAccountList from '@salesforce/apex/AccountHelper1.getAccountList';

const VALUE = [  
    {label:'Document Number SAP',fieldName: 'Name',type: 'text',sortable: true},     
    {label:'Planned Value', fieldName: 'Type',
    type: 'text',
    sortable: true },
    {label:'Actual Value',fieldName: 'AnnualRevenue', type: 'Currency',
    sortable: true},
    {label:'Status', fieldName: 'Phone',
    type: 'phone',
    sortable: true},
    {label:'View',fieldName: 'Email__c',
    type: 'phone',
    sortable: true }
];  

export default class DemoTaskPopup extends LightningElement {
    
    balance='';
    show=false;
    @track columns = VALUE;
    @api recId;
    @track accdata=[];
    accSet=[];
    showChild1 = false;
     modal = true;


    connectedCallback(){
        console.log('recId::'+this.recId);
        this.accSet=[...this.accSet,this.recId];
        console.log('set=',this.accSet)
        getAccountList({acId:this.accSet})
        .then(result=>{
            this.accdata=result;
        })
    }

    // @wire(getAccountList,{acId:'$recId'}) wiredAccounts({
    //     error,
    //     data
    // }) {
    //     if (data) {
    //         this.accdata = data;
    //     } else if (error) {
    //        // this.error = error;
    //     }
    // }
    
    closeModal(){
       // this.show =true;
       //this.dispatchEvent(new CustomEvent('close'));
       this.modal = false;
       this.dispatchEvent(new CloseActionScreenEvent());

    }

    handleClick(){
        this.showChild1 = true;
    }
}