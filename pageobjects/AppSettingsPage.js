const {expect} = require ('@playwright/test');
const CreateConsignmentPage = require("../pageobjects/Create_Consignment_page");
const { timeout } = require('../playwright.config1');
const basePage = require ('../features/support/BasePage.js')
const TestDataUtil = require('../features/support/Utils/TestDataUtil.js');
const TimeUtil = require('../features/support/Utils/TimeUtil.js');
const AddressBook = require("../pageobjects/Addressbook.js");
const path=require('path');
const ReadPdf = require('../features/support/Utils/PdfUtil.js');
const Create_Consignment_Page = require('../pageobjects/Create_Consignment_page');
const testDataUtil = new TestDataUtil()
const timeUtil = new TimeUtil()

class AppSettingsPage {
    constructor(){

        this.organisactionTab="//div/span[text()='Organisation']/.."
        this.organisationTabOnMenu="//a/span[text()='Organisation']"
        this.appSettingsPreviewButton="//a[text()='PREVIEW']"
        //============BOOKING FORM==========================
        //Show service type in booking form
        this.showServiceTypeOrg="(//div[span and contains(., 'Show service type')]/following-sibling::div/descendant::label)[1]"
        this.showServiceTypePortal="(//div[span and contains(., 'Show service type')]/following-sibling::div/descendant::label)[2]"
        //----------------------------------------------------------
        //Make service type selection mandatory in the booking form
        this.serviceTypeMandatoryOrg="(//div[span and contains(., 'service type selection')]/following-sibling::div/descendant::label)[1]"
        this.serviceTypeMandatoryPortal="(//div[span and contains(., 'service type selection')]/following-sibling::div/descendant::label)[2]"
        //-----------------------------------------------------------
        //Show lifecycyle selection in the booking form
        this.showLifecycleOrg="(//div[span and contains(., 'Show lifecycle')]/following-sibling::div/descendant::label)[1]"
        this.showLifecyclePortal="(//div[span and contains(., 'Show lifecycle')]/following-sibling::div/descendant::label)[2]"
        //------------------------------------------------------------
        //Show Finance Customer selection in the booking form 
        this.showFinanceCustomerOrg ="(//div[span and contains(., 'Show finance')]/following-sibling::div/descendant::label)[1]"
        this.showFinanceCustomerPortal = "(//div[span and contains(., 'Show finance')]/following-sibling::div/descendant::label)[2]"
        //------------------------------------------------------------
        //Show freight code selection at package level in the booking form
        this.showFreightAtPackageOrg="(//div[span and contains(., 'Show freight code ')]/following-sibling::div/descendant::label)[1]"
        this.showFreightAtPackagePortal="(//div[span and contains(., 'Show freight code ')]/following-sibling::div/descendant::label)[2]"
        //-------------------------------------------------------------
        //Disable user being able to set pick up dates in the past
        this.disableUserToSetPickUpOrg="(//div[span and contains(., 'set pick up dates')]/following-sibling::div/descendant::label)[1]"
        this.disableUserToSetPickUpPortal="(//div[span and contains(., 'set pick up dates ')]/following-sibling::div/descendant::label)[2]"
        //-------------------------------------------------------------
        //Show revenue/cost center
        this.showRevenueOrg="(//div[span and contains(., 'Show revenue')]/following-sibling::div/descendant::label)[1]"
        this.showRevenuePortal="(//div[span and contains(., 'Show revenue')]/following-sibling::div/descendant::label)[2]"
        //--------------------------------------------------------------
        //Show item description options in the booking form for the packages
        this.itemDescriptionAtPackageOrg="(//div[span and contains(., 'Show item description')]/following-sibling::div/descendant::label)[1]"
        this.itemDescriptionAtPackagePortal="(//div[span and contains(., 'Show item description')]/following-sibling::div/descendant::label)[2]"
        //----------------------------------------------------------------
        //Display a dangerous goods acknowledgment prompt during job booking if the user has not declared any dangerous goods
        this.displayDgAcknowlegementOrg="(//div[span and contains(., 'Display a dangerous')]/following-sibling::div/descendant::label)[1]"
        this.displayDgAcknowlegementPortal="(//div[span and contains(., 'Display a dangerous')]/following-sibling::div/descendant::label)[2]"
        //----------------------------------------------------------------
        //Show due date selection in the booking form.
        this.dueDateSelectionOrg="(//div[span and contains(., 'due date')]/following-sibling::div/descendant::label)[1]"
        this.dueDateSelectionPortal="(//div[span and contains(., 'due date')]/following-sibling::div/descendant::label)[2]"
        //*** need to add default time
        //----------------------------------------------------------------
        // Specify the time range to block available time in the booking form
        this.specifyAvailableTimeOrg="(//div[span and contains(., 'available time')]/following-sibling::div/descendant::label)[1]"
        this.specifyAvailableTimePortal="(//div[span and contains(., 'available time')]/following-sibling::div/descendant::label)[2]"
        //***** Need to add block available from time & block available time to 
        //-------------------------------------------------------------
        //Show purchase order searching in the booking form
        this.purchaseOrderSearchingOrg="(//div[span and contains(., 'purchase order')]/following-sibling::div/descendant::label)[1]"
        this.purchaseOrderSearchingPortal="(//div[span and contains(., 'purchase order')]/following-sibling::div/descendant::label)[2]"
        //------------------------------------------------------------
        //Show line item labels in the booking form.
        this.lineItemlabelOrg="(//div[span and contains(., 'line item')]/following-sibling::div/descendant::label)[1]"
        this.lineItemlabelPortal="(//div[span and contains(., 'line item')]/following-sibling::div/descendant::label)[2]"
        //------------------------------------------------------------
        //Show the save address button in the booking form (Enabling the portal also provides access to the address book)
        this.saveAddressinBookingOrg="(//div[span and contains(., 'save address')]/following-sibling::div/descendant::label)[1]"
        this.saveAddressinBookingPortal="(//div[span and contains(., 'save address')]/following-sibling::div/descendant::label)[2]"
        //--------------------------------------------------------
        //Allow users to generate freight labels and transport requests when a booking is submitted
        this.generateFreightLabelOrg="(//div[span and contains(., 'generate freight')]/following-sibling::div/descendant::label)[1]"
        this.generateFreightLabelPortal="(//div[span and contains(., 'generate freight')]/following-sibling::div/descendant::label)[2]"
        //--------------------------------------------------------
        //Show destination address from my address book in the booking form
        this.showDestinationAddressOrg="(//div[span and contains(., 'destination address')]/following-sibling::div/descendant::label)[1]"
        this.showDestinationAddressPortal="(//div[span and contains(., 'destination address')]/following-sibling::div/descendant::label)[2]"
        //--------------------------------------------------------
        //Show pick up address label fields in the booking form
        this.showPickupAddressOrg="(//div[span and contains(., 'pick up address')]/following-sibling::div/descendant::label)[1]"
        this.showPickupAddressPortal="(//div[span and contains(., 'pick up address')]/following-sibling::div/descendant::label)[2]"
        //-----------------------------------------------------------
        //Show delivery address label fields in the booking form.
        this.deliveryAddresslabelOrg="(//div[span and contains(., 'delivery address')]/following-sibling::div/descendant::label)[1]"
        this.deliveryAddresslabelPortal="(//div[span and contains(., 'delivery address')]/following-sibling::div/descendant::label)[2]"
        //------------------------------------------------------------
        //Show pallet fields, instead of normal package fields, in the booking form
        this.showPalletFieldsOrg="(//div[span and contains(., 'pallet fields')]/following-sibling::div/descendant::label)[1]"
        this.showPalletFieldsPortal="(//div[span and contains(., 'pallet fields')]/following-sibling::div/descendant::label)[2]"
        //-------------------------------------------------------
        //Hide dimension labels in the booking form
        this.hideDimensionsOrg="(//div[span and contains(., 'Hide dimension')]/following-sibling::div/descendant::label)[1]"
        this.hideDimensionsPortal="(//div[span and contains(., 'Hide dimension')]/following-sibling::div/descendant::label)[2]"
        //----------------------------------------------------
        // Enable minimum available date.
        this.minimumAvailableDateOrg="(//div[span and contains(., 'minimum available')]/following-sibling::div/descendant::label)[1]"
        this.minimumAvailableDatePortal="(//div[span and contains(., 'minimum available')]/following-sibling::div/descendant::label)[2]"
        //----------------------------------------------------
        // Hide option to send freight labels to the sender
        this.hideSendFreightToSenderOrg="(//div[span and contains(., ' Hide option to send')]/following-sibling::div/descendant::label)[1]"
        this.hideSendFreightToSenderPortal="(//div[span and contains(., ' Hide option to send')]/following-sibling::div/descendant::label)[2]"
        //----------------------------------------------------
        //Always check option to send freight labels to the sender
        this.checkSendFreightToSenderOrg="(//div[span and contains(., ' check option')]/following-sibling::div/descendant::label)[1]"
        this.checkSendFreightToSenderPortal="(//div[span and contains(., ' check option')]/following-sibling::div/descendant::label)[2]"
        //------------------------------------------------------
        //Make providing weights mandatory
        this.WeightManditoryOrg="(//div[span and contains(., ' weights mandatory')]/following-sibling::div/descendant::label)[1]"
        this.WeightManditoryPortal="(//div[span and contains(., ' weights mandatory')]/following-sibling::div/descendant::label)[2]"
        //------------------------------------------------------
        //Show Flag when Address from booking form is entered manually
        this.showFlagWhenAddressOrg="(//div[span and contains(., 'Show Flag')]/following-sibling::div/descendant::label)[1]"
        this.showFlagWhenAddressPortal="(//div[span and contains(., 'Show Flag')]/following-sibling::div/descendant::label)[2]"
        //-------------------------------------------------------
        //Make Finance customer selection mandatory in the booking form
        this.customerSelectMandatoryOrg="(//div[span and contains(., 'customer selection mandatory')]/following-sibling::div/descendant::label)[1]"
        this.customerSelectMandatoryPortal="(//div[span and contains(., 'customer selection mandatory')]/following-sibling::div/descendant::label)[2]"
        //--------------------------------------------------------
        //Set the maximum weight or volume of Dangerous Goods allowed per consignment.
        //need to enter value will do it later
        //----------------------------------------------------------
        //pickup delivery requirements
        //need to choose from dropdown will do it later
        //----------------------------------------------------------
        //Trailer type/loading requirements
        //need to choose from dropdown will do it later
        //============BOOKED JOBS===========================
        //Allow users to override the timestamps on jobs at sign off.
        this.overrideTimestampOrg="(//div[span and contains(., 'override the timestamps')]/following-sibling::div/descendant::input)[1]"
        //-----------------------------------------------------
        //The selected job reference will be presented to drivers at a top level on their jobs
        // neet to select radio button will do it later
        //------------------------------------------------------
        //Custom additional reference labels. 
        //need to enter value will do it later
        //------------------------------------------------------
        //Only show the master leg for movements on the active jobs table
        this.onlyShowMasterLegPortal="(//div[span and contains(., 'master leg for movements')]/following-sibling::div/descendant::input)[1]"
        //------------------------------------------------------
        //--------Other Settings are for mobile app so skipping it for now-----------
        //==============TRIP SHEET ====================
        // /Make service type assignment mandatory before a tripsheet can be assigned to a driver.
        this.serviceTypeAssignmentOrg="(//div[span and contains(., 'service type assignment')]/following-sibling::div/descendant::input)[1]"
        //------------------------------------------------------
        //Request the user supply a manual entry for loading/unloading demurrage.
        this.manualEntryOrg="(//div[span and contains(., 'manual entry for loading')]/following-sibling::div/descendant::input)[1]" 
        //------------------------------------------------------
        //Enable drivers to deliver tripsheet legs in any order.
        this.deliverInAnyOrderOrg="(//div[span and contains(., 'deliver tripsheet legs')]/following-sibling::div/descendant::input)[1]"
        //------------------------------------------------------
        //For other app setting will add later if required

    }
    
    async clickOnOrganisationTab(){
        await basePage.click(this.organisactionTab)
    }
    async clickOnOrganisationTabOnMenu(){
        await basePage.click(this.organisationTabOnMenu)
    }

    async clickOnAppSettingsPreviewButton(){  
        await basePage.click(this.appSettingsPreviewButton)
        await basePage.wait(2000)
    }


     async setCheckboxState(locator, shouldBeChecked) {
        const isChecked = await basePage.isCheckboxChecked(locator);
        if (shouldBeChecked && !isChecked) {
        await basePage.click(locator);
        console.log("Changed to checked");
        await basePage.wait(2000)
        } else if (!shouldBeChecked && isChecked) {
        await basePage.click(locator);
        console.log("Changed to unchecked");
        await basePage.wait(2000)
        } else {
        console.log("Already in desired state");
        }
     }


      async updateSetting(settingName, target, shouldBeChecked) {
        console.log(`Updating setting: ${settingName} for target: ${target} to ${shouldBeChecked ? 'checked' : 'unchecked'}`);
        switch (settingName.toLowerCase()) {
            case "show service type in booking form":
                  await this.setCheckboxState(
                target == "org" ? this.showServiceTypeOrg : this.showServiceTypePortal,
                shouldBeChecked
            );
                break;
            case "make service type selection mandatory":
                  await this.setCheckboxState(
                target == "org" ? this.serviceTypeMandatoryOrg : this.serviceTypeMandatoryPortal,
                shouldBeChecked
            );
                break;
            case "show lifecycle selection in booking form":
                  await this.setCheckboxState(
                target == "org" ? this.showLifecycleOrg : this.showLifecyclePortal,
                shouldBeChecked
            );
                break;
            case "show finance customer selection in booking form":
                  await this.setCheckboxState(
                target == "org" ? this.showFinanceCustomerOrg : this.showFinanceCustomerPortal,
                shouldBeChecked
            );
                break;
            case "show freight code selection at package level in booking form":
                  await this.setCheckboxState(
                target == "org" ? this.showFreightAtPackageOrg : this.showFreightAtPackagePortal,      
                shouldBeChecked
            );
                break;
            case "disable user being able to set pick up dates in the past":
                  await this.setCheckboxState(
                target == "org" ? this.disableUserToSetPickUpOrg : this.disableUserToSetPickUpPortal,      
                shouldBeChecked
            );
                break;
            case "show revenue/cost center":
                  await this.setCheckboxState(
                target == "org" ? this.showRevenueOrg : this.showRevenuePortal,
                shouldBeChecked
            );
                break;
            case "show item description options in booking form for the packages":
                  await this.setCheckboxState(
                target == "org" ? this.itemDescriptionAtPackageOrg : this.itemDescriptionAtPackagePortal,  
                shouldBeChecked
            );
                break;
            case "display a dangerous goods acknowledgment prompt during job booking if the user has not declared any dangerous goods":
                  await this.setCheckboxState(
                target == "org" ? this.displayDgAcknowlegementOrg : this.displayDgAcknowlegementPortal,
                shouldBeChecked 
            );
                break;
            case "show due date selection in booking form":
                    await this.setCheckboxState(    
                target == "org" ? this.dueDateSelectionOrg : this.dueDateSelectionPortal,
                shouldBeChecked 
            );  
                break;
            case "specify the time range to block available time in booking form":
                  await this.setCheckboxState(
                target == "org" ? this.specifyAvailableTimeOrg : this.specifyAvailableTimePortal,
                shouldBeChecked 
            );
                break;
            case "show purchase order searching in booking form":
                    await this.setCheckboxState(
                target == "org" ? this.purchaseOrderSearchingOrg : this.purchaseOrderSearchingPortal,
                shouldBeChecked
            );
                break;
            case "show line item inputs in booking form":
                    await this.setCheckboxState(
                target == "org" ? this.lineItemInputOrg : this.lineItemInputPortal,
                shouldBeChecked
            );
                break;
            case "show the save address button in booking form":
                    await this.setCheckboxState(
                target == "org" ? this.saveAddressinBookingOrg : this.saveAddressinBookingPortal,
                shouldBeChecked
            );
                break;
            case "allow users to generate freight labels and transport requests when a booking is submitted":
                    await this.setCheckboxState(
                target == "org" ? this.generateFreightLabelOrg : this.generateFreightLabelPortal,
                shouldBeChecked
            );  
                break;
            case "show destination address from my address book in booking form":
                    await this.setCheckboxState(
                target == "org" ? this.showDestinationAddressOrg : this.showDestinationAddressPortal, 
                shouldBeChecked
            );
                break;
            case "show pick up address input fields in booking form":
                    await this.setCheckboxState(
                target == "org" ? this.showPickupAddressOrg : this.showPickupAddressPortal,
                shouldBeChecked
            );
                break;
            case "show delivery address input fields in booking form":
                    await this.setCheckboxState(
                target == "org" ? this.deliveryAddressInputOrg : this.deliveryAddressInputPortal,
                shouldBeChecked
            );
                break;
            case "show pallet fields, instead of normal package fields, in booking form":
                    await this.setCheckboxState(
                target == "org" ? this.showPalletFieldsOrg : this.showPalletFieldsPortal,
                shouldBeChecked
            );
                break;  
            case "hide dimension inputs in booking form":
                    await this.setCheckboxState(
                target == "org" ? this.hideDimensionsOrg : this.hideDimensionsPortal,
                shouldBeChecked
            );
                break;
            case "enable minimum available date":
                    await this.setCheckboxState(
                target == "org" ? this.minimumAvailableDateOrg : this.minimumAvailableDatePortal,
                shouldBeChecked
            );
                break;
            case "hide option to send freight labels to the sender":
                    await this.setCheckboxState(
                target == "org" ? this.hideSendFreightToSenderOrg : this.hideSendFreightToSenderPortal,
                shouldBeChecked
            );
                break;
            case "always check option to send freight labels to the sender":
                    await this.setCheckboxState(
                target == "org" ? this.checkSendFreightToSenderOrg : this.checkSendFreightToSenderPortal,
                shouldBeChecked
            );
                break;
            case "make providing weights mandatory":
                    await this.setCheckboxState(
                target == "org" ? this.WeightManditoryOrg : this.WeightManditoryPortal,
                shouldBeChecked
            );
                break;
            case "show flag when address from booking form is entered manually":
                    await this.setCheckboxState(
                target == "org" ? this.showFlagWhenAddressOrg : this.showFlagWhenAddressPortal,
                shouldBeChecked
            );
                break;
            case "make finance customer selection mandatory in booking form":
                    await this.setCheckboxState(
                target == "org" ? this.customerSelectMandatoryOrg : this.customerSelectMandatoryPortal,
                shouldBeChecked
            );
                break;
            case "allow users to override the timestamps on jobs at sign off":
                //only for Org
                    await this.setCheckboxState(
                target == "org" ? this.overrideTimestampOrg : this.overrideTimestampOrg,
                shouldBeChecked
            );
                break;
            case "only show the master leg for movements on the active jobs table":
                //only for Portal
                    await this.setCheckboxState(
                target == "org" ? this.onlyShowMasterLegPortal : this.onlyShowMasterLegPortal,
                shouldBeChecked
            );
                break;
            case "make service type assignment mandatory before a tripsheet can be assigned to a driver":
                    await this.setCheckboxState(    
                target == "org" ? this.serviceTypeAssignmentOrg : this.serviceTypeAssignmentOrg,
                shouldBeChecked
            );
                break;
            case "request the user supply a manual entry for loading/unloading demurrage":
                    await this.setCheckboxState(
                target == "org" ? this.manualEntryOrg : this.manualEntryOrg,
                shouldBeChecked
            );
                break;
            case "enable drivers to deliver tripsheet legs in any order":
                    await this.setCheckboxState(
                target == "org" ? this.deliverInAnyOrderOrg : this.deliverInAnyOrderOrg,
                shouldBeChecked
            );
                break;
                
            default:
                throw new Error(`Unknown setting: ${settingName}`);
        }

    }

}

module.exports=AppSettingsPage