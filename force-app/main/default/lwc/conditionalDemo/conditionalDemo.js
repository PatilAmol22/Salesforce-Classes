import { LightningElement,track} from 'lwc';

export default class ConditionalDemo extends LightningElement {

    @track onClickedButtonLabel = "Show";
    myTitle = 'Salesforce Conditional Demo';
    @track cardVisible = false;

    handleClick(event){
        const label = event.target.label;

        if(label === 'Show'){
            this.onClickedButtonLabel = 'Hide';
            this.cardVisible = true;
        }
        else if(label === 'Hide'){
            this.onClickedButtonLabel = 'Show';
            this.cardVisible = false;
        }
    }
}