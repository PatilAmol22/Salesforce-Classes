import { LightningElement,api } from 'lwc';

export default class LWCComponentCallInAura extends LightningElement 
{  
    DisplayText = false;
    @api recordId;
    @api LWCFunction()
    {
      this.DisplayText = true; 
    }
  }