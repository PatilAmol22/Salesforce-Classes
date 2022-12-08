import { LightningElement,api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import Account_Name from '@salesforce/schema/Account.Name';
import Account_Number from '@salesforce/schema/Account.AccountNumber';
import Account_Phone from '@salesforce/schema/Account.Phone';
import Account_Website from '@salesforce/schema/Account.Website';

export default class RecordEditForm extends LightningElement {

    ObjectApiName = ACCOUNT_OBJECT;
    nameField = Account_Name;
    numberField = Account_Number;
    phoneField = Account_Phone;
    websiteField = Account_Website;

    handleSuccess(event){

        const events = new ShowToastEvent({
            title : "Successful",
            message:"Account Created",
            variant : 'success'
        });
        this.dispatchEvent(events);
    }
}