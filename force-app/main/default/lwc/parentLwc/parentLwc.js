import { LightningElement } from 'lwc';

export default class ParentLwc extends LightningElement {
    countvalue = 0;

    handleDecrement(){
        this.countvalue--;
    }

    handleIncrement(){
        this.countvalue++;
    }
}