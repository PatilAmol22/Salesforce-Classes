import { LightningElement,api,track,wire} from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import fetchFiles from '@salesforce/apex/Fileuploadcttrl.fetchFiles';


// const columns = [
//     { label: 'File Name', fieldName: 'Name' }, 
// ];

export default class Attachment extends NavigationMixin(LightningElement) {

    recordId= 'a440k000000GI9hAAG';
    @track data;
    @track filesList =[];
    
    get acceptedFormats() {
        return ['.pdf','.png','.jpg','.txt'];
    }
 
    handleUploadFinished(event) {
        this.filesList=[]
        fetchFiles({recordId:this.recordId})
        .then(data=>{
            this.filesList = Object.keys(data).map(item=>({"label":data[item],
         "value": item,
         "url":`/sfc/servlet.shepherd/document/download/${item}`
        }))
        console.log(this.filesList)
        })
}

previewHandler(event){
    console.log(event.target.dataset.id)
    this[NavigationMixin.Navigate]({ 
        type:'standard__namedPage',
        attributes:{ 
            pageName:'filePreview'
        },
        state:{ 
            selectedRecordId: event.target.dataset.id
        }
    })
}
}