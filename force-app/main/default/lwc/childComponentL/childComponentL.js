import { LightningElement } from 'lwc';

export default class ChildComponentL extends LightningElement {
handleSubtract(){
this.dispatchEvent(new CustomEvent('subtract'));
}

handleAdd(){
    this.dispatchEvent(new CustomEvent('add'));
}
}