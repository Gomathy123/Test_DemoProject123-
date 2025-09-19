const {expect} = require ('@playwright/test');
const CreateConsignmentPage = require("./Create_Consignment_page.js");
const { timeout } = require('../playwright.config1.js');
const basePage = require ('../features/support/BasePage.js')
const TestDataUtil = require('../features/support/Utils/TestDataUtil.js');
const AddressBook = require("./Addressbook.js");
const ReadPdf = require('../features/support/Utils/PdfUtil.js');
const path=require('path');
const os = require('os');  // Ensure this is correctly imported


const testDataUtil = new TestDataUtil()
const readPdf = new ReadPdf()


class Carrier_contractorPage { 
    
    constructor(page, extractedNumber)
    {
        this.page = page;
        this.extractedNumber = extractedNumber
        this.ref1Completed = "//span[text()='Example Reference']/following-sibling::div"
        this.ref2Completed = "//span[text()='Additional Reference 2']/following-sibling::div"
        this.ref3Completed = "//span[text()='Additional Reference 3']/following-sibling::div"
        this.ref4Completed = "//span[text()='Additional Reference 4']/following-sibling::div"
        this.jobNotesCompleted = "//div[normalize-space(text())='Job Notes']/parent::div"
        this.txtJobNotes = "(//div[@class='single-notes-container']/div/p)[1]"
        this.tabCompletedInvoices = "//div[text()='Completed Invoices']"
        this.completedInvoice = "//tbody/tr[1]"
        this.txtReferenceNum="(//table[contains(@class,'details-table')]//tr[1]/td)[2]"
        this.invoiceRefNum ="//h6[text()='Issued Date: ']/../preceding-sibling::h5"
        this.searchInvoiceNumber = "//input[@id='invoiceSearchInput']"

        this.inputSearch = "(//input[contains(@id,'SearchInput')])[1]"
        this.txtRefNumber = "//div[text()='Bustle Reference']/following-sibling::p"
        this.spinnerelement = "//div[contains(@class,'spinner')][2]"
        this.jobType = "//h6[contains(@class,'job-type')]"
        this.referenceID = "(//h6[contains(@class,'job-type')]/following::span[text()='Reference']/following::div)[1]"

    }

    async verifyReferencesInContractorPage(ref1, ref2, ref3, ref4){
        let isVerify = false
        await basePage.scrollToElement(this.ref1Completed)
        if(await basePage.verifyElement(this.ref1Completed)){
            await basePage.verifyText(this.ref1Completed, ref1.toUpperCase())
            await basePage.verifyText(this.ref2Completed, ref2.toUpperCase())
            await basePage.verifyText(this.ref3Completed, ref3.toUpperCase())
            await basePage.verifyText(this.ref4Completed, ref4.toUpperCase())
            console.log("References are verified successfully....")
            isVerify = true
        }
        else{
            console.log("References verification failed....")
        }
        return isVerify
    }


    async verifyJobNotes(jobNotes){
        await basePage.wait(3000)
        let isVerify = false
        await basePage.scrollToElement(this.jobNotesCompleted)
        if(await basePage.verifyElement(this.jobNotesCompleted)){
            await basePage.click(this.jobNotesCompleted)
            await basePage.verifyElement(this.txtJobNotes)
            // await basePage.verifyText(this.txtJobNotes, jobNotes)
            const jobNote = await basePage.getText(this.txtJobNotes)
            console.log("txtJobNotes : "+ jobNote.trim())
             await basePage.verifyText(jobNote, jobNotes)
            console.log("Job Notes verified successfully.....")
            isVerify = true
        }
        return isVerify            
    }

    async verifyDetailsInInvoiceCarrier(movement) {
    let isVerify = false
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    await basePage.click(this.tabCompletedInvoices)
    console.log('Tab CompletedInvoices is clicked....')
    await basePage.sendKeys(this.searchInvoiceNumber, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.wait(4000)
    await basePage.scrollToElement(this.completedInvoice)
    const invoiceJobState = await basePage.verifyElement(this.completedInvoice)
    console.log("invoiceJob State :"+invoiceJobState)
    if(invoiceJobState){
        await basePage.click(this.completedInvoice)
        console.log('completedInvoice job is clicked....')
        await basePage.scrollToElement(this.invoiceRefNum)
        await basePage.waitForLocator(this.invoiceRefNum)
        await basePage.verifyElement(this.invoiceRefNum)
        console.log("Invoice RefNum: "+await basePage.getText(this.invoiceRefNum))
         let invoiceNumber = await basePage.getText(this.invoiceRefNum)
        const invoiceNum=invoiceNumber.match(/\d+/g);
        testDataUtil.addKeyValueToObject(movement,"InvoiceNumberCarrier",invoiceNum)
        await basePage.scrollToElement(this.txtReferenceNum)
        console.log(await basePage.getText(this.txtReferenceNum))
        await basePage.verifyText(this.txtReferenceNum, createConsignmentPage.extractedNumber)
        console.log("invoice verified sucessfully.....")
        isVerify = true
       
    }
       return isVerify
}

    async verifyDetailsInInvoiceContractor(movement) {
    let isVerify = false
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    await basePage.click(this.tabCompletedInvoices)
    console.log('Tab CompletedInvoices is clicked....')
    await basePage.sendKeys(this.searchInvoiceNumber, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.wait(4000)
    await basePage.scrollToElement(this.completedInvoice)
    const invoiceJobState = await basePage.verifyElement(this.completedInvoice)
    console.log("invoiceJob State :"+invoiceJobState)
    if(invoiceJobState){
        await basePage.click(this.completedInvoice)
        console.log('completedInvoice job is clicked....')
        await basePage.scrollToElement(this.invoiceRefNum)
        await basePage.waitForLocator(this.invoiceRefNum)
        await basePage.verifyElement(this.invoiceRefNum)
        console.log("Invoice RefNum: "+await basePage.getText(this.invoiceRefNum))
        let invoiceNumber = await basePage.getText(this.invoiceRefNum)
        const invoiceNum=invoiceNumber.match(/\d+/g);
        testDataUtil.addKeyValueToObject(movement,"InvoiceNumberContractor",invoiceNum)
        await basePage.scrollToElement(this.txtReferenceNum)
        console.log(await basePage.getText(this.txtReferenceNum))
        await basePage.verifyText(this.txtReferenceNum, createConsignmentPage.extractedNumber)
        console.log("invoice verified sucessfully.....")
        isVerify = true
       
    }
       return isVerify
}



async verifyCreatedJob(strMovement) {
    let isVerify = false;
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.waitForLocator(this.inputSearch)
    await basePage.click(this.inputSearch)
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.wait(4000)
    const movementLocator = page.locator(`//td/div[text()='${createConsignmentPage.extractedNumber}#M']/.. | //td[text()='${createConsignmentPage.extractedNumber}#M']`);
    console.log(`//td/div[text()='${createConsignmentPage.extractedNumber}#M'] | //td[text()='${createConsignmentPage.extractedNumber}#M']`);
    await movementLocator.click()
    console.log("Movement locator clicked successfully....")
    await basePage.waitForLocatorDisappear(this.spinnerelement)
    await basePage.waitForLocator(this.jobType)
    const jobType = await basePage.getText(this.jobType)
    const refId = await basePage.getText(this.referenceID)

    console.log("Job Type: " + jobType.trim())
    console.log("REF ID: " + refId.trim())
    
    const regex = /^\d+/;
     const referenceNum = refId.match(regex);

    if (referenceNum == createConsignmentPage.extractedNumber) {
        isVerify = true;
        console.log("Job filtered sucessfully.....");
    } else {
        console.log("Job filter failed.....");
    }
    return isVerify;
}


}
module.exports = Carrier_contractorPage