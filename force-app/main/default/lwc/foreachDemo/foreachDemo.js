import { LightningElement,wire,track } from 'lwc';
import getAccountDetails from '@salesforce/apex/ForEachDemoClass.getAccountDetails';


export default class ForeachDemo extends LightningElement {
@track data =[];

    @wire (getAccountDetails)
    AccData;
}