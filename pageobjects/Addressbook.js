const {expect} = require ('@playwright/test');
const CreateConsignmentPage = require("../pageobjects/Create_Consignment_page");
const { timeout } = require('../playwright.config1');
const basePage = require ('../features/support/BasePage.js')
const TestDataUtil = require('../features/support/Utils/TestDataUtil.js');
const TimeUtil = require('../features/support/Utils/TimeUtil.js');
const path=require('path');
const testDataUtil = new TestDataUtil()
const timeUtil = new TimeUtil()

let extractedOffset;
let PUOffset;
let SecondOffset;
let lastOffset;


class AddressBook {
    
constructor(page)
{
    this.page = page;
    this.extractedOffset = extractedOffset
    this.PUOffset = PUOffset
    this.SecondOffset = SecondOffset
    this.lastOffset = lastOffset
    this.addressbook = "//div/span[text()='Address Book']"
    this.tabAddressBook = "//div[@class='navigation-tab navigation-tab-active']/div[text()='Address Book']"
    this.tabZoneMovement = "//div[text()='Zone Movements']"
    this.tabOrg = "//a/span[text()='Organisation']"
    this.txtOrgTitle = "//div[text()='Account']"
    //this.Zonecode ="//td[@class='sorting_1'][text()='PERTH AUTOMATION']"
    //td[@class="sorting_1"][text()="PERTH AUTOMATION"]/following-sibling::td[6]/a/i[text()="edit"]
    this.updateZoneMovement ="//div[@class='card-title']"
    this.xpathExpressionStartDay = "//input[@id='leg-departure-interval-2']"
    this.xpathExpressionDuration = "//input[@id='leg-duration-2']"
    this.FirstStartDay ="//input[@id='leg-departure-interval-0']"
    this.FirstDuration = "//input[@id='leg-duration-0']"
    this.SecondStartDay ="//input[@id='leg-departure-interval-1']"
    this.SecondDuration = "//input[@id='leg-duration-1']"




}

async NavigateOrgSection() {
    let isVerify = false
    await basePage.waitForLocator(this.tabOrg)
    await basePage.scrollToElement(this.tabOrg)
    await basePage.click(this.tabOrg)
    const txtOrg = await basePage.verifyElement(this.txtOrgTitle)
    console.log("txtOrg state :"+txtOrg)
    if(txtOrg){
        console.log("Org section verified successfully...")
        isVerify = true
    }
    return isVerify
}

async navigateToAddressbook(){
    // let isVerify = false;
    await basePage.wait(2000)
    await basePage.waitForLocator(this.addressbook)
    await basePage.scrollToElement(this.addressbook)
    await basePage.click(this.addressbook)
    console.log("Section address book clicked successfully....")
}

async verifyAddressbook() {
    let isVerify = false;
    await basePage.waitForLocator(this.tabAddressBook)
    if(await basePage.verifyElement(this.tabAddressBook)){
        console.log("Tab address is verified successfully....")
        isVerify = true
    }
    return isVerify;
}

async navigateToAZoneMovement(){
    await basePage.wait(2000)
    await basePage.scrollToElement(this.tabZoneMovement)
    await basePage.click(this.tabZoneMovement)
    console.log("Section zone movement clicked successfully....")

}

async verifyZoneMovement() {
    let isVerify = false;
    await basePage.waitForLocator(this.tabZoneMovement)
    if(await basePage.verifyElement(this.tabZoneMovement)){
        console.log("Tab zone movement is verified successfully....")
        isVerify = true
    }
    return isVerify;
}

async  navigateToCode(ZoneCode) {
    //const ZoneLocator = page.locator()
    let isVerify = false;
    await basePage.wait(3000)
        if(await basePage.verifyElement(`//td[text()='${ZoneCode}']`)){
        console.log( ZoneCode + " is visible....")
        isVerify = true
    }
    return isVerify;
}

async VerifyCode(ZoneCode){
    await basePage.click(`//td[text()='${ZoneCode}']/following-sibling::td[6]/a[1]`)
    let isVerify = false;
    await basePage.waitForLocator(this.updateZoneMovement)
    if(await basePage.verifyElement(this.updateZoneMovement)){
        console.log( ZoneCode + " is clicked successfully....")
        isVerify = true
    }
    return isVerify;

}

async FirstOffsetLegs(movement){
    await basePage.wait(300)
    const FirstStartDay = await basePage.getInputValue(this.FirstStartDay)
    console.log (FirstStartDay + " PU day start day is extracted....");
    const FirstDuration = await basePage.getInputValue(this.FirstDuration)
    console.log (FirstDuration + " PU duration is extracted....");
    
   // let PUlegdate = parseFloat(FirstStartDay)
   // let PUlegduration = parseFloat(FirstDuration)
    
    PUOffset = FirstStartDay;
    //testDataUtil.addKeyValueToObject(movement,"PUOffset", PUOffset) 

    console.log (PUOffset + " number of Offset days of PU is extracted....")

}

async SecondOffsetLegs(movement){
    await basePage.wait(300)
    const SecondStartDay = await basePage.getInputValue(this.SecondStartDay)
    console.log (SecondStartDay + " LH day start day is extracted....");
    const SecondDuration = await basePage.getInputValue(this.SecondDuration)
    console.log (SecondDuration + " LH duration is extracted....");
    
    //let Secondlegdate = parseFloat(SecondStartDay)
    //let Secondlegduration = parseFloat(SecondDuration)
    
    SecondOffset = SecondStartDay;
   // testDataUtil.addKeyValueToObject(movement,"SecondOffset", SecondOffset) 

    
    console.log (SecondOffset + " number of offset days of LH is extracted....")

}


//last leg extract
async ExtractOffset(movement){
    await basePage.wait(300)
    const ExtractedLastLegStartday = await basePage.getInputValue(this.xpathExpressionStartDay)
    console.log (ExtractedLastLegStartday + " last leg day start day is extracted....");
    const ExtractedLastLegDuration = await basePage.getInputValue(this.xpathExpressionDuration)
    console.log (ExtractedLastLegDuration + " last leg day duration is extracted....");
    
    let lastlegdate = parseFloat(ExtractedLastLegStartday)
    let lastlegduration = parseFloat(ExtractedLastLegDuration)
    
   // lastOffset = ExtractedLastLegDuration;
    extractedOffset = lastlegdate + lastlegduration;

    
    console.log (extractedOffset + " number of offset days of last leg is extracted in addressbook for Master Leg....")
    //console.log (lastOffset + " number of offset days of last leg is extracted in addressbook for DEL Leg....")


return extractedOffset

}


}

module.exports = AddressBook
