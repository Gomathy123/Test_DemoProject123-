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


class Runs {

    constructor(page,extractedNumber)
    {
    
    this.page = page;
    this.extractedNumber = extractedNumber
    this.businessLogo = "//img[contains(@class,'business-logo')]"
    this.RunsCard = "//div[@id='hubFreightRunSheets']"
    this.RunsTitleCard = "//div[text()='Runs']"
    this.locateButton ="(//i[text()='assignment'])[2]"
    this.CreateRunsButton ="(//i[text()='assignment']/ancestor::a)[2]"
    this.labelRuns ="//input[@name='label']"
    this.selectBU ="//span[contains(text(),'Select A Business Unit...')]/ancestor::span[1]/following-sibling::span"
    this.ChooseBU ="//li[contains(text(),'[BU] business unit test')]"
    this.SelectStatus ="//input[contains(@value,'(Select One)')]"
    this.ChooseStatus = "//li/span[text()='Ready']"
    this.selectVehicle ="//span[contains(text(),'Select A Vehicle...')]/ancestor::span[1]/following-sibling::span"
    this.ChooseVehicle ="//li[contains(text(),'PM002')]"
    this.selectTrailerA ="(//span[contains(text(),'Select Trailer...')]/ancestor::span[1]/following-sibling::span)[1]"
    this.ChooseTrailerA ="//li[contains(text(),'FT001')]"
    this.selectTrailerB ="(//span[contains(text(),'Select Trailer...')]/ancestor::span[1]/following-sibling::span)[1]"
    this.ChooseTrailerB ="//li[contains(text(),'ASECT001')]"
    this.RunsNumber = "(//td[contains(@class,'run-batch-checkbox')]/following-sibling::td[1])[1]"
    this.RunstatOverview = "//label[text()='READY']"
    this.RunsBUOverview ="//td[contains(@class,'run-batch-checkbox')]/following-sibling::td[3]"
    this.LabelOverview ="//td[contains(@class,'run-batch-checkbox')]/following-sibling::td[4]"
    this.RunsVehicOverview = "//td[contains(@class,'run-batch-checkbox')]/following-sibling::td[10]"
    this.RunsTrailerAOverview = "//td[contains(@class,'run-batch-checkbox')]/following-sibling::td[11]"
    this.RunsTrailerBOverview = "//td[contains(@class,'run-batch-checkbox')]/following-sibling::td[12]"

    this.getBu = "(//span[contains(@role,'textbox')])[3]"
    this.geVehicle = "(//span[contains(@role,'textbox')])[4]"
    this.geTrailerA = "(//span[contains(@role,'textbox')])[5]"
    this.geTrailerB = "(//span[contains(@role,'textbox')])[6]"

    this.SortScheduledDate = "//th[text()='Scheduled Date']"
    this.AddJobs ="//td[contains(@class,'run-batch-checkbox')]/following-sibling::td[14]/div/i"
    this.AvailableJobs ="//li[text()='Available Jobs']"
    //this.RunsCheckbox ="//td[text()='Accepted']/following-sibling::td/input[@type='checkbox']"
    this.RunsCheckbox ="//td[contains(text(),'<<text>>')]/following-sibling::td[contains(@class,batch-checkbox)]/label[contains(@class,'b-input-checkbox-label')]"
    this.buttonAddRuns ="//button/i[text()='add']"
    this.AssignedJobs = "//li[text()='Assigned jobs']"
    this.AssignDriverToRuns ="//button[contains(@aria-label,'Assign Driver')]"
    this.AssignContractorToRuns = "//button[contains(@aria-label,'Add Contractor')]"
    this.searchDriverInRuns ="(//input[@type='text'])[3]"
    this.breakTime = "//input[@name='breaks.0.startTimestamp']"
    this.StartTime = "(//input[@type='time'])[1]"
    this.Endtime = "(//input[@type='time'])[2]"
    this.startOdo = "(//input[@type='number'])[1]"
    this.endOdo = "(//input[@type='number'])[2]"
    this.totalHrs = "//tr[@class='odd']/td[20]"
    this.totalBreaks = "//tr[@class='odd']/td[21]/a"
    this.totalPayable = "//tr[@class='odd']/td[22]"
    this.runsCostcode = "//tr[@class='odd']/td[23]/input"
    this.totalKM = "//tr[@class='odd']/td[11]"
    this.startTimestamp = "//input[@name='startTimestamp']"
    this.clickbreakModal = "//a[@class ='js-run-breaks']"
    this.btnAddbreak = "//button[text()='Add Break']"
    this.startbreak = "(//input[contains(@class,'MuiInputBase-input')])[1]"
    this.endbreak = "(//input[contains(@class,'MuiInputBase-input')])[2]"
    this.totalbreakinmins ="(//input[contains(@class,'MuiInputBase-input')])[3]"
    this.addedstartbreak = "(//input[contains(@class,'MuiInputBase-input')])[4]"
    this.addedendbreak = "(//input[contains(@class,'MuiInputBase-input')])[5]"
    this.addedtotalbreakinmins = "(//input[contains(@class,'MuiInputBase-input')])[6]"
    this.costcodeQty = "(//div[@data-field='metric'])[2]"
    this.RunsCalendar = "//input[contains(@class,'flatpickr-input')][2]"
    this.calendarclick = "(//span[@class='flatpickr-day today'])[15]"
    this.addBtn="//button[text()='Add']" 
    this.searchRunInput="//input[@placeholder='Label, Job/Run/Runsheet Number']"
    this.jobSearchBox="//input[@id='jobsSearchBox']"  
    this.doneBtn="//button[text()='Done']" 
    this.btnAssign = "(//a[text()='Assign'])[1]"
    this.tabJobs = "//a/span[text()='Jobs']"
    this.runSearch="//input[@id='searchBox']" //locator.fill
    this.arrowRight="//i[text()='keyboard_arrow_right']" 
    this.inputStartOdometer="//input[@name='startOdometer']"
    this.startBtn="//button[text()='Start']"
    this.breakDuration="//input[@name='breaks.0.duration']" 
    this.runFinishBtn="//button[text()='Finish']" 
    this.completedRunPage="//div[text()='Completed Runs']/.."
    this.runNumInCompletedRun="//tbody/tr/td[3]"
    this.costcodeContHrly = "//td[text()='CONT RATES HRLY']/preceding-sibling::td[1]//input/following-sibling::span[1]"
    this.applyBtn="//div/button[text()='Apply']"
    this.costcodeEmpHrly = "//td[text()='EMP RATES HRLY']/preceding-sibling::td[1]//input/following-sibling::span[1]"
    this.EnterPin = "//h2[text()='Please Enter PIN']"
    this.password = "//input[@type='password']"
    this.btnsave = "//button[text()='Save']"
    this.inputFirstName = "//input[@id='signatureFirstName']"
    this.inputLastName = "//input[@id='signatureLastName']"
    this.btnNext = "//button[text()='Next']"
    this.signaturePad = "//canvas[@id='signaturePadCanvas']"
    this.btnSubmit = "//a[text()='Submit']"
    this.jobDurationCancelBtn="//h2[text()='Job duration']/../following-sibling::div[2]/child::button[text()='Cancel']"
    this.iconJobCancel = "//button[@id='myJobsCancelJobBtn']"
    this.btnCancelIt = " //button[text()='Yes, cancel it!']"
    this.searchDriver="//input[contains(@class,'search-filter')]" 
    this.UnassignBtn="(//td/a[text()='Unassign'])[1]"




    }

    async navigateToJobSection(){
        await basePage.scrollToElement(this.tabJobs)
        await basePage.click(this.tabJobs)
        console.log("Enter into jobs section......")
    }

    async navigateToRunSheet(){
        // if(await basePage.verifyElement(this.btnNoThanksInPopUp)){
        // await basePage.click(this.btnNoThanksInPopUp)
        // }
        
        const businessLogo = await basePage.verifyElement(this.businessLogo)
        await basePage.waitForLocator(this.RunsCard)
        const cardRuns = await basePage.verifyElement(this.RunsCard)
        console.log("businessLogo :"+businessLogo)
        if(cardRuns){
            console.log('Runs Card is visible......')
        }
        else{
            await basePage.click(this.businessLogo)
            console.log('business logo clicked.....')
        }
        await basePage.click(this.RunsCard)
        await basePage.verifyElement(this.RunsTitleCard)
    
        console.log("Enter Run sheet.....")
    }


    async CreateRuns(Runslabel,movement){
        let result = await basePage.verifyElement(this.locateButton)
        console.log(result)
    
        if(result == true){
            await basePage.click(this.CreateRunsButton)
            console.log("Add Run Button is Clicked...")
            
            let labelName = Runslabel
    
            await basePage.sendKeys(this.labelRuns, labelName)
            console.log(labelName + " is added...")
            await basePage.wait(2000)
    
            await basePage.click(this.selectBU)
            await basePage.click(this.ChooseBU)
            let BUName = await basePage.getAttribute(this.getBu,'title')
            testDataUtil.addKeyValueToObject(movement,"BURuns", BUName) 
            console.log(BUName+ " is added...")
    
            await basePage.click(this.SelectStatus)
            await basePage.click(this.ChooseStatus)
            let Status = await basePage.getText(this.ChooseStatus) 
            testDataUtil.addKeyValueToObject(movement,"StatRuns", Status) 
            console.log(Status+ " is added...")
    
            await basePage.click(this.selectVehicle)
            await basePage.click(this.ChooseVehicle)
            let Vehicle = await basePage.getAttribute(this.geVehicle,'title') 
            testDataUtil.addKeyValueToObject(movement,"VecRuns", Vehicle) 
            console.log(Vehicle+ " is added...")
    
            await basePage.click(this.selectTrailerA)
            await basePage.click(this.ChooseTrailerA)
            let trailerA = await basePage.getAttribute(this.geTrailerA,'title') 
            testDataUtil.addKeyValueToObject(movement,"TrailA", trailerA) 
            console.log(trailerA+ " is added...")
    
            await basePage.click(this.selectTrailerB)
            await basePage.click(this.ChooseTrailerB)
            let trailerB = await basePage.getAttribute(this.geTrailerB,'title') 
            testDataUtil.addKeyValueToObject(movement,"TrailB", trailerB) 
            console.log(trailerB+ " is added...")
            
            await basePage.click(this.addBtn)
            console.log("Add button is clicked...")
    
        }else{
    
            console.log("Add Runs button is missing...")
    
        }
    
    }



    
async SearchRunSheet(runNo){
       await basePage.waitForLocator(this.searchRunInput)
       await basePage.click(this.searchRunInput)
       await basePage.sendKeys(this.searchRunInput,runNo)
       await basePage.keyboardEnter()
       console.log(runNo + " Entered.....")
       await basePage.wait(2000)
       console.log("Runsheet is filtered.....")
}


async sortAndGetRunNumber(movement){
        //sort to latest Run
        await basePage.click(this.SortScheduledDate)
        await basePage.wait(3000)
        await basePage.click(this.SortScheduledDate) //descending sort
        console.log("Run is Sorted...")

        await basePage.wait(3000)
        let RunsRef = await basePage.getText(this.RunsNumber)
        testDataUtil.addKeyValueToObject(movement,"RunsRef", RunsRef)

         await basePage.sendKeys(this.runSearch, RunsRef)
         await basePage.keyboardEnter()
        console.log(RunsRef + " is searched...")
        await basePage.wait(3000)

}

async verifyRuns (movement){
    let isVerify = false

        let RunsLabel = testDataUtil.getValueByNestedKey(movement,"RunsLabel")
        let StatRunsData1 = testDataUtil.getValueByNestedKey(movement,"StatRuns")
        let StatRunsData = StatRunsData1.toLowerCase();
        let BURunsData = testDataUtil.getValueByNestedKey(movement,"BURuns")

        let VehicleData = testDataUtil.getValueByNestedKey(movement,"VecRuns")
        let TrailAData = testDataUtil.getValueByNestedKey(movement,"TrailA")
        const [code1, code2] = TrailAData.split('|').map(item => item.trim());
        let TrailAData1=code1;
        let TrailBData = testDataUtil.getValueByNestedKey(movement,"TrailB")

        const RunsData = [RunsLabel,StatRunsData,BURunsData,VehicleData,TrailAData1,TrailBData]

        let LabelOverview = await basePage.getText(this.LabelOverview)
        console.log("LabelOverview: " + LabelOverview)
        let RunstatOverview1 = await basePage.getText(this.RunstatOverview)
        console.log("RunstatOverview1: " + RunstatOverview1 )
        let RunstatOverview = RunstatOverview1.toLowerCase()
        console.log("RunstatOverview: " + RunstatOverview)
        let RunsBUOverview = await basePage.getText(this.RunsBUOverview)
        console.log("RunsBUOverview: " + RunsBUOverview)
        let RunsVehicOverview = await basePage.getText(this.RunsVehicOverview)
        console.log("RunsVehicOverview: " + RunsVehicOverview)
        let RunsTrailerAOverview = await basePage.getText(this.RunsTrailerAOverview )
        console.log("RunsTrailerAOverview: " + RunsTrailerAOverview)
        let RunsTrailerBOverview = await basePage.getText(this.RunsTrailerBOverview)
        console.log("RunsTrailerBOverview: " + RunsTrailerBOverview)

        const RunsOverview = [LabelOverview,RunstatOverview,RunsBUOverview,RunsVehicOverview,RunsTrailerAOverview,RunsTrailerBOverview]

        let result = await basePage.arraysAreEqual(RunsData,RunsOverview)
        console.log(result)
        if (result == true){

            console.log("Runs overview data is verified successfully...")
            isVerify = true

        }else{

            console.log("Runs data are missing...")

        }

    return isVerify

}


async AddJobsToRuns(){

    await basePage.wait(2000)
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    const tableText = await basePage.verifyElement('#runJobsTable');

    if (tableText == false){
        await basePage.click(this.AddJobs)
        await basePage.waitForLocator(this.AvailableJobs)
        await basePage.click(this.AvailableJobs)

        const refNum = createConsignmentPage.extractedNumber
        console.log("RefNum: " + refNum)
        await basePage.sendKeys(this.jobSearchBox, refNum)
        await basePage.keyboardEnter()

        if (await basePage.verifyElement(`//td[contains(text(),'${refNum}')]`)){
            const checkbox = this.RunsCheckbox.replace('<<text>>',refNum)
            await basePage.scrollToElement(checkbox)
            await basePage.click(checkbox)
            await basePage.click(this.buttonAddRuns)
            await basePage.click(this.AssignedJobs)
            await basePage.sendKeys(this.jobSearchBox, refNum)
            await basePage.keyboardEnter()
            await basePage.wait(3000)
            let result =await basePage.verifyElement(`//td[contains(text(),'${refNum}')]`)
            console.log(result)
            if (await basePage.verifyElement(`//td[contains(text(),'${refNum}')]`)){
                console.log("Job is Visible to Assigned jobs...")
                await basePage.click(this.doneBtn)
            } else {
                console.log("Job is not added to Runs...")
                 await basePage.click(this.doneBtn)

            }

        } else{

             console.log("Job is not available...")
        }    
    } else {       
        await basePage.waitForLocator(this.AvailableJobs)
        await basePage.click(this.AvailableJobs)

        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
        const refNum = createConsignmentPage.extractedNumber
        console.log("RefNum: " + refNum)
        await basePage.sendKeys(this.jobSearchBox, refNum)
        await basePage.keyboardEnter()
        await basePage.wait(3000)
        if (await basePage.verifyElement(`//td[contains(text(),'${refNum}')]`)){
            const checkbox = this.RunsCheckbox.replace('<<text>>',refNum)
            await basePage.scrollToElement(checkbox)
            await basePage.click(checkbox)
            await basePage.click(this.buttonAddRuns)
            await basePage.click(this.AssignedJobs)
            await basePage.sendKeys(this.jobSearchBox, refNum)
            await basePage.keyboardEnter()

            let result =await basePage.verifyElement(`//td[contains(text(),'${refNum}')]`)
            console.log(result)
            if (await basePage.verifyElement(`//td[contains(text(),'${refNum}')]`)){
                console.log("Job is Visible to Assigned jobs...")
                await basePage.click(this.doneBtn)
            } else {
                console.log("Job is not added to Runs...")
                await basePage.click(this.doneBtn)
            }

        } else{

             console.log("Job is not available...")
        }  


    }   

}

async AssignDriverToRunsheet(driver){
        await basePage.wait(2000)
        await basePage.scrollToElement(this.AssignDriverToRuns)
        await basePage.click(this.AssignDriverToRuns)
        await basePage.sendKeys(this.searchDriverInRuns,driver)
        await basePage.wait(2000)
        await basePage.click(`//td[text()='${driver}']/following-sibling::td[4]/a[text()='Assign']`)
        console.log("Driver " + driver + " is successfully assigned...")


}


async AssignContractorToRunsheet(contractor){
        await basePage.wait(2000)
        await basePage.scrollToElement(this.AssignContractorToRuns)
        await basePage.click(this.AssignContractorToRuns)
        await basePage.sendKeys(this.searchDriverInRuns,contractor)
        await basePage.click(this.btnAssign)
        console.log("Contractor " + contractor + " is successfully assigned...")


}


async VerifyContractorAndJobCount(movement){
    let isVerify = false
    let contractorName = await testDataUtil.getValueByNestedKey(movement,"Contractor1")
    let JobCount = "(1)"
    let verifyContractor = await basePage.verifyElement(`//span[text()='${contractorName}']`)
    let verifyJobCount = await basePage.verifyElement(`//span[text()='${JobCount}']`)
   //let verifyJobCount = true

    console.log(verifyContractor, verifyJobCount)
    if (verifyContractor == true && verifyJobCount == true){
        isVerify = true
        console.log("Job and Driver is verified successfully...")

    }else{
        console.log("\x1b[31m%s\x1b[0m","Cannot Verify Contractor and job count...")

    }

    return isVerify
}


async VerifyDriverAndJobCount(movement){
    let isVerify = false
    let driverName = await testDataUtil.getValueByNestedKey(movement,"Driver")
    let JobCount = "(1)"
    let verifyDriver = await basePage.verifyElement(`//td[text()='${driverName}']`)
    console.log(driverName)
    let verifyJobCount = await basePage.verifyElement(`//span[text()='${JobCount}']`)
   //let verifyJobCount = true

    console.log(verifyDriver, verifyJobCount)
    if (verifyDriver == true && verifyJobCount == true){
        isVerify = true
        console.log("Job and Driver is verified successfully...")

    }else{
        console.log("\x1b[31m%s\x1b[0m","Cannot Verify Driver and job count...")

    }

    return isVerify
}



 async startRun(){
        await basePage.wait(2000)
        await basePage.click(this.arrowRight)
        await basePage.click(this.inputStartOdometer)
        await basePage.sendKeys(this.inputStartOdometer,"100")

        const now = new Date();
        console.log("Original Time:", now.toString());

        now.setMinutes(now.getMinutes() - 60);
        console.log("After -60 minutes:", now.toString());

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const yr = now.getFullYear();
        //const year = yr; run in staging
        let year='00'+yr; //run in beta


        let hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedHours = String(hours).padStart(2, '0');

        const formattedDateTime = `${month}/${day}/${year} ${formattedHours}:${minutes} ${ampm}`;

        let runSTART = formattedDateTime.replace(/[^a-zA-Z0-9]/g, '');

        console.log("Run start Time :"+runSTART)
        await basePage.waitForLocator(this.startTimestamp);
        await basePage.typeText(this.startTimestamp, runSTART);
        await basePage.click(this.startBtn)

        console.log("Run started............")
    }

    async finishRun(){
        await basePage.click(this.breakDuration)
        await basePage.sendKeys(this.breakDuration,"20")
        await basePage.click(this.runFinishBtn)
        console.log("Run completed..........")
        }
    
    async breakStartTime2(){

        const now = new Date();
        console.log("Original Time:", now.toString());

        now.setMinutes(now.getMinutes() - 50);
        console.log("After -50 minutes:", now.toString());

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const yr = now.getFullYear();
        const year = yr;
        //let year='00'+yr

        let hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedHours = String(hours).padStart(2, '0');

        const formattedDateTime = `${month}/${day}/${year} ${formattedHours}:${minutes} ${ampm}`;
        const timeOnly = `${formattedHours}:${minutes} ${ampm}`;
        const dateonly = `${year}-${month}-${day}`

        let breakStart = formattedDateTime.replace(/[^a-zA-Z0-9]/g, '');
        let breakStartTime = timeOnly.replace(/[^a-zA-Z0-9]/g, '');


        console.log("Formatted breakStart:", breakStart);

        await basePage.waitForLocator(this.breakTime);
        await basePage.click(this.breakTime);

        const result = await basePage.verifyElement(`//input[contains(@min,"${dateonly}")]`)
        console.log(result)
        
       //controls which will be placed in breaktime, there is a min added in breaktime fields
        if (result == true){  // if there is a minimum added, only add the time
                await basePage.typeText(this.breakTime, breakStartTime);

        } else 
        {
                await basePage.typeText(this.breakTime, breakStart);

        }
        

    }

    async addCostcodeInCompletedRuns(movement){
    let isVerify = false
    let driver = testDataUtil.getValueByNestedKey(movement,"Driver")
    let contractor = testDataUtil.getValueByNestedKey(movement,"Contractor1")
    let contractorLocator = await basePage.verifyElement(`//td/span[text()="${contractor}"]`)
    console.log(contractorLocator)

    if (contractorLocator == true){
            await basePage.click(this.runsCostcode)  
            await basePage.click(this.costcodeContHrly)
            await basePage.click(this.applyBtn)
            await basePage.wait(1000)
            const runsCostcode = await basePage.getInputValue(this.runsCostcode)  
    
            if (runsCostcode == "CONT RATES HRLY"){
                isVerify = true
                console.log("Runs Costcode is added: "+ runsCostcode)
            } else
            {
                console.log("\x1b[31m%s\x1b[0m","Runs Costcode failed to add...")
                return isVerify
            }
        }    else {

                await basePage.click(this.runsCostcode)  
                await basePage.click(this.costcodeEmpHrly)
                await basePage.click(this.applyBtn)
                const runsCostcode = await basePage.getInputValue(this.runsCostcode)  

                if (runsCostcode == "EMP RATES HRLY"){
                    isVerify = true
                    console.log("Runs Costcode is added: "+ runsCostcode)
                } else
                {
                    console.log("\x1b[31m%s\x1b[0m","Runs Costcode failed to add...")
                    return isVerify
                }
        }
    
return isVerify
}


       async AddBreakInModal(){
        await basePage.waitForLocator(this.clickbreakModal)
        await basePage.click(this.clickbreakModal)
        await basePage.waitForLocator(this.btnAddbreak)
        await basePage.click(this.btnAddbreak)
        await basePage.click(this.addedtotalbreakinmins)
        await basePage.sendKeys(this.addedtotalbreakinmins,"10")
        await basePage.click(this.addedstartbreak)


        const startbrake = await basePage.getAttribute(this.startbreak,"value")
        const endbrake = await basePage.getAttribute(this.endbreak,"value")
        const totalbreak = await basePage.getAttribute(this.totalbreakinmins,"value")
        const formattedtotalbreak = await basePage.minutesToHHMM(totalbreak)
        console.log("Start Break: " + startbrake)
        console.log("End Break: " + endbrake)
        console.log("Total Break: " + formattedtotalbreak)
        const addedstartbreak = await basePage.getAttribute(this.addedstartbreak,"value")
        const addedendbreak = await basePage.getAttribute(this.addedendbreak,"value")
        const addedtotalbreak = await basePage.getAttribute(this.addedtotalbreakinmins,"value")
        const formattedaddedtotalbreak = await basePage.minutesToHHMM(addedtotalbreak)
        console.log("Added Start Break: " + addedstartbreak)
        console.log("Added End Break: " + addedendbreak)
        console.log("Added Total Break: " + formattedaddedtotalbreak)


        const start = await basePage.convertToDate(startbrake);
        const end = await basePage.convertToDate(endbrake);
        const difference = await basePage.getTimeDifference(start, end);
        console.log(`Time difference for first break: ${difference}`); // → "0:20"
        await basePage.compare(formattedtotalbreak,difference)

        const addedstart = await basePage.convertToDate(addedstartbreak);
        const addedend = await basePage.convertToDate(addedendbreak);
        const addeddifference = await basePage.getTimeDifference(addedstart, addedend);
        console.log(`Time difference for Second break: ${addeddifference}`); // → "0:10"
        await basePage.compare(formattedaddedtotalbreak,addeddifference)

        const totalbreak1and2 = await basePage.addTimes(addeddifference,difference)
        console.log("Total break in modal: " + totalbreak1and2)

        await basePage.click(this.btnsave)
        await basePage.waitForLocator(this.clickbreakModal)
        const breakInRuns = await basePage.getText(this.clickbreakModal)
        const breakinrunstable = await basePage.minutesToHHMM(breakInRuns)
        console.log("Total break in Runs table: " + breakinrunstable)


        const finalresult = await basePage.compare(totalbreak1and2,breakinrunstable)

        return finalresult

    }

    async selectRunsFilter(){
      await page.locator('[aria-label="Show filters"]').nth(1).click();
      await page.getByRole('button', { name: /add filter/i }).click();
      await page.getByRole('combobox', { name: /value/i }).click();
      await page.getByRole('option', { name: /Run/i }).click();
      await page.getByRole('button', { name: /apply filters/i }).click();
      console.log("Filtered to Runs...")
    }
    
    async verifyHrlyQtyVsRunsPayable(TotalPayableHrs){
    let isVerify = false
    await basePage.wait(5000)
    let qty = await basePage.getText(this.costcodeQty)
    qty = parseFloat(qty)
    console.log("Payable hrs in Payments table: " + qty)
    const TotalPayableHrsDecimal = await basePage.timeToDecimal(TotalPayableHrs)
    console.log("Payable hrs in Runs table: " + TotalPayableHrsDecimal)
    const result = await basePage.compare(qty,TotalPayableHrsDecimal)
        if (result == true){
        isVerify = true
        }
    return isVerify
    
    }
    
    
    async addAdditionalcharge(movement, rate) {
        let isVerify = false;
        
        // Wait for the total payment locator to appear
        await basePage.waitForLocator(this.totalInPayment);
    
        // Get the initial total amount
        let amountInPayment = await basePage.getText(this.totalInPayment);
        const regex1 = /[\d,]+\.\d{2}/g;
        let total_amount = amountInPayment.match(regex1)?.[0].replace(/,/g, '');
        console.log("Total amount before adding additional charge: " + total_amount);
    
        // Add additional charge
        await basePage.click(this.addChargeInPaymentBtn);
        await basePage.click(this.additionalCostCode);
    
        // Replace <<Text>> placeholder with actual rate
        let additionalCostVal = this.additionalCostVal.replace('<<Text>>', rate);
        await basePage.click(additionalCostVal);
        await basePage.click(this.additionalChargeAddBtn);
        await basePage.click(this.buttonClose);
        
        // Wait for changes to reflect
        await basePage.wait(15000);
        console.log("Additional Charge added successfully......");
        await basePage.wait(10000);
    
        // Get the updated total amount
        let amountInPayAfterAddCharge = await basePage.getText(this.totalInPayment);
        let totalAmountAfterAddCharge = amountInPayAfterAddCharge.match(regex1)?.[0].replace(/,/g, '');
        console.log("Total amount after adding additional charge: " + totalAmountAfterAddCharge);
    
        // Compare numerically
        if (parseFloat(total_amount) !== parseFloat(totalAmountAfterAddCharge)) {
            isVerify = true;
            console.log("Adding Additional charges are reflected in total payment....");
        } else {
            console.log("❌ Additional charge NOT reflected in total payment.");
        }
    
        console.log("Total amount in the Payment Summary Page is: " + totalAmountAfterAddCharge);
    
        // Add result to test data
        testDataUtil.addKeyValueToObject(movement, "TotalAmount", totalAmountAfterAddCharge);
        await basePage.wait(5000);
    
        return isVerify;
    }
    
    async futileJobsPU(){
  const headingButton = page.getByText('Mark as Heading to Pickup');
  await headingButton.scrollIntoViewIfNeeded();
  await headingButton.click();
  console.log("Mark as Heading to Pickup is clicked")
  await basePage.wait(3000)
  const arrivedButton = page.getByText('Mark as Arrived at Pickup')
  await arrivedButton.scrollIntoViewIfNeeded();
  await arrivedButton.click();
  await basePage.wait(3000)
  console.log("Mark as Arrived at Pickup is clicked")
  const PickedUpButton = page.getByText('Mark as Picked Up')
  await PickedUpButton.scrollIntoViewIfNeeded();
  await PickedUpButton.click();
  await basePage.wait(3000)
  console.log("Marked as Pickup is clicked")
  await page.getByText('Report Futile Job Pick Up').click();
  console.log("Futile Pickup is clicked...")
  await page.locator('#myJobsFutileReasonSelect').selectOption('Incorrect Pickup Address Provided');
  console.log("Incorrect Pickup Address Provided is clicked...")
  await page.getByRole('textbox', { name: 'Additional Details' }).click();
  await page.getByRole('textbox', { name: 'Additional Details' }).fill('incorrect');
  await page.getByRole('button', { name: 'Next' }).click();
  const futileError = page.getByText('Incorrect Pickup Address Provided')
  await futileError.scrollIntoViewIfNeeded();
  await expect(page.locator('main')).toContainText('Incorrect Pickup Address Provided');
  await expect(page.locator('main')).toContainText('Attempted Pickups (1)');
  console.log("Incorrect Pickup Address Provided is visible on job overview...")
}


async futileJobsPUContractor(){
  const headingButton = page.getByText('Mark as Heading to Pickup');
  await headingButton.scrollIntoViewIfNeeded();
  await headingButton.click();
  console.log("Mark as Heading to Pickup is clicked")
  await basePage.wait(3000)
  const arrivedButton = page.getByText('Mark as Arrived at Pickup')
  await arrivedButton.scrollIntoViewIfNeeded();
  await arrivedButton.click();
  await basePage.wait(3000)
  console.log("Mark as Arrived at Pickup is clicked")
  const PickedUpButton = page.getByText('Mark as Picked Up')
  await PickedUpButton.scrollIntoViewIfNeeded();
  await PickedUpButton.click();
  await basePage.wait(3000)
  console.log("Marked as Pickup is clicked")
  await page.getByText('Report Futile Job Pick Up').click();
  console.log("Futile Pickup is clicked...")
  await page.locator('#myJobsFutileReasonSelect').selectOption('Incorrect Pickup Address Provided');
  console.log("Incorrect Pickup Address Provided is clicked...")
  await page.getByRole('textbox', { name: 'Additional Details' }).click();
  await page.getByRole('textbox', { name: 'Additional Details' }).fill('incorrect');
  await page.getByRole('button', { name: 'Next' }).click();
  
  let isVerify = true
  
  if (await basePage.verifyElement('Incorrect Pickup Address Provided')){
    console.log("\x1b[31m%s\x1b[0m","job is not removed to contractor...")
    isVerify = false
  }else{
    console.log("job is removed to contractor...")

  }

  return isVerify

}

async futileJobsPUAlreadyPickedUp(){
  const headingButton = page.getByText('Mark as Heading to Pickup');
  await headingButton.scrollIntoViewIfNeeded();
  await headingButton.click();
  console.log("Mark as Heading to Pickup is clicked")
  await basePage.wait(3000)
  const arrivedButton = page.getByText('Mark as Arrived at Pickup')
  await arrivedButton.scrollIntoViewIfNeeded();
  await arrivedButton.click();
  await basePage.wait(3000)
  console.log("Mark as Arrived at Pickup is clicked")
  const PickedUpButton = page.getByText('Mark as Picked Up')
  await PickedUpButton.scrollIntoViewIfNeeded();
  await PickedUpButton.click();
  await basePage.wait(3000)
  console.log("Marked as Pickup is clicked")
  await page.getByText('Report Futile Job Pick Up').click();
  console.log("Futile Pickup is clicked...")
  await page.locator('#myJobsFutileReasonSelect').selectOption('Already Picked Up');
  console.log("Already Picked Up...")
  await page.getByRole('textbox', { name: 'Additional Details' }).click();
  await page.getByRole('textbox', { name: 'Additional Details' }).fill('incorrect');
  await page.getByRole('button', { name: 'Next' }).click();
  const futileError = page.getByText('Already Picked Up')
  await futileError.scrollIntoViewIfNeeded();
  await expect(page.locator('main')).toContainText('Already Picked Up');
  await expect(page.locator('main')).toContainText('Attempted Pickups (1)');
  console.log("Already Picked Up is visible on job overview...")
}


async futileJobsDELReturnToSender(movement){
  const headingButton = page.getByText('Mark as Heading to Pickup');
  await headingButton.scrollIntoViewIfNeeded();
  await headingButton.click();
  console.log("Mark as Heading to Pickup is clicked...")
  await basePage.wait(3000)
  const arrivedButton = page.getByText('Mark as Arrived at Pickup')
  await arrivedButton.scrollIntoViewIfNeeded();
  await arrivedButton.click();
  await basePage.wait(3000)
  console.log("Mark as Arrived at Pickup is clicked...")
  const PickedUpButton = page.getByText('Mark as Picked Up')
  await PickedUpButton.scrollIntoViewIfNeeded();
  await PickedUpButton.click();
  await basePage.wait(3000)
  console.log("Marked as Pickup is clicked...")
  await basePage.wait(2000)
  await this.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "ReceiverFirstName"),
  testDataUtil.getValueByNestedKey(movement, "ReceiverLastName"))
  await this.putTheSign()
  console.log("Drop sign...")
  const headingtoButton = page.getByText('Mark as Heading to Dropoff');
  await headingtoButton.scrollIntoViewIfNeeded();
  await headingtoButton.click();
  console.log("Mark as Heading to Dropoff is clicked...")
  await basePage.wait(3000)
  const arrivedtoButton = page.getByText('Mark as Arrived at Dropoff')
  await arrivedtoButton.scrollIntoViewIfNeeded();
  await arrivedtoButton.click();
  await basePage.wait(3000)
  console.log("Mark as Arrived at Dropoff is clicked...")
  const DELbutton = page.getByText('Mark as Delivered')
  await DELbutton.scrollIntoViewIfNeeded();
  await DELbutton.click();
  await basePage.wait(3000)
  console.log("Marked as Delivered is clicked...")
  await basePage.wait(2000)
  await page.getByText('Report Attempted Delivery').click();
  console.log("Report Attempted Delivery is clicked...")
  await page.locator('#myJobsFutileReasonSelect').selectOption('Return to Sender');
  console.log("Return to Sender...")
  await page.getByRole('textbox', { name: 'Additional Details' }).click();
  await page.getByRole('textbox', { name: 'Additional Details' }).fill('incorrectt');
  await basePage.clickKeyboardBackSpace()
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator('main')).toContainText('Attempted Delivery (1)');
  console.log("Attempted Delivery is visible on job overview...")
}


async futileJobsDel(movement){
  const PickedUpButton = page.getByText('Mark as Picked Up')
  await PickedUpButton.scrollIntoViewIfNeeded();
  await PickedUpButton.click();
  await basePage.wait(3000)
  console.log("Marked as Pickup is clicked")
  await page.getByText('Report Futile Job Pick Up').click();
  console.log("Futile Pickup is unticked...")
  await this.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "SenderFirstName"),
  testDataUtil.getValueByNestedKey(movement, "SenderLastName"))
  await this.putTheSign()
  const headingButton = page.getByText('Mark as Heading to Dropoff');
  await headingButton.scrollIntoViewIfNeeded();
  await headingButton.click();
  console.log("Mark as Heading to Drop off is clicked")
  await basePage.wait(3000)
  const arrivedButton = page.getByText('Mark as Arrived at Dropoff')
  await arrivedButton.scrollIntoViewIfNeeded();
  await arrivedButton.click();
  await basePage.wait(3000)
  console.log("Mark as Arrived at Dropoff is clicked")
  const delButton = page.getByText('Mark as Delivered')
  await delButton.scrollIntoViewIfNeeded();
  await delButton.click();
  await basePage.wait(3000)
  console.log("Marked as Delivered is clicked")
  await page.locator('#myJobsFutileReasonSelect').selectOption('Incorrect Delivery Address Provided');
  console.log("Incorrect Delivery Address Provided is clicked...")
  await page.getByRole('textbox', { name: 'Additional Details' }).click();
  await page.getByRole('textbox', { name: 'Additional Details' }).fill('incorrectt');
  await basePage.clickKeyboardBackSpace()
  await page.getByRole('button', { name: 'Next' }).click();
  const futileError = page.getByText('Attempted Delivery (1)')
  await futileError.scrollIntoViewIfNeeded();
  await expect(page.locator('main')).toContainText('Attempted Delivery (1)');
  console.log("Attempted Delivery (1) is visible on job overview...")
}




async enterSenderAndReceiverNames(firstName, lastName){
    console.log(await basePage.verifyElement(this.inputFirstName))
    if(await basePage.verifyElement(this.inputFirstName)){
        await basePage.waitForLocator(this.inputFirstName)
        await basePage.clear(this.inputFirstName)
        await basePage.sendKeys(this.inputFirstName, firstName)
        await basePage.clear(this.inputLastName)
        await basePage.sendKeys(this.inputLastName, lastName)
        await basePage.clickKeyboardBackSpace()
        await basePage.click(this.btnNext)
        console.log("Sender details entered successfully....")
    }else{
        console.log("Sender and receiver Signature tab is not Visible ....")
    }
   
}



async putTheSign(){
    await basePage.click(this.signaturePad)
    await basePage.click(this.btnSubmit)
    console.log("Sign droped successfully....")
    let status=await basePage.verifyElement(this.jobDurationCancelBtn)
    console.log("Visibility of Job Duration " +status)
    if(status){
        await basePage.click(this.jobDurationCancelBtn)
        console.log("Job Duration canceled successfully...........") 
    }
}


async futileJobsDelContractor(movement){
  const PickedUpButton = page.getByText('Mark as Picked Up')
  await PickedUpButton.scrollIntoViewIfNeeded();
  await PickedUpButton.click();
  await basePage.wait(3000)
  console.log("Marked as Pickup is clicked")
  await page.getByText('Report Futile Job Pick Up').click();
  console.log("Futile Pickup is unticked...")
  await this.enterSenderAndReceiverNames(testDataUtil.getValueByNestedKey(movement, "SenderFirstName"),
  testDataUtil.getValueByNestedKey(movement, "SenderLastName"))
  await this.putTheSign()
  const headingButton = page.getByText('Mark as Heading to Dropoff');
  await headingButton.scrollIntoViewIfNeeded();
  await headingButton.click();
  console.log("Mark as Heading to Drop off is clicked")
  await basePage.wait(3000)
  const arrivedButton = page.getByText('Mark as Arrived at Dropoff')
  await arrivedButton.scrollIntoViewIfNeeded();
  await arrivedButton.click();
  await basePage.wait(3000)
  console.log("Mark as Arrived at Dropoff is clicked")
  const delButton = page.getByText('Mark as Delivered')
  await delButton.scrollIntoViewIfNeeded();
  await delButton.click();
  await basePage.wait(3000)
  console.log("Marked as Delivered is clicked")
  await page.locator('#myJobsFutileReasonSelect').selectOption('Incorrect Delivery Address Provided');
  console.log("Incorrect Delivery Address Provided is clicked...")
  await page.getByRole('textbox', { name: 'Additional Details' }).click();
  await page.getByRole('textbox', { name: 'Additional Details' }).fill('incorrectt');
  await basePage.clickKeyboardBackSpace()
  await page.getByRole('button', { name: 'Next' }).click();
  let isVerify = true
  
  if (await basePage.verifyElement('Incorrect Delivery Address Provided')){
    console.log("\x1b[31m%s\x1b[0m","job is not removed to contractor...")
    isVerify = false
  }else{
    console.log("job is removed to contractor...")

  }

  return isVerify
}



async verifyJobInRuns(runsref){
    let isVerify = false
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 

    await page.locator('tr').filter({ hasText: runsref }).locator('i').first().click();
    const tableText = await page.locator('#runJobsTable').textContent();
    const isNoData = tableText?.includes(createConsignmentPage.extractedNumber) ?? false;
    console.log(isNoData); // true or false}
    if (isNoData==false){
        isVerify = true
        console.log("Job is removed from Runs...")
        await basePage.click(this.doneBtn)
  } else{
        console.log("\x1b[31m%s\x1b[0m", createConsignmentPage.extractedNumber + " Job is NOT removed from Runs...")
        await basePage.click(this.doneBtn)

  }
return isVerify
}


async StartTimeMinusEndTime(){
let isVerify = false
    const starttime = await basePage.getInputValue(this.StartTime)
    const updatedstarttime = await basePage.timeFormat(starttime)
    const startparsetime = await basePage.parseTimeToDate(starttime)

    const Endtime = await basePage.getInputValue(this.Endtime)
    const updatedEndtime = await basePage.timeFormat(Endtime)
    const endparsetime = await basePage.parseTimeToDate(Endtime)

    const StartOdo = await basePage.getInputValue(this.startOdo) 
    const EndOdo = await basePage.getInputValue(this.endOdo)  



    const totalHrs = await basePage.getText(this.totalHrs)
    const totalhrsformatted = await basePage.formatTimeString(totalHrs)
    const totalKM = await basePage.getText(this.totalKM)


    const finalhrscomputed = await basePage.getTimeDifference(startparsetime,endparsetime)
    const totalodo = EndOdo - StartOdo

    console.log("Start time: "+ updatedstarttime)
    console.log("End time: "+ updatedEndtime)
    console.log ("total hrs: "+ finalhrscomputed)
    const result1 = await basePage.compare(finalhrscomputed,totalhrsformatted)

    console.log("start Odo: "+ StartOdo)
    console.log("end Odo: "+ EndOdo)
    console.log("Total Odo: "+ totalodo)
    const result2 = await basePage.compare(totalodo,totalKM)

    if (result1 == true && result2 == true){
        isVerify = true // should be validating, all should be true
        return isVerify
    }
    
}

async RunsJobOverviewVerificationContractor(RunsRef,Contractor){
    let isVerify = false

    const runsref = `(//a[text()='${RunsRef}'])[2]`
    const contractor = `//span[text()='${Contractor}']`
    await basePage.scrollToElement(contractor)

    if (await basePage.verifyElement(runsref) && await basePage.verifyElement(contractor))
    {
        isVerify = true
        console.log("Reference: "+ runsref + " and " + "Contractor: " + contractor + " are visible in job overview") 
    }

    else{
        console.log("\x1b[31m%s\x1b[0m","Run number and Contractor are missing...")

    }  

    return isVerify
}

async completeRun(runNo){
       await basePage.waitForLocator(this.searchRunInput)
       await basePage.click(this.searchRunInput)
       await basePage.sendKeys(this.searchRunInput,runNo)
       await basePage.keyboardEnter()
       await basePage.wait(2000)
       await basePage.click(this.arrowRight)
       }

async RunsJobOverviewVerification(RunsRef,driver){
    let isVerify = false

    const runsref = `(//a[text()='${RunsRef}'])[2]`
    const Driver = `(//p[text()='${driver}'])[2]`
    await basePage.scrollToElement(Driver)

    if (await basePage.verifyElement(runsref) && await basePage.verifyElement(Driver))
    {
        isVerify = true
        console.log("Reference: "+ RunsRef + " and " + "Driver/Contractor: " + driver + " are visible in job overview") 
    }

    else{
        console.log("\x1b[31m%s\x1b[0m","Run number and Driver are missing...")

    }  

    return isVerify
}


async verifyFinishedRuns(runNo){
        let isVerify=false
        await basePage.click(this.completedRunPage)
        await basePage.waitForLocator(this.searchRunInput)
        await basePage.click(this.searchRunInput)
        await basePage.sendKeys(this.searchRunInput,runNo)
        await basePage.keyboardEnter()
        console.log("Runs is being searched, please wait....")
        await basePage.wait(10000)
        let runNoInCompleted=await basePage.getText(this.runNumInCompletedRun)
        let  runNumber= runNo.replace(/^0*/, '').slice(-6).padStart(6, '0');
        console.log("Run number in runs page "+runNoInCompleted)
        console.log("Run number in test data File "+runNumber)
        if(runNumber == runNoInCompleted){
            isVerify=true
            console.log("Runs verified in completed Run page....")
        }
        return isVerify
       }

  async verifyFinishedRunsContractor(runNo){
        let isVerify=false
        await basePage.click(this.completedRunPage)
        const today = new Date();
        const options = { month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', options) + ',';
        console.log(formattedDate);
        await page.locator('xpath=//input[@placeholder=".."][2]').click();
        await page.getByLabel(formattedDate).nth(1).click();
        await page.getByLabel(formattedDate).nth(1).click();
        console.log("filter to today's date...")
        await basePage.waitForLocator(this.searchRunInput)
        await basePage.click(this.searchRunInput)
        await basePage.sendKeys(this.searchRunInput,runNo)
        await basePage.keyboardEnter()
        console.log("Runs is being searched, please wait....")
        await basePage.wait(10000)
        let runNoInCompleted=await basePage.getText(this.runNumInCompletedRun)
        let  runNumber= runNo.replace(/^0*/, '').slice(-6).padStart(6, '0');
        console.log("Run number in runs page "+runNoInCompleted)
        console.log("Run number in test data File "+runNumber)
        if(runNumber == runNoInCompleted){
            isVerify=true
            console.log("Runs verified in completed Run page....")
        }
        return isVerify
       }

    async UnassignDriverToRun(runsref,driver){
               await basePage.wait(1000)
               await page.locator('tr').filter({ hasText: runsref }).locator('[aria-label="Assign Driver"]').first().click();
               console.log("Icon Driver is clicked.....")
               await basePage.wait(2000)
               //await basePage.click(this.searchDriver)
               await basePage.sendKeys(this.searchDriver,driver)
               await basePage.wait(1000)
               await basePage.click(this.UnassignBtn)
               console.log(`Unassigned Driver " ${driver} " to run.....`)
              }


async cancelJob(strMovement) {    
    await basePage.wait(3000)
    const movementLocator = page.locator(`//td[text()='${strMovement}']`)
    await basePage.wait(3000)
    await movementLocator.click()
    console.log("Job clicked Successfully.......")
    await basePage.scrollToElement(this.iconJobCancel)
    await basePage.click(this.iconJobCancel)
    await basePage.waitForLocator(this.btnCancelIt)
    await basePage.click(this.btnCancelIt)
    console.log("Job Cancelled Successfully.......")
}
}

module.exports = Runs
