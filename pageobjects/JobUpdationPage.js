 const {expect} = require ('@playwright/test');
 const CreateConsignmentPage = require("../pageobjects/Create_Consignment_page");
 const { timeout } = require('../playwright.config1');
 const basePage = require ('../features/support/BasePage.js')
 const TestDataUtil = require('../features/support/Utils/TestDataUtil.js');
 const TimeUtil = require('../features/support/Utils/TimeUtil.js');
 const AddressBook = require("../pageobjects/Addressbook.js");
 const path=require('path');
 const Create_Consignment_Page = require('../pageobjects/Create_Consignment_page');
 const testDataUtil = new TestDataUtil()
 const timeUtil = new TimeUtil()
 
 class JobUpdationPage {
     
 constructor(page)
 {
     
     this.page = page;

    //this.editBookedJob="(//i[text()='edit'])[1]"
    this.editBookedJob="//button[@id='myJobsEditJobBtn']"
    this.updateConsignmentBtn="//button[text()='Update Consignment']"
 }
 
  async updateTheCreatedJob(movement){
       await this.updateJobSenderReceiverAddress(movement)
    }

  async updateJobSenderReceiverAddress(movement){
     let createConsignmentPage = new CreateConsignmentPage(page)
        await basePage.scrollToElement(this.editBookedJob)
        if(await basePage.verifyElement(this.editBookedJob)){
            await basePage.click(this.editBookedJob)
            await basePage.wait(2000)
            console.log("Edit button is clicked...")
        }
        await basePage.wait(5000)
        await createConsignmentPage.updateSenderDetails(testDataUtil.getValueByNestedKey(movement, "UpdateSender"))
        await createConsignmentPage.updateReceiverDetails(testDataUtil.getValueByNestedKey(movement, "UpdateReceiver"))
        await basePage.scrollToElement(this.updateConsignmentBtn)
        await basePage.wait(1000)
        await basePage.click(this.updateConsignmentBtn)
        console.log("Job is updated successfully...")
  }

}
module.exports = JobUpdationPage