import { LightningElement,api} from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import BillingAddress from '@salesforce/schema/Account.BillingAddress';
import ShippingAddress from '@salesforce/schema/Account.ShippingAddress';


export default class RecordViewForm extends LightningElement {
BillingAddressField = BillingAddress;

ShippingAddressField = ShippingAddress;
nameField =NAME_FIELD;
ObjectApiName = ACCOUNT_OBJECT;

@api recordId;
@api ObjectApiName;
}