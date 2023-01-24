import { LightningElement,api } from 'lwc';

export default class LWCComponentCallInAura extends LightningElement 
{  
    DisplayText = false;
    textValue='LWC Function Invoked through Aura Component'  
    @api LWCFunction()
    {
      this.DisplayText = true; 
    }
  }