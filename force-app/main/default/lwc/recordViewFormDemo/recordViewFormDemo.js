import { LightningElement, track} from 'lwc';
export default class RecordEditFormEditExampleLWC extends LightningElement {
    @track recordId;
    handleSubmit(event) {
        console.log('onsubmit event recordEditForm'+ event.detail.fields);
    }
    handleSuccess(event) {
        console.log('onsuccess event recordEditForm', event.detail.id);
    }
}