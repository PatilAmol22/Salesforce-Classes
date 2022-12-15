<aura:application controller="ReusableCustomDropdownAppController" extends="force:slds">
    <aura:attribute name="options" type="List" default="[]"/>
    <aura:attribute name="value" type="String" default=""/>
    <aura:attribute name="label" type="String" default=""/>
    <aura:attribute name="selected" type="String" default=""/>
    <aura:attribute name="showModal" type="Boolean" default="false"/>
    
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
    
    <div class="slds-text-align_center slds-text-heading_medium slds-var-p-top_medium slds-var-p-bottom_small">Searchable Custom Dropdown Example</div>
    <div class="slds-text-heading_small slds-var-p-vertical_medium">The selected option is: <span class="slds-text-title_bold">{! v.selected }</span></div>
    <aura:if isTrue="{! not(empty(v.options))}">
        <c:reusableCustomDropdownWithSearchLwc options="{! v.options }" value="{! v.value }" label="{! v.label }" onchange="{! c.handleOnChange }"/>
    </aura:if>
    
</aura:application>