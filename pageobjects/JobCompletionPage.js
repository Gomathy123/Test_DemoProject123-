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
const MyJobsPage = require("../pageobjects/MyJobsPage.js")
const myJobsPage = new MyJobsPage()

class JobCompletionPage {

constructor(page)
{

    this.page = page;
    //P2P
    this.btnMarkAsHeadingToPickup = "//a[contains(text(), 'Mark as') and contains(., 'Heading to Pickup')]"
    this.btnMarkAsArrivedAtPickup = "//a[contains(text(), 'Mark as') and contains(., 'Arrived at Pickup')]"
    this.btnMarkAsPickup = "//a[contains(text(), 'Mark as') and contains(., 'Picked Up')]"
    this.btnMarkAsHeadingToDropOff="//a[contains(text(), 'Mark as') and contains(., 'Heading to Dropoff')]"
    this.btnMarkAsArrivedAtDroppOff="//a[contains(text(), 'Mark as') and contains(., 'Arrived at Dropoff')]"
    this.btnMarkAsDelivered="//a[contains(text(), 'Mark as') and contains(., 'Delivered')]"
    //PU
    this.btnMarkAsUnloadedAtDepot="//a[contains(text(), 'Mark as') and contains(., 'Unloaded at Depot')]"
    //DEL
    this.btnMarkAsLoaded = "//a[contains(text(), 'Mark as') and contains(., 'Loaded')]"
    //FUEL
    //JC
    this.btnMarkAsHeadingToJob = "//a[contains(text(), 'Mark as') and contains(., 'Heading to Job')]"
    this.btnMarkAsArrived = "//a[contains(text(), 'Mark as') and contains(., 'Arrived')]"
    this.btnMarkAsFinishedJob = "//a[contains(text(), 'Mark as') and contains(., 'Finished Job')]"
    this.btnMarkAsJobClosed = "//a[contains(text(), 'Mark as') and contains(., 'Job Closed')]"
    //RLEG
    this.btnMarkAsHeadingToDepot = "//a[contains(text(), 'Mark as') and contains(., 'Heading to Depot')]"
    this.btnMarkAsArrivedAtDepot = "//a[contains(text(), 'Mark as') and contains(., 'Arrived at Depot')]"
    //RECEIVAL
    this.btnMarkAsReceived = "//a[contains(text(), 'Mark as') and contains(., 'Received')]"
    //COLLECTED
    this.btnMarkAsCollected = "//a[contains(text(), 'Mark as') and contains(., 'Collected')]"

    //P2P
    this.bookedUpdateByValue="//td[text()='Booked']/following-sibling::td[4]"
    this.assignedUpdateByValue="//td[text()='Assigned']/following-sibling::td[4]"
    this.acceptedUpdateByValue="//td[text()='Accepted']/following-sibling::td[4]"
    this.headingToPickUpUpdateByValue="//td[text()='Heading to Pickup']/following-sibling::td[4]"
    this.arrivedAtPickupUpdatedByValue="//td[text()='Heading to Pickup']/following-sibling::td[4]"
    this.pickupUpdatedByValue="//td[text()='Picked Up']/following-sibling::td[4]"
    this.headingToDropOffUpdateByValue= "//td[text()='Heading to Dropoff']/following-sibling::td[4]"
    this.arrivedAtDropOffUpdateByValue= "//td[text()='Arrived at Dropoff']/following-sibling::td[4]"
    this.deliveredUpdateByValue= "//td[text()='Delivered']/following-sibling::td[4]"
    this.completedUpdateByValue= "//td[text()='Completed']/following-sibling::td[4]"

    //PU booked assigned accepted until pickup, unloaded, completed
    this.unloadedAtDepotUpdatedByValue="//td[text()='Unloaded at Depot']/following-sibling::td[4]"
    
    //DEL booked assigned accepted loaded headingdroppoff arriveddropoff del comp
    this.loadedUpdateByValue= "//td[text()='Loaded']/following-sibling::td[4]"
   //JC
   this.headingToJobUpdateByValue="//td[text()='Heading to Job']/following-sibling::td[4]"
   this.arrivedUpdatedByValue="//td[text()='Arrived']/following-sibling::td[4]"
   this.finishedJobUpdateByValue ="//td[text()='Finished Job']/following-sibling::td[4]"
   this.jobClosedUpdateByValue ="//td[text()='Job Closed']/following-sibling::td[4]"
   // LH
   this.scheduledUpdateByValue="//td[text()='Scheduled']/following-sibling::td[4]"
   this.intransitUpdateByValue="//td[text()='In Transit']/following-sibling::td[4]"
   //RLEG
   this.headingToDepotUpdateByValue = "//td[text()='Heading to Depot']/following-sibling::td[4]"
   this.arrivedToDepotUpdateByValue = "//td[text()='Arrived at Depot']/following-sibling::td[4]"

   this.receivedUpdateByValue = "//td[text()='Received']/following-sibling::td[4]"
   this.collectedUpdateByValue = "//td[text()='Collected']/following-sibling::td[4]"
}
async completeP2PJob(movement){
    let btnHeadingToPickupTxt = await basePage.getText(this.btnMarkAsHeadingToPickup)
    await this.verifyBtnText(btnHeadingToPickupTxt, "Mark as Heading to Pickup")    
    await basePage.click(this.btnMarkAsHeadingToPickup)
     await basePage.wait(2000)
    let btnArrivedAtPickUpTxt = await basePage.getText(this.btnMarkAsArrivedAtPickup)
    await this.verifyBtnText(btnArrivedAtPickUpTxt, "Mark as Arrived at Pickup")
    await basePage.click(this.btnMarkAsArrivedAtPickup)
     await basePage.wait(2000)
    let btnPickUpTxt = await basePage.getText(this.btnMarkAsPickup)
    await this.verifyBtnText(btnPickUpTxt, "Mark as Picked Up")
    await basePage.click(this.btnMarkAsPickup)
     await basePage.wait(2000)
    await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "SenderFirstName"),
    testDataUtil.getValueByNestedKey(movement, "SenderLastName"))
    await myJobsPage.putTheSign()
    let btnHeadingToDropOffTxt = await basePage.getText(this.btnMarkAsHeadingToDropOff)
    await this.verifyBtnText(btnHeadingToDropOffTxt, "Mark as Heading to Dropoff")
    await basePage.click(this.btnMarkAsHeadingToDropOff)
     await basePage.wait(2000)
    let btnArrivedAtDropOffTxt = await basePage.getText(this.btnMarkAsArrivedAtDroppOff)
    await this.verifyBtnText(btnArrivedAtDropOffTxt, "Mark as Arrived at Dropoff")
    await basePage.click(this.btnMarkAsArrivedAtDroppOff)
     await basePage.wait(2000)
    let btnDeliveredTxt = await basePage.getText(this.btnMarkAsDelivered)
    await this.verifyBtnText(btnDeliveredTxt, "Mark as Delivered")
    await basePage.click(this.btnMarkAsDelivered)
     await basePage.wait(2000)
    await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "ReceiverFirstName"),
    testDataUtil.getValueByNestedKey(movement, "ReceiverLastName"))
    await myJobsPage.putTheSign()
    await myJobsPage.getExitTime(movement)

}


async completeP2PJobWithFutilePU(movement){
    await basePage.scrollToElement(this.btnMarkAsPickup)
    await basePage.wait(2000)
    let btnPickUpTxt = await basePage.getText(this.btnMarkAsPickup)
    await this.verifyBtnText(btnPickUpTxt, "Mark as Picked Up")
    await basePage.click(this.btnMarkAsPickup)
    await basePage.wait(2000)
    await page.getByText('Report Futile Job Pick Up').click();
    await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "SenderFirstName"),
    testDataUtil.getValueByNestedKey(movement, "SenderLastName"))
    await myJobsPage.putTheSign()
    let btnHeadingToDropOffTxt = await basePage.getText(this.btnMarkAsHeadingToDropOff)
    await this.verifyBtnText(btnHeadingToDropOffTxt, "Mark as Heading to Dropoff")
    await basePage.click(this.btnMarkAsHeadingToDropOff)
    await basePage.wait(2000)
    let btnArrivedAtDropOffTxt = await basePage.getText(this.btnMarkAsArrivedAtDroppOff)
    await this.verifyBtnText(btnArrivedAtDropOffTxt, "Mark as Arrived at Dropoff")
    await basePage.click(this.btnMarkAsArrivedAtDroppOff)
    await basePage.wait(2000)
    let btnDeliveredTxt = await basePage.getText(this.btnMarkAsDelivered)
    await this.verifyBtnText(btnDeliveredTxt, "Mark as Delivered")
    await basePage.click(this.btnMarkAsDelivered)
    await basePage.wait(2000)
    await page.getByText('Report Attempted Delivery').click();
    await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "ReceiverFirstName"),
    testDataUtil.getValueByNestedKey(movement, "ReceiverLastName"))
    await myJobsPage.putTheSign()
    await myJobsPage.getExitTime(movement)

}


async completeP2PJobWithFutileDEL(movement){
    let btnHeadingToDropOffTxt = await basePage.getText(this.btnMarkAsHeadingToDropOff)
    await this.verifyBtnText(btnHeadingToDropOffTxt, "Mark as Heading to Dropoff")
    await basePage.click(this.btnMarkAsHeadingToDropOff)
    await basePage.wait(2000)
    let btnArrivedAtDropOffTxt = await basePage.getText(this.btnMarkAsArrivedAtDroppOff)
    await this.verifyBtnText(btnArrivedAtDropOffTxt, "Mark as Arrived at Dropoff")
    await basePage.click(this.btnMarkAsArrivedAtDroppOff)
    await basePage.wait(2000)
    let btnDeliveredTxt = await basePage.getText(this.btnMarkAsDelivered)
    await basePage.click(this.btnMarkAsDelivered)
    await this.verifyBtnText(btnDeliveredTxt, "Mark as Delivered")
    if (await basePage.verifyElement("//select[@id='myJobsFutileReasonSelect']")){
    await page.getByText('Report Attempted Delivery').click();
    }
    await basePage.wait(2000)
    await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "ReceiverFirstName"),
    testDataUtil.getValueByNestedKey(movement, "ReceiverLastName"))
    await myJobsPage.putTheSign()
    await myJobsPage.getExitTime(movement)

}

async completePUJob(movement){
    let btnHeadingToPickupTxt = await basePage.getText(this.btnMarkAsHeadingToPickup)
    await this.verifyBtnText(btnHeadingToPickupTxt, "Mark as Heading to Pickup")    
    await basePage.click(this.btnMarkAsHeadingToPickup)
     await basePage.wait(2000)
    let btnArrivedAtPickUpTxt = await basePage.getText(this.btnMarkAsArrivedAtPickup)
    await this.verifyBtnText(btnArrivedAtPickUpTxt, "Mark as Arrived at Pickup")
    await basePage.click(this.btnMarkAsArrivedAtPickup)
     await basePage.wait(2000)
    let btnPickUpTxt = await basePage.getText(this.btnMarkAsPickup)
   await this.verifyBtnText(btnPickUpTxt, "Mark as Picked Up")
    await basePage.click(this.btnMarkAsPickup)
     await basePage.wait(2000)
    await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "SenderFirstName"),
    testDataUtil.getValueByNestedKey(movement, "SenderLastName"))
    await myJobsPage.putTheSign()
     await basePage.wait(2000)
    let btnUnloadedAtDepotTxt = await basePage.getText(this.btnMarkAsUnloadedAtDepot)
    await this.verifyBtnText(btnUnloadedAtDepotTxt, "Mark as Unloaded at Depot")
    await basePage.click(this.btnMarkAsUnloadedAtDepot)
}

async completeDELJob(movement){
  await basePage.wait(2000)
  let btnLoadedTxt = await basePage.getText(this.btnMarkAsLoaded)
  await this.verifyBtnText(btnLoadedTxt, "Mark as Loaded")
  await basePage.click(this.btnMarkAsLoaded)
  await basePage.wait(2000)
  let btnHeadingToDropOffTxt = await basePage.getText(this.btnMarkAsHeadingToDropOff)
  await this.verifyBtnText(btnHeadingToDropOffTxt, "Mark as Heading to Dropoff")
  await basePage.click(this.btnMarkAsHeadingToDropOff)
   await basePage.wait(2000)
  let btnArrivedAtDropOffTxt = await basePage.getText(this.btnMarkAsArrivedAtDroppOff)
  await this.verifyBtnText(btnArrivedAtDropOffTxt, "Mark as Arrived at Dropoff")
  await basePage.click(this.btnMarkAsArrivedAtDroppOff)
   await basePage.wait(2000)
  let btnDeliveredTxt = await basePage.getText(this.btnMarkAsDelivered)
  await this.verifyBtnText(btnDeliveredTxt, "Mark as Delivered")
  await basePage.click(this.btnMarkAsDelivered)
   await basePage.wait(2000)
  await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "ReceiverFirstName"),
  testDataUtil.getValueByNestedKey(movement, "ReceiverLastName"))
  await myJobsPage.putTheSign()
  await myJobsPage.getExitTime(movement)
}

async completeFUELJob(movement){
  let btnLoadedTxt = await basePage.getText(this.btnMarkAsLoaded)
  await this.verifyBtnText(btnLoadedTxt, "Mark as Loaded")
  await basePage.click(this.btnMarkAsLoaded)
   await basePage.wait(2000)
  await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "ReceiverFirstName"),
  testDataUtil.getValueByNestedKey(movement, "ReceiverLastName"))
  await myJobsPage.putTheSign()
   await basePage.wait(2000)
  let btnDeliveredTxt = await basePage.getText(this.btnMarkAsDelivered)
  await this.verifyBtnText(btnDeliveredTxt, "Mark as Delivered")
  await basePage.click(this.btnMarkAsDelivered)
   await basePage.wait(2000)
  await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "ReceiverFirstName"),
  testDataUtil.getValueByNestedKey(movement, "ReceiverLastName"))
  await myJobsPage.putTheSign()
  //await myJobsPage.getExitTime(movement)
}

async completeJCJob(movement){
let btnHeadingToJobTxt = await basePage.getText(this.btnMarkAsHeadingToJob)
await this.verifyBtnText(btnHeadingToJobTxt, "Mark as Heading to Job")
await basePage.click(this.btnMarkAsHeadingToJob)
await basePage.wait(2000)
let btnArrivedTxt = await basePage.getText(this.btnMarkAsArrived)
await this.verifyBtnText(btnArrivedTxt, "Mark as Arrived")
await basePage.click(this.btnMarkAsArrived)
await basePage.wait(2000)
let btnFinishedJobTxt= await basePage.getText(this.btnMarkAsFinishedJob)
await this.verifyBtnText(btnFinishedJobTxt, "Mark as Finished Job")
await basePage.click(this.btnMarkAsFinishedJob)
await basePage.wait(2000)
await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "ReceiverFirstName"),
testDataUtil.getValueByNestedKey(movement, "ReceiverLastName"))
await myJobsPage.putTheSign()
let btnJobClosedTxt = await basePage.getText(this.btnMarkAsJobClosed)
await this.verifyBtnText(btnJobClosedTxt, "Mark as Job Closed")
await basePage.click(this.btnMarkAsJobClosed)
//await myJobsPage.getExitTime(movement)
}

async completeRLEGJob(movement){
  let btnHeadingToDepotTxt = await basePage.getText(this.btnMarkAsHeadingToDepot)
  await this.verifyBtnText(btnHeadingToDepotTxt, "Mark as Heading to Depot")
  await basePage.click(this.btnMarkAsHeadingToDepot)
   await basePage.wait(2000)
  let btnArrivedAtDepotTxt = await basePage.getText(this.btnMarkAsArrivedAtDepot)
  await this.verifyBtnText(btnArrivedAtDepotTxt)
  await basePage.click(this.btnMarkAsArrivedAtDepot)
}

async completeLIVESTOCKJob(movement){
 let btnHeadingToPickupTxt = await basePage.getText(this.btnMarkAsHeadingToPickup)
  await this.verifyBtnText(btnHeadingToPickupTxt, "Mark as Heading to Pickup")    
  await basePage.click(this.btnMarkAsHeadingToPickup)
  await basePage.wait(2000)
  let btnArrivedAtPickUpTxt = await basePage.getText(this.btnMarkAsArrivedAtPickup)
  await this.verifyBtnText(btnArrivedAtPickUpTxt, "Mark as Arrived at Pickup")
  await basePage.click(this.btnMarkAsArrivedAtPickup)
  await basePage.wait(2000)
  let btnLoadedTxt = await basePage.getText(this.btnMarkAsLoaded)
  await this.verifyBtnText(btnLoadedTxt, "Mark as Loaded")
  await basePage.click(this.btnMarkAsLoaded)
  await basePage.wait(2000)
  await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "SenderFirstName"),
  testDataUtil.getValueByNestedKey(movement, "SenderLastName"))
  await myJobsPage.putTheSign()
  let btnHeadingToDropOffTxt = await basePage.getText(this.btnMarkAsHeadingToDropOff)
  await this.verifyBtnText(btnHeadingToDropOffTxt, "Mark as Heading to Dropoff")
  await basePage.click(this.btnMarkAsHeadingToDropOff)
  await basePage.wait(2000)
  let btnArrivedAtDropOffTxt = await basePage.getText(this.btnMarkAsArrivedAtDroppOff)
  await this.verifyBtnText(btnArrivedAtDropOffTxt, "Mark as Arrived at Dropoff")
  await basePage.click(this.btnMarkAsArrivedAtDroppOff)
  await basePage.wait(2000)
  let btnDeliveredTxt = await basePage.getText(this.btnMarkAsDelivered)
  await this.verifyBtnText(btnDeliveredTxt, "Mark as Delivered")
  await basePage.click(this.btnMarkAsDelivered)
  await basePage.wait(2000)
  await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "ReceiverFirstName"),
  testDataUtil.getValueByNestedKey(movement, "ReceiverLastName"))
  await myJobsPage.putTheSign()
  //await myJobsPage.getExitTime(movement)
}

async completeRECJob(movement){
   await basePage.wait(2000)
  let btnReceivedTxt = await basePage.getText(this.btnMarkAsReceived)
  await this.verifyBtnText(btnReceivedTxt, "Mark as received")
  await basePage.click(this.btnMarkAsReceived)
   await basePage.wait(2000)
  await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "ReceiverFirstName"),
  testDataUtil.getValueByNestedKey(movement, "ReceiverLastName"))
  await myJobsPage.putTheSign()
}

async completeCOLLJob(movement){
let btnCollectedTxt = await basePage.getText(this.btnMarkAsCollected)
await this.verifyBtnText(btnCollectedTxt, "Mark as Collected")
await basePage.click(this.btnMarkAsCollected)
await myJobsPage.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "ReceiverFirstName"),
  testDataUtil.getValueByNestedKey(movement, "ReceiverLastName"))
  await myJobsPage.putTheSign()
}
async verifyBtnText(actualText, expectedText) {
  const ICON_WORDS = ['autorenew', 'navigate_next'];

  const cleaned = actualText
  .replace(new RegExp(`\\b(${ICON_WORDS.join('|')})\\b`, 'g'), '')
  .replace(/\s+/g, ' ')
  .trim();

  // console.log(`Cleaned text ${cleaned}`)
  // console.log(`Expected text ${expectedText}`)
  if(cleaned == expectedText)
  {
    console.log(`The status button is verified. The button is ${cleaned}`)
    console.log('----------------------------------------------')
  }
}

async updateByValueForP2P(movement,updateByValue){
let bookedUpdateByValueTxt = await basePage.getText(this.bookedUpdateByValue)
let assignedUpdateByValueTxt = await basePage.getText(this.assignedUpdateByValue)
let acceptedUpdateByValueTxt = await basePage.getText(this.acceptedUpdateByValue)
let headingToPickUpUpdateByValueTxt = await basePage.getText(this.headingToPickUpUpdateByValue)
let arrivedAtPickupUpdatedByValueTxt = await basePage.getText(this.arrivedAtPickupUpdatedByValue)
let pickupUpdatedByValueTxt = await basePage.getText(this.pickupUpdatedByValue)
let headingToDropOffUpdateByValueTxt = await basePage.getText(this.headingToDropOffUpdateByValue)
let arrivedAtDropOffUpdateByValueTxt = await basePage.getText(this.arrivedAtDropOffUpdateByValue)
let deliveredUpdateByValueTxt = await basePage.getText(this.deliveredUpdateByValue)
//let completedUpdatedByValueTxt = await basePage.getText(this.completedUpdateByValue)
console.log("---------------------------"+bookedUpdateByValueTxt)

if(bookedUpdateByValueTxt==updateByValue && assignedUpdateByValueTxt == updateByValue){
  if(acceptedUpdateByValueTxt == updateByValue && headingToPickUpUpdateByValueTxt==updateByValue ){
    if(arrivedAtPickupUpdatedByValueTxt ==updateByValue && pickupUpdatedByValueTxt==updateByValue){
      if(headingToDropOffUpdateByValueTxt==updateByValue && arrivedAtDropOffUpdateByValueTxt==updateByValue){
        if(deliveredUpdateByValueTxt==updateByValue ){
           console.log(`The UpdatedBy value is ${updateByValue} as expected for Job ${movement}`)
        }
      }
    }
  }
}
}

async updateByValueForPU(movement,updateByValue){
let bookedUpdateByValueTxt = await basePage.getText(this.bookedUpdateByValue)
let assignedUpdateByValueTxt = await basePage.getText(this.assignedUpdateByValue)
let acceptedUpdateByValueTxt = await basePage.getText(this.acceptedUpdateByValue)
let headingToPickUpUpdateByValueTxt = await basePage.getText(this.headingToPickUpUpdateByValue)
let arrivedAtPickupUpdatedByValueTxt = await basePage.getText(this.arrivedAtPickupUpdatedByValue)
let pickupUpdatedByValueTxt = await basePage.getText(this.pickupUpdatedByValue)
let unloadedAtDepotUpdatedByValueTxt = await basePage.getText(this.unloadedAtDepotUpdatedByValue)
let completedUpdatedByValueTxt = await basePage.getText(this.completedUpdateByValue)


if(bookedUpdateByValueTxt==updateByValue && assignedUpdateByValueTxt == updateByValue){
  if(acceptedUpdateByValueTxt == updateByValue && headingToPickUpUpdateByValueTxt==updateByValue ){
    if(arrivedAtPickupUpdatedByValueTxt ==updateByValue && pickupUpdatedByValueTxt==updateByValue){
      if(unloadedAtDepotUpdatedByValueTxt==updateByValue){
        console.log(`The UpdatedBy value is ${updateByValue} as expected for Job ${movement}`)
      }
    }
  }
}
}

async updateByValueForDEL(movement,updateByValue){
let bookedUpdateByValueTxt = await basePage.getText(this.bookedUpdateByValue)
let assignedUpdateByValueTxt = await basePage.getText(this.assignedUpdateByValue)
let acceptedUpdateByValueTxt = await basePage.getText(this.acceptedUpdateByValue)
let loadedUpdateByValueTxt = await basePage.getText(this.loadedUpdateByValue)
let headingToDropOffUpdateByValueTxt = await basePage.getText(this.headingToDropOffUpdateByValue)
let arrivedAtDropOffUpdateByValueTxt = await basePage.getText(this.arrivedAtDropOffUpdateByValue)
let deliveredUpdateByValueTxt = await basePage.getText(this.deliveredUpdateByValue)
//let completedUpdatedByValueTxt = await basePage.getText(this.completedUpdateByValue)
console.log("---------------------------"+bookedUpdateByValueTxt)

if(bookedUpdateByValueTxt==updateByValue && assignedUpdateByValueTxt == updateByValue){
  if(acceptedUpdateByValueTxt == updateByValue && loadedUpdateByValueTxt==updateByValue ){
    if(headingToDropOffUpdateByValueTxt ==updateByValue && arrivedAtDropOffUpdateByValueTxt==updateByValue){
        if(deliveredUpdateByValueTxt==updateByValue ){
           console.log(`The UpdatedBy value is ${updateByValue} as expected for Job ${movement}`)
        }
    }
  }
}
}

async updateByValueForFUEL(movement,updateByValue){
let bookedUpdateByValueTxt = await basePage.getText(this.bookedUpdateByValue)
let assignedUpdateByValueTxt = await basePage.getText(this.assignedUpdateByValue)
let acceptedUpdateByValueTxt = await basePage.getText(this.acceptedUpdateByValue)
let loadedUpdateByValueTxt = await basePage.getText(this.loadedUpdateByValue)
let deliveredUpdateByValueTxt = await basePage.getText(this.deliveredUpdateByValue)
//let completedUpdatedByValueTxt = await basePage.getText(this.completedUpdateByValue)
console.log("---------------------------"+bookedUpdateByValueTxt)

if(bookedUpdateByValueTxt==updateByValue && assignedUpdateByValueTxt == updateByValue){
  if(acceptedUpdateByValueTxt == updateByValue && loadedUpdateByValueTxt==updateByValue ){
        if(deliveredUpdateByValueTxt==updateByValue ){
           console.log(`The UpdatedBy value is ${updateByValue} as expected for Job ${movement}`)
        }
  }
}
}
 
async updateByValueForJC(movement,updateByValue){
let bookedUpdateByValueTxt = await basePage.getText(this.bookedUpdateByValue)
let assignedUpdateByValueTxt = await basePage.getText(this.assignedUpdateByValue)
let headingToJobUpdateByValueTxt = await basePage.getText(this.headingToJobUpdateByValue)
let arrivedUpdatedByValueTxt = await basePage.getText(this.arrivedUpdatedByValue)
let finishedJobUpdateByValueTxt = await basePage.getText(this.finishedJobUpdateByValue)
let jobClosedUpdateByValueTxt = await basePage.getText(this.jobClosedUpdateByValue)
console.log("---------------------------"+bookedUpdateByValueTxt)

if(bookedUpdateByValueTxt==updateByValue && assignedUpdateByValueTxt == updateByValue){
  if(headingToJobUpdateByValueTxt == updateByValue && arrivedUpdatedByValueTxt==updateByValue ){
        if(finishedJobUpdateByValueTxt==updateByValue && jobClosedUpdateByValueTxt==updateByValue ){
           console.log(`The UpdatedBy value is ${updateByValue} as expected for Job ${movement}`)
        }
  }
}
}

async updateByValueForLIVESTOCK(movement,updateByValue){
let bookedUpdateByValueTxt = await basePage.getText(this.bookedUpdateByValue)
let assignedUpdateByValueTxt = await basePage.getText(this.assignedUpdateByValue)
let acceptedUpdateByValueTxt = await basePage.getText(this.acceptedUpdateByValue)
let headingToPickUpUpdateByValueTxt = await basePage.getText(this.headingToPickUpUpdateByValue)
let arrivedAtPickupUpdatedByValueTxt = await basePage.getText(this.arrivedAtPickupUpdatedByValue)
let loadedUpdateByValueTxt = await basePage.getText(this.loadedUpdateByValue)
let headingToDropOffUpdateByValueTxt = await basePage.getText(this.headingToDropOffUpdateByValue)
let arrivedAtDropOffUpdateByValueTxt = await basePage.getText(this.arrivedAtDropOffUpdateByValue)
let deliveredUpdateByValueTxt = await basePage.getText(this.deliveredUpdateByValue)
//let completedUpdatedByValueTxt = await basePage.getText(this.completedUpdateByValue)
console.log("---------------------------"+bookedUpdateByValueTxt)

if(bookedUpdateByValueTxt==updateByValue && assignedUpdateByValueTxt == updateByValue){
  if(acceptedUpdateByValueTxt == updateByValue && headingToPickUpUpdateByValueTxt==updateByValue ){
    if(arrivedAtPickupUpdatedByValueTxt ==updateByValue && loadedUpdateByValueTxt==updateByValue){
      if(headingToDropOffUpdateByValueTxt==updateByValue && arrivedAtDropOffUpdateByValueTxt==updateByValue){
        if(deliveredUpdateByValueTxt==updateByValue ){
           console.log(`The UpdatedBy value is ${updateByValue} as expected for Job ${movement}`)
        }
      }
    }
  }
}
}

async updateByValueForLH(movement,updateByValue){
let bookedUpdateByValueTxt = await basePage.getText(this.bookedUpdateByValue)
let scheduledUpdateByValueTxt = await basePage.getText(this.scheduledUpdateByValue)
let intransitUpdateByValueTxt = await basePage.getText(this.intransitUpdateByValue)
let arrivedUpdatedByValueTxt = await basePage.getText(this.arrivedUpdatedByValue)
let deliveredUpdateByValueTxt = await basePage.getText(this.deliveredUpdateByValue)
//let completedUpdatedByValueTxt = await basePage.getText(this.completedUpdateByValue)
console.log("---------------------------"+bookedUpdateByValueTxt)

if(bookedUpdateByValueTxt==updateByValue && scheduledUpdateByValueTxt == updateByValue){
  if(intransitUpdateByValueTxt == updateByValue && arrivedUpdatedByValueTxt==updateByValue ){
        if(deliveredUpdateByValueTxt==updateByValue ){
           console.log(`The UpdatedBy value is ${updateByValue} as expected for Job ${movement}`)
        }
  }
}
}

async updateByValueForRLEG(movement,updateByValue){
let bookedUpdateByValueTxt = await basePage.getText(this.bookedUpdateByValue)
let assignedUpdateByValueTxt = await basePage.getText(this.assignedUpdateByValue)
let acceptedUpdateByValueTxt = await basePage.getText(this.acceptedUpdateByValue)
let headingToDepotUpdateByValueTxt = await basePage.getText(this.headingToDepotUpdateByValue)
let arrivedToDepotUpdateByValueTxt = await basePage.getText(this.arrivedToDepotUpdateByValue)
//let completedUpdatedByValueTxt = await basePage.getText(this.completedUpdateByValue)
console.log("---------------------------"+bookedUpdateByValueTxt)

if(bookedUpdateByValueTxt==updateByValue && assignedUpdateByValueTxt == updateByValue){
  if(acceptedUpdateByValueTxt == updateByValue && headingToDepotUpdateByValueTxt==updateByValue ){
        if(arrivedToDepotUpdateByValueTxt==updateByValue ){
           console.log(`The UpdatedBy value is ${updateByValue} as expected for Job ${movement}`)
        }
  }
}
}

async updateByValueForCOLL(movement,updateByValue){
let bookedUpdateByValueTxt = await basePage.getText(this.bookedUpdateByValue)
let collectedUpdateByValueTxt = await basePage.getText(this.collectedUpdateByValue)
//let completedUpdatedByValueTxt = await basePage.getText(this.completedUpdateByValue)
console.log("---------------------------"+bookedUpdateByValueTxt)

if(bookedUpdateByValueTxt==updateByValue && collectedUpdateByValueTxt==updateByValue ){
    console.log(`The UpdatedBy value is ${updateByValue} as expected for Job ${movement}`)
  }
 }

async updateByValueForREC(movement,updateByValue){
let bookedUpdateByValueTxt = await basePage.getText(this.bookedUpdateByValue)
let receivedUpdateByValueTxt = await basePage.getText(this.ReceivedUpdateByValue)
//let completedUpdatedByValueTxt = await basePage.getText(this.completedUpdateByValue)
console.log("---------------------------"+bookedUpdateByValueTxt)

if(bookedUpdateByValueTxt==updateByValue && receivedUpdateByValueTxt==updateByValue){
    console.log(`The UpdatedBy value is ${updateByValue} as expected for Job ${movement}`)
  }
 }

async updateByvalueForMASTER(movement, updateByValue) {
let bookedUpdateByValueTxt = await basePage.getText(this.bookedUpdateByValue)
let receivedUpdateByValueTxt = await basePage.getText(this.ReceivedUpdateByValue)
let completedUpdatedByValueTxt = await basePage.getText(this.completedUpdateByValue)
console.log("---------------------------"+bookedUpdateByValueTxt)

if(bookedUpdateByValueTxt==updateByValue && receivedUpdateByValueTxt==updateByValue && completedUpdatedByValueTxt==updateByValue ){
    console.log(`The UpdatedBy value is ${updateByValue} as expected for Job ${movement}`)
  }
 }

}
module.exports = JobCompletionPage