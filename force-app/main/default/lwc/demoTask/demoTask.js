import { LightningElement } from 'lwc';
import fetchAccountsId from '@salesforce/apex/DemoTaskAccount.fetchAccountsID'; 
 
  
const COLUMNS = [  
    { label: 'Id', fieldName: 'Id' },     
    {label:'Preview', type: "button-icon", typeAttributes: {  
        iconName: 'utility:preview', 
        name: 'View',  
        title: 'View',  
        disabled: false,  
        value: 'view',  
        iconPosition: 'left'  
    } }
];  


export default class demoTask extends LightningElement{  
  
    accounts;  
    error;  
    columns = COLUMNS;
    AccountId1;
    isModalOpen =false;
    showChild = false;


    connectedCallback()
    {
        fetchAccountsId( )    
        .then(result => {  

            this.accounts = result;  

        })  
        .catch(error => {  

            this.error = error;  

        });  
    }
    
    
    callRowAction( event ) {  
          
        const recId =  event.detail.row.Id;  
        const actionName = event.detail.action.name;  
       console.log('recIdparent:'+recId);
        this.showChild = true;
        this.AccountId1 = recId;
    } 

    handleClose(){
        this.showChild = false;

    }

    
}