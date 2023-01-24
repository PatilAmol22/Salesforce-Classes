import { LightningElement,api,track,wire} from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import fetchFiles from '@salesforce/apex/Fileuploadcttrl.fetchFiles';
import deleteFile from '@salesforce/apex/Fileuploadcttrl.deleteContentDocument';


const columns = [
        { label: 'File Name', fieldName: 'Title' }, 
        
        { label: 'Download', type:  'button', typeAttributes: { 
            label: 'Download', name: 'Download', variant: 'brand', cellAttributes:{iconName: 'action:download'}, 
            iconPosition: 'right' 
        } 
        },
        { label: 'Delete', type:  'button', typeAttributes: { 
            label: 'Delete',   name: 'Delete',   variant: 'destructive',cellAttributes:{iconName: 'standard:record_delete'}, 
            iconPosition: 'right' 
        }
        }
];

export default class Attachment extends NavigationMixin(LightningElement) {

    recordId= 'a440k000000GI9hAAG';
    @track filesList =[];
    columnsList = columns;
    
    get acceptedFormats() {
        return ['.pdf','.png','.jpg','.txt'];
    }

    
    connectedCallback(){
            this.syncAllData();
    }
 
    handleUploadFinished(event) {
       console.log('inside handleUpload')
       this.syncAllData()
}

handleRowAction(event){
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    if(actionName==='Download'){
        console.log('RowId:',JSON.stringify(row));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: row.Download
            }
        }, false 
    );

    // }else if (actionName==='Preview'){
    //     this[NavigationMixin.Navigate]({ 
    //         type:'standard__namedPage',
    //         attributes:{ 
    //             pageName:'filePreview'
    //         },
    //         state:{ 
    //             selectedRecordId:row.ContentDocumentId
    //         }
    //     })
    }else if(actionName==='Delete'){
        deleteFile({recordId:row.ContentDocumentId})
        .then(result=>{
            this.filesList  = this.filesList.filter(item => {
                return item.ContentDocumentId !== row.ContentDocumentId ;
            });
        })
    }

}

syncAllData(){
    
    fetchFiles({recordId:this.recordId})
    .then(data=>{
        let Filearr = [];
        console.log('data:',data);
        Filearr = Object.values(data).map(item=>{
            return {
                ...item,Title:item.Title,Download:window.location.origin+'/sfc/servlet.shepherd/document/download/'+item.ContentDocumentId
            }
        })
        console.log('Values:',Filearr )
        this.filesList = Filearr;
    
    })
    
    
}

}