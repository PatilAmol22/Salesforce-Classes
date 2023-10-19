import { LightningElement } from 'lwc';

export default class TrgCallButton extends LightningElement {

showDistribution=false;

handleclick(){
console.log(this.showDistribution)
this.showDistribution=true;
}

}