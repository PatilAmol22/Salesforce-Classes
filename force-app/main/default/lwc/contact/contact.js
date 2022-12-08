import { LightningElement ,api, wire, track} from 'lwc';
import getContacts from '@salesforce/apex/project.getContacts';
import getContactsSearch from '@salesforce/apex/project.getContactsSearch';
export default class LightningDatatableLWCExample extends LightningElement {
    @track contacts;
    searchValue = '';
    updateKey(event){
        this.searchValue = event.target.value;
    }
    //@wire(getContacts)
    handleSearch(){
        //call the Apex method
        getContactsSearch({searchkey: this.searchValue })
        .then(result=>{
            this.contacts = result;
        })
        .catch(error =>{
            this.contacts = null;                
        });
    }
    columns = [{
        label: 'Contact FirstName',
        fieldName: 'FirstName',
        type: 'text',
        sortable: true
    },
    {
        label: 'Contact LastName',
        fieldName: 'LastName',
        type: 'text',
        sortable: true
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'text',
        sortable: true
    },
    {
        label: 'Email',
        fieldName: 'Email',
        type: 'Email',
        sortable: true
    },
    {  
        label: "Account Name",  
        fieldName: "recordLink",  
        type: "url",
        sortable: true,
        editable: true,
        typeAttributes: { label: { fieldName: "AccountName" }, tooltip:"Name", target: "_blank" ,linkify: true},
        fixedWidth: 200, sortable: false, hideDefaultActions: true, wrapText: true,
    },
    {
        label: 'Created Date',
        fieldName: 'CreatedDate',
        type: 'text',
        sortable: true
    }
];
@track error;
@track contacts ;
@wire(getContacts)
wiredAccounts({
    error,
    data
}) {
    if (data) {
        var ObjData = JSON.parse(JSON.stringify(data));
        alert(JSON.stringify(data));
        ObjData.forEach(Record => {
        Record.recordLink = "/" + Record.AccountId;  
        Record.AccountName = Record.Account.Name;
        //Record.recordLink = Record.Name;
        });
        this.contacts = ObjData;
    } else if (error) {
        this.error = error;
    }
}
@track recordsCount = 0;
selectedRecords = [];
getSelectedRecords(event) {
    const selectedRows = event.detail.selectedRows;        
    this.recordsCount = event.detail.selectedRows.length;
    let conIds = new Set();
    for (let i = 0; i < selectedRows.length; i++) {
        conIds.add(selectedRows[i].Id);
    }
    this.selectedRecords = Array.from(conIds);
    if(this.recordsCount > 0){
        this.isDeleteButtonDisabled = false;
    }
    else{
        this.isDeleteButtonDisabled = true;
    }
}
deleteContacts(){
    if(this.selectedRecords){
        let promises = new Set();
        for(let i = 0; i < this.selectedRecords.length; i++){
            promises.add(deleteRecord(this.selectedRecords[i])); // deleteRecords - 
   
        Promise.all(promises).then(records =>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact deleted',
                    variant: 'success'
                })
            );                
            this.selectedRecords = [];
            this.isDeleteButtonDisabled = true;
            return refreshApex(this.contacts);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error deleting record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
}
}