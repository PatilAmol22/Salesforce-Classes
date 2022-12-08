import { LightningElement, track } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

import Name_Field from '@salesforce/schema/Account.Name';
import Phone_Field from  '@salesforce/schema/Account.Phone';
import Website_Field from  '@salesforce/schema/Account.Website';


export default class RecordFormDemo extends LightningElement {
    
    @track fields = [Name_Field,Phone_Field,Website_Field] ;
    ObjectApiName = ACCOUNT_OBJECT;
    recordId = "0015j00000fJhCmAAK";
}