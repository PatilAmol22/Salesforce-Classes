import { LightningElement,track } from 'lwc';
import getAccountInfo from '@salesforce/apex/ComboBoxDemo.getAccountInfo'

export default class ComboxDemo extends LightningElement {
@track value = '';
@track accoption = [];

get options(){
   
    return this.accoption;
 }

 connectedCallback(){
     getAccountInfo()
     .then(result => {
         let arr = [];
         for(var i = 0; i<result.length;i++){
          arr.push({label : result[i].Name , value : result[i].Id})
         }

         this.accoption = arr;
         

     })
 }

 handleChanged(event){

    this.value = event.detail.value;
 }
}