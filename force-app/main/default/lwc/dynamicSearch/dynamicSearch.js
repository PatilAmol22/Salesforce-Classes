import { LightningElement, track,api,wire} from 'lwc';
import retrieveAccounts from '@salesforce/apex/SearchRecordsController.getAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 
const columns = [
                    {label: 'Name', fieldName: 'Name', type: 'text', },
                    {label: 'Account Number', fieldName: 'AccountNumber', },
                    {label: 'Phone', fieldName: 'Phone', type: 'phone', },
                    {label: 'Email',fieldName: 'Email__c'},
                    {label: 'Date' , fieldName: 'Date__c'},
                    {label: 'Ownership', fieldName: 'Ownership' },
                   
                ];
export default class SearchRecordLWC extends LightningElement {
  
    @track items = []; //contains all the records.
    @track data; //data  displayed in the table
    @track columns = columns; //holds column info.
  
    @track searchText = '';
    @track searchType = '';
    @track isLoading = false;
    @track modalFieldInfo;
    @track data;
    @track currentPageSize = 0;
 
 
    get searchOptions() {
        return [
            { label: 'Select Search Type', value: '' },
            { label: 'Account Name', value: 'Name' },
            { label: 'Account Phone', value: 'Phone' },
            { label: 'Account Number', value: 'Number' }
        ];
    }

    @wire(retrieveAccounts, { accId: '$recordId' })
    Accounts;
    
    //check field validation
    handleCheckValidation() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.fieldvalidate');
        inputFields.forEach(inputField => {
            if(!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
            }
        });
        return isValid;
    }
 
    searchAccount(){
        if(this.handleCheckValidation()) {
           window.console.log('Inside Search');
            this.isLoading = true;
            retrieveAccounts({searchText : this.searchText, searchType : this.searchType})
            .then(data=>{
                console.log(data);
                this.data = this.items = data.AccList;
                window.console.log('Inside For');
                var parseData = data.AccList;
                parseData.forEach(record=>{
                    record.linkName = '/'+record.OwnerId;
                });
                this.items = parseData;
                window.console.log('Outside For');
                this.totalRecountCount = data.AccList.length;
                this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);
                //here we slice the data according page size
                this.data = this.items.slice(0, this.pageSize); 
                this.endingRecord = this.data.length;
                this.error = undefined;
                this.isLoading = false;
                this.currentPageSize = this.endingRecord - this.startingRecord + 1;
            }) .catch(error=>{
                console.log(error);
                this.error = error;
                this.data = undefined;
                this.isLoading = false;
                this.showToast(this.error, 'Error', 'Error'); //show toast for error
            })
        }
    }
 
    handleSearchTypeChange(event){
        this.searchType = event.detail.value;
    }
 
    handleChange(event){
        if(event.target.name == 'SearchText'){
            this.searchText = event.target.value;
        }else{
            this.searchText = event.target.value;
            this.searchType = event.target.name;
        }
    }
 
    showToast(message, variant, title) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    } 
}