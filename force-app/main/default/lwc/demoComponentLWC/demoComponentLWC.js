import { LightningElement } from 'lwc';

export default class DemoComponentLWC extends LightningElement {
    handleQuickAction() {
        const quickAction = this.template.querySelector('#quickAction');
        quickAction.handleNavigation();
    }
}