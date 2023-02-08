import { LightningElement , wire , track} from 'lwc';
    import getAccRecordMethod from '@salesforce/apex/pdfGeneratorClass.getAccRecordMethod';
    import getConRecordMethod from '@salesforce/apex/pdfGeneratorClass.getConRecordMethod';
    //import jsPDF from '@salesforce/resourceUrl/jspdf';
    //import { downloadAsPDF } from 'c/pdfGenerator';
    

export default class PdfGenerator extends LightningElement {

    
   
    
        @track accData;
        @track conData;
    
        @wire(getAccRecordMethod)
            wiredAccountData({ data, error }) {
                if (data) {
                    this.accData = data;
                } 
                else if (error) {
                    console.error(error);
            }
        }
    
        @wire(getConRecordMethod)
            wiredContactData({ data, error }) {
                if (data) {
                    this.conData = data;
                } 
                else if (error) {
                    console.error(error);
                }
        }
    
    generatePDF() {
        const doc = new jsPDF();
    
        //const accData = this.accData;
        //const conData = this.conData;
    
        //doc.text(`Accounts : ${accData}`, 10, 10);
        //doc.text(`Contacts : ${conData}`, 10, 20); 
    
        doc.text('Accounts :', 10, 10);
            this.accData.forEach(data => {
                doc.text(data.ID, 10, 20);
                doc.text(data.Name, 10,20);
            });
            doc.text('Contacts :', 10, 40);
            this.conData.forEach(data => {
                doc.text(data.FirstName, 10, 50);
                doc.text(data.LastName, 10, 50);
            });
    
        doc.save('pdfGenerated.pdf');
    }
}