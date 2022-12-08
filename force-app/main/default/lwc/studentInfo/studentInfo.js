import { LightningElement} from 'lwc';
import { createRecord } from "lightning/uiRecordApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import ACCOUNTNUM_FIELD from "@salesforce/schema/Account.AccountNumber";
import Phone_FIELD from "@salesforce/schema/Account.Phone";


export default class StudentInfo extends LightningElement {


  name;
  accountnumber;
  phone;
  data = [];

  handleChange(e) {
    if (e.target.label === "Name") {
    
      //this is name input textbox
      this.name = e.target.value;
      console.log(this.name);
    
    } else if (e.target.label === "Account Number") {
    
      //this is rating input textbox
      this.accountnumber = e.target.value;
      console.log(this.accountnumber);
    }else if (e.target.label === "Phone Number") {
    
        //this is rating input textbox
        this.phone = e.target.value;
        console.log(this.phone);
  }
}

  handleClick() {
    console.log('ONclick');

    const fields = {};

    fields[NAME_FIELD.fieldApiName] = this.name;
    fields[ACCOUNTNUM_FIELD.fieldApiName] = this. accountnumber;
    fields[Phone_FIELD.fieldApiName] = this.phone;
        
    const recordInput = {
      apiName: ACCOUNT_OBJECT.objectApiName,
      fields: fields
    };
        
        
    createRecord(recordInput).then((record) => {
      console.log(record);
      alert("Account Created!!!");
      this.data = record;
    });
  }
}



