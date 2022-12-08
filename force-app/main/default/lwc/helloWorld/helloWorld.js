import { LightningElement, track } from 'lwc';
import fetchObjectList from '@salesforce/apex/ServerSidePaginationController.fetchObjectList';
import fetchFieldsList from '@salesforce/apex/ServerSidePaginationController.fetchFieldsList';
import fetchRecords from '@salesforce/apex/ServerSidePaginationController.fetchRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ServerSidePagination extends LightningElement {

    @track objectList;
    @track selectedObject;
    @track fieldsList;
    @track selectedFields;
    @track pageNumber = 1;
    @track recordSize = '10';
    @track records;
    @track totalRecords;
    @track totalPages;
    @track columns;
    @track values;
    @track showSpinner;
    
    constructor() {
        super();
        this.showSpinner = true;
        fetchObjectList()
        .then(result => {
            this.objectList = result;
            this.showSpinner = false;
        }).catch(error => {
            console.log(error);
            this.showSpinner = false;
        })
    }

    handleObjectChange(event) {
        this.selectedFields = [];
        this.values = [];
        this.showSpinner = true;
        this.selectedObject = event.detail.value;
        fetchFieldsList({
            objectName : event.detail.value
        })
        .then(result => {
            this.fieldsList = result;
            this.showSpinner = false;
        }).catch(error => {
            console.log(error);
            this.showSpinner = false;
        })
    }

    handleFieldsChange(event) {
        this.selectedFields = event.detail.value;
    }

    get disablePreviousButtons() {
        if(this.selectedFields == undefined || this.selectedFields.length == 0 || this.pageNumber == 1)
            return true;
    }

    get disableNextButtons() {
        if(this.selectedFields == undefined || this.selectedFields.length == 0 || this.pageNumber == this.totalPages)
            return true;
    }

    get getRecordSizeList() {
        let recordSizeList = [];
        recordSizeList.push({'label':'10', 'value':'10'});
        recordSizeList.push({'label':'25', 'value':'25'});
        recordSizeList.push({'label':'50', 'value':'50'});
        recordSizeList.push({'label':'100', 'value':'100'});
        return recordSizeList;
    }

    get disableCombobox() {
        if(!this.records || this.records.length == 0)
            return true;
    }

    get recordViewMessage() {
        return 'Total Records - ' + this.totalRecords + ' | Current Page - ' + this.pageNumber + '/' + this.totalPages;
    }

    handleNavigation(event){
        let buttonName = event.target.label;
        if(buttonName == 'First') {
            this.pageNumber = 1;
        } else if(buttonName == 'Next') {
            this.pageNumber = this.pageNumber >= this.totalPages ? this.totalPages : this.pageNumber + 1;
        } else if(buttonName == 'Previous') {
            this.pageNumber = this.pageNumber > 1 ? this.pageNumber - 1 : 1;
        } else if(buttonName == 'Last') {
            this.pageNumber = this.totalPages;
        }
        this.fetchRecords();
    }

    handleRecordSizeChange(event) {
        this.recordSize = event.detail.value;
        this.pageNumber = 1;
        this.fetchRecords();
    }

    fetchRecords(event) {
        this.showSpinner = true;
        fetchRecords({
            objectName : this.selectedObject,
            fieldsList : this.selectedFields,
            pageNumber : this.pageNumber,
            recordSize : Number(this.recordSize)
        })
        .then(result => {
            if(result != null && result != undefined) {
                this.records = result.records;
                this.totalRecords = result.totalRecords;
                this.totalPages = Math.ceil(result.totalRecords / Number(this.recordSize));

                var fieldsColumn = [];
                for(var i = 0; i < this.fieldsList.length; i++) {
                    for(var j = 0; j < this.selectedFields.length; j++) {
                        if(this.fieldsList[i].value == this.selectedFields[j]) {
                            fieldsColumn.push(this.fieldsList[i]);
                        }
                    }
                }

                var columnList = [];
                for(var j = 0; j < fieldsColumn.length; j++) {
                    columnList.push({'label': fieldsColumn[j].label, 'fieldName': fieldsColumn[j].value, 'type': fieldsColumn[j].datatype});
                }
                this.columns = columnList;
            }
            const accordion = this.template.querySelector('.pagination-accordion');
            accordion.activeSectionName = 'B';
            this.showSpinner = false;
        }).catch(error => {
            console.log(error);
            if(error && error.body && error.body.message)
                this.showNotification(error.body.message, 'error');
            this.showSpinner = false;
        })
    }

    showNotification(message, variant) {
        const evt = new ShowToastEvent({
            'message': message,
            'variant': variant
        });
        this.dispatchEvent(evt);
    }
}