const {expect} = require ('@playwright/test');
const basePage = require ('../features/support/BasePage.js');
const Addressbook = require("../pageobjects/Addressbook.js");
const TestDataUtil = require('../features/support/Utils/TestDataUtil.js');
const testDataUtil = new TestDataUtil()


let extractedNumber
let reference;

class Create_Consignment_Page {
    
constructor(page,extractedOffset)
{
    this.page = page;
    this.extractedOffset = extractedOffset
    this.extractedOffset = extractedOffset
    this.extractedNumber = extractedNumber
   
    //this.routeForKm="//div[@id='DataTables_Table_3_wrapper']/child::table/child::tbody/child::tr[1]"
    this.routeForKm="//div[@id='swal2-content']/descendant::table/child::tbody/child::tr[1]"
    this.inputRate="//label[text()='Rate']/../input"
    this.btnNoThanksInPopUp = "//a[text()='No, thanks']"
    this.tabJobs = "//a/span[text()='Jobs']"
    this.tabCompliance = "//a/span[text()='Compliance']"
    this.txtJobsInJobsModule = "//div[text()='Jobs']"
    // this.cardCreateConsignment = "//li[@id='hubFreightCreateConsignment']/a"
    this.cardCreateConsignment = "//div[@id='hubFreightCreateConsignment']"
    this.txtSendFreightinCreateConsignment = "//div[text()='Send Freight']"
    // this.dropDownServiceType = "(//input[@value='(Select One)'])[1]"
    this.dropDownServiceTypeGeneral = "//span[text()='GENERAL']"
    this.dropDownMovement = "//div[@class='select-wrapper']"
    this.txtMovement = "(//span[text()='<<Text>>'])[1]"
    this.selectMovement = "//select[@id='sendFreightMovementSelect']"
    this.dropDownMovementP2P = "//span[text()='P2P']"
    this.inputRef1 = "//input[@name='additionalReference1']"
    this.inputRef2 = "//input[@name='additionalReference2']"
    this.inputRef3 = "//input[@name='additionalReference3']"
    this.inputRef4 = "//input[@name='additionalReference4']"
    this.dropDownSelectCustomer = "//span[text()='Select Customer']/.."
    this.selectCustomer = "//div/select[@id='sendFreightFinanceCustomerSelect']"
    this.clickChargeTo="//span[@id='select2-chargeToSelect-container']"
    // this.txtValueCustomer = "//li[text()='Big Mining Company']"
    // this.txtValueCustomer = "//li[text()='Testing account']"
    this.txtValueCustomer = "//li[text()='<<Text>>']"
    this.inputFreightCodes = "//select[@name='freightCodes']"
    this.dropDownSelectDestination = "//select[@id='sendFreightVendorDestinationSelect']/following-sibling::span"
    // this.dropDownSelectDestination = "//select[contains(@id,'DestinationSelect')]"
    this.elementDestination = "//li[text()='<<Text>>']"
    this.inputTrailer = "(//input[@class='select2-search__field'])[1]"
    this.checkBoxDeliveringIntoDepot = "//label[text()='Delivering into Depot']"
    this.checkBoxCollFromDepot = "//label[text()='Collecting from Depot']"
    this.inputTrailerFloat = "//li[text()='Float']"
    this.btnHomeInSender = "//a[@id='sendFreightSenderUseMyDetails']/i[text()='home']"
    this.iconHomeInSender ="(//a[contains(@id,'UseMyDetails')])[1]"
    this.btnHomeInReceiver = "//a[@id='sendFreightReceiverUseMyDetails']/i[text()='home']"
    this.iconReceiverAddress = "//a[contains(@id,'ReceiverAddressBookBtn')]"
    this.iconSenderAddress="//a[contains(@id,'SenderAddressBookBtn')]"
    this.iconReceiverAddressUpdated = "//a[contains(@id,'sendFreightReceiverAddressBookBtn')]"
    this.iconSenderAddressUpdated="//a[contains(@id,'sendFreightSenderAddressBookBtn')]"
    this.iconReceiverAddressUpdated = "//a[contains(@id,'sendFreightReceiverAddressBookBtn')]"
    this.iconSenderAddressUpdated="//a[contains(@id,'sendFreightSenderAddressBookBtn')]"
    this.searchSenderAddress="//input[contains(@id,'SenderAddressTableFilter')]"
    this.searchReceiverAddress = "//input[contains(@id,'ReceiverAddressTableFilter')]"
    this.searchSenderAddressUpdated="//input[contains(@id,'sendFreightSenderAddressTableFilter')]"
    this.searchSenderAddressUpdated="//input[contains(@id,'sendFreightSenderAddressTableFilter')]"
    this.searchReceiverAddressUpdated = "//input[contains(@id,'sendFreightReceiverAddressTableFilter')]"
     this.iconSenderAddressJC="//a[@id='sendFreightJobCardAddressBookBtn']"
    this.iconSenderSearchAddressJC="//input[@id='sendFreightJobCardAddressTableFilter']"
    this.txtAddress1="//td[text()='Tester']"
    this.txtAddress2="//td[text()='mercy']"
    this.txtCarrierAddressReceiver="//td[text()='Prabakara Rao']"
    this.conAddressReceiver="//td[text()='John Smith']"
    this.txtSenderAddress = "//td[text()='mercy']"
    this.txtReceiverAddress = "//td[text()='testing']"
    this.updateSender="//td[text()='QLD'][2]"
    this.updateReceiver="//td[text()='SA'][contains(@class,'firstName')]"
    //this.inputNotesForInvoice = "//textarea[@name='invoiceNotes.HpyjXc7NJpEHvNmvJ.content']"
    this.inputNotesForInvoice="//textarea[contains(@name,'invoiceNote')]"
    this.SourcetxtAddress2 = "//td[contains(@class,'firstName')]/following-sibling::td[contains(@class,'businessName')]"
    this.DestinationTxtAddress2 = "//td[text()='Ultimate Perth Depot']"
    this.DestinationTxtAddress3 = "//td[contains(@class,'firstName')]/following-sibling::td[contains(@class,'businessName')]"
    this.inputBookingReference = "//input[@name='reference']"
    this.inputPurchaseOrder = "//input[@name='packages.0.reference']"
    this.dropdownItem = "(//label[text()='Item'])[1]/following-sibling::span"
    this.dropdownItem1 = "(//label[text()='Item']/following-sibling::span)[2]"
    this.inputItemSearch = "(//input[@role='searchbox'])[4]"
    this.inputLength = "//input[@name='packages.0.depth']"
    this.inputWidth = "//input[@name='packages.0.width']"
    this.inputHeight = "//input[@name='packages.0.height']"
    this.inputItemWeight = "//input[@name='packages.0.weight']"
    this.inputItemWeight1 = "//input[@name='packages.1.weight']"
    this.checkBox = "//input[contains(@class,'<<Text>>')]"
    this.checkBoxChiller = "//label[text()='<<Text>>']"
    this.inputAdditionalCharges = "//select[@id='additionalChargesSelectOption']"
    this.inputNotesForJob = "//textarea[@name='notes.$.content']"
    //this.inputNotesForInvoice = "//textarea[@name='invoiceNotes.HpyjXc7NJpEHvNmvJ.content']"
    this.btnCreateConsignment = "//a[text()='Create Consignment']"
    this.btnAddAnotherJob = "//button[@id='another']"
    this.btnUpdateConsignment = "//a[text()='Update Consignment']"   
    this.btnUpdateConsignment = "//a[text()='Update Consignment']"   
    this.businessLogo = "(//span[text()='Jobs']/following::a/i)[1]"
    this.txtBookingReference = "//div[@id='swal2-content']"
    this.btnAnotherJob = "//button[text()='Another Job']"
    this.btnAddAnother = "//button[text()='Add Another']"
    this.btnBooked = "//div[text()='Booked']"
    this.btnAddPackage = "//button[normalize-space(text())='Add Package']"
    this.inputFreightCode1 = "//select[contains(@name,'0.freightCodes')]"
    this.inputFreightCode2 = "//select[contains(@name,'1.freightCodes')]"
    this.inputCount2 = "//input[@name='packages.1.count']"
    this.inputPurchaseOrder2 = "//input[@name='packages.1.reference']"
    this.inputItem2 = "//input[@name='packages.1.type']"
    this.inputLength2 = "//input[@name='packages.1.depth']"
    this.inputWidth2 = "//input[@name='packages.1.width']"
    this.inputHeight2 = "//input[@name='packages.1.height']"
    this.inputWeight2 = "//input[@name='packages.1.weight']"
    this.checkBoxFreezer = "//input[@name='packages.1.freezer']/following-sibling::label"
    this.dropDownFreightCode = "//select[@name='packages.1.freightCodes']"
    this.inputSpecialRequirements = "(//label[text()='Special Requirements']/following-sibling::select)[<<Text>>]"
    this.inputItem = "//input[contains(@name,'0.type')]"
    this.dropDownItem = "//select[contains(@name,'0.type')]"
    this.dropDownItem1 = "//select[contains(@name,'1.type')]"
    this.inputItem1 = "//input[contains(@name,'1.type')]"
    this.inputCount = "//input[contains(@name,'0.count')]"
    this.inputCount1 = "//input[contains(@name,'1.count')]"
    this.btnAddItemInJc = "//button[normalize-space(text())='Add Item']"
    this.specialInstructions = "//textarea[@name='instructions']"
    this.btnBookJob = "//button[text()='Book Job']"
    this.btnViewMyJobs = "//button[text()='View My Jobs']/.."
    // this.txtJobSuccessMsg = "//h2[@id='swal2-title']"
    this.txtJobSuccessMsg = "//h2[text()='Job Booked!']"
    this.txtJobSuccessMsgInJC = "//h2[text()='Job Card Created']"
    this.inputPallets = "//input[@name='packages.0.palletQuantity']"
    this.inputSpaces = "//input[@name='packages.0.palletSpaces']"
    this.btnContinueWithBooking = "//button[text()='Continue with booking']"
    this.checkBoxDG = "//label[@for='packages.1.dangerousGoods']"
    this.checkBoxDG2 = "//label[@for='packages.0.dangerousGoods']"
    this.inputPens = "//input[@name='packages.0.penCount']"
    this.inputPens1 = "//input[@name='packages.1.penCount']"
    this.inputPenReference = "//input[@name='packages.0.penReference']"
    this.inputPenReference1 = "//input[@name='packages.1.penReference']"
    this.DropdownRevenue = "//span[contains(@aria-labelledby,'sendFreightCostCentreSelect')]"
    this.PUDateField ="//input[@name='availableFrom']"
    this.DueDateField ="//input[@data-schema-key='dueDate']"
    //this.DatepickerBtn ="//button[@class='btn-flat picker__close waves-effect'][ancestor::div[@class='picker picker--opened picker--focused']]"
    this.pickerDay = "//div[@aria-selected='true'][ancestor::div[@aria-hidden='false']]"
    this.PUDateField ="//input[@name='availableFrom']"
    this.DueDateField ="//input[@data-schema-key='dueDate']"
    //this.DatepickerBtn ="//button[@class='btn-flat picker__close waves-effect'][ancestor::div[@class='picker picker--opened picker--focused']]"
    this.pickerDay = "//div[@aria-selected='true'][ancestor::div[@aria-hidden='false']]"
    this.inputRevenue = "//input[contains(@aria-controls,'sendFreightCostCentreSelect')]"
    
    this.sendFreight="//div[@id='hubSendFreight']"
    this.logoInPortal="//main/div/div/img"
    this.serviceType="//select[@id='sendFreightServiceTypeSelect']"
    this.dropDownserviceType="//div/select[@id='sendFreightServiceTypeSelect']/preceding-sibling::input"
    this.elementServiceType="(//li/span[text()='<<Text>>'])[1]"

    this.DGUNNumber = "//span[contains(text(),'UN Number')]"
    this.UNNumberchoices = "//li[contains(text(),'3449')]"
    this.Subdivision = "//input[contains(@value, 'Select a class')]"
    this.SubOption = "//input[contains(@value, 'Select a class')]/following-sibling::ul[1]/li/child::span[contains(text(),'Division 1.1:')]"
    this.packGroup = "//label[text()='Packaging group']/following-sibling::div/input"
    this.packOption = "//span[text()='II']"
    this.DGinput = "//input[@id ='dangerousGoodsQuantity']"
    this.DGPacktype = "//input[@id ='dangerousGoodsType']"
    this.DGQty = "//label[contains(text(),'Quantity')]/following-sibling::input"
    this.buttonOK = "//button[text()='OK']"
    this.btnDG = "//button[text()='Continue with booking']"
    this.DGlogo = "//img[@class='dangerous-goods-logo']"

}

async navigateToSendFreight(){
    await basePage.waitForLocator(this.sendFreight)
    const sendFreight = await basePage.verifyElement(this.sendFreight)
    if(sendFreight){
        console.log('sendFreight is visible......')
    }
    await basePage.click(this.sendFreight)
    console.log("Enter into send Freight.....")
}


async navigateToCreateConsignment(){
    if(await basePage.verifyElement(this.btnNoThanksInPopUp)){
    await basePage.click(this.btnNoThanksInPopUp)
    }
    const businessLogo = await basePage.verifyElement(this.businessLogo)
    await basePage.waitForLocator(this.cardCreateConsignment)
    const cardCreateConsignment = await basePage.verifyElement(this.cardCreateConsignment)
    console.log("businessLogo :"+businessLogo)
    if(cardCreateConsignment){
        console.log('cardCreateConsignment is visible......')
    }
    else{
        await basePage.click(this.businessLogo)
        console.log('business logo clicked.....')
    }
    await basePage.click(this.cardCreateConsignment)
    await basePage.verifyElement(this.txtSendFreightinCreateConsignment)

    console.log("Enter into create consignment.....")
}

async chooseDestination(destinations){

    //await basePage.scrollToElement(this.dropDownSelectDestination)
    await basePage.click(this.dropDownSelectDestination)
    const destination = this.elementDestination.replace("<<Text>>", destinations);
    await basePage.click(destination);
}

async enterServiceType(service){
    await basePage.wait(1000)
    await basePage.click(this.dropDownserviceType)
    const servicetype=this.elementServiceType.replace("<<Text>>",service)
    await basePage.click(servicetype)
}

async enterTrailerType(trailerType){
    await basePage.scrollToElement(this.inputTrailer)
    await basePage.sendKeys(this.inputTrailer, trailerType)
    await basePage.keyboardEnter()
}

async checkDeliveringIntoDepot(){
    await basePage.clickCheckBox(this.checkBoxDeliveringIntoDepot)
    console.log("Checkbox Delivering Into Depot clicked successfully....")
}

async checkCollectingFromDepot(){
    await basePage.clickCheckBox(this.checkBoxCollFromDepot)
    console.log("Checkbox collecting from Depot clicked successfully....")
}

async chooseFreightCode(freightCode){
    await basePage.wait(1000)
    await basePage.selectFromDropdown(this.inputFreightCodes, freightCode)
    console.log('Freight code selected....')

}
async chooseRoute(){
    // await basePage.waitForLocator("//button[text()='Cancel']")
    // await basePage.click("//button[text()='Cancel']")
    // await basePage.click("//input[@id='send-freight-route-name']")
    await basePage.waitForLocator(this.routeForKm)

    if(await basePage.verifyElement(this.routeForKm)){
       await basePage.click(this.routeForKm)
    console.log('Route Name selected.............') 
    }
   
}

async enterRate(Rate){
    await basePage.waitForLocator(this.inputRate)
    await basePage.sendKeys(this.inputRate, Rate);
}


async enterJobDimensions(purchaseOrder, length, width, height, weight, additionalCharge){
    await basePage.scrollToElement(this.inputPurchaseOrder)
    await basePage.sendKeys(this.inputPurchaseOrder, purchaseOrder)
    await basePage.sendKeys(this.inputLength, length)
    await basePage.sendKeys(this.inputWidth, width)
    await basePage.sendKeys(this.inputHeight, height)
    await basePage.sendKeys(this.inputItemWeight, weight)
    // await basePage.click(this.checkBoxChiller)
    // if(await basePage.verifyElement(this.inputAdditionalCharges)){
    // await basePage.selectFromDropdown(this.inputAdditionalCharges, additionalCharge)
    // }
}

async verifyChiller(chiller)
{
    let isVerify = false
    let element1 = this.checkBox.replace("<<Text>>", chiller)
    await basePage.scrollToElement(element1)
    if(await basePage.isCheckboxChecked(element1))
    {
    console.log("Chiller is checked")
    isVerify = true
    }
    console.log("Chiller is not checked")
    return isVerify
}

async verifyFreezer(freezer)
{
    let isVerify = false
    let element1 = this.checkBox.replace("<<Text>>", freezer)
    await basePage.scrollToElement(element1)
    if(await basePage.isCheckboxChecked(element1))
   {
    isVerify = true
   }
    return isVerify
}

async checkChillerAndFreezer(chiller, freezer) {
    let element1 = this.checkBoxChiller.replace("<<Text>>", chiller)
    let element2 = this.checkBoxChiller.replace("<<Text>>", freezer)
    await basePage.clickCheckBox(element1)
    // await basePage.clickCheckBox(element2)
    console.log("Checkbox chiller and freezer are checked successfully....")
}

async checkDgCheckBox(checkBox){
    let element = this.checkBoxChiller.replace("<<Text>>", checkBox)
    await basePage.clickCheckBox(element)
}

async enterJobDimensionswithFreight(freightCode,purchaseOrder, length, width, height, weight, additionalCharge){
    await basePage.scrollToElement(this.inputFreightCode1)
    await basePage.selectFromDropdown(this.inputFreightCode1,freightCode)
    await basePage.scrollToElement(this.inputPurchaseOrder)
    await basePage.sendKeys(this.inputPurchaseOrder, purchaseOrder)
    await basePage.sendKeys(this.inputLength, length)
    await basePage.sendKeys(this.inputWidth, width)
    await basePage.sendKeys(this.inputHeight, height)
    await basePage.sendKeys(this.inputItemWeight, weight)
    // await basePage.click(this.checkBoxChiller)
    // if(await basePage.verifyElement(this.inputAdditionalCharges)){
    // await basePage.selectFromDropdown(this.inputAdditionalCharges, additionalCharge)
    // }
}

async addAnotherJobDetail(freightCode, count, purchaseOrder, item, length, width, weight, height, freightCode1) {
    await basePage.scrollToElement(this.inputFreightCode1)
    await basePage.selectFromDropdown(this.inputFreightCode1,freightCode)
    await basePage.click(this.btnAddPackage)
    await basePage.sendKeys(this.inputCount1, count)
    await basePage.sendKeys(this.inputPurchaseOrder2, purchaseOrder)
    if(await basePage.verifyElement(this.inputItem1)){
        await basePage.sendKeys(this.inputItem1, item)
        console.log("Item entered successfully....")
    }
    else{
        await basePage.click(this.dropdownItem1)
        await basePage.sendKeys(this.inputItemSearch, item)
       await basePage.keyboardEnter()
        console.log("Item entered successfully....")
    }
    await basePage.sendKeys(this.inputLength2, length)
    await basePage.sendKeys(this.inputWidth2, width)
    await basePage.sendKeys(this.inputHeight2, height)
    await basePage.sendKeys(this.inputWeight2, weight)
    // await basePage.scrollToElement(this.checkBoxFreezer)
    // await basePage.click(this.checkBoxFreezer)
    await basePage.selectFromDropdown(this.inputFreightCode2, freightCode1)

}
//for cubic weight
async addAnotherJobDetail2( count, purchaseOrder, item, length, width, height, weight) {
    await basePage.click(this.btnAddPackage)
    await basePage.sendKeys(this.inputCount1, count)
    await basePage.sendKeys(this.inputPurchaseOrder2, purchaseOrder)
    if(await basePage.verifyElement(this.inputItem1)){
        await basePage.sendKeys(this.inputItem1, item)
        console.log("Item entered successfully....")
    }
    else{
        await basePage.click(this.dropdownItem1)
        await basePage.sendKeys(this.inputItemSearch, item)
       await basePage.keyboardEnter()
        console.log("Item entered successfully....")
    }
    await basePage.sendKeys(this.inputLength2, length)
    await basePage.sendKeys(this.inputWidth2, width)
    await basePage.sendKeys(this.inputHeight2, height)
    await basePage.sendKeys(this.inputWeight2, weight)
    // await basePage.scrollToElement(this.checkBoxFreezer)
    // await basePage.click(this.checkBoxFreezer)
   
}


async clickCreateConsignment() {
    
    await basePage.scrollToElement(this.btnCreateConsignment)
    await basePage.waitForLocator(this.btnCreateConsignment)
    await basePage.click(this.btnCreateConsignment)
    console.log("Btn Create consignment clicked....")
}

async clickUpdateConsignment() {
    
    await basePage.scrollToElement(this.btnUpdateConsignment)
    await basePage.waitForLocator(this.btnUpdateConsignment)
    await basePage.click(this.btnUpdateConsignment)
    console.log("Btn Update consignment clicked....")
}


async getJobReferenceID() {
    await basePage.wait(3000)
    await basePage.scrollToElement(this.txtBookingReference)
    reference = await basePage.getText(this.txtBookingReference)
    var numberRegex = /\d+/;
    extractedNumber = reference.match(numberRegex)?.[0];
    console.log("Reference Number : "+extractedNumber);
    await basePage.click(this.btnViewMyJobs)
}

async clickAddAnotherJob(){
    await basePage.scrollToElement(this.btnAddAnotherJob)
    await basePage.click(this.btnAddAnother)
    console.log("Button Add Another Job clicked....")
}

async verifySuccessMsg() {
    let isVerify = false;
    await basePage.wait(5000); // optional, if needed for async content

    // Try scrolling to txtJobSuccessMsg first
    try {
        await basePage.scrollToElement(this.txtJobSuccessMsg);
        if (await basePage.verifyElement(this.txtJobSuccessMsg)) {
            console.log("msg : " + await basePage.getText(this.txtJobSuccessMsg));
            console.log("Success message verified successfully....");
            return true;
        }
    } catch (err) {
        // Element might not be attached — silently continue to next option
    }

    // Try scrolling to txtJobSuccessMsgInJC
    try {
        await basePage.scrollToElement(this.txtJobSuccessMsgInJC);
        if (await basePage.verifyElement(this.txtJobSuccessMsgInJC)) {
            console.log("msg : " + await basePage.getText(this.txtJobSuccessMsgInJC));
            console.log("Success message verified successfully....");
            return true;
        }
    } catch (err) {
        // Element might not be attached — fallback
    }

    console.log("\x1b[31mSuccess message verification failed....\x1b[0m");
    return false;
}


// async verifySuccessMsg(){
//     let isVerify = false
//     await basePage.wait(5000)
//    await basePage.scrollToElement(this.txtJobSuccessMsg)
//     if(await basePage.verifyElement(this.txtJobSuccessMsg)) {
//         console.log("msg : "+await basePage.getText(this.txtJobSuccessMsg))
//         console.log("Success message verified successfully....")
//         isVerify = true
//     }
//     else if(await basePage.verifyElement(this.txtJobSuccessMsgInJC)){
//         console.log("msg : "+await basePage.getText(this.txtJobSuccessMsgInJC))
//         console.log("Success message verified successfully....")
//         isVerify = true
//     }
//     else{
//         console.log("\x1b[31mSuccess message verification failed....\x1b[0m")
//         isVerify = false  
//     }
//    return isVerify
// }

async chooseMovement(movement){
    //await basePage.wait(1000)
    await basePage.click(this.dropDownMovement)
    const element = this.txtMovement.replace("<<Text>>", movement)
    await basePage.click(element)

    // await basePage.selectFromDropdown(this.selectMovement, movement)
}

async chooseCustomer(customer){
    let element = this.txtValueCustomer.replace("<<Text>>", customer)
    await basePage.wait(2000)
    await basePage.scrollToElement(this.dropDownSelectCustomer)
    await basePage.click(this.dropDownSelectCustomer)
    await basePage.scrollToElement(element)
    await basePage.click(element)
}


async chooseCustomer1(customer){
    let element = this.txtValueCustomer.replace("<<Text>>", customer)
    await basePage.wait(3000)
    await basePage.scrollToElement(this.clickChargeTo)
    await basePage.click(this.clickChargeTo)
    await basePage.scrollToElement(element)
    await basePage.click(element)
}

async enterReferences(ref1,ref2,ref3,ref4){
    await basePage.sendKeys(this.inputRef1, ref1)
    await basePage.sendKeys(this.inputRef2, ref2)
    await basePage.sendKeys(this.inputRef3, ref3)
    await basePage.sendKeys(this.inputRef4, ref4)
}


// async enterSenderDetails1(sender){
//     await basePage.wait(1000)
//     await basePage.click(this.iconSenderAddressJC)
//     await basePage.scrollToElement(this.iconSenderSearchAddressJC)
//     await basePage.sendKeys(this.iconSenderSearchAddressJC, sender)
//     //await basePage.keyboardEnter()
//     await basePage.click(this.txtAddress2)
// }

async enterSenderDetails1(){
    await basePage.wait(1000)
    await basePage.click(this.iconHomeInSender)
}

async enterSenderDetails(sender){
    await basePage.wait(1000)
    await basePage.click(this.iconSenderAddress)
    await basePage.scrollToElement(this.searchSenderAddress)
    await basePage.sendKeys(this.searchSenderAddress, sender)
    await basePage.keyboardEnter()
    await basePage.click(this.txtSenderAddress)
    
}

async updateSenderDetails(sender){
    await basePage.wait(1000)
    await basePage.click(this.iconSenderAddress)
    await basePage.scrollToElement(this.searchSenderAddress)
    await basePage.sendKeys(this.searchSenderAddress, sender)
    await basePage.clear(this.searchSenderAddress)
    await basePage.sendKeys(this.searchSenderAddress, sender)
    //await basePage.keyboardEnter()
    await basePage.click(this.updateSender)
    console.log("Sender Updated successfully...")
}

async updateReceiverDetails(receiver){
    await basePage.wait(1000)
    await basePage.click(this.iconReceiverAddress)
    await basePage.scrollToElement(this.searchReceiverAddress)
    await basePage.sendKeys(this.searchReceiverAddress, receiver)
    await basePage.clear(this.searchReceiverAddress)
    await basePage.sendKeys(this.searchReceiverAddress, receiver)
    //await basePage.keyboardEnter()
    await basePage.wait(10000)
    await basePage.click(this.updateReceiver)
    console.log("Receiver Updated successfully...")
    
}

async enterReceiverDetails(receiver){
    await basePage.click(this.iconReceiverAddress)
    await basePage.scrollToElement(this.searchReceiverAddress)
    await basePage.sendKeys(this.searchReceiverAddress, receiver)
    await basePage.keyboardEnter()
    await basePage.click(this.txtReceiverAddress)
}

async enterReceiverDetails1(receiver){
    await basePage.click(this.iconReceiverAddress)
    await basePage.scrollToElement(this.searchReceiverAddress)
    await basePage.sendKeys(this.searchReceiverAddress, receiver)
    await basePage.keyboardEnter()
    await basePage.click(this.txtAddress1)
}

async enterReceiverDetailsForCarrier(receiver){
    await basePage.click(this.iconReceiverAddress)
    await basePage.scrollToElement(this.searchReceiverAddress)
    await basePage.sendKeys(this.searchReceiverAddress, receiver)
    await basePage.keyboardEnter()
    await basePage.click(this.txtCarrierAddressReceiver)
}

async enterReceiverDetailsForContractor(receiver){
    await basePage.click(this.iconReceiverAddress)
    await basePage.scrollToElement(this.searchReceiverAddress)
    await basePage.sendKeys(this.searchReceiverAddress, receiver)
    await basePage.keyboardEnter()
    await basePage.click(this.conAddressReceiver)
}

async enterSpecialRequirements(field, splRequirement){
    let element = this.inputSpecialRequirements.replace("<<Text>>", field)
    await basePage.scrollToElement(element)
    await basePage.selectFromDropdown(element, splRequirement)
}

async enterJobItems(count, item){
    await basePage.scrollToElement(this.inputCount)
    await basePage.sendKeys(this.inputCount, count)
    
    if(await basePage.verifyElement(this.inputItem)){
        await basePage.sendKeys(this.inputItem, item)
        console.log("Item entered successfully....")
    }
    else{
        await basePage.click(this.dropdownItem)
        await basePage.sendKeys(this.inputItemSearch, item)
       await basePage.keyboardEnter()
        console.log("Item entered successfully....")
    }
}

async enterPalletAndSpaces(pallet, space){
    await basePage.sendKeys(this.inputPallets, pallet)
    await basePage.sendKeys(this.inputSpaces, space)
}

async addAnotherJobItems(freightCode, count, item, freightCode1){
    await basePage.selectFromDropdown(this.inputFreightCode1, freightCode)
    await basePage.scrollToElement(this.btnAddItemInJc)
    await basePage.click(this.btnAddItemInJc)
    await basePage.scrollToElement(this.inputCount1)
    await basePage.sendKeys(this.inputCount1, count)
    await basePage.sendKeys(this.inputItem1, item)
    await basePage.selectFromDropdown(this.inputFreightCode2, freightCode1)
}

async enterNotes(jobNotes, invoiceNotes){
    await basePage.scrollToElement(this.inputNotesForJob)
    await basePage.sendKeys(this.inputNotesForJob, jobNotes)
    await basePage.sendKeys(this.inputNotesForInvoice, invoiceNotes)
}

async enterNotes1(jobNotes){
    await basePage.scrollToElement(this.inputNotesForJob)
    await basePage.sendKeys(this.inputNotesForJob, jobNotes)
    
}

async enterSpecialInstructions(splInstructions){
    await basePage.sendKeys(this.specialInstructions, splInstructions)
}
async clickBtnBookJob(){
    await basePage.scrollToElement(this.btnBookJob)
    await basePage.click(this.btnBookJob)
    console.log("Job created successfully....")
}

async enterPurchaseOrder(purchaseOrder){
    await basePage.scrollToElement(this.inputPurchaseOrder)
    await basePage.sendKeys(this.inputPurchaseOrder, purchaseOrder)
}

async enterItem(item){
    await basePage.scrollToElement(this.dropDownItem)
    await basePage.selectFromDropdown(this.dropDownItem, item)
}

async enterWeight(weight){
    await basePage.scrollToElement(this.inputItemWeight)
    await basePage.sendKeys(this.inputItemWeight, weight)
}

async clickBtnContinueWithBooking(){
    await basePage.waitForLocator(this.btnContinueWithBooking)
    await basePage.scrollToElement(this.btnContinueWithBooking)
    await basePage.click(this.btnContinueWithBooking)
}

async addPackageInFuel(freightCode, purchaseOrder, item, weight, freightCode1){
    await basePage.scrollToElement(this.inputFreightCode1)
    await basePage.selectFromDropdown(this.inputFreightCode1,freightCode)
    await basePage.click(this.btnAddPackage)
    await basePage.scrollToElement(this.inputPurchaseOrder2)
    await basePage.sendKeys(this.inputPurchaseOrder2, purchaseOrder)
    await basePage.selectFromDropdown(this.dropDownItem1, item)
    await basePage.sendKeys(this.inputItemWeight1, weight)
    await basePage.clickCheckBox(this.checkBoxDG)
    await basePage.selectFromDropdown(this.inputFreightCode2, freightCode1)
}

async enterPens(pens){
    await basePage.sendKeys(this.inputPens, pens)
}

async enterPenReference(penReference){
    await basePage.sendKeys(this.inputPenReference, penReference)
}

async addpackageLiveStock(freightCode, count, purchaseOrder, item, weight, pens, penReference, freightCode1){
    await basePage.scrollToElement(this.inputFreightCode1)
    await basePage.selectFromDropdown(this.inputFreightCode1,freightCode)
    await basePage.click(this.btnAddPackage)
    await basePage.sendKeys(this.inputCount1, count)
    await basePage.sendKeys(this.inputPurchaseOrder2, purchaseOrder)
    if(await basePage.verifyElement(this.inputItem1)){
        await basePage.sendKeys(this.inputItem1, item)
        console.log("Item entered successfully....")
    }
    else{
        await basePage.click(this.dropdownItem1)
        await basePage.sendKeys(this.inputItemSearch, item)
       await basePage.keyboardEnter()
        console.log("Item entered successfully....")
    }
    await basePage.sendKeys(this.inputWeight2, weight)
    await basePage.sendKeys(this.inputPens1, pens)
    await basePage.sendKeys(this.inputPenReference, penReference)
    await basePage.selectFromDropdown(this.inputFreightCode2, freightCode1)
}

async selectRevenue(revenue) {
    await basePage.waitForLocator(this.DropdownRevenue)
    await basePage.click(this.DropdownRevenue)
    await basePage.sendKeys(this.inputRevenue, revenue)
    await basePage.keyboardEnter()
}


async enterSenderDetails2(SenderZone){
    await basePage.click(this.iconSenderAddress)
    await basePage.scrollToElement(this.searchSenderAddress)
    await basePage.sendKeys(this.searchSenderAddress, SenderZone)
    await basePage.keyboardEnter()
    await basePage.click(this.SourcetxtAddress2)

}
 // due dates check


async dateOffsetCheckerCalendar(movement){
    await basePage.click(this.PUDateField)  //click to open PU date calendar
    await basePage.waitForLocator(this.pickerDay)

    await basePage.wait(300)
    let PUDate = await basePage.getAttribute(this.pickerDay,"aria-label")
    testDataUtil.addKeyValueToObject(movement,"PUDate", PUDate) 
    console.log(PUDate + " saved PU date calendar in test data....")
    
    await basePage.click(this.pickerDay) //click to close calendar

    await basePage.click(this.DueDateField) //click to open due date calendar
    await basePage.waitForLocator(this.pickerDay)

    await basePage.wait(300)
    let DueDate = await basePage.getAttribute(this.pickerDay,"aria-label")
    testDataUtil.addKeyValueToObject(movement,"DueDate", DueDate) 
    console.log(DueDate + " saved due date calendar in test data....")

    await basePage.click(this.pickerDay)  //click to close calendar
    await basePage.wait(300)

}

async dateOffsetChecker(){
    await basePage.wait(300)
    const PUDateValue = await basePage.getInputValue(this.PUDateField)
    console.log(PUDateValue + " PU date....")
    
    await basePage.waitForLocator(this.DueDateField)
    const DueDateValue = await basePage.getInputValue(this.DueDateField)    
    console.log(DueDateValue + " Due date....")

    let PUDate = PUDateValue
    let DueDate = DueDateValue

    return {PUDate,DueDate}
}


 // due dates check
async ComparisonDate(service){
    const servicetype=this.elementServiceType.replace("<<Text>>",service)
    const getservicetype = await basePage.getText(servicetype)
    console.log(getservicetype + " service type ....")

    await basePage.wait(1500)

        if (getservicetype == "INCLUDE SAT SUN"){

            await basePage.wait(300)
            const {PUDate,DueDate} = await this.dateOffsetChecker();
            const result = await basePage.calculateDaysBetweenDates(PUDate,DueDate);
            
            const Extracteddatesoffset = result
            console.log(Extracteddatesoffset + " offset days from create consignment....")  
            await basePage.wait(300)

            const addressbook = new Addressbook(this.page, this.extractedOffset)
            const ExtractedOffset = await addressbook.extractedOffset
            console.log(ExtractedOffset + " offset days from address book....")

            await basePage.compareOffsetDates(ExtractedOffset, Extracteddatesoffset);

        } else if (getservicetype == "EXCLUDE SAT SUN"){
        
            await basePage.wait(300)
            const {PUDate,DueDate} = await this.dateOffsetChecker();
            const result = await basePage.countWeekdays(PUDate,DueDate);
            
            const Extracteddatesoffset = result
            console.log(Extracteddatesoffset + " offset days from create consignment....")  
            await basePage.wait(300)

            const addressbook = new Addressbook(this.page, this.extractedOffset)
            const ExtractedOffset = await addressbook.extractedOffset
            console.log(ExtractedOffset + " offset days from address book....")

            await basePage.compareOffsetDates(ExtractedOffset, Extracteddatesoffset);
        
        } else if (getservicetype == "EXCLUDE SUN"){
        
            await basePage.wait(300)
            const {PUDate,DueDate} = await this.dateOffsetChecker();
            const result = await basePage.countWeekdayswithSaturday(PUDate,DueDate);
            
            const Extracteddatesoffset = result
            console.log(Extracteddatesoffset + " offset days from create consignment....")  
            await basePage.wait(300)

            const addressbook = new Addressbook(this.page, this.extractedOffset)
            const ExtractedOffset = await addressbook.extractedOffset
            console.log(ExtractedOffset + " offset days from address book....")

            await basePage.compareOffsetDates(ExtractedOffset, Extracteddatesoffset);
        
        } else if (getservicetype == "EXCLUDE SAT"){
        
            await basePage.wait(300)
            const {PUDate,DueDate} = await this.dateOffsetChecker();
            const result = await basePage.countWeekdayswithSunday(PUDate,DueDate);
            
            const Extracteddatesoffset = result
            console.log(Extracteddatesoffset + " offset days from create consignment....")  
            await basePage.wait(300)

            const addressbook = new Addressbook(this.page, this.extractedOffset)
            const ExtractedOffset = await addressbook.extractedOffset
            console.log(ExtractedOffset + " offset days from address book....")

            await basePage.compareOffsetDates(ExtractedOffset, Extracteddatesoffset);
        
        } else {
            await basePage.wait(300)
            console.log ("\x1b[31mfailed to verify offset dates....\x1b[0m")
        
            }

}




async enterSenderDetailsUpdated(SenderZone){
    await basePage.click(this.iconSenderAddressUpdated)
    await basePage.scrollToElement(this.searchSenderAddressUpdated)
    await basePage.sendKeys(this.searchSenderAddressUpdated, SenderZone)
    await basePage.clickKeyboardBackSpace()
    await basePage.wait(500)
    await basePage.keyboardEnter()
    await basePage.click(this.SourcetxtAddress2)

}

async enterReceiverDetailsUpdated(ReceiverZone){
    await basePage.click(this.iconReceiverAddressUpdated)
    await basePage.scrollToElement(this.searchReceiverAddressUpdated)
    await basePage.sendKeys(this.searchReceiverAddressUpdated, ReceiverZone)
    await basePage.clickKeyboardBackSpace()
    await basePage.wait(1000)
    await basePage.keyboardEnter()
    await basePage.click(this.DestinationTxtAddress2)
}


async enterReceiverDetails2(ReceiverZone){
    await basePage.click(this.iconReceiverAddress)
    await basePage.scrollToElement(this.searchReceiverAddress)
    await basePage.sendKeys(this.searchReceiverAddress, ReceiverZone)
    await basePage.clickKeyboardBackSpace()
    await basePage.wait(1000)
    await basePage.keyboardEnter()
    await basePage.click(this.DestinationTxtAddress3)
}

async AddDG(movement,count, PackType, Qty){
    await basePage.scrollToElement(this.checkBoxDG2)
    await basePage.click(this.checkBoxDG2)
    await basePage.waitForLocator(this.DGUNNumber)
    await basePage.click(this.DGUNNumber)
    await basePage.click(this.UNNumberchoices)
    await basePage.click(this.Subdivision)
    await basePage.click(this.SubOption)
    await basePage.click(this.packGroup)
    await basePage.click(this.packOption)
    let DGlogo = await basePage.getAttribute(this.DGlogo,"src")
    testDataUtil.addKeyValueToObject(movement, "DGLogo", DGlogo)
    console.log("DGLogo: "+ DGlogo)
    await basePage.scrollToElement(this.DGinput)
    await basePage.sendKeys(this.DGinput, count)
    await basePage.sendKeys(this.DGPacktype, PackType)
    await basePage.sendKeys(this.DGQty, Qty)
    await basePage.keyboardEnter()
    await basePage.click(this.buttonOK)
}

async clickAcceptDG() {
    
    await basePage.scrollToElement(this.btnDG)
    await basePage.waitForLocator(this.btnDG)
    await basePage.click(this.btnDG)
    console.log("Btn Dangerous Goods clicked....")
}


async verifyChiller(chiller)
{
    let isVerify = false
    let element1 = this.checkBox.replace("<<Text>>", chiller)
    await basePage.scrollToElement(element1)
    if(await basePage.isCheckboxChecked(element1))
    {
    console.log("Chiller is checked")
    isVerify = true
    }
    console.log("Chiller is not checked")
    return isVerify
}

async verifyFreezer(freezer)
{
    let isVerify = false
    let element1 = this.checkBox.replace("<<Text>>", freezer)
    await basePage.scrollToElement(element1)
    if(await basePage.isCheckboxChecked(element1))
   {
    isVerify = true
   }
    return isVerify
}



}

module.exports = Create_Consignment_Page




