const {expect} = require ('@playwright/test');
const CreateConsignmentPage = require("../pageobjects/Create_Consignment_page");
const { timeout } = require('../playwright.config1');
const basePage = require ('../features/support/BasePage.js')
const TestDataUtil = require('../features/support/Utils/TestDataUtil.js');
const AddressBook = require("../pageobjects/Addressbook.js");
const ReadPdf = require('../features/support/Utils/PdfUtil.js');
const path=require('path');
const os = require('os');  // Ensure this is correctly imported


const testDataUtil = new TestDataUtil()
const readPdf = new ReadPdf()


class Manifest {
    
    constructor(page,extractedNumber)
    {
        
        this.page = page;
        this.extractedNumber = extractedNumber


        this.createDraft ="//span/a[text()='Draft']"
        this.labelmanifest = "//div[contains(text(),'Label')]/following-sibling::div"
        this.ManifestAssetoutput = "//div[text()='Asset']/following-sibling::div"
        this.LoadingDepotOutput = "//div[contains(text(),'Loading Depot')]/following-sibling::div"
        this.unLoadingDepotOutput = "//div[contains(text(),'Unloading Depot')]/following-sibling::div"
        this.TotalConsignment = "//div[contains(text(),'Total Consignments')]/following-sibling::div"
        this.schedDateOuput = "//div[contains(text(),'Scheduled date')]/following-sibling::div"
        this.manifestLabel = "//input[contains(@id,'manifest-label')]"
        this.manifestSelectAssetType ="//span[text()='Vehicle']"
        this.inputSearchManifest = "//input[contains(@id,'SearchInput')]"
        this.inputSearchManifest2 = "//input[contains(@id,'combinedSearchInput')]"
        this.manifestAssetSelect = "//span[text()='No Asset']"
        this.manifestAsset = "//li[text()='PM002']"
        this.vehicleManifest = "//li[text()='Vehicle']"
        this.trailerManifest = "//li[text()='Trailer']"
        this.PlantManifest = "//li[text()='Plant']"
        this.selectLoadingDepot = "//select[@id='setLoadingDepot']/following-sibling::span"
        this.selectUnloadingDepot = "//select[@id='setUnloadingDepot']/following-sibling::span"
        this.loadingDepot = "//ul/li[text()='Crispy King']"
        this.unloadingDepot = "//ul/li[text()='Bunbury Depot']"
        this.schedDateManifest = "//input[@placeholder='Select Date..'][@tabindex='0']"
        this.selectedManifestDate ="//div[contains(@class,'open')]//span[contains(@class,'today')]"
        this.manifestSubmit = "//button[text()='Save']"
        this.manifestTab="//div[@id='myJobsInnerNavigationManifestingTableLabel']/.."
        this.txtManifestReference = "//div[text()='Reference']/following-sibling::div"
        this.iconCloseManifestOverview = "//button[@title='Close Manifest Overview']"
        this.maniFestJob = "//td[@class='sorting_1']/following-sibling::td[text()='<<text>>']"
        this.iconTick = "//i[text()='check']"
        this.confirmBtn="//button[text()='Confirm']"
        this.statusManifest = "//div[text()='Status']/following-sibling::div"
        this.addJobToManifest = "//button[@id='addJobToManifest']"
        this.checkBoxJob = "(//div[@id='manifests_overview_addJobToManifest']//label[@class='ibob-batch-checkbox'])[3]"
        this.checkBoxJob2 = "(//div[@id='manifests_overview_addJobToManifest']//label[@class='ibob-batch-checkbox'])[4]"

        this.addSelectedJobToManifest2 = "//button[@id='addSelectedJobToManifest']/i"
        //this.labelmanifest = "//div[@id='manifests_overview']/div[2]/div[1]/div[2]"
        this.countConsignment ="//td[contains(@class,'referenceCell')]/a[@class='fmj-label-small']"
        this.masterJob="//td/i[text()='star_border']"
        
        this.ref1Completed = "//span[text()='My Ref 1']/following-sibling::div"
        this.ref2Completed = "//span[text()='My Ref 2']/following-sibling::div"
        this.ref3Completed = "//span[text()='TIMESLOT']/following-sibling::div"
        this.ref4Completed = "//span[text()='Additional Reference 4']/following-sibling::div"
        this.contractor = "//span[text()='Contractor']/following-sibling::span"
        this.senderAddress = "//span[text()='Pick Up Address']/following-sibling::div[1]"
        this.receiverAddress = "//span[text()='Destination Address']/following-sibling::div[1]"
        this.customer = "//span[text()='Customer']/following-sibling::div[1]"
        this.jobDueDate = "//tr[1]/td[@class='availableDate']/following-sibling::td[3]"
        this.jobServiceType = "//span[text()='Service Type']/following-sibling::div"
        this.jobItemcount = "//td[1][contains(@class,'packageRow')][text()]"
        this.jobItemPO = "//td[2][contains(@class,'packageRow')]"
        this.jobItemLength = "//td[3][contains(@class,'packageRow')]"
        this.jobItemWidth = "//td[4][contains(@class,'packageRow')]"
        this.jobItemHeight = "//td[5][contains(@class,'packageRow')]"
        //this.jobItemWeight = "//td[6][contains(@class,'packageRow')]"
        this.jobItemCubic = "//td[7][contains(@class,'packageRow')]"
        this.jobItemFreezer = "//td[8][contains(@class,'packageRow')]/child::i"
        this.jobItemChiller = "//td[9][contains(@class,'packageRow')]/child::i"
        this.jobItemDG = "//td[10][contains(@class,'packageRow')]/child::img"
        this.totalWeight = "//span[text()='Total Dead Weight']/following-sibling::span"
        this.totalCubicWeight = "//span[text()='Total Cubic Weight']/following-sibling::span"
        
        this.ManifestSenderBusiness = "//tr[<<TEXT>>]/td[contains(@class,'sourceAddressCell')]/child::div[1]"
       
        this.ManifestSenderAddress = "//tr[<<TEXT>>]/td[contains(@class,'sourceAddressCell')]/child::div[2]"
        this.ManifestReceiverBusiness = "//tr[<<TEXT>>]/td[contains(@class,'destinationAddressCell')]/child::div[1]"
        this.ManifestReceiverAddress = "//tr[<<TEXT>>]/td[contains(@class,'destinationAddressCell')]/child::div[2]"
        this.ManifestJobRefNum = "//tr[1]/td[contains(@class,'referenceCell')][2]"
        this.ManifestReferences = "//tr[<<TEXT>>]/td[contains(@class,'referenceCell')]/following-sibling::td[(@class='padding-5px')]"
        this.ManifestOwner = "//tr[<<TEXT>>]/td[contains(@class,'referenceCell')]/following-sibling::td[contains(@class,'ownerCell')]"
        this.ManifestJobDue = "//tr[<<TEXT>>]/td[@class='reference']"
        this.ManifestItemRevenue = "//tr[<<TEXT>>]/td[contains(@class,'revenueCell')]"
        this.ManifestServiceType = "//tr[<<TEXT>>]/td[@class='serviceType']"

        this.ManifestItemName = "//tr[<<TEXT>>]/td[contains(@class,'itemCell')]"
        this.ManifestItemDimention = "//tr[<<TEXT>>]/td[contains(@class,'dimensionsCell')]"
        this.ManifestItemDG = "//tr[<<TEXT>>]/td[contains(@class,'dangerousGoodsCell')]/img"
        this.ManifestPO ="//tr[<<TEXT>>]/td[contains(@class,'referenceCell')][2]"
        this.ManifestItemWeight = "//tr[<<TEXT>>]/td[contains(@class,'weightCell')]"
        this.ManifestItemCubicWeight = "//tr[<<TEXT>>]/td[contains(@class,'cubicWeightCell')]"
        this.ManifestItemCount = "//tr[2]/td[contains(@class,'countCell')]"

        this.manifestKG="//div[text()='Manifest Weight']/following-sibling::div"
        this.manifestCUBKG="//div[text()='Manifest Cubic Weight']/following-sibling::div"
        this.totalitem ="//div[text()='Total Items']/following-sibling::div"

        this.totalManifestItemWeight = "//tr[<<TEXT>>]/td[contains(@class,'weightCell')]"
        this.totalManifestCubicWeight = "//tr[<<TEXT>>]/td[contains(@class,'cubicWeightCell')]"
        
        this.jobRefInManifest = "//tr[3]//td[contains(@class,'referenceCell')][2]/a"

        this.secondjobitemcount = "//tr[4]/td[contains(@class,'countCell')]"
        this.sortClick = "//span[@title='CUSTOMER']"
        this.sortClick2 = "//span[@title='SENDER']"
        this.sortClick3 = "//span[@title='RECEIVER']"
        this.sortCustomer = "//li[text()='CUSTOMER']"
        this.sortSender = "//li[text()='SENDER']"
        this.sortReceiver = "//li[text()='RECEIVER']"
        this.sortNone = "//li[text()='NONE']"
        this.ManifestHeader = "//div[@class='manifest-customer-heading']/h2"
        this.NoneSort = "//tr[1]//input[@id='sortOrder']"

        this.pdfIcon = "//button[@id='tripsheetManifestsRegeneratePDF']/i[text()='picture_as_pdf']"
        this.SendYourDriverManifestPopUp = "//h2[contains(text(),'Send Your Driver Manifest')]"
        this.download = "//button[text()='Download']"

        this.manifestStatusOption = "//select[@id='manifestsStatusSelectFilter']/following-sibling::span/span[1]"
        this.selectCompletedManifest = "//li[text()='Completed']"
        this.selectCancelled = "//li[text()='Cancelled']"
        this.iconReinstate = "//i[text()='undo']"
        this.btnReinstate ="//button[text()='Reinstate']"

        this.selectAsset="//span[contains(@id,'SelectAsset')]/following-sibling::span"
        this.valueAsset = "//li[text()='DOLLY1']"
        this.valueAsset1 = "//li[text()='CON001']"
        this.valueAsset2 = "//li[text()='CON002']"
        this.valueAsset3 = "//li[text()='DOLLY2']"
        this.rowTripSheet = "(//tr/td[text()='Trip'])[1]"
        this.txtRefNum = "//span[text()='Reference']/following-sibling::div"
        this.editServiceIcon="//span[text()='Service Type']/following-sibling::a/i[text()='edit']"
        this.serviceOption="//table[@id='serviceTypeTable']/tbody/tr/td[text()='MS3 Trips']"
        this.iconTick="//i[text()='check']"
        this.iconExpandInTripSheet = "(//i[text()='expand_more'])[1]"
        this.iconPlusInTripSheet="(//i[text()='add_circle_outline'])[2]"
        this.addManifest ="(//button/i[text()='add'])[2]"
        this.rowManifestInTripSheet = "//table[@id='legManifestTable']/tbody/tr/td[text()='<<Text>>']"
        this.btnAssignTrip = "//span[text()='Assign Trip']"
        this.addToContractorIcon = "//i[@class='fa fa-user']"
        this.assignContractorBtn ="//table[@id='bustle_jobAssignmentAvailableTable']/tbody/tr[3]/td/a[text()='Assign']"
        this.ContractorAssigned = "//div[text()='Contractor']/following-sibling::div"
        this.contractorName ="(//td[@class='.ja-table-assignee'])[3]"
        this.unassignContractor ="(//td[@class='.ja-table-assignee']/following-sibling::td/a[text()='Unassign'])[1]"
        this.JobCon = "//span[text()='Contractor']/following-sibling::span"
        this.tabJobs = "(//div//span[text()='Jobs'])[1]"
        this.tabJobs2 = "(//div//span[text()='Jobs'])[2]"
        this.txtJobTitle = "//div[text()='Jobs']"
        this.myjobs ="(//span[text()='My Jobs'])[2]"
        this.ManifestTableEmpty="//td[text()='No data available in table']"
        this.inputSearch = "(//input[contains(@id,'SearchInput')])[1]"
        this.reject ="//a[@id='myJobsBookedRejectJobButton']"
        this.inputReason ="//input[@placeholder='Enter reject reason']"
        this.rejectBtn ="//button[text()='Yes, reject it!']"
        this.downloadPDFs = "//h2[text()='Download PDF(s)']"


    }

    async reinstateManifest(){
        let isVerify = false

        await basePage.click(this.iconReinstate)
        await basePage.click(this.btnReinstate)
        let status = await basePage.getText(this.statusManifest)

        if(status === "Ready"){
            console.log("Manifest is reinstated....")
            isVerify = true
        }
        else{
            console.log("\x1b[31m Unable to Verify Manifest status.....\x1b[0m" )

        }

        await basePage.click(this.iconCloseManifestOverview)

        return isVerify

    }


    async createManifestDraftForContractor(movement){
        await basePage.waitForLocator(this.createDraft)
        await basePage.click(this.createDraft)
       
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
        await basePage.waitForLocator(this.manifestLabel)
        await basePage.sendKeys(this.manifestLabel, createConsignmentPage.extractedNumber)
    
        await basePage.click(this.manifestSubmit)
        console.log("Draft is created for contractor !...")
    
    
    }



      async createManifestDraft(movement){
        await basePage.waitForLocator(this.createDraft)
        await basePage.click(this.createDraft)
       
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
        await basePage.waitForLocator(this.manifestLabel)
        await basePage.sendKeys(this.manifestLabel, createConsignmentPage.extractedNumber)
     
        await basePage.click(this.manifestSelectAssetType)
        await basePage.waitForLocator(this.vehicleManifest)
        let vehicleManifest = await basePage.getText(this.vehicleManifest)
        testDataUtil.addKeyValueToObject(movement, "vehicleManifest", vehicleManifest)
        await basePage.click(this.vehicleManifest)
        console.log("Manifest Asset Type: "+ vehicleManifest)
    
        await basePage.click(this.manifestAssetSelect)
        await basePage.waitForLocator(this.manifestAsset)
        let manifestAsset = await basePage.getText(this.manifestAsset)
        testDataUtil.addKeyValueToObject(movement, "manifestAsset", manifestAsset)
        await basePage.click(this.manifestAsset)
        console.log("Asset: "+ manifestAsset)
    
        await basePage.click(this.selectLoadingDepot)
        await basePage.waitForLocator(this.loadingDepot)
        let loadingDepot = await basePage.getText(this.loadingDepot)
        await basePage.click(this.loadingDepot)
        console.log("Loading Depot: "+ loadingDepot)
    
        await basePage.click(this.selectUnloadingDepot )
        await basePage.waitForLocator(this.unloadingDepot)
        let unloadingDepot = await basePage.getText(this.unloadingDepot)
        await basePage.click(this.unloadingDepot)
        console.log("Unloading Depot: "+ unloadingDepot)
    
    
        await basePage.click(this.schedDateManifest)
        await basePage.waitForLocator(this.selectedManifestDate )
        let selectedManifestDate = await basePage.getAttribute(this.selectedManifestDate,"aria-label")
        testDataUtil.addKeyValueToObject(movement, "selectedManifestDate", selectedManifestDate)
        await basePage.click(this.selectedManifestDate )
        console.log("Scheduled date: "+ selectedManifestDate)
    
    
        await basePage.click(this.manifestSubmit)
    
        console.log("Draft is created !...")
    
    
    }
    
    //jeriza code
    async addJobToManifestDraft(movement){
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    
        await basePage.click(this.manifestTab)
        console.log("Tab manifest clicked successfully....")
    
      //  await basePage.wait(15000)
        let manifestID = await basePage.getText(this.txtManifestReference)
        testDataUtil.addKeyValueToObject(movement, "ManifestId", manifestID)
        console.log("Manifest Id: "+ manifestID)
        await basePage.click(this.iconCloseManifestOverview)
    
    //    await basePage.wait(15000)
        await basePage.waitForLocator(this.inputSearchManifest)
        await basePage.sendKeys(this.inputSearchManifest, manifestID)
        await basePage.clickKeyboardBackSpace()
        await basePage.keyboardEnter()
        console.log("Manifest searched successfully...")
    
        const manifest = this.maniFestJob.replace("<<text>>",manifestID)
        await basePage.click(manifest)
        await basePage.wait(5000)
        await basePage.click(this.iconTick)
        await basePage.click(this.confirmBtn)
        console.log("Manifest status changed to Ready...")
    
        await basePage.waitForLocator(manifest)
        await basePage.click(manifest)
        let status = await basePage.getText(this.statusManifest)
        testDataUtil.addKeyValueToObject(movement, "status", status)
        console.log("status: "+ status)

        // /await basePage.wait(15000)
        await basePage.waitForLocator(this.addJobToManifest)
        await basePage.click(this.addJobToManifest)
        await basePage.waitForLocator(this.inputSearchManifest2)
        await basePage.sendKeys(this.inputSearchManifest2, createConsignmentPage.extractedNumber)
        await basePage.clickKeyboardBackSpace()
        await basePage.keyboardEnter()
        await basePage.wait(15000)

        await basePage.click(this.checkBoxJob)
        await basePage.click(this.addSelectedJobToManifest2)
        console.log("LH job is added to the manifest...")
        await basePage.click(this.iconCloseManifestOverview)
        await basePage.click(manifest)
        
    }



     async addJobToManifestDraft2(movement){
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    
        await basePage.click(this.manifestTab)
        console.log("Tab manifest clicked successfully....")
    
        await basePage.wait(15000)
        let manifestID = await basePage.getText(this.txtManifestReference)
        testDataUtil.addKeyValueToObject(movement, "ManifestId", manifestID)
        console.log("Manifest Id: "+ manifestID)
        await basePage.click(this.iconCloseManifestOverview)
    
     //   await basePage.wait(15000)
        await basePage.waitForLocator(this.inputSearchManifest)
        await basePage.sendKeys(this.inputSearchManifest, manifestID)
        await basePage.clickKeyboardBackSpace()
        await basePage.keyboardEnter()
        console.log("Manifest searched successfully...")
    
//        await basePage.wait(30000)
        const manifest = this.maniFestJob.replace("<<text>>",manifestID)
        await basePage.click(manifest)
        await basePage.wait(5000)
        await basePage.click(this.iconTick)
        await basePage.click(this.confirmBtn)
        console.log("Manifest status changed to Ready...")
    
//        await basePage.wait(15000)
        await basePage.waitForLocator(manifest)
        await basePage.click(manifest)
        let status = await basePage.getText(this.statusManifest)
        testDataUtil.addKeyValueToObject(movement, "status", status)
        console.log("status: "+ status)

       // await basePage.wait(15000)
        await basePage.waitForLocator(this.addJobToManifest)
        await basePage.click(this.addJobToManifest)
        await basePage.waitForLocator(this.inputSearchManifest2)
        await basePage.sendKeys(this.inputSearchManifest2, createConsignmentPage.extractedNumber)
        await basePage.clickKeyboardBackSpace()
        await basePage.keyboardEnter()
        await basePage.wait(15000)

        await basePage.click(this.checkBoxJob2)
        await basePage.click(this.addSelectedJobToManifest2)
        console.log("LH job is added to the manifest...")
        await basePage.click(this.iconCloseManifestOverview)
        await basePage.click(manifest)
        
    }
    
    //jeriza code
    
    async VerifyManifestDraft(AssetType, Asset,selectedManifestDate,loadingDepot,unloadingDepot){
        let isVerify = false
        
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
        await basePage.scrollToElement(this.labelmanifest)
        let refId = await basePage.getText(this.labelmanifest)
        let jobrefnum = await basePage.getText(this.ManifestJobRefNum)
            const id = jobrefnum.split('#')[0]
        let AssetOut = await basePage.getText(this.ManifestAssetoutput)
        let assetCombine = AssetType + " - " + Asset
        console.log("comparing "+ assetCombine + " and " + AssetOut)
        let compareDate = await basePage.getText(this.schedDateOuput)
        let date = new Date(selectedManifestDate)
            const day = String(date.getDate()).padStart(2, '0');  // Ensure two digits
            const month = String(date.getMonth() + 1).padStart(2, '0');  // Month is 0-based, so add 1
            const year = String(date.getFullYear());  // Get last 2 digits of the year
            const formattedDate = `${day}/${month}/${year}`;
        let loadingdepot = await basePage.getText(this.LoadingDepotOutput)
        let unloadingdepot = await basePage.getText(this.unLoadingDepotOutput)
        let countConsignment = await basePage.countElement(this.countConsignment)
        let finalCount = countConsignment.toString()
        let ManifestItemCount = await basePage.getText(this.ManifestItemCount)
        let manifestKG =  await basePage.getText(this.manifestKG) // total weight of manifest
            manifestKG = parseFloat(manifestKG).toFixed(2)
        let manifestCUBKG =  await basePage.getText(this.manifestCUBKG)
            manifestCUBKG = parseFloat(manifestCUBKG).toFixed(2)
        let totalitem =  await basePage.getText(this.totalitem)
        let TotalConsignment = await basePage.getText(this.TotalConsignment)

        if(refId === id){
            console.log(refId + " Manifest Label verified successfully....")
            isVerify = true
        }
        else{
            console.log("\x1b[31m Manifest Label verification failed....\x1b[0m")
        }
        if(AssetOut == assetCombine){
            console.log(assetCombine + " Manifest Asset verified successfully....")
            isVerify = true
        }
        else{
            console.log("\x1b[31mManifest Asset verification failed....\x1b[0m")
        }
        if(compareDate === formattedDate){
            console.log(formattedDate + " Manifest Scheduled date verified successfully....")
            isVerify = true
        }
        else{
            console.log("\x1b[31m Manifest Scheduled date verification failed....\x1b[0m")
        }
        if (loadingdepot===loadingDepot){
    
            console.log("Loading Depot is verified successfully....")
            isVerify = true
    
        }else{
            console.log("\x1b[31m Loading Depot verification failed....\x1b[0m")
        }
    
        if (unloadingdepot===unloadingDepot){
    
            console.log("Unloading Depot is verified successfully....")
            isVerify = true
    
        }else{
            console.log("\x1b[31m Unloading Depot verification failed....\x1b[0m")
        }
   
        if (finalCount===TotalConsignment){
    
            console.log(countConsignment + " Total Consignment is verified successfully....")
            isVerify = true
    
    
        }else{ 
            console.log("\x1b[31m Total Consignment verification failed....\x1b[0m")
        }
        
        await basePage.wait(5000)
        //handles comparison between total consignment weight and cubic weight in a manifest with 2 jobs
        async function changeXpath(){
            let secondjobitemcount
            let totalItemCount
            let totalManifestItemWeight = this.totalManifestItemWeight
            let totalManifestCubicWeight = this.totalManifestCubicWeight
            
            if (TotalConsignment == 1){
                totalManifestItemWeight = totalManifestItemWeight.replace("<<TEXT>>",3)
                totalManifestItemWeight = await basePage.getText(totalManifestItemWeight)// from manifest added jobs
                totalManifestItemWeight = parseFloat(totalManifestItemWeight).toFixed(2)
                console.log("Total Manifest Weight: " + totalManifestItemWeight);

                totalManifestCubicWeight = totalManifestCubicWeight.replace("<<TEXT>>",3)
                totalManifestCubicWeight = await basePage.getText(totalManifestCubicWeight)// from manifest added jobs
                totalManifestCubicWeight = parseFloat(totalManifestCubicWeight).toFixed(2)
                console.log("Total Manifest Cubic Weight: " +totalManifestCubicWeight);

                totalItemCount = ManifestItemCount
                console.log("Total Item Count: " + totalItemCount);}
        
                else if (TotalConsignment == 2){
                    totalManifestItemWeight = totalManifestItemWeight.replace("<<TEXT>>",5)
                    totalManifestItemWeight = await basePage.getText(totalManifestItemWeight)// from manifest added jobs
                    totalManifestItemWeight = parseFloat(totalManifestItemWeight).toFixed(2)
                    console.log("Total Manifest Weight: " + totalManifestItemWeight)


                    totalManifestCubicWeight = totalManifestCubicWeight.replace("<<TEXT>>",5)
                    totalManifestCubicWeight = await basePage.getText(totalManifestCubicWeight)// from manifest added jobs
                    totalManifestCubicWeight = parseFloat(totalManifestCubicWeight).toFixed(2)
                    console.log("Total Manifest Cubic Weight: " + totalManifestCubicWeight)

                    
                    secondjobitemcount = await basePage.getText(this.secondjobitemcount)
                    totalItemCount = parseInt(ManifestItemCount) + parseInt(secondjobitemcount)
                    console.log("Total Item Count: " + totalItemCount)

            }

            return {totalManifestItemWeight,totalManifestCubicWeight,totalItemCount,secondjobitemcount}


        }

        let changeXpathBound = changeXpath.bind(this);
        let result = await changeXpathBound()
        //console.log(result)
  
        if (manifestCUBKG == result.totalManifestCubicWeight){
    
            console.log(result.totalManifestCubicWeight + " Total cubic weight is verified successfully....")
            isVerify = true
    
    
        }else{ 
            console.log(manifestCUBKG + " not equal to " + result.totalManifestCubicWeight+ "\x1b[31m Total cubic weight verification failed....\x1b[0m")
        }

        if (manifestKG == result.totalManifestItemWeight){
    
            console.log(result.totalManifestItemWeight + " Total weight is verified successfully....")
            isVerify = true
    
        }else{ 
            console.log(manifestKG+" not equal to "+result.totalManifestItemWeight + "\x1b[31m Total weight verification failed....\x1b[0m")
        }
        
        
        if (totalitem == result.totalItemCount){
    
            console.log(totalitem + " Total Item is verified successfully....")
            isVerify = true
    
    
        }else{ 
            console.log(totalitem+" not equal to "+result.totalItemCount + "\x1b[31m Total Item Count verification failed....\x1b[0m")
        }


    
        return isVerify
         
    }
    
    async getDataFromJobOverview (movement){
    
        await basePage.click(this.masterJob) 
        await basePage.waitForLocator(this.masterJob)
        await basePage.wait(5000)
    
        let ref1 = await basePage.getText(this.ref1Completed)
        let ref2 = await basePage.getText(this.ref2Completed)
        let ref3 = await basePage.getText(this.ref3Completed)
        let ref4 = await basePage.getText(this.ref4Completed)
        let owner = await basePage.getText(this.contractor)
        let sender = await basePage.getText(this.senderAddress)
        let receiver = await basePage.getText(this.receiverAddress)
        let customer = await basePage.getText(this.customer)
        testDataUtil.addKeyValueToObject(movement, "JobCustomer", customer)
        

        const senderbusiness = await basePage.extractBusiness(sender)
        const sendersuburb = await basePage.extractsuburb(sender)
        const senderstate = await basePage.extractstate(sender)

        const receiverbusiness = await basePage.extractBusiness(receiver)
        const receiversuburb = await basePage.extractsuburb(receiver)
        const receiverstate = await basePage.extractstate(receiver)    

        let jobDueDate = await basePage.getText(this.jobDueDate)
        let jobItemcount = await basePage.getText(this.jobItemcount)
        let jobItemPO = await basePage.getText(this.jobItemPO)
        let jobItemLength = await basePage.getText(this.jobItemLength)
        let jobItemWidth = await basePage.getText(this.jobItemWidth)
        let jobItemHeight = await basePage.getText(this.jobItemHeight)
        let totalWeight = await basePage.getText(this.totalWeight)
        let totalCubicWeight = await basePage.getText(this.totalCubicWeight)

        const NormalizedJobDue = jobDueDate.replace(',', '')//remove comma for normalization
        const NormalizedjobItemcount = jobItemcount.match(/\d+/g)
        const normalizedjobItemName = jobItemcount.match(/\b\w+\b$/)
        let numtotalWeight = parseFloat(totalWeight);
        let numtotalCubicWeight = parseFloat(totalCubicWeight);

        const normalizedtotalweight = numtotalWeight.toFixed(2)
        const normalizedttotalCubicWeight = numtotalCubicWeight.toFixed(2)
        console.log(normalizedtotalweight + " " + normalizedttotalCubicWeight)

        const references = [
            ref1,
            ref2,
            ref3,
            ref4,
            owner,
            senderbusiness,
            sendersuburb,
            senderstate,
            receiverbusiness,
            receiversuburb,
            receiverstate,
            NormalizedJobDue,
            NormalizedjobItemcount,
            normalizedjobItemName,
            jobItemPO,
            jobItemLength,
            jobItemWidth,
            jobItemHeight,
            normalizedtotalweight,
            normalizedttotalCubicWeight
        ]
//below code is pushing result in the array
        const VerjobServiceType = await basePage.verifyElement(this.jobServiceType)
            if (VerjobServiceType === true){
                const jobServiceType =  await basePage.getText(this.jobServiceType)
                console.log ("service type: " + jobServiceType)
                references.push(jobServiceType)
            }
            else{

                console.log("skipping service type")
            }

        const VerjobItemFreezer = await basePage.verifyElement(this.jobItemFreezer)
            if (VerjobItemFreezer === true){
                const jobItemFreezer =  await basePage.getText(this.jobItemFreezer)
                console.log ("Freezer: " + jobItemFreezer)
                references.push(jobItemFreezer)
            }
            else{

                console.log("skipping Freezer")
            }

        const VerjobItemChiller = await basePage.verifyElement(this.jobItemChiller)
            if (VerjobItemChiller === true){
                const jobItemChiller =  await basePage.getText(this.jobItemChiller)
                console.log ("Chiller: " + jobItemChiller)
                references.push(jobItemChiller)
            }
            else{

                console.log("skipping Chiller")
            }

        const VerjobItemDG = await basePage.verifyElement(this.jobItemDG)
            if (VerjobItemDG === true){
                const jobItemDG =  testDataUtil.getValueByNestedKey(movement, "DGLogo")
                console.log ("DG: " + jobItemDG)
                references.push(jobItemDG)
            }
            else{

                console.log("skipping DG")
            }


        testDataUtil.addKeyValueToObject(movement, "JobOverviewData", references)
        console.log("References has been added in JSON file....")
  
    }
    
    //jeriza code
    async ManifestJobVerify(references){

        const countConsignment = await basePage.countElement(this.countConsignment)
        if (countConsignment === 1){

            let ManifestSenderBusiness = this.ManifestSenderBusiness.replace("<<TEXT>>",1)
                ManifestSenderBusiness = await basePage.getText(ManifestSenderBusiness);
            let Manifestsenderaddress =  this.ManifestSenderAddress.replace("<<TEXT>>",1);
                Manifestsenderaddress = await basePage.getText(Manifestsenderaddress);
            let ManifestReceiverBusiness = this.ManifestReceiverBusiness.replace("<<TEXT>>",1);
                ManifestReceiverBusiness = await basePage.getText(ManifestReceiverBusiness);
            let ManifestReceiverAddress = this.ManifestReceiverAddress.replace("<<TEXT>>",1);
                ManifestReceiverAddress = await basePage.getText(ManifestReceiverAddress);
            let ManifestReferences = this.ManifestReferences.replace("<<TEXT>>",1);
                ManifestReferences = await basePage.getText(ManifestReferences);
            let ManifestJobDue = this.ManifestJobDue.replace("<<TEXT>>",1);
                ManifestJobDue = await basePage.getText(ManifestJobDue);
            let ManifestOwner = this.ManifestOwner.replace("<<TEXT>>",1);
                ManifestOwner = await basePage.getText(ManifestOwner);
            let ManifestServiceType = this.ManifestServiceType.replace("<<TEXT>>",1);
                ManifestServiceType = await basePage.getText(ManifestServiceType);
        
            let ManifestItemCount= this.ManifestItemCount.replace("<<TEXT>>",2);
                ManifestItemCount = await basePage.getText(ManifestItemCount);
            let ManifestItemName= this.ManifestItemName.replace("<<TEXT>>",2);
                ManifestItemName = await basePage.getText(ManifestItemName);          
            let ManifestItemDimention= this.ManifestItemDimention.replace("<<TEXT>>",2);
                ManifestItemDimention = await basePage.getText(ManifestItemDimention);               
            let ManifestItemWeight= this.ManifestItemWeight.replace("<<TEXT>>",2);
                ManifestItemWeight = await basePage.getText(ManifestItemWeight);               
            let ManifestItemCubicWeight= this.ManifestItemCubicWeight.replace("<<TEXT>>",2);
                ManifestItemCubicWeight = await basePage.getText(ManifestItemCubicWeight);               
        //  let ManifestItemDG= this.ManifestItemDG.replace("<<TEXT>>",2);
        //       ManifestItemDG = await basePage.getAttribute(ManifestItemDG,"src");   
            let ManifestPO= this.ManifestPO.replace("<<TEXT>>",2);
                ManifestPO = await basePage.getText(ManifestPO);                  
     
        const NormalizedJobDue = ManifestJobDue.replace(',', '')//remove comma for normalization
        const matches = ManifestItemDimention.match(/\d+\s?cm/g)
        const NormalizeManifestItemDimention = matches ? matches.map(match => match.replace('cm', ' cm')) : [];

        const arrayOfManifestInformation = [
            ManifestSenderBusiness,
            Manifestsenderaddress,
            ManifestReceiverBusiness,
            ManifestReceiverAddress,
            ManifestReferences,
            ManifestOwner,
            NormalizedJobDue,
            ManifestServiceType,
            ManifestItemCount,
            ManifestItemName,
            NormalizeManifestItemDimention,
            ManifestPO
        ]
        const TotalweightandCubic = [
            ManifestItemWeight,
            ManifestItemCubicWeight
        ]

        const normalizedarrayOfManifestInformation = await basePage.normalizeString(arrayOfManifestInformation);
        
        const result = await basePage.isMatchFound(normalizedarrayOfManifestInformation, references);
     //   console.log(result);
            if (result != false){
                console.log("Data from Job overview matched with Manifest data")
            }
            else
            { 
                console.log("\x1b[31m One or more data from Job Overview and Manifest did not match....\x1b[0m")
            }

        const result2 = await basePage.isMatchFound2(TotalweightandCubic,references);
     //   console.log(result2);

            if (result2 != false){
                console.log("Total Weight and cubic weight in job overview matched with Manifest data")
            }
            else
            { 
                console.log("\x1b[31m One or more data from Job Overview and Manifest did not match....\x1b[0m")
            }
        
        return (result,result2)

    }
        else if (countConsignment === 2){
           let ManifestSenderBusiness = this.ManifestSenderBusiness.replace("<<TEXT>>",3)
                ManifestSenderBusiness = await basePage.getText(ManifestSenderBusiness);
            let Manifestsenderaddress =  this.ManifestSenderAddress.replace("<<TEXT>>",3);
                Manifestsenderaddress = await basePage.getText(Manifestsenderaddress);
            let ManifestReceiverBusiness = this.ManifestReceiverBusiness.replace("<<TEXT>>",3);
                ManifestReceiverBusiness = await basePage.getText(ManifestReceiverBusiness);
            let ManifestReceiverAddress = this.ManifestReceiverAddress.replace("<<TEXT>>",3);
                ManifestReceiverAddress = await basePage.getText(ManifestReceiverAddress);
            let ManifestReferences = this.ManifestReferences.replace("<<TEXT>>",3);
                ManifestReferences = await basePage.getText(ManifestReferences);
            let ManifestJobDue = this.ManifestJobDue.replace("<<TEXT>>",3);
                ManifestJobDue = await basePage.getText(ManifestJobDue);
            let ManifestOwner = this.ManifestOwner.replace("<<TEXT>>",3);
                ManifestOwner = await basePage.getText(ManifestOwner);
            let ManifestServiceType = this.ManifestServiceType.replace("<<TEXT>>",3);
                ManifestServiceType = await basePage.getText(ManifestServiceType);

            let ManifestItemCount= this.ManifestItemCount.replace("<<TEXT>>",4);
                ManifestItemCount = await basePage.getText(ManifestItemCount);
            let ManifestItemName= this.ManifestItemName.replace("<<TEXT>>",4);
                ManifestItemName = await basePage.getText(ManifestItemName);          
            let ManifestItemDimention= this.ManifestItemDimention.replace("<<TEXT>>",4);
                ManifestItemDimention = await basePage.getText(ManifestItemDimention);               
            let ManifestItemWeight= this.ManifestItemWeight.replace("<<TEXT>>",4);
                ManifestItemWeight = await basePage.getText(ManifestItemWeight);               
            let ManifestItemCubicWeight= this.ManifestItemCubicWeight.replace("<<TEXT>>",4);
                ManifestItemCubicWeight = await basePage.getText(ManifestItemCubicWeight);               
            let ManifestItemDG= this.ManifestItemDG.replace("<<TEXT>>",4);
                ManifestItemDG = await basePage.getAttribute(ManifestItemDG,"src")
            let ManifestPO= this.ManifestPO.replace("<<TEXT>>",4);
                ManifestPO = await basePage.getText(ManifestPO);                  
     
        const NormalizedJobDue = ManifestJobDue.replace(',', '')//remove comma for normalization
        const matches = ManifestItemDimention.match(/\d+\s?cm/g)
        const NormalizeManifestItemDimention = matches ? matches.map(match => match.replace('cm', ' cm')) : [];
        
        const arrayOfManifestInformation = [
            ManifestSenderBusiness,
            Manifestsenderaddress,
            ManifestReceiverBusiness,
            ManifestReceiverAddress,
            ManifestReferences,
            ManifestOwner,
            NormalizedJobDue,
            ManifestServiceType,
            ManifestItemCount,
            ManifestItemName,
            NormalizeManifestItemDimention,
            ManifestItemDG,
            ManifestPO
        ]
        const TotalweightandCubic = [
            ManifestItemWeight,
            ManifestItemCubicWeight
        ]

        const normalizedarrayOfManifestInformation = await basePage.normalizeString(arrayOfManifestInformation);
        
        const result = await basePage.isMatchFound(normalizedarrayOfManifestInformation, references);
        console.log(result);
            if (result != false){
                console.log("Data from Job overview matched with Manifest data")
            }
            else
            { 
                console.log("\x1b[31m One or more data from Job Overview and Manifest did not match....\x1b[0m")
            }

        const result2 = await basePage.isMatchFound2(TotalweightandCubic,references);
        console.log(result2);

            if (result2 != false){
                console.log("Total Weight and cubic weight in job overview matched with Manifest data")
            }
            else
            { 
                console.log("\x1b[31m One or more data from Job Overview and Manifest did not match....\x1b[0m")
            }
        
        return (result,result2)
        }

        else
        { 
            console.log("\x1b[31m Data verification failed....\x1b[0m")
        }
     
    }

//jeriza code
    async addJobToExistingManifest(movement,manifestID){
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
        
        //await basePage.click(this.maniFestJob)
        let status = await basePage.getText(this.statusManifest)
        testDataUtil.addKeyValueToObject(movement, "status", status)
        console.log("status: "+ status)
        await basePage.wait(5000)
        await basePage.click(this.addJobToManifest)
        await basePage.waitForLocator(this.inputSearchManifest2)
        await basePage.sendKeys(this.inputSearchManifest2, createConsignmentPage.extractedNumber)
        await basePage.keyboardEnter()
        await basePage.wait(5000)
        await basePage.click(this.checkBoxJob)
        await basePage.click(this.addSelectedJobToManifest2)
        console.log("LH job is added to the manifest...")
        await basePage.click(this.iconCloseManifestOverview)
        const manifest = this.maniFestJob.replace("<<text>>",manifestID)
        await basePage.click(manifest)        
    }


    async verifyManifestJob(){
        let isVerify = false
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    
        await basePage.scrollToElement(this.jobRefInManifest)
        let refId = await basePage.getText(this.jobRefInManifest)
        let id = refId.split('#')[0]
        if(id === createConsignmentPage.extractedNumber){
            console.log("Manifest id verified successfully....")
            isVerify = true
        }
        else{
            console.log("\x1b[31m Manifest id verification failed....\x1b[0m")
        }
        return isVerify
    }

    async verifyManifestJobIfRemoved(){
        let isVerify = false
    

        let result = await basePage.verifyElement(this.jobRefInManifest)
        if (result === false){
            
            console.log("Job has been removed...")
            isVerify = true
        }
        else{
            console.log("\x1b[31mUnable to Verify Job removal....\x1b[0m")
        }

        return isVerify
    }

    async verifyManifestStatusCompleted(){
        let isVerify = false
    
        let status = await basePage.getText(this.statusManifest)

        if(status === "Completed"){
            console.log("Manifest status is Completed....")
            isVerify = true
        }
        else{
            console.log("\x1b[31mUnable to Verify Manifest status....\x1b[0m")
        }

        return isVerify
    }


    async SearchManifest(ManifestId){
        await basePage.click(this.manifestTab)
        console.log("Tab manifest clicked successfully....")
    
        await basePage.wait(15000)

        await basePage.click(this.manifestStatusOption) 
        await basePage.click(this.selectCompletedManifest)
        await basePage.click(this.manifestStatusOption) 
        await basePage.click(this.selectCancelled)

        let result = await basePage.verifyElement(this.iconCloseManifestOverview)
        
        if (result === true){        
            await basePage.click(this.iconCloseManifestOverview)

            await basePage.waitForLocator(this.inputSearchManifest)
            await basePage.sendKeys(this.inputSearchManifest, ManifestId)
            await basePage.keyboardEnter()
            console.log("Manifest searched successfully...")   
            const manifest = this.maniFestJob.replace("<<text>>",ManifestId)
            await basePage.click(manifest)
        }
        else if (result === false){        
            await basePage.waitForLocator(this.inputSearchManifest)
            await basePage.sendKeys(this.inputSearchManifest, ManifestId)
            await basePage.keyboardEnter()
            console.log("Manifest searched successfully...")   
            const manifest = this.maniFestJob.replace("<<text>>",ManifestId)
            await basePage.click(manifest)
        }
        else{
            console.log("\x1b[31mUnable to search Manifest...\x1b[0m")
        }


    }

    async ManifestSortCustomer (){
        await basePage.click(this.sortClick)
        await basePage.waitForLocator(this.sortCustomer)
        await basePage.click(this.sortCustomer)
        console.log("Customer is Clicked....")

    }

    async downloadManifestPDF(movement,ManifestId,JobOverviewData){

        await basePage.click(this.pdfIcon)
        await basePage.waitForLocator(this.downloadPDFs)
        const basePathPdf=path.resolve(__dirname,'../../features/support');
        const downloadPdfPath=path.join(basePathPdf, 'ManifestPDFDownload')
        const customPdfFilePath = path.join(downloadPdfPath, `${movement}_${ManifestId}.pdf`);
        const datatocompare = JobOverviewData
        await basePage.downloadFile(this.download,customPdfFilePath)
        console.log('Opening file:', customPdfFilePath); 
        const page = await browser.newPage()
        await page.goto(customPdfFilePath);
        await page.waitForTimeout(5000);  // Wait for 5 seconds (adjust as needed)
        await page.close()

        const dataCleansed = await basePage.dataCleansing(datatocompare) //data from job overview
     //   console.log ("data on Manifest UI" + dataCleansed)

        try {
            const readPdf=new ReadPdf()
            console.log("Reading PDf File............")
     
            const pdfWords = await readPdf.extractPDFText(customPdfFilePath);
            const pdfDataExtracted =await readPdf.extractRelevantDataFromPDFManifest(pdfWords);       // extract data from PDF
        //    console.log("data on extracted PDF" + pdfDataExtracted)
            
            const result = await basePage.isMatchFound3(dataCleansed,pdfDataExtracted) //comparison

            console.log(result);
                if (result != false){
                    console.log("Data from Job overview matched with Manifest data")
                }
                else
                { 
                    console.log("\x1b[31m One or more data from Job Overview and Manifest did not match....\x1b[0m")
                }
    
        return result

        } catch (error) {
            console.error('Error reading files:', error);
        }

    }

 

    async VerifySortCustomer (JobCustomer){
        let isVerify = false
        const ManifestCustomer = await basePage.getText(this.ManifestHeader)
         if (ManifestCustomer === JobCustomer){
            console.log("Sort Verified Successfully...")
            isVerify = true
         }
    //    await basePage.wait(5000) 
    //    await basePage.click(this.iconCloseManifestOverview)

        return isVerify
        
        }



    async ManifestSortSender (){
     // await basePage.click(this.maniFestJob)
        await basePage.click(this.sortClick)
        await basePage.waitForLocator(this.sortSender)
        await basePage.click(this.sortSender)
        console.log("Sender is Clicked....")
        
        }

    async VerifySort (movement){
        let isVerify = false
         await basePage.wait(15000) 
        const ManifestSender = await basePage.getText(this.ManifestHeader)
        const data = testDataUtil.getValueByNestedKey(movement,"JobOverviewData")
        const JobData = data.find(JobOverviewData => JobOverviewData == ManifestSender)
        //const JobSender = data.includes(ManifestSender) 
        console.log ("Comparing "+ ManifestSender + " to "+ JobData)

         if (ManifestSender === JobData){
            console.log("Sort Verified Successfully...")
            isVerify = true
         }
        return isVerify
        }

    async ManifestSortReceiver (){
    //    await basePage.click(this.maniFestJob)
        await basePage.click(this.sortClick2)
        await basePage.waitForLocator(this.sortReceiver)
        await basePage.click(this.sortReceiver)
        
        }


    async ManifestSortNone (){
     //   await basePage.click(this.maniFestJob)
        await basePage.click(this.sortClick3)
        await basePage.waitForLocator(this.sortNone)
        await basePage.click(this.sortNone)
        
        }

    async VerifySortNone (){
        let isVerify = false
        const nonesort = await basePage.verifyElement(this.NoneSort)

        if (nonesort === true)
            console.log("Sort Verified Successfully...")
            isVerify = true
            return isVerify
        }

    async reinstatejob(){
        await basePage.click(this.iconReinstate)
        await basePage.click(this.btnReinstate)

    }


async addManifestToTripSheet(movement,ManifestId){
    await basePage.wait(2000)
    await basePage.waitForLocator(this.rowTripSheet)
    await basePage.click(this.rowTripSheet)
    let tripSheetRefId = await basePage.getText(this.txtRefNum)
    testDataUtil.addKeyValueToObject(movement, "TripSheetRefId", tripSheetRefId)
    console.log("Trip Sheet RefId: "+tripSheetRefId)
    await basePage.wait(2000)
    await basePage.scrollToElement(this.editServiceIcon)
    await basePage.click(this.editServiceIcon) 
    await basePage.click(this.serviceOption) 
    await basePage.click(this.iconTick)
    console.log("Service Type Assigned successfully....")
    await basePage.wait(5000)

   // await basePage.scrollToElement(this.iconExpandInTripSheet)
    await basePage.click(this.iconExpandInTripSheet)
    await basePage.wait(2000)
    await basePage.scrollToElement(this.addManifest)
    await basePage.click(this.addManifest)
    await basePage.wait(2000)
    let newRow =  this.rowManifestInTripSheet.replace("<<Text>>",ManifestId)
    await basePage.click(newRow)
    console.log(ManifestId + " Manifest Added successfully....")

    await basePage.scrollToElement(this.iconExpandInTripSheet)
    await basePage.click(this.iconExpandInTripSheet)
    await basePage.scrollToElement(this.iconPlusInTripSheet)
    await basePage.wait(2000)
    await basePage.click(this.iconPlusInTripSheet)
    await basePage.waitForLocator(this.selectAsset)
    await basePage.click(this.selectAsset)
    await basePage.waitForLocator(this.valueAsset)
    await basePage.click(this.valueAsset)
    console.log("Asset selected....")
    await basePage.wait(2000)
    await basePage.scrollToElement(this.btnAssignTrip)
    await basePage.click(this.btnAssignTrip)
    console.log("Trip assigned successfully....")
}




async verifyManifestisAddedtoContractor(contractor){
let isVerify = false
let ManifestCont = await basePage.getText(this.ContractorAssigned)

if (contractor === ManifestCont){
    console.log (contractor + "is visible in Manifest ...")
    isVerify = true
}

else {
    console.log ("Contractor is not assigned...")
}
await page.reload();  
await basePage.wait(3000)
return isVerify

}

async verifyContractorAssignment(contractor){
    let isVerify = false

    let JobCon = await basePage.getText(this.JobCon)
    
    
    if (contractor === JobCon){
        console.log ("Job is Assigned to " + contractor)
        isVerify = true
    }
    
    else {
        console.log ("Contractor is not assigned...")
    }
    
    return isVerify
    
    }


    async verifyJobsSection() {
        let isVerify = false

        if (await basePage.verifyElement(this.tabJobs)){
                await basePage.click(this.tabJobs)
                const txtJobs = await basePage.verifyElement(this.txtJobTitle)
                console.log("txtJobs state :"+txtJobs)
                if(txtJobs){
                console.log("Jobs section verified successfully...")
                isVerify = true}

        await basePage.click(this.myjobs)

        } else {
              await basePage.click(this.tabJobs2)
                const txtJobs = await basePage.verifyElement(this.txtJobTitle)
                console.log("txtJobs state :"+txtJobs)
                if(txtJobs){
                console.log("Jobs section verified successfully...")
                isVerify = true}
                
             await basePage.click(this.myjobs)
        
        }

        return isVerify
        
    }


    async addManifestToContractor(movement){
        await basePage.click(this.addToContractorIcon)
    
        let contractor = await basePage.getText(this.contractorName)
        testDataUtil.addKeyValueToObject(movement, "ContractorAssigned", contractor)
    
        await basePage.click(this.assignContractorBtn)
        
    }

    async unassignManifestToContractor(){
        let isVerify = false
        await basePage.click(this.addToContractorIcon)
        await basePage.waitForLocator(this.unassignContractor)
        await basePage.click(this.unassignContractor)
        console.log("Unassign Button is Clicked...")
        await basePage.wait(5000)
        await basePage.click(this.addToContractorIcon)
        await basePage.wait(5000)

        let result  = await basePage.verifyElement(this.ContractorAssigned)

        if (result === false){
            console.log("Contractor successfully removed ...")
            isVerify = true
        }

        else {

            console.log("\x1b[31mFailed to Remove Contractor...\x1b[0m")
        }
    await page.reload();  
    await basePage.wait(3000)
    return isVerify
        
    }


    async VerifyJobInContractor(){
        let isVerify = false
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 

        await basePage.click(this.inputSearch)
        await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
        await basePage.clickKeyboardBackSpace()
        await basePage.keyboardEnter()
        await basePage.wait(4000)
        const movementLocator = page.locator(`//td/div[text()='${createConsignmentPage.extractedNumber}']/.. | //td[text()='${createConsignmentPage.extractedNumber}']`);
        let result = await basePage.verifyElement(movementLocator)

        if (result === false){
            console.log("Job is no longer assigned to contractor...")
            isVerify = true
        }

        else {

            console.log("\x1b[31mFailed to Remove job in Contractor...\x1b[0m")
        }

        return isVerify
        
    }


    async verifyManifestInContractor(ManifestId){
        await basePage.click(this.manifestTab)
        console.log("Tab manifest clicked successfully....")
        let ManifestResult = await basePage.verifyElement(`//td[text()='${ManifestId}']`)


        await basePage.waitForLocator(this.inputSearchManifest)
        await basePage.sendKeys(this.inputSearchManifest, ManifestId)
        await basePage.clickKeyboardBackSpace()
        await basePage.keyboardEnter()
        await basePage.wait(15000)

            if (ManifestResult === false){
                await basePage.verifyElement(this.ManifestTableEmpty)
                console.log("Manifest is Removed from Contractor...")   

            } else {
                console.log("\x1b[31m Manifest is Retained from Contractor...\x1b[0m")   
            }

    }

    async SearchManifest2(ManifestId){
        await basePage.click(this.manifestTab)
        console.log("Tab manifest clicked successfully....")
    
        let result = await basePage.verifyElement(this.iconCloseManifestOverview)
        
        if (result === true){        
            await basePage.click(this.iconCloseManifestOverview)

            await basePage.waitForLocator(this.inputSearchManifest)
            await basePage.sendKeys(this.inputSearchManifest, ManifestId)
            await basePage.keyboardEnter()
            console.log("Manifest searched successfully...")   
            const manifest = this.maniFestJob.replace("<<text>>",ManifestId)
            await basePage.click(manifest)
        }
        else if (result === false){        
            await basePage.waitForLocator(this.inputSearchManifest)
            await basePage.sendKeys(this.inputSearchManifest, ManifestId)
            await basePage.keyboardEnter()
            console.log("Manifest searched successfully...")   
            const manifest = this.maniFestJob.replace("<<text>>",ManifestId)
            await basePage.click(manifest)
        }
        else{
            console.log("\x1b[31mUnable to search Manifest...\x1b[0m")
        }
    }


    async rejectJobInContractor (RejectReason){
        await basePage.waitForLocator(this.reject)
        await basePage.click(this.reject)
        await basePage.waitForLocator(this.inputReason)
        await basePage.sendKeys(this.inputReason, RejectReason)
        await basePage.click(this.rejectBtn)


    }

    async verifyJobIsRemovedInManifest(ManifestId){
       let isVerify = false
        await basePage.click(this.manifestTab)
        console.log("Tab manifest clicked successfully....")
        let ManifestRow = await basePage.verifyElement("(//td[contains(@class,'referenceCell')])[1]")


        await basePage.waitForLocator(this.inputSearchManifest)
        await basePage.sendKeys(this.inputSearchManifest, ManifestId)
        await basePage.clickKeyboardBackSpace()
        await basePage.keyboardEnter()
        const manifest = this.maniFestJob.replace("<<text>>",ManifestId)
        await basePage.click(manifest)

            if (ManifestRow === false){
                console.log("Job is Removed from Manifesst, Manifest Retained...")   
                isVerify = true

            } else {
                console.log("\x1b[31m job is not removed...\x1b[0m")   
            }
            await page.reload();  
            await basePage.wait(3000)
            return isVerify

    }


}


module.exports = Manifest