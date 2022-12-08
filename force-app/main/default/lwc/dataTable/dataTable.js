import {LightningElement, track, wire} from 'lwc';
import getContacts from '@salesforce/apex/LWCExampleController.getContacts';
import delSelectedCons from '@salesforce/apex/LWCExampleController.deleteContacts';

// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

// importing to refresh the apex if any record changes the datas
import {refreshApex} from '@salesforce/apex';
import { createRecord } from 'lightning/uiRecordApi';
import conMainObject from '@salesforce/schema/Contact';
import conFirstName from '@salesforce/schema/Contact.FirstName';
import conLastName from '@salesforce/schema/Contact.LastName';
import conPhone from '@salesforce/schema/Contact.Phone';
import conEmail from '@salesforce/schema/Contact.Email';
import conDepartment from '@salesforce/schema/Contact.Department';
import conDescription from '@salesforce/schema/Contact.Description';
import level from '@salesforce/schema/Contact.Level__c';
import birthdate from '@salesforce/schema/Contact.Birthdate';
import { NavigationMixin } from 'lightning/navigation';

// row actions
const actions = [
    { label: 'Record Details', name: 'record_details'}, 
    { label: 'Edit', name: 'edit'}, 
    { label: 'Delete', name: 'delete'}
];

const columns = [
    { label: 'FirstName', fieldName: 'FirstName' }, 
    { label: 'LastName', fieldName: 'LastName' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone'}, 
    { label: 'Email', fieldName: 'Email', type: 'email' }, 
    { label: 'Department', fieldName: 'Department', type: 'department' },
    { label: 'Title', fieldName: 'Title', type: 'title' },
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions,
            menuAlignment: 'right'
        }
    }
];


export default class DataTableExample extends LightningElement {
    @track data;
    @track data1;
    @track columns = columns;
    @track record = [];
    @track bShowModal = false;
    @track currentRecordId;
    @track isEditForm = false;
    @track showLoadingSpinner = false;


    firstName = '';
    lastName = '';
    phoneNo= '';
    emailId='';
    departmentVal='';
    descriptionVal='';
    level='';
    birthdate='';

    @track
    selectOptions = [
        {label: 'None', value:''},
        {label: 'Primary', value:'Primary'},
        {label: 'Secondary', value:'Secondary'},
        {label: 'Tertiary', value:'Tertiary'}
    ];

    contactChangeVal(event) {
        console.log(event.target.label);
        console.log(event.target.value);        
        if(event.target.label=='First Name'){
            this.firstName = event.target.value;
        }
        if(event.target.label=='Last Name'){
            this.lastName = event.target.value;
        }            
        if(event.target.label=='Phone'){
            this.phoneNo = event.target.value;
        }
        if(event.target.label=='Email'){
            this.emailId = event.target.value;
        }
        if(event.target.label=='Department'){
            this.departmentVal = event.target.value;
        }
        if(event.target.label=='Description'){
            this.descriptionVal = event.target.value;
        }
        if(event.target.label=='Level'){
            this.level = event.target.value;

        }
        if(event.target.label=='Birthdate'){
        this.birthdate = event.target.value;

        
        
    }
}


    insertContactAction(){
        console.log(this.selectedAccountId);
        const fields = {};
        fields[conFirstName.fieldApiName] = this.firstName;
        fields[conLastName.fieldApiName] = this.lastName;
        fields[conPhone.fieldApiName] = this.phoneNo;
        fields[conEmail.fieldApiName] = this.emailId;
        fields[conDepartment.fieldApiName] = this.departmentVal;
        fields[conDescription.fieldApiName] = this.descriptionVal;
        fields[level.fieldApiName] = this.level;
        fields[birthdate.fieldApiName] = this.birthdate;
        const recordInput = { apiName: conMainObject.objectApiName, fields };
        
        createRecord(recordInput)
            .then(contactobj=> {
                this.contactId = contactobj.id;
                eval("$A.get('e.force:refreshView').fire();")
                
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact record has been created',
                        variant: 'success',
                    }),
                    
                );
                
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: contactobj.id,
                        objectApiName: 'Contact',
                        actionName: 'view'
                    },
                });



            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }





    // non-reactive variables
    selectedRecords = [];
    refreshTable;
    error;

    // retrieving the data using wire service
    @wire(getContacts)
    contacts(result) {
        this.refreshTable = result;
        if (result.data) {
            
            this.data = result.data;
            this.data1=this.data;
            this.error = undefined;

        }
        
        else if (result.error) {
            this.error = result.error;
            this.data = undefined;
            this.data1=this.data;
        }
    }

    handleRowActions(event) {
        let actionName = event.detail.action.name;

        window.console.log('actionName ====> ' + actionName);

        let row = event.detail.row;
        this.data1=this.data;

        window.console.log('row ====> ' + row);
        // eslint-disable-next-line default-case
        switch (actionName) {
            case 'record_details':
                this.viewCurrentRecord(row);
                break;
            case 'edit':
                this.editCurrentRecord(row);
                break;
            case 'delete':
                this.deleteCons(row);
                break;


        }
    }

    // view the current record details
    viewCurrentRecord(currentRow) {
        this.bShowModal = true;
        this.isEditForm = false;
        this.record = currentRow;
       
    }

    // closing modal box
    closeModal() {
        this.bShowModal = false;
        
    }


    editCurrentRecord(currentRow) {
        // open modal box
        this.bShowModal = true;
        this.isEditForm = true;
        

        // assign record id to the record edit form
        this.currentRecordId = currentRow.Id;
    }

    // handleing record edit form submit
    handleSubmit(event) {
        // prevending default type sumbit of record edit form
        event.preventDefault();

        // querying the record edit form and submiting fields to form
        this.template.querySelector('lightning-record-edit-form').submit(event.detail.fields);

        // closing modal
        this.bShowModal = false;
       

        // showing success message
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message: event.detail.fields.FirstName + ' '+ event.detail.fields.LastName +' Contact updated Successfully!!.',
            variant: 'success'
        }),);

    }

    // refreshing the datatable after record edit form success
    handleSuccess() {

        
        return refreshApex(this.refreshTable);
        
    }
      //delete 
    deleteCons(currentRow) {
        let currentRecord = [];
        currentRecord.push(currentRow.Id);
        this.showLoadingSpinner = true;
        

        // calling apex class method to delete the selected contact
        delSelectedCons({lstConIds: currentRecord})
        .then(result => {
            window.console.log('result ====> ' + result);
            this.showLoadingSpinner = false;

            // showing success message
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: currentRow.FirstName + ' '+ currentRow.LastName +' Contact deleted.',
                variant: 'success'
            }),);

            // refreshing table data using refresh apex
             return refreshApex(this.refreshTable);

        })
        .catch(error => {
            window.console.log('Error ====> '+error);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error!!', 
                message: error.message, 
                variant: 'error'
            }),);
        });
    }

    handlePaginationAction(event) {
        
            this.data1 = event.detail.values;

        

    }


}