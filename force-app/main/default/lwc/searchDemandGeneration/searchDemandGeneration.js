import { LightningElement, api, track} from 'lwc';

const VALUE = [  
    {label:'Document Number SAP' },     
    {label:'Planned Value' },
    {label:'Actual Value'},
    {label:'Status' },
    {label:'View' }
    /*{ label: 'Document Number SAP', fieldName: 'DocumentNumberSAP' },     
    {label:'Planned Value',fieldName:'PlannedValue' },
    {label:'Actual Value',fieldName:'ActualValue' },
    {label:'Status',fieldName:'Status' },
    {label:'View',fieldName:'View' }*/
];  

export default class SearchDemandGeneration extends LightningElement {

balance='';
show=false;
columns = VALUE;
@api isModalOpen;
@api recId;



closeModal(){
   this.dispatchEvent(new CustomEvent('close'));
   

}
}