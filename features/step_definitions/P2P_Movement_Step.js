const { defineParameterType, When, Given,Then } = require("@cucumber/cucumber")
const path = require("path")
const {test, expect} = require('@playwright/test')
const CreateConsignmentPage = require("../../pageobjects/Create_Consignment_page")
const create_Consignment_Page = new CreateConsignmentPage()
const LoginPage = require('../../pageobjects/LoginPage');
const MyJobsPage = require("../../pageobjects/MyJobsPage")
const myJobsPage = new MyJobsPage()
const TestDataUtil = require('../support/Utils/TestDataUtil');
const BasePage = require("../support/BasePage");
const testDataUtil = new TestDataUtil()
const JobsCompletionPage = require("../../pageobjects/JobCompletionPage");
const jobsCompletionPage = new JobsCompletionPage()
const JobUpdationPage = require("../../pageobjects/JobUpdationPage");
const jobsUpdationPage = new JobUpdationPage()
const Manifest = require("../../pageobjects/Manifest")
const manifest = new Manifest()


  Given('I am on the Bustle homepage', async function () {
    let loginpage = new LoginPage(page);
    await expect(await loginpage.verifyBustleHomePage()).toBeTruthy() 
    });

  When('I navigate to the Create Consignment page', async function () {
    await myJobsPage.navigateToJobSection()
    await create_Consignment_Page.navigateToCreateConsignment()
    })
     


  When('I create a consignment for {string}', async function (movement) {
    await create_Consignment_Page.chooseMovement(testDataUtil.getValueByNestedKey(movement,"Movement"))
    await create_Consignment_Page.chooseCustomer(testDataUtil.getValueByNestedKey(movement, "Customer"))
    await create_Consignment_Page.enterReferences(testDataUtil.getValueByNestedKey(movement, "Ref1"),
    testDataUtil.getValueByNestedKey(movement, "Ref2"),
    testDataUtil.getValueByNestedKey(movement, "Ref3"),
    testDataUtil.getValueByNestedKey(movement, "Ref4"))
    await create_Consignment_Page.chooseDestination(testDataUtil.getValueByNestedKey(movement, "Destination"))
    await create_Consignment_Page.enterTrailerType(testDataUtil.getValueByNestedKey(movement, "TrailerType"))
    await create_Consignment_Page.enterSenderDetails(testDataUtil.getValueByNestedKey(movement, "Sender"))
    await create_Consignment_Page.enterReceiverDetails(testDataUtil.getValueByNestedKey(movement, "Receiver"))
    await create_Consignment_Page.enterSpecialRequirements(testDataUtil.getValueByNestedKey(movement, "Field1"),
    testDataUtil.getValueByNestedKey(movement, "SplRequirement"))
    await create_Consignment_Page.enterSpecialRequirements(testDataUtil.getValueByNestedKey(movement, "Field2"),
    testDataUtil.getValueByNestedKey(movement, "SplRequirement"))
    await create_Consignment_Page.enterJobItems(testDataUtil.getValueByNestedKey(movement, "Count"),
    testDataUtil.getValueByNestedKey(movement, "Item"))
    await create_Consignment_Page.enterJobDimensions(testDataUtil.getValueByNestedKey(movement, "PurchaseOrder"),
    testDataUtil.getValueByNestedKey(movement, "Length"),
    testDataUtil.getValueByNestedKey(movement, "Width"),
    testDataUtil.getValueByNestedKey(movement, "Height"),
    testDataUtil.getValueByNestedKey(movement, "Weight"),
    testDataUtil.getValueByNestedKey(movement, "Code"))
    await create_Consignment_Page.enterNotes(testDataUtil.getValueByNestedKey(movement, "JobNotes"),
    testDataUtil.getValueByNestedKey(movement, "InvoiceNotes"))    
    await create_Consignment_Page.clickCreateConsignment();
  })

  Then('I should see the Success message {string}', async (movement)=> {
    expect(await create_Consignment_Page.verifySuccessMsg()).toBeTruthy()
    await create_Consignment_Page.getJobReferenceID()  
    await myJobsPage.navigateToJobSection()
})

  Given('I am on my jobs page', async function () {
    await myJobsPage.navigateToMyJobs()
    await expect(await myJobsPage.verifyMyJobSection()).toBeTruthy()
  } )

  When('I see the created {string}', async (movement)=> {
    await expect(myJobsPage.verifyAssignedJob(testDataUtil.getValueByNestedKey(movement, "Movement"))).toBeTruthy()
    
  })

  When('I see the created {string} and update the job', async (movement)=> {
    await expect(myJobsPage.verifyAssignedJob(testDataUtil.getValueByNestedKey(movement, "Movement"))).toBeTruthy()
    await jobsUpdationPage.updateTheCreatedJob(movement)
    await myJobsPage.clickManageDocument()
    await myJobsPage.dowloadFreightlabelOnly(movement)
    await myJobsPage.verifyIfPdfExist("FreightLabelPdf",`${movement}_FreightLabel.pdf`)
    await myJobsPage.dowloadTransportRequestOnly(movement)
    await myJobsPage.verifyIfPdfExist("TransportRequestPdf",`${movement}_TransportRequest.pdf`)



  })

  When('I assign the driver to the {string}', async (movement)=> {
    await myJobsPage.assignDriverForP2PJob(testDataUtil.getValueByNestedKey(movement, "Driver"))
})

When('I move the {string} to the completed stage', async (movement)=> {
  await jobsCompletionPage.completeP2PJob(movement)
  // await myJobsPage.clickbtnsPickup()
  // await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "SenderFirstName"),
  // testDataUtil.getValueByNestedKey(movement, "SenderLastName"))
  // await myJobsPage.putTheSign()
  // await myJobsPage.clickBtnJobClosed()
  // await myJobsPage.clickBtnJobClosed()
  // await myJobsPage.clickBtnJobClosed()
  // await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "ReceiverFirstName"),
  // testDataUtil.getValueByNestedKey(movement, "ReceiverLastName"))
  // await myJobsPage.putTheSign()
  // await myJobsPage.getExitTime(movement)
})

When('I click on Invoice Job in Completed jobs', async function () {
  let myJobsPage = new MyJobsPage(page)
  await myJobsPage.clickInvoiceJob();
});
  
  // ================================================
  When('I am on the invoice page', async function () {
    let myJobsPage = new MyJobsPage(page)
    await myJobsPage.clickInvoiceJob();
  })

  When('I expand the sidebar', async function () {
    let myJobsPage = new MyJobsPage(page)
    await myJobsPage.clickCollapseSidebar();
  });

  Then('I should see Invoice reference ID for {string}', async (movement) => {
    let myJobsPage = new MyJobsPage(page)
    await expect(await myJobsPage.verifyInvoiceReferenceID()).toBeTruthy()
    await expect(await myJobsPage.verifyfuelLevyDemurrageAndNoteCharge(testDataUtil.getValueByNestedKey(movement, "TxtFuelLevy"))).toBeTruthy()
    // await expect(await myJobsPage.verifyfuelLevyDemurrageAndNoteCharge(testDataUtil.getValueByNestedKey(movement, "TxtDemurrage"))).toBeTruthy()
    // await expect(await myJobsPage.verifyfuelLevyDemurrageAndNoteCharge(testDataUtil.getValueByNestedKey(movement, "TxtNoteCharge"))).toBeTruthy()
    
    await myJobsPage.getFuelLevyValue(movement)
  })

    Then('I should see Invoice reference ID for {string} without finance customer', async (movement) => {
    let myJobsPage = new MyJobsPage(page)
    expect(await myJobsPage.verifyInvoiceReferenceID()).toBeTruthy()

    
    await myJobsPage.getFuelLevyValue(movement)
  })

  Then('I should see Invoice for job {string} reference ID for {string} and rate {string}', async (movement,freight,rateValue) => {
    let myJobsPage = new MyJobsPage(page)
    await expect(await myJobsPage.verifyInvoiceReferenceID()).toBeTruthy()
    await expect(await myJobsPage.verifyfuelLevyDemurrageAndNoteCharge(testDataUtil.getValueByNestedKey(movement, "TxtFuelLevy"))).toBeTruthy()
    // await expect(await myJobsPage.verifyfuelLevyDemurrageAndNoteCharge(testDataUtil.getValueByNestedKey(movement, "TxtDemurrage"))).toBeTruthy()
    // await expect(await myJobsPage.verifyfuelLevyDemurrageAndNoteCharge(testDataUtil.getValueByNestedKey(movement, "TxtNoteCharge"))).toBeTruthy()
    //console.log(testDataUtil.getNestedValue(freight))
    await expect(await myJobsPage.verifyFreightCodeInInvoicingPage(testDataUtil.getNestedValue(freight))).toBeTruthy()
    await expect(await myJobsPage.verifyRateCharge(testDataUtil.getNestedValue(rateValue),movement)).toBeTruthy()
    await expect(await myJobsPage.verifyPrice(testDataUtil.getNestedValue(rateValue),movement)).toBeTruthy()
    await myJobsPage.getFuelLevyValue(movement)
  })

  

  Then('I should see Invoice reference ID for {string} with Freight Code at package level', async (movement) => {
    let myJobsPage = new MyJobsPage(page)
    await expect(await myJobsPage.verifyInvoiceReferenceID()).toBeTruthy()
    await expect(await myJobsPage.verifyfuelLevyDemurrageAndNoteCharge(testDataUtil.getValueByNestedKey(movement, "TxtFuelLevy"))).toBeTruthy()
    await expect(await myJobsPage.verifyfuelLevy2()).toBeTruthy()
    // await expect(await myJobsPage.verifyfuelLevyDemurrageAndNoteCharge(testDataUtil.getValueByNestedKey(movement, "TxtDemurrage"))).toBeFalsy()
    await expect(await myJobsPage.verifyfuelLevyDemurrageAndNoteCharge(testDataUtil.getValueByNestedKey(movement, "TxtNoteCharge"))).toBeTruthy()
    await myJobsPage.getFuelLevyValue(movement)
  })

  
  Then('I should see Invoice reference ID for {string} at package level', async (movement) => {
    let myJobsPage = new MyJobsPage(page)
    await expect(await myJobsPage.verifyInvoiceReferenceID()).toBeTruthy()
    await expect(await myJobsPage.verifyfuelLevyDemurrageAndNoteCharge(testDataUtil.getValueByNestedKey(movement, "TxtFuelLevy"))).toBeTruthy()
    await expect(await myJobsPage.verifyfuelLevy2()).toBeTruthy()
    // await expect(await myJobsPage.verifyfuelLevyDemurrageAndNoteCharge(testDataUtil.getValueByNestedKey(movement, "TxtDemurrage"))).toBeFalsy()
    await expect(await myJobsPage.verifyfuelLevyDemurrageAndNoteCharge(testDataUtil.getValueByNestedKey(movement, "TxtNoteCharge"))).toBeTruthy()
    await myJobsPage.getFuelLevyValue(movement)
  })

  When('I complete job as invoiced', async () => {
    let myJobsPage = new MyJobsPage(page)
    await myJobsPage.clickbtnBatchInvoice()
  });

  Then('I should see the job details', async () => {
    let myJobsPage = new MyJobsPage(page)
    await expect(await myJobsPage.verifyParcelDetailsInInvoice()).toBeTruthy()
  })

  //

  Then('I should see details of the job {string}', async (movement) => {
    let myJobsPage = new MyJobsPage(page)
    await expect(await myJobsPage.verifyDetailsInInvoice(testDataUtil.getValueByNestedKey(movement,"CreatedBy"))).toBeTruthy()
  })

  Then('I should see the job details in invoice', async () => {
    let myJobsPage = new MyJobsPage(page)
    await expect(await myJobsPage.verifyParcelDetailsInInvoice()).toBeTruthy()
    //await expect(await myJobsPage.verifyAdditionalCharges()).toBeTruthy()
  })

  When('I Signout from application', async function () {
    let myJobsPage = new MyJobsPage(page)
    await myJobsPage.clickSignout();
  });

  Given('I am on the jobs section', async () => {
    let myJobsPage = new MyJobsPage(page)
    await expect(await myJobsPage.verifyJobsSection()).toBeTruthy()
  })
  
    
  Then('I create a consignment for {string} with freight code', async function (movement) {
    let createConsignmentPage = new CreateConsignmentPage(page)
    await create_Consignment_Page.chooseMovement(testDataUtil.getValueByNestedKey(movement,"Movement"))
    // await create_Consignment_Page.selectRevenue(testDataUtil.getValueByNestedKey(movement, "Revenue"))
    await create_Consignment_Page.chooseCustomer(testDataUtil.getValueByNestedKey(movement, "Customer"))
    await create_Consignment_Page.chooseFreightCode(testDataUtil.getValueByNestedKey(movement, "FreightCode"))
    await create_Consignment_Page.enterReferences(testDataUtil.getValueByNestedKey(movement, "Ref1"),
    testDataUtil.getValueByNestedKey(movement, "Ref2"),
    testDataUtil.getValueByNestedKey(movement, "Ref3"),
    testDataUtil.getValueByNestedKey(movement, "Ref4"))
    await createConsignmentPage.chooseDestination(testDataUtil.getValueByNestedKey(movement, "Destination"))
    await createConsignmentPage.enterTrailerType(testDataUtil.getValueByNestedKey(movement, "TrailerType"))
    await createConsignmentPage.enterSenderDetails(testDataUtil.getValueByNestedKey(movement, "Sender"))
    await createConsignmentPage.enterReceiverDetails(testDataUtil.getValueByNestedKey(movement, "Receiver"))
    await create_Consignment_Page.enterSpecialRequirements(testDataUtil.getValueByNestedKey(movement, "Field1"),
    testDataUtil.getValueByNestedKey(movement, "SplRequirement"))
    await create_Consignment_Page.enterSpecialRequirements(testDataUtil.getValueByNestedKey(movement, "Field2"),
    testDataUtil.getValueByNestedKey(movement, "SplRequirement"))
    await create_Consignment_Page.enterJobItems(testDataUtil.getValueByNestedKey(movement, "Count"),
    testDataUtil.getValueByNestedKey(movement, "Item"))
    await create_Consignment_Page.enterJobDimensions(testDataUtil.getValueByNestedKey(movement, "PurchaseOrder"),
    testDataUtil.getValueByNestedKey(movement, "Length"),
    testDataUtil.getValueByNestedKey(movement, "Width"),
    testDataUtil.getValueByNestedKey(movement, "Height"),
    testDataUtil.getValueByNestedKey(movement, "Weight"),
    testDataUtil.getValueByNestedKey(movement, "Code"))
    await create_Consignment_Page.checkChillerAndFreezer(testDataUtil.getValueByNestedKey(movement, "Chiller"),
    testDataUtil.getValueByNestedKey(movement, "Freezer"))
    await create_Consignment_Page.enterNotes(testDataUtil.getValueByNestedKey(movement, "JobNotes"),
    testDataUtil.getValueByNestedKey(movement, "InvoiceNotes"))
    await createConsignmentPage.clickCreateConsignment()
  })

  Then('I create a consignment for {string} with freight code at package level', async (movement) => {
    let createConsignmentPage = new CreateConsignmentPage(page)
    await create_Consignment_Page.chooseMovement(testDataUtil.getValueByNestedKey(movement, "Master"))
    // await create_Consignment_Page.selectRevenue(testDataUtil.getValueByNestedKey(movement, "Revenue"))
    await create_Consignment_Page.chooseCustomer(testDataUtil.getValueByNestedKey(movement, "Customer"))
    await create_Consignment_Page.enterReferences(testDataUtil.getValueByNestedKey(movement, "Ref1"),
    testDataUtil.getValueByNestedKey(movement, "Ref2"),
    testDataUtil.getValueByNestedKey(movement, "Ref3"),
    testDataUtil.getValueByNestedKey(movement, "Ref4"))
    await createConsignmentPage.chooseDestination(testDataUtil.getValueByNestedKey(movement, "Destination"))
    await createConsignmentPage.enterTrailerType(testDataUtil.getValueByNestedKey(movement, "TrailerType"))
    await createConsignmentPage.enterSenderDetails(testDataUtil.getValueByNestedKey(movement, "Sender"))
    await createConsignmentPage.enterReceiverDetails(testDataUtil.getValueByNestedKey(movement, "Receiver"))
    // await create_Consignment_Page.enterPalletAndSpaces(testDataUtil.getValueByNestedKey(movement, "Pallet"),
    // testDataUtil.getValueByNestedKey(movement, "Spaces"))
    await create_Consignment_Page.enterJobItems(testDataUtil.getValueByNestedKey(movement, "Count"),
    testDataUtil.getValueByNestedKey(movement, "Item"))
    await create_Consignment_Page.enterJobDimensions(testDataUtil.getValueByNestedKey(movement, "PurchaseOrder"),
    testDataUtil.getValueByNestedKey(movement, "Length"),
    testDataUtil.getValueByNestedKey(movement, "Width"),
    testDataUtil.getValueByNestedKey(movement, "Height"),
    testDataUtil.getValueByNestedKey(movement, "Weight"),
    testDataUtil.getValueByNestedKey(movement, "Code"))
    await create_Consignment_Page.checkChillerAndFreezer(testDataUtil.getValueByNestedKey(movement, "Chiller"),
    testDataUtil.getValueByNestedKey(movement, "Freezer"))
    await create_Consignment_Page.enterNotes(testDataUtil.getValueByNestedKey(movement, "JobNotes"),
    testDataUtil.getValueByNestedKey(movement, "InvoiceNotes"))
    await create_Consignment_Page.addAnotherJobDetail( testDataUtil.getValueByNestedKey(movement, "FreightCode"),
    testDataUtil.getValueByNestedKey(movement, "Count1"),
    testDataUtil.getValueByNestedKey(movement, "PurchaseOrder"),
    testDataUtil.getValueByNestedKey(movement, "Item"),
    testDataUtil.getValueByNestedKey(movement, "Length"),
    testDataUtil.getValueByNestedKey(movement, "Width"),
    testDataUtil.getValueByNestedKey(movement, "Height"),
    testDataUtil.getValueByNestedKey(movement, "Weight"),
    testDataUtil.getValueByNestedKey(movement, "FreightCode"))
    await createConsignmentPage.clickCreateConsignment()
})

  Then('I should see the completed {string} without freight code', async (movement) => {
    await myJobsPage.verifyCompletedP2PReferenceID(testDataUtil.getValueByNestedKey(movement, "Movement"))
    await expect(await myJobsPage.verifyReferenceId()).toBeTruthy()
    await expect(await myJobsPage.verifyReferences(testDataUtil.getValueByNestedKey(movement, "Ref1"),
    testDataUtil.getValueByNestedKey(movement, "Ref2"),
    testDataUtil.getValueByNestedKey(movement, "Ref3"),
    testDataUtil.getValueByNestedKey(movement, "Ref4"))).toBeTruthy()
    //await expect(await myJobsPage.verifyCustomer(testDataUtil.getValueByNestedKey(movement, "Customer"))).toBeTruthy()
    await expect(await myJobsPage.verifyTrailerType(testDataUtil.getValueByNestedKey(movement, "TrailerType"))).toBeTruthy()
    await expect(await myJobsPage.verifytotalCubicWeight()).toBeTruthy()
    //await expect(await myJobsPage.verifyExitTime(testDataUtil.getValueByNestedKey(movement, "ExitTime"))).toBeTruthy()
    await expect(await myJobsPage.verifyJobAndInvoiceNotes(testDataUtil.getValueByNestedKey(movement, "JobNotes"),
    testDataUtil.getValueByNestedKey(movement, "InvoiceNotes"))).toBeTruthy()
    // let methodName = `updateByValueFor${movement}`;
    // console.log(methodName)
    // if (typeof jobsCompletionPage[methodName] === 'function') {
    // await jobsCompletionPage[methodName](
    //    movement,testDataUtil.getValueByNestedKey(movement, "UpdateByValue")
    // );
    // } else {
    //   console.error(`Method ${methodName} not found on jobsCompletionPage`);
    //  }
})

Then('I should see Completed {string} with freight code', async (movement)=> {
  await myJobsPage.verifyCompletedP2PReferenceID(testDataUtil.getValueByNestedKey(movement, "Movement"))
  await expect(await myJobsPage.verifyReferenceId()).toBeTruthy()
  await expect(await myJobsPage.verifyReferences(testDataUtil.getValueByNestedKey(movement, "Ref1"),
  testDataUtil.getValueByNestedKey(movement, "Ref2"),
  testDataUtil.getValueByNestedKey(movement, "Ref3"),
  testDataUtil.getValueByNestedKey(movement, "Ref4"))).toBeTruthy()
  await expect(await myJobsPage.verifyCustomer(testDataUtil.getValueByNestedKey(movement, "Customer"))).toBeTruthy()
  await expect(await myJobsPage.verifyFreightCode(testDataUtil.getValueByNestedKey(movement, "Code"))).toBeTruthy()
  await expect(await myJobsPage.verifyTrailerType(testDataUtil.getValueByNestedKey(movement, "TrailerType"))).toBeTruthy()
  await expect(await myJobsPage.verifytotalCubicWeight()).toBeTruthy()
  await expect(await myJobsPage.verifyChillerAndFrezeer(testDataUtil.getValueByNestedKey(movement, "Chiller"),
  testDataUtil.getValueByNestedKey(movement, "Freezer"))).toBeTruthy()
  //await expect(await myJobsPage.verifyExitTime(testDataUtil.getValueByNestedKey(movement, "ExitTime"))).toBeTruthy()
  await expect(await myJobsPage.verifyJobAndInvoiceNotes(testDataUtil.getValueByNestedKey(movement, "JobNotes"),
  testDataUtil.getValueByNestedKey(movement, "InvoiceNotes"))).toBeTruthy()
  // let methodName = `updateByValueFor${movement}`;
  //   console.log(methodName)
  //   if (typeof jobsCompletionPage[methodName] === 'function') {
  //   await jobsCompletionPage[methodName](
  //      movement,testDataUtil.getValueByNestedKey(movement, "UpdateByValue")
  //   );
  //   } else {
  //     console.error(`Method ${methodName} not found on jobsCompletionPage`);
  //    }
})

When('I navigate to completed job page {string} and edit freight code {string}',async(movement,freight)=>{
  await myJobsPage.goToJobsPageFromMenu()
  await myJobsPage.navigateToCompletedJob()
  await myJobsPage.editFreightCode(testDataUtil.getValueByNestedKey(movement,"Master1"),testDataUtil.getNestedValue(freight))
  await myJobsPage.clickInvoiceJob()
  
})

Then('I assign the contractor to the {string}', async (movement) => {

await myJobsPage.assignContractorForJob(testDataUtil.getValueByNestedKey(movement,"Contractor1"))
expect(await myJobsPage.VerifyAssignedContractorInOverview(testDataUtil.getValueByNestedKey(movement,"Contractor1"))).toBeTruthy

})

Then('I verify {string} is visible in contractor', async (movement) => {
await myJobsPage.verifyLH3AssignedJob(testDataUtil.getValueByNestedKey(movement, "Movement"))  

})


Then('I verify {string} is visible in contractor and updated the address', async (movement) => {
await myJobsPage.verifyLH3AssignedJob(testDataUtil.getValueByNestedKey(movement, "Movement"))  
await myJobsPage.updateTheCreatedJob(movement)


})

When('I log in back to carrier', async () => {
   let loginpage = new LoginPage(page);
   await loginpage.logoutLoginCarrier2()
  expect(await manifest.verifyJobsSection()).toBeTruthy()
   

})

Then('I Unassign the {string} to contractor', async (movement) => {
  await myJobsPage.verifyLH3AssignedJob(testDataUtil.getValueByNestedKey(movement, "Movement"))
  await myJobsPage.unassignJobtoContractor()
})

Then('I confirm that the {string} is unassigned to contractor', async (movement) => {
  expect(await myJobsPage.VerifyAssignedContractorInOverview(testDataUtil.getValueByNestedKey(movement,"Contractor1"))).toBeFalsy
})

Then('I should not see the {string} in contractor side' , async (movement)=> {
    expect(await manifest.VerifyJobInContractor()).toBeTruthy()


})


When('I create a job for {string} with service type Chiller', async (movement)=> {
    await create_Consignment_Page.chooseMovement(testDataUtil.getValueByNestedKey(movement,"Movement"))
    await create_Consignment_Page.enterReferences(testDataUtil.getValueByNestedKey(movement, "Ref1"),
    testDataUtil.getValueByNestedKey(movement, "Ref2"),
    testDataUtil.getValueByNestedKey(movement, "Ref3"),
    testDataUtil.getValueByNestedKey(movement, "Ref4"))
    await create_Consignment_Page.enterServiceType(testDataUtil.getValueByNestedKey(movement,"ChillerService"))
    await create_Consignment_Page.enterSenderDetails(testDataUtil.getValueByNestedKey(movement, "SenderFirstName"))
    await create_Consignment_Page.enterReceiverDetails(testDataUtil.getValueByNestedKey(movement, "Receiver"))
    await create_Consignment_Page.enterJobItems(testDataUtil.getValueByNestedKey(movement, "Count"),
    testDataUtil.getValueByNestedKey(movement, "Item"))
    await create_Consignment_Page.enterJobDimensions(testDataUtil.getValueByNestedKey(movement, "PurchaseOrder"),
    testDataUtil.getValueByNestedKey(movement, "Length"),
    testDataUtil.getValueByNestedKey(movement, "Width"),
    testDataUtil.getValueByNestedKey(movement, "Height"),
    testDataUtil.getValueByNestedKey(movement, "Weight"))
    const result = await create_Consignment_Page.verifyChiller("chiller");
    expect(result).toBeTruthy();
    await create_Consignment_Page.clickCreateConsignment()
    await create_Consignment_Page.getJobReferenceID()

})

When('I create a job for {string} with service type Freezer', async (movement)=> {
    await create_Consignment_Page.chooseMovement(testDataUtil.getValueByNestedKey(movement,"Movement"))
    await create_Consignment_Page.chooseCustomer(testDataUtil.getValueByNestedKey(movement, "Customer"))
    await create_Consignment_Page.chooseFreightCode(testDataUtil.getValueByNestedKey(movement, "FreightCode"))
    await create_Consignment_Page.enterReferences(testDataUtil.getValueByNestedKey(movement, "Ref1"),
    testDataUtil.getValueByNestedKey(movement, "Ref2"),
    testDataUtil.getValueByNestedKey(movement, "Ref3"),
    testDataUtil.getValueByNestedKey(movement, "Ref4"))
    await create_Consignment_Page.enterServiceType(testDataUtil.getValueByNestedKey(movement,"FreezerService"))
    const result = await create_Consignment_Page.verifyChiller("freezer");
    expect(result).toBeTruthy();    
    await create_Consignment_Page.enterSenderDetails(testDataUtil.getValueByNestedKey(movement, "SenderFirstName"))
    await create_Consignment_Page.enterReceiverDetails(testDataUtil.getValueByNestedKey(movement, "Receiver"))
    await create_Consignment_Page.enterJobItems(testDataUtil.getValueByNestedKey(movement, "Count"),
    testDataUtil.getValueByNestedKey(movement, "Item"))
    await create_Consignment_Page.enterJobDimensions(testDataUtil.getValueByNestedKey(movement, "PurchaseOrder"),
    testDataUtil.getValueByNestedKey(movement, "Length"),
    testDataUtil.getValueByNestedKey(movement, "Width"),
    testDataUtil.getValueByNestedKey(movement, "Height"),
    testDataUtil.getValueByNestedKey(movement, "Weight"))
    await create_Consignment_Page.clickCreateConsignment()
    await create_Consignment_Page.getJobReferenceID()

})

Then('I should see the Chiller icon on all job labels for {string}', async (movement) =>{
       await myJobsPage.verifyAssignedJob(testDataUtil.getValueByNestedKey(movement,"Movement"))
       await myJobsPage.clickManageDocument()
       await myJobsPage.dowloadFreightlabelChiller(movement)
       const result = await myJobsPage.verifyChillerinPdf(movement)
       expect(result).toBeTruthy();  
});


Then('I should see the Freezer icon on all job labels for {string}', async (movement) =>{
       await myJobsPage.verifyAssignedJob(testDataUtil.getValueByNestedKey(movement,"Movement"))
       await myJobsPage.clickManageDocument()
       await myJobsPage.dowloadFreightlabelFreezer(movement)
      const result = await myJobsPage.verifyFreezerinPdf(movement)
      expect(result).toBeTruthy();
});


 






      
