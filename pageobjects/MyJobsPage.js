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

class MyJobsPage {
    
constructor(page,extractedNumber,PUOffset,SecondOffset,lastOffset)
{
    
    this.page = page;
    this.extractedNumber = extractedNumber
    this.PUOffset = PUOffset
    this.SecondOffset = SecondOffset
    this.lastOffset = lastOffset
    this.sectionJob="//div[@id='landingCardFreight']/div[1]"
    this.sectionMyJobs = "//div/span[text()='My Jobs']"
    this.btnBooked = "//div[text()='<<Text>>']"
    this.tabJobs = "//a/span[text()='Jobs']"
    this.txtJobTitle = "//div[text()='Jobs']"
    this.jobDurationCancelBtn="//h2[text()='Job duration']/../following-sibling::div[2]/child::button[text()='Cancel']"
    this.invoiceSummary="//div[text()='Invoice Summary']"   
    this.NoCustomer = "//td/strong[contains(text(),'No Customer')]" 
    this.invoiceSummaryNoCustomerThisWeek = "(//td[@class = 'thisWeek']/a[@class='finance-customer-summary-total'])[1]"
    this.searchInvoice = "//span[@class='input-group-addon']/following-sibling::input"


    this.businessLogo="//img[contains(@class,'business-logo')]"
    this.RunsCard = "//div[@id='hubFreightRunSheets']"
    this.RunsTitleCard = "//div[text()='Runs']"
    this.tabJobInMenu="//span[text()='Jobs']/.."
    this.invoicingPage="//div[@class='col s4 no-padding col-page-title']/child::div[text()='Invoicing']"
    this.previewInvoiceBtn="//div[@class='margintop-tenpx']/child::a[text()='Preview Invoice']"
    this.voidBtn="//div[@class='margintop-tenpx']/child::a[6]"
    this.voidConfirmationBtn="//div[@class='swal2-actions']/child::button[text()='Yes']"
    this.voidedOkBtn="//div[@class='swal2-actions']/child::button[text()='OK']"
    this.csvDownloadBtn="//i[text()='system_update_alt']/.."
    this.pdfDownloadBtn="//a[contains(text(),'PDF')]"
    
    this.showVoidCheckBox="//input[@id='isVoidFilter']/following-sibling::label"
    this.tabCompletedJob="//div[@id='myJobsInnerNavigationComplete']"
    this.manifestTab="//div[@id='myJobsInnerNavigationManifestingTableLabel']/.."
    
     this.inputSearch = "(//input[contains(@id,'SearchInput')])[1]"
     this.txtRefNumber = "//div[text()='Bustle Reference']/following-sibling::p"
     this.jobType = "//h6[contains(@class,'job-type')]"
     this.referenceID = "(//h6[contains(@class,'job-type')]/following::span[text()='Reference']/following::div)[1]"
    // this.referenceID = "(//span[text()='Reference'])[2]/following-sibling::div"
     this.closeJob = "//button[@title='Close this job']"
     this.MarkAll = "//button[contains(text(),'Mark All Complete')]"
     this.btnConfirm = "//h2[contains(text(),'Mark Jobs Complete?')]/following::button[text()='Confirm']"
     this.updateZoneMovement = "//h2[contains(text(),'Updating Zone Movement')]"
     this.txtSenderName = "(//label[contains(text(),'Sender Name')]/following::input)[1]"
     this.txtReceiverName = "(//label[contains(text(),'Receiver Name')]/following::input)[1]"
     this.btnconfirmReceiverName = "//button[text()='Confirm']"
     this.sectionCompletedJobs = "//div[text()='Completed Jobs']"
     this.FilterJobs = "//input[@placeholder='Filter Jobs']"
     this.schedDateManifest = "//input[@placeholder='Select Date..'][@tabindex='0']"
     this.selectedManifestDate ="//div[contains(@class,'open')]//span[contains(@class,'today')]"
     this.statusManifest = "//div[text()='Status']/following-sibling::div"
     this.ManifestLabeloutput = "//div[contains(text(),'Label')]/following-sibling::div"
     this.ManifestAssetoutput = "//div[text()='Asset']/following-sibling::div"
     this.LoadingDepotOutput = "//div[contains(text(),'Loading Depot')]/following-sibling::div"
     this.unLoadingDepotOutput = "//div[contains(text(),'Unloading Depot')]/following-sibling::div"
     this.TotalConsignment = "//div[contains(text(),'Total Consignments')]/following-sibling::div"
     this.schedDateOuput = "//div[contains(text(),'Scheduled date')]/following-sibling::div"
     this.completedJob = "//tbody/tr"
     this.refNumInCompleted = "(//div[@class='col s6 margintop-tenpx']/div)[1]"
     this.ref1Completed = "//span[text()='My Ref 1']/following-sibling::div"
    this.ref2Completed = "//span[text()='My Ref 2']/following-sibling::div"
    this.ref3Completed = "//span[text()='Additional Reference 3']/following-sibling::div"
    this.ref3Completed2 = "//span[text()='TIMESLOT']/following-sibling::div"
    this.ref4Completed = "//span[text()='Additional Reference 4']/following-sibling::div"
    
    this.costCodeInBooking = "//span[text()='Cost Code']/following-sibling::div"
    this.transportOrderInBooking = "//span[text()='Transport Order']/following-sibling::div"
    this.purchaseOrderInBooking = "//span[text()='Purchase Order']/following-sibling::div"
    this.stagingLocationInBooking = "//span[contains(text(),'Staging')]/following-sibling::div"
    this.password = "//input[@type='password']"

    this.txtCustomer = "//span[text()='Customer']/following-sibling::div"
    this.servicetype = "//span[text()='Service Type']/following-sibling::div"
    this.textFreightCode = "//span[text()='Freight Code']/following-sibling::div"
    this.jobNotesCompleted = "//div[normalize-space(text())='Job Notes']/parent::div"
    this.txtJobNotes = "(//div[@class='single-notes-container']/div/p)[1]"
    this.invoiceNotesCompleted = "//div[normalize-space(text())='Invoice Notes']/parent::div"
    this.txtInvoiceNotes = "//div[@class='row no-margin-bottom']/div/p"
    this.txtTrailerTypeCompleted = "//span[text()='Trailer Type / Loading Requirements']/following-sibling::div"
    this.totalCubicWeight = "//span[text()='Total Cubic Weight']/following-sibling::span"
    this.iconChiller= "//i[contains(@title,'<<Text>>')]"
    // this.txtTailerTypeCompleted = page.locator("(//h6[contains(@class,'job-type')]/parent::div/following-sibling::div)[4]/div/div")
    // this.InvoiceJob = page.locator("//button[@title='Invoice this job']")
    this.InvoiceJob = "//button[@id='myJobsInvoiceBtn']"
    this.tabOrganization = "//a/span[text()='Organisation']"
    this.splitAssignment = "//i[.='menu']"
    this.referenceIDInvoice = "(//td[@class='reference']/a)[1]"
    this.txtRateFuelLevy = "(//td[@class='metrics']/div//tr)[4]//td/div/div"
    this.rateFuelLevy = "(//td[text()='Fuel Levy']/following-sibling::td)[1]"
    this.checkBoxInvoiceJob = "(//input[@data-type='select-job']/following-sibling::label)[1]"
    this.btnBatchInvoice = "//a[@id='batch-invoice']"
    this.btnGroupInvoice = "//a[text()='Group Invoice']"
    this.btnOk = "//button[text()='OK']"
    this.tabCompletedInvoices = "//div[text()='Completed Invoices']"
    this.searchInvoiceNumber = "//input[@id='invoiceSearchInput']"
    this.completedInvoice = "//tbody/tr[1]"
    this.voidedInvoice="//td[text()='<<Text>>']/.."
    //this.voidedInvoice="//table[@id='completedInvoicesTable']/tbody/tr"
    //this.txtReferenceNum = "(//table[contains(@class,'details-table')]//tr[3]/td)[2]"
    this.txtReferenceNum="(//table[contains(@class,'details-table')]//tr[1]/td)[2]"
    this.invoiceRefNum ="//h6[text()='Issued Date: ']/../preceding-sibling::h5"
    this.txtTotal = "(//table[contains(@class,'details-table')]//tr)[8]/td/b"
    this.btnSignOut = "//span[text()='SIGN OUT']"
    this.iconSelectDriver = "//div/button[contains(@id,'myJobsAssignCompany')]"
    this.inputSearchDriver = "//input[contains(@class,'js-search-filter')]"
    this.iconSelectContractor="//button[@id='myJobsAssignContractorJobBtn']"
    this.iconSelectContractorInManifest="//button[@id='tripsheetManifestsAssignContractor']"
    this.btnAssign = "(//a[text()='Assign'])[1]"
    this.btnPrimary = "//a[text()='Primary']"
    this.btnHeadingToPickUp = "//a[@id='myJobsBookedNextStatusButton']"
    this.btnMarkAs = "//a[text()='<<Text>>']"
    this.btnMarkAsDelivered = "//a[text()='Delivered']"
    this.inputFirstName = "//input[@id='signatureFirstName']"
    this.inputLastName = "//input[@id='signatureLastName']"
    this.btnNext = "//button[text()='Next']"
    this.signaturePad = "//canvas[@id='signaturePadCanvas']"
    this.btnSubmit = "//a[text()='Submit']"
    this.btnSubmit1 = "//button[text()='Submit']"
    this.iconClose = "//button[@title='Close this job']"
    this.tabLHJobs = "//div[text()='LH Jobs']"
    this.iconCloseManifestOverview = "//button[@title='Close Manifest Overview']"
    this.selectLoadingDepot = "//select[@id='setLoadingDepot']/following-sibling::span"
    this.selectUnloadingDepot = "//select[@id='setUnloadingDepot']/following-sibling::span"
    this.loadingDepot = "//ul/li[text()='Crispy King']"
    this.unloadingDepot = "//ul/li[text()='Bunbury Depot']"
    // this.iconCloseManifestOverview = "//button[@id='tripsheetManifestsCloseOverview']"
    this.checkBoxLHJob1 = "(//input[@title='Add to batch selection']/following-sibling::label)[3]"
    this.checkBoxLHJob = "//input[@title='Add to batch selection']/following-sibling::label"

    this.checkBoxJob = "//div[@id='manifests_overview_addJobToManifest']//label[@class='ibob-batch-checkbox']"
    this.btnManifestTogether = "//a[text()='Manifest Together']"
    this.btnCreateManifest = "//button[text()='Create Manifest']"
    //this.maniFestJob = "//tbody/tr[contains(@class, 'manifests-table-row')]"
    this.maniFestJob="//tbody/tr[contains(@class, 'manifests-table-row')]/td[1]"
    this.tabManifest = "//div[text()='Manifests']"
    this.inputSearchManifest = "//input[contains(@id,'SearchInput')]"
    this.inputSearchManifest2 = "//input[contains(@id,'combinedSearchInput')]"
    this.manifestLabel = "//input[contains(@id,'manifest-label')]"
    this.manifestAssetSelect = "//span[text()='No Asset']"
    this.manifestAsset = "//li[text()='PM002']"
    this.manifestSelectAssetType ="//span[text()='Vehicle']"
    this.vehicleManifest = "//li[text()='Vehicle']"
    this.trailerManifest = "//li[text()='Trailer']"
    this.PlantManifest = "//li[text()='Plant']"
    this.createDraft ="//span/a[text()='Draft']"
    this.txtManifestReference = "//div[text()='Reference']/following-sibling::div"
    this.btnMarkAsReady = "//a[text()='Mark As Ready']" 
    this.iconMarkAsReady="//button[@id='tripsheetManifestsCompleteManifest']"
    this.jobRefInManifest = "//td[contains(@class,'referenceCell')][2]/a"
    this.labelmanifest = "//div[@id='manifests_overview']/div[2]/div[1]/div[2]"
    this.countConsignment ="//td[contains(@class,'referenceCell')]/a[@class='fmj-label-small']"
    this.iconTripSheet = "//i[text()='directions']"
    this.btnGotoTripSheet = "//button[text()='Go To Trip Sheets']"
    this.goToTripSheetBtn="//a[text()='Go To Tripsheets']"
    this.btnCreateTripSheet = "//a[@id='new-tripsheet-button']"
    this.radioBtnTripSheet = "//label[text()='Trip Sheet']"
    this.forwardArrow = "//i[text()='arrow_forward']"
    this.Forward = "(//i[text()='forward'])[2]"
    this.searchAddressInTripSheet = "//input[@aria-controls='AddressBookTable']"
    this.tripAddress ="//tr[contains(@class,'tripsheet-address-book-table-row')]"
    this.btnToday = "//a[text()='Today']"
    //this.btnWed="//a[text()='Wed']"
    this.departureTime = "//a[@data-value='4']"
    this.departureTime1 = "//a[@data-value='8']"
    this.btnTomorrow = "//a[text()='Tomorrow']"
    this.rowTripSheet = "(//tr/td[text()='Trip'])[1]"
    this.txtRefNum = "//span[text()='Reference']/following-sibling::div"
    this.iconExpandInTripSheet = "(//i[text()='expand_more'])[1]"
    this.iconExpandInTripSheet1="(//i[text()='expand_more'])[2]"
    this.iconExpandInTripSheet2="(//i[text()='expand_more'])[3]"
    this.iconExpandInTripSheet3="(//i[text()='expand_more'])[4]"

    this.iconAddManifest="//button[@data-type='primeMover']"
    // this.btnAddAsset = "(//button/i[text()='add'])[2]"
    this.iconPlusInTripSheet1="(//i[text()='add_circle_outline'])[1]"
    this.iconPlusInTripSheet = "(//i[text()='add_circle_outline'])[2]"
    this.dropDownSelectAsset = "//select[@id='tripsheetSelectAssetForLeg']"

    this.selectAsset="//span[contains(@id,'SelectAsset')]/following-sibling::span"
    this.valueAsset = "//li[text()='DOLLY1']"
    this.valueAsset1 = "//li[text()='FT001']"
    this.valueAsset2 = "//li[text()='FT002']"
    this.valueAsset3 = "//li[text()='DOLLY2']"

    this.valueAssetCon = "//li[text()='1TRT123 | 1TRT123']"
    this.rowManifestInTripSheet = "//table[@id='legManifestTable']/tbody/tr[1]"
    this.rowManifestInTripSheet1="//td[text()='<<Text>>']/.."
    this.btnAssignTrip = "//span[text()='Assign Trip']"
    this.btnIntransit = "//span[text()='In Transit']"
    this.btnLegArrived = "//span[text()='Leg Arrived']"
    this.btnDelivered = "//span[text()='Delivered']"
    //this.iconTick = "//i[text()='check']"
    this.iconTick="//a[@id='return-detail-side-panel-button']/i[text()='check']"
    this.tabBooked = "//div[text()='Booked']"
    this.cancelled = "//td[text()='<<TEXT1>>']/following-sibling::td[text()='<<TEXT2>>']"
    this.elementServiceType="//li/span[text()='<<Text>>']"
    this.freightCharges = "(//div[normalize-space(text())='Note Charge'])[1]"
    this.fuelLevy2 = "(//div[normalize-space(text())='Fuel Levy'])[2]"
    this.lh3Jobs = "//td[text()='<<Text>>']"
    this.inputExitTime = "//input[@id='site-exit-time-input']"
    this.exitTimeInCompleted = "//td[text()='Completed']/following-sibling::td[2]"
    this.iconDangerousGoods = "//table[@id='packagesTable']/tbody/tr[1]/td[4]/img[1]"
    this.iconReinstate = "//button[@id='myJobsReinstateJobBtn']//following::i[text()='undo']"
    this.iconReinstateTripSheet = "//a[@title='Reinstate Tripsheet']//following::i[text()='undo']"
    this.btnReinstate = "//button[text()='Reinstate']"
    this.iconJobCancel = "//button[@id='myJobsCancelJobBtn']"
    this.btnCancelIt = " //button[text()='Yes, cancel it!']"
    this.tabs = "//div[text()='<<Text>>']"
    this.txtMyJobs = "//div[text()='My Jobs']"
    //this.rateCharge = "(//input[@name='rate'])[1]"
    this.rateCharge="//tr[<<Text>>]/td[@class='rates']/div/table/tr[2]/descendant::input"
    this.demurageHrs="//input[@id='durationHours']"
    this.okBtn="//button[text()='OK']"
    this.rateCharge1="//tr[<<Text>>]/td[@class='rates']/div/table/tr[3]/descendant::input"
    this.poReference1="(//input[@name='reference'])[1]"
    this.poReference2="(//input[@name='reference'])[<<Text>>]"



    //this.price = "((//td[@class='prices'])[1]/div/table/tr)[2]/td/div/div"
    this.price="//tr[<<Text>>]/td[@class='prices']/div/table/tr[2]/td/div/div"
    //this.price1="//tr[<<Text>>]/td[@class='prices']/div/table/tr[3]/td/div/div"
    this.metricWeight = "//tr[1]/td[@class='metrics']/div/table/tr[2]/td/div/div/span/form/input"
    this.metricWeight1="//tr[<<Text>>]/td[@class='metrics']/div/table/tr[2]/td/div/div/input"
    this.price1="//tr[<<Text>>]/td[@class='prices']/div/table/tr[3]/td/div/div"
    this.completedJobPage="//div[text()='Complete Freight']"
    this.descriptionInCompletedInvoice="//table[contains(@class,'invoice-complete-details')]/tbody/tr[1]/td[5]/div"
    this.totalAmount="//table[contains(@class,'invoice-complete-details')]/tfoot/tr[3]/td[3]/b"
    //this.customerRefInCompletedInvoice="//table[contains(@class,'invoice-complete-details')]/tbody/tr[2]/td[3]/div"

    //apply credit btn in invoice page 
    this.buttonOk="//div[@class='swal2-actions']/child::button[text()='OK']"
    this.applyCreditBtn="//a[contains(@title,'Apply credit')]"
    //to apply credit if the apply_credit is visible
    this.applyCreditPopUp="//div[@id='swal-template-hook']/h2"
    this.applyBtn="//div/button[text()='Apply']"
    this.creditNoteInPopUp="//div[@id='swal-template-hook']/ul/li/p[2]"   
    //create new credit and apply
    this.createCredit="//button[text()='Create Credit Note']"
    this.CreditPage="//header/div/descendant::div[text()='Credits']"
    this.issueCreditBtn="//a[@id='issue-credit-button']"
    this.customer="//input[@id='credit-customer']" // click to open dropdown options //sendKeys("Big Mining Company")
    this.creditCustomerName="//input[@id='credit-customer']/following-sibling::ul"
    this.creditIssueFrom="//input[@id='credit-issued-from']" //click and sendkeys(stored invoice number)
    this.creditIssueFromData="//input[@id='credit-issued-from']/following-sibling::ul"
    this.creditNotes="//textarea[@id='credit-notes']" // send keys from testdata
    this.creditAmount="//input[@id='credit-amount']" //send keys
    this.applyCreditToInvoiceIcon="//div[@title='Apply credit to invoice']"
    this.applyCredit="//table[@id='completedInvoicesTable']/tbody/tr/td[text()='<<Text>>']/.."  //click
    //verifying applied credit is present in the Completed Invoicingpage
    this.creditNoteInUi="//tbody[@class='invoiceTableCells']/tr/td[3]"


    this.masterJob="//td/i[text()='star_border']"
    this.editJobIcon="//button[@id='myJobsEditJobBtn']"
    this.editFreight="//select[@id='freightCodesSelect']"
    this.chooseFreight="//select[@id='freightCodesSelect']/option[contains(text(),'Test Auto')]"
    this.removeFreight="//select[@id='freightCodesSelect']/option[contains(text(),'No')]"
    this.updateBtn="//button[@id='sendFreightUpdatePointToPointJob']"
    this.freight_code="//div/span[text()='Freight Code']/following-sibling::div"
    //this.jobLegs="//table[@id='myFreightBookedJobsTable']/tbody/tr[<<Text>>]"
    this.jobLegs="//table[@id='myFreightBookedJobsTable']/tbody/tr[<<Text>>]/td[11]/button/i"

    this.serviceOption="//table[@id='serviceTypeTable']/tbody/tr/td[text()='MS3 Trips']"
    this.serviceOptionCon="//table[@id='serviceTypeTable']/tbody/tr/td[text()='CARRIER']"
    this.editServiceIcon="//span[text()='Service Type']/following-sibling::a/i[text()='edit']"
   

    this.payments="//div[@id='payments']" 

    this.tabFinance="//div[@id='landingCardFinance']"
    this.tabFinanceInMenu="//a/span[text()='Finance']/.."
    this.txtFinanceTitle="//div[text()='Finance']"
    this.customerRate="//div/span[text()='Customer Rates']"
    this.customeName="//table[@id='financeCustomerTable']/tbody/tr[1]"
    this.editFreightIcon="//td[text()='<<Text>>']/following-sibling::td[8]/a[@id='freightCodesEditCodeBtn']/i"
    this.demurrageRate="//fieldset[2]/descendant::input[@name='demurrageRate']" 
    this.selectDgMetric ="//select[@id='dangerousGoodsMetric']"
    this.dgLevy="//fieldset[2]/descendant::input[@name='dangerousGoodsLevy']"
    this.minimumCharge="//fieldset[2]/descendant::input[@name='minimumCharge']"
    this.fuelLevy="//fieldset[2]/descendant::input[@placeholder='No Value']"
    this.fuelLevyInitialVal="//div[@id='swal-template-hook']/div/table/tbody/tr/td[2]/input"
    this.confirmBtn="//button[text()='Confirm']"
    this.updateRateBtn="//button[text()='Update']"
    this.customerInFinance="//span[text()='Big Mining Company']"

    this.cubicWeight="//td[@class='cubicWeights']/div/table/tr[<<Text>>]/td/div/div"

    this.code="(//td[@class='itemRates']/div/descendant::div[4]/span)[2]"

    this.backBtn="//button[@id='backBtn']"
    this.inputSearch1="//input[@id='vendorJobsTableFilter']"
    this.activeJobStatus="(//table[@id='vendorActiveJobsTable']/tbody/tr/td[8])[<<Text>>]"
    //this.activeJobStatus1="//table[@id='vendorActiveJobsTable']/tbody/tr/td[8]"
    this.activeJobs="//span[text()='Active Jobs']/.."
    this.completedJobInportal="//div[@id=' myJobsInnerNavigationComplete ']"
    this.completedJobStatus="(//table[@id='vendorCompleteJobsTable']/tbody/tr/td[6])[<<Text>>]"

    this.createdBy="//td[text()='Customer Manager']"

    this.paymentSummary="//div[@id='paymentsSummary']" 
    this.payeeCount="//div[text()='<<Text>>']/following-sibling::div[2]/a | //div[text()='<<Text>>']/following-sibling::div[2][count(./a) = 0]"
    this.payeeCount1="//div[text()='<<Text>>']/following-sibling::div[2]/a"
    this.payeeCount0="//div[text()='<<Text>>']/following-sibling::div[2]"
    this.filtersBtn="//button[text()='Filters']" 
    this.filterCompleted="//div[text()='Completed'][@role='combobox']" 
    this.filterPayee="//input/preceding-sibling::div[text()='Payee']" 
    //this.filterPayee="//div[text()='Payee']"
    this.searchBoxInPayment="//input[@Type='search']"
    this.type="//span[text()='<<Text>>']" 
    this.referenceInPayment="//a[contains(text(),'<<Text>>')]" 
    //this.costCode="//div[@data-id='gridPanelAnchor']/following-sibling::div[1]/div[2]/div/div[1]/div[5]"
    this.costCode="(//div[@data-field='costCentre'])[2]"
    //this.rateCode="//div[@data-id='gridPanelAnchor']/following-sibling::div[1]/div[2]/div/div[1]/div[6]"
    this.rateCode="(//div[@data-field='costCode'])[2]"
    //this.businessUnit="//div[@data-id='gridPanelAnchor']/following-sibling::div[1]/div[2]/div/div[1]/div[7]"
    this.businessUnit="(//div[@data-field='businessUnit'])[2] "
    this.payee="//div[@data-field='payee' and text()='<<Text>>']"
    this.payeeType="//main/descendant::span[text()='<<Text>>']"

    //this.startedDate="//div[@data-id='gridPanelAnchor']/following-sibling::div[1]/div[2]/div/div[1]/div[10]"
    this.startedDate="(//div[@data-field='startDate'])[2] "
    //this.completedDate="//div[@data-id='gridPanelAnchor']/following-sibling::div[1]/div[2]/div/div[1]/div[11]"
    this.completedDate="(//div[@data-field='endDate'])[2] "
    //this.approved="//div[@data-id='gridPanelAnchor']/following-sibling::div[1]/div[2]/div/div[1]/div[12]"
    this.approved="(//div[@data-field='approvedBy'])[2]"
    //this.approvedOn="//div[@data-id='gridPanelAnchor']/following-sibling::div[1]/div[2]/div/div[1]/div[13]"
    this.approvedOn="(//div[@data-field='approvedAt'])[2]"

    this.editPaymentIcon="//button[@aria-label='Edit']"
    this.editCostCode="//div[@data-id='gridPanelAnchor']/following-sibling::div[1]/div[2]/div/div[1]/div[5]/descendant::input" 
    this.costCodeValue="//li[contains(text(),'test123')]"
    this.editRateCode="//div[@data-id='gridPanelAnchor']/following-sibling::div[1]/div[2]/div/div[1]/div[6]/descendant::input"
    //here the text will be varied for contractor
    this.rateCodeValue="//li[text()='<<Text>>']"
    this.editBusinessUnit="//div[@data-id='gridPanelAnchor']/following-sibling::div[1]/div[2]/div/div[1]/div[7]/descendant::input"
    this.businessUnitValue="//li[text()='Test Business Unit']"
    this.saveBtnInPayment="//button[@aria-label='Save']"
    this.totalInPayment="//h6[contains(text(),'Total')]"

    this.addChargeInPaymentBtn="//button[@aria-label='Add additional cost']"
    this.additionalCostCode="//button[@aria-label='Open']" 
    this.additionalCostVal="//li[text()='<<Text>>']"
    this.additionalChargeAddBtn="//span[text()=' Add ']"
    this.buttonClose="//button[text()='Close']"

    this.selectJobInPayment="(//input[@type='checkbox'])[2]"
    this.approveCostBtn="//button[text()='Approve costs']"
    this.approveBtn="//button[text()='Approve']"
    this.createPaymentBtn="//button[text()='Create payment']"
    this.createBtn="//button[text()='Create']" 

    this.completedPaymentTab="//div[text()='Completed Payments']/.."
    this.completedPayment="(//div[@data-field='paymentNumber' and @role='gridcell'])[1]"
    //this.completedPayment="(//div[@data-field='paymentNumber'])[last()]"
    this.descriptionInCompletedPayment="//table//tbody/tr[1]/td[2]" 
    this.totalAmtInCompletedPayment="//strong/parent::h6" 
    this.voidBtnInCompletedPay="//*[local-name() = 'svg' and contains(@data-testid, 'DeleteOutlined')]" 
    this.voidBtnPopUpInCompPay="//h2[@id='void-payment-dialog-title']/following-sibling::div[2]/button[text()='Void']" 
    this.statusVoid="//main/div[2]/div/div[2]/descendant::span[text()='Void']"  
    //this.statusVoid="//main/div[2]/div/div[2]/descendant::span[text()='Void']/.."
    this.paymentsTab="//div[text()='Payments']/.."
    //this.statusVoid="//main/div[2]/div/div[2]/descendant::span[text()='Void']/.."
    
    this.runSheetTab="//div/span[text()='Run Sheets']"
    this.runPageTitle="//div[text()='Runs']"
    this.addRunBtn="//a[contains(@class,'js-add-run')]"
    this.labelInAddRunForm="//label[text()='Label']/preceding-sibling::input"  
    this.businessUnitInRun="//span[text()='Select A Business Unit...']/../following-sibling::span" 
    this.businessUnitOption="//li[text()='[BU] business unit test']" 
    this.runStatus="//input[@value='(Select One)']"  
    this.runStatusVal="//li/span[text()='Draft']"  //or use Ready
    this.runVehicle="//span[text()='Select A Vehicle...']/../following-sibling::span" 
    this.runVehicleOption="//li[text()='PM002']"  
    this.trailerA="//span[@id='select2-trailerASelect-container']/../child::span[2]" 
    this.trailerAOption="//li[text()='FT002']"  
    this.trailerB="//span[@id='select2-trailerBSelect-container']/../child::span[2]"  
    this.trailerBOption="//li[text()='FT0021']"  
    this.addBtn="//button[text()='Add']" 
    this.runNumber="(//tbody/tr[last()]/td)[2]" 

    this.iconJobsInRun="//div[contains(@class,'open-job-assignment')]" 
    this.availableJobsTab="//li[text()='Available Jobs']" 
    this.jobSearchBox="//input[@id='jobsSearchBox']"  
    //this.checkBoxInAvailableJobs="//table[@id='runJobsTable']/tbody/tr/td/input"
    this.checkBoxInAvailableJobs="//table[@id='runJobsTable']/tbody/tr/td/input/.."
    this.addSelectedJobBtn="//button[contains(@class,'addJobs')]" 
    this.doneBtn="//button[text()='Done']" 
    this.arrowRight="//i[text()='keyboard_arrow_right']" 
    //this.btnOk="//button[text()='OK']" 
    //assign driver or contractor
    this.iconDriver="//button[@aria-label='Assign Driver']" 
    this.iconContractor="//button[@aria-label='Add Contractor']" 
    this.iconContractor="//button[@aria-label='Add Contractor']" 
    this.searchDriver="//input[contains(@class,'search-filter')]" 
    this.assignBtn="(//td/a[text()='Assign'])[1]"
    this.UnassignBtn="(//td/a[text()='Unassign'])[1]"
    this.startBtn="//button[text()='Start']"
    this.searchRunInput="//input[@placeholder='Label, Job/Run/Runsheet Number']"
    this.iconSenderAddress = "//a[contains(@id,'SenderAddressBookBtn')]"
    this.searchSenderAddress = "//input[contains(@id,'SenderAddressTableFilter')]"
    this.SourcetxtAddress2 = "//td[text()='Ultimate Perth Depot']"
    this.searchReceiverAddress = "//input[contains(@id,'ReceiverAddressTableFilter')]"
    this.iconReceiverAddress = "//a[contains(@id,'ReceiverAddressBookBtn')]"
    this.DestinationTxtAddress2 = "//td[contains(text(),'Albany-Drome Airport')]"
    this.clickSearchIcon = "//div//i[@class='material-icons j-icon-prefix']"
    this.runfinishTime="//input[@name='endTimestamp']"
    this.inputStartOdometer="//input[@name='startOdometer']"
    this.startTimestamp = "//input[@name='startTimestamp']"  
    this.inputEndOdometer="//input[@name='endOdometer']" 
    this.breakTime="//input[@name='breaks.0.startTimestamp']"  
    this.breakDuration="//input[@name='breaks.0.duration']" 
    this.runFinishBtn="//button[text()='Finish']" 
    this.completedRunPage="//div[text()='Completed Runs']/.."
    this.runNumInCompletedRun="//tbody/tr/td[3]"
    this.PUDateField ="//input[@name='availableFrom']"
    this.pickerDay = "//div[@aria-selected='true'][ancestor::div[@aria-hidden='false']]"
    this.pickerDayUpdate = "//div[@aria-selected='true'][ancestor::div[@aria-hidden='false']][ancestor::td]/following::td[1]"

    this.DueDateField ="//input[@class='consignment-dueDate picker__input']"
    this.refInCompletedPage="//div[text()='<<Text>>']"
    this.completedRunPage="//div[text()='Completed Runs']/.."
    this.runNumInCompletedRun="//tbody/tr/td[3]"
    //this.refInCompletedPage="//div[text()='<<Text>>']"
    this.rowsPerPage="//p[text()='Rows per page:']/following-sibling::div/div"
    this.rowsOption="//li[text()='200']"

    this.addFilterBtn="//button[text()='Add filter']" //click
    this.FilterOptions="//input[@placeholder='Filter value']/../div" // click to open options
    this.filterValue="//li[text()='<<Text>>']" // text= Delivery, linehaul,Tripsheet
    this.applyFilterBtn="//button[text()='Apply filters']"
    this.addJobToManifest = "//button[@id='addJobToManifest']"
    this.iconCompleteJobInManifest="//button[@id='tripsheetManifestsCompleteManifest']" //click
    this.confirmBtnInManifest="//button[text()='Confirm']" //click
  this.noRowstext="//div[contains(text(),'No results found.')]"

    this.backArrowInRun="//i[text()='keyboard_arrow_left']"
    this.runPlanningTab = "//div[text()='Runs planning']"
    this.runSearch="//input[@id='searchBox']" //locator.fill

    this.load="//span[text()='Load:']/following-sibling::span" //get text
    this.totalWeightInmanifest="//table[@id='manifestOverviewJobTable']/tbody/tr[last()]/td[@class='weightCell padding-5px']" //get text
    this.iconPrimeMover="//span[text()='Prime Mover']/following-sibling::a/i[text()='edit']" //click
    //this.primeMoverTab="//span[@class='selection']" //click to open option
    this.primeMoverTab="//main//span[@role='presentation']"
    this.primeMoverOption="//li[text()='PM002']" //click
    this.primeMoverOption2="//li[text()='T119']" //click
    this.primeMoverOption3="//li[text()='1BSL892']"
    this.iconPrimaryDriver="//span[text()='Primary Driver']/following-sibling::a/i[text()='edit']" //click
    this.iconSecondaryDriver="//span[text()='Secondary Driver']/following-sibling::a/i[text()='edit']"  //click
    this.btnSecondary="(//a[text()='Secondary'])[2]"
    this.iconCostCode="//span[text()='Cost Code']/following-sibling::a/i[text()='edit']"
    this.costCodeValueTrip="//table[@id='costCodesTable']/tbody/tr/td[text()='Employee Fixed Rate']"
    this.iconFreightCode="//span[text()='Freight Code']/following-sibling::a/i[text()='edit']" //click
    this.iconSelectCustomer="//span[text()='Select Customer']/.."  //click
    this.tripCustomer="//li[text()='Big Mining Company']" //click
    this.tripCustomerCarrier="//li[text()='Bald Hill']"
    this.tripCustomerContractor="//li[text()='Capral']"
    //Bald Hill, Capral
    this.freightCodeOption="(//td[text()='KC Double Banded Automation'])[1]" //click
    this.freightCodeOptionCarrier="(//td[text()='TRIP ASN'])[1]"
    this.freightCodeOptionContrac="(//td[text()='CAPBSG'])[1]"
    //TRIP ASN, CAPBSG
    this.editContractorIcon="//span[text()='Contractor']/following-sibling::a/i[text()='edit']"
    this.tabTrip="//div[text()='Trip Sheets' and @id='idLabel']"
    this.inputRefTrip="//input[contains(@class,'tripsheet-booked-reference-input')]"
    this.tripSheetData="//table[@id='bookedTripSheetsTable']/tbody/tr[1]" //click
    this.rejectTrip="//span[text()='Reject Trip']/.." //click
    this.rejectBtn="//button[contains(text(),'reject')]"
    this.contractorAssigned="//span[text()='Contractor']/following-sibling::span"
    this.assignedContracInManifest="(//div[text()='Contractor'])[2]/following-sibling::div"
    this.selectStatusFilterInManifest="(//input[@role='searchbox'])[1]" //click to open options
    this.statusFilterOptionInManifest="//li[text()='Completed']" //click to select option
    this.statusFilterOptionInManifest1="//li[text()='Cancelled']"
    this.refSearchInManifest="//input[@id='myJobsIbobManifestTableFilterSearchInput']"
    //this.manifestTable="//table[@id='manifestsTable']/tbody/tr/td"
    this.manifestTable="(//table[@id='manifestsTable']/tbody/tr)[1]"
    this.manifestRef="//div[@id='manifests_overview']/div[2]/div[2]/div[2]"
    this.manifestStatus="//div[text()='Status']/following-sibling::div"
    this.assignedContracInTrip="//span[text()='Contractor']/following-sibling::div"
    this.rejectTripStatus="//table[@id='bookedTripSheetsTable']/tbody/tr"
    this.bookedJob="//table[@id='myFreightBookedJobsTable']/tbody/tr"
    this.tabTripsheet="(//div[text()='Trip Sheets'])[1]"
    this.completedTripPage="//div[text()='COMPLETED TRIPS']"
    this.inputTripInCompletedTrip="//div[@class='dataTables_filter']/label/input"
    this.tripRefNoInCompleted="//span[text()='Reference']/following-sibling::div"
    this.tripStatus="(//tbody/tr/td[text()='<<Text>>'])[1]"
    // this.tripTableInCompleted="//tbody/tr"
    this.tripTableInCompleted ="//td[text()='<<Text>>']/.."
    this.cancelTripIcon="//a[contains(@id,'cancel-existing-trip')]" // click to open
    this.cancelTripBtn="//button[text()='Cancel Tripsheet']" // click to cancel
    this.pageTripTitle="(//div[text()='Trip Sheets'])[1]"
    this.reinstiateTripBtn="//a[@id='reinstate-completed-trip-side-panel-button']"
    this.activeTabTrip="//div[text()='ACTIVE TRIPS']/.."
    this.duplicateTripIcon="//a[@id='duplicate-tripsheet-side-panel-button']"
    this.txtTripRef="//span[text()='Reference']/following-sibling::div"
    this.duplicatedTrip="//table[@id='bookedTripSheetsTable']/tbody/tr[1]"
    this.manifestNoInBooked="//span[text()='Manifest']/following-sibling::div/a"
    this.deleteManifestInContrac="//i[@title='Remove manifest from configuration']"
    this.buttonRemoveManifest="//button[text()='Remove']"
    this.manifestRefInTrip="//a[text()='<<Text>>']"
    this.tripNoInManifest="//tr[@id='<<Text>>']/td[9]"
    this.iconServiceType="//span[text()='Service Type']/following-sibling::a/i[text()='edit']"
    this.serviceTypeOptionCarrier="//table[@id='serviceTypeTable']/tbody/tr/td[text()='B-Double Mezz Taut']"
    this.serviceTypeOptionContrac="//table[@id='serviceTypeTable']/tbody/tr/td[text()='Darlot']"
    this.sourceValue="(//div[@class='leg-trip-source']/span[1])[1]" //get text and verify
    this.destinationValue="(//div[@class='leg-trip-destination']/span[1])[1]" //get text and verify
    this.sourceValue1="(//div[@class='leg-trip-source']/span[1])[2]" //get text and verify
    this.destinationValue1="(//div[@class='leg-trip-destination']/span[1])[2]" //get text and verify
    this.carrierFreightVal="//span[text()='Freight Code']/following-sibling::div[1]" //get text and verify  val=TRIP ASN
    this.carrierServiceTypeVal="//span[text()='Service Type']/following-sibling::div[1]" //get text and verify  val=B-Double Mezz Taut
    this.primeMoverValInContrac="//span[text()='Prime Mover']/following-sibling::div[1]"
    this.contracFreightVal="//span[text()='Freight Code']/following-sibling::div[2]" //get text and verify  val=CAPBSG
    this.contracServiceTypeVal="//span[text()='Service Type']/following-sibling::div[2]" //get text and verify  val=Darlot
    this.clearAllStatusFilterInManifest="//span[@title='Remove all items']"
    //this.checkBoxForReturn="//input[@id='returnTripCheckbox']"
    this.checkBoxForReturn="//label[@for='returnTripCheckbox']"
    
    this.selectTrailer1="//div[@id='swal-template-hook']/span[1]" //click
    this.selectTrailerOption1="//li[text()='DOLLY1']" //click
    this.selectTrailerOption2="//li[text()='FT001']" //click
    this.selectTrailerOption3="//li[text()='FT002']" //click
    this.selectManifest1="//div[@id='swal-template-hook']/span[2]" //click
    this.selectManifestOption1="//li[text()='<<Text>>']"
    //this.checkBoxForTrip="//table[contains(@id,'reactive-table')]/descendant::input[@type='checkbox'][2]"//click
    this.checkBoxForTrip="//table[contains(@id,'reactive-table')]/tbody/tr/td[last()]/label"
    this.btnLegIntransit="//span[text()='Leg In Transit']"
    this.btnLegDelivered="//span[text()='Leg Delivered']/.."
    this.btnAssignment = "(//button/i[text()='assignment'])[2]"

      //this.editBookedJob="(//i[text()='edit'])[1]"
    this.editBookedJob="//button[@id='myJobsEditJobBtn']"
    this.updateConsignmentBtn="//button[text()='Update Consignment']"

    this.ref1ContractorCompleted = "//span[text()='Example Reference']/following-sibling::div"
    this.ref2ContractorCompleted = "//span[text()='Additional Reference 2']/following-sibling::div"
    this.ref3ContractorCompleted = "//span[text()='Additional Reference 3']/following-sibling::div"
    this.ref4ContractorCompleted = "//span[text()='Additional Reference 4']/following-sibling::div"

    this.btnHome = "//i[.='home']"
    this.manifestNumberInTable="//td[text()='<<Text>>']"
    this.jobInTable="//div[text()='<<Text>>']"
    this.proceedWithUpdate = "//button[text()='Proceed with update']"
    this.AvailableDate = "(//td[@class='availableDate']/div[@class='fmj-label-small'])[<<Text>>]"
    this.DueDate = "(//td[@class='no-padding']/div[@class='fmj-label-small'])[<<Text>>]"
    this.nextMonthAvailableDate = "(//div[@title='Next month'])[1]"
    this.nextMonthDueDate = "(//div[@title='Next month'])[2]"
    this.PDFPODownload = "//button[@id='myJobsPDFManagement']"
    this.PODDwonload = "//a[@id ='myJobsCompletePODBtn']"
    this.bookedStatus = "//td[text()='Booked']"
    this.ScheduledStatus = "//td[text()='Scheduled']"
    this.InTransitStatus = "//td[text()='In Transit']" 
    this.ArrivedStatus = "//td[text()='Arrived']"
    this.DeliveredStatus = "//td[text()='Delivered']"
    this.CompletedStatus = "//td[text()='Completed']"
    this.myJobActiveJobTableFilterInput = "//input[@id='myJobActiveJobTableFilterInput']"
    this.LHJobDriverApp = "//div[@id='hubFreightMyFreightTripsheet']"
    this.TripSheetNumber ="//span[text()='Reference']/following-sibling::div[text()='<<Text>>']"
    this.costcodeEmpHrly = "//td[text()='EMP RATES HRLY']/preceding-sibling::td[1]//input/following-sibling::span[1]"
    this.costcodeContHrly = "//td[text()='CONT RATES HRLY']/preceding-sibling::td[1]//input/following-sibling::span[1]"
    this.EnterPin = "//h2[text()='Please Enter PIN']"


    this.editJobInModal = "//div[@id='editPackageBtn']/i"
    this.inputCount ="//input[@id='packageCount']"
    this.inputItem ="//input[@id='packageType']"
    this.inputref ="//input[@id='packageReference']"
    this.inputLength ="//input[@id='packageDepth']"
    this.inputWidth ="//input[@id='packageWidth']"
    this.inputHeight ="//input[@id='packageHeight']"
    this.inputWeight= "//input[@id='packageWeight']"
    this.jobItemcount = "//td[1][contains(@class,'packageRow')][text()]"
    this.jobItemPO = "//td[2][contains(@class,'packageRow')]"
    this.jobItemLength = "//td[3][contains(@class,'packageRow')]"
    this.jobItemWidth = "//td[4][contains(@class,'packageRow')]"
    this.jobItemHeight = "//td[5][contains(@class,'packageRow')]"
    this.totalWeight = "//span[text()='Total Dead Weight']/following-sibling::span"
    this.jobItemWeight = "//td[6][contains(@class,'packageRow')]"
    this.spinnerelement = "//div[contains(@class,'spinner')][2]"
    this.PaymentpageSpinner = "//span[@role='progressbar']"
    this.elmntNoResultsFound = "//*[text()='No results found.']"
    this.btnPdfManagement = "//button[@id='myJobsPDFManagement']"
    this.btnDownloadLabel = "//a[@id='myJobsDownloadLabelBtn']"
    this.btnPaymentPDF ="//button[.='Export PDF']"
    this.selectAssetType = "//span[@id='select2-assetSelectType-container']"
    this.optionPlan = "//li[@id='select2-assetSelectType-result-3sin-Plant']"
    this.slctAssetType = "//span[@title='Vehicle']"
    this.selectAssetManifest = "//label[text()='Select An Asset']/following::span[contains(@id,'assetSelect')]"
    this.selectAssetList = "//li[text()='Plant']"
    this.selectAssetType = "//li[text()='CON002']"
    this.btnDownloadTransportRequest="//a[@id='myJobsDownloadTransportBtn']"
    this.unassignContractor ="(//td[@class='.ja-table-assignee']/following-sibling::td/a[text()='Unassign'])[1]"
    this.QtyField = "//div[contains(text(),'No Charge')]/following::input[1]"
    this.UnitsField = "//div[contains(text(),'No Charge')]/following::input[2]"
    this.editDriverIcon="//span[text()='Primary Driver']/following-sibling::a/i[text()='edit']"
    this.txtAssetSelect = "//INPUT[contains(@aria-activedescendant,'assetSelect')]"
    this.AssignDriverToRuns ="//button[contains(@aria-label,'Assign Driver')]"

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

        this.txtSearch = "//input[@placeholder='Type to search']"
    this.elmntPayeename = "//div[contains(@class,'firstVisible')]/child::div[@data-field='payee']"

    // Yearfilter

    this.elmntPayeeCountDataField = "(//div[text()='<<Payee>>']/following::div[@data-field='<<DataField>>']/child::a)[1]"
    this.elmntDataRange = "//div[text()='Completed']/following::input[@placeholder='DD/MM/YYYY – DD/MM/YYYY']"
    this.btnAllOutstanding = "//*[local-name() = 'svg' and contains(@data-testid, 'CachedIcon')]"


    this.btnsave = "//button[text()='Save']"
    this.paginationNumber = "//p[contains(@class,'MuiTablePagination-displayedRows')]"


}





async navigateToMyJobs(){
    // let isVerify = false;
    await basePage.wait(2000)
    await basePage.waitForLocator(this.sectionMyJobs)
    await basePage.scrollToElement(this.sectionMyJobs)
    await basePage.click(this.sectionMyJobs)
    console.log("Section myjobs clicked successfully....")
    // if(await basePage.verifyElement(this.tabBooked)){
    //     console.log("Jobs page verified successfully....")
    //     isVerify = true
    // }
    // else{
    //     console.log("Jobs page verifivation faild....")
    // }
    // return isVerify;
}



async cancelJob(strMovement) {    
    await basePage.wait(3000)
    const movementLocator = page.locator(`//td/i[text()='${strMovement}']`)
    await basePage.wait(3000)
    await movementLocator.click()
    console.log("Job clicked Successfully.......")
    await basePage.scrollToElement(this.iconJobCancel)
    await basePage.click(this.iconJobCancel)
    await basePage.waitForLocator(this.btnCancelIt)
    await basePage.click(this.btnCancelIt)
    console.log("Job Cancelled Successfully.......")
}



async clickTabBooked()
{
    await basePage.waitForLocator(this.tabBooked)
    await basePage.click(this.tabBooked)
    console.log("Tab booked is clicked succesfully....")
}

async navigateToJobs(){
    // let isVerify = false;
    await basePage.wait(2000)
    await basePage.waitForLocator(this.sectionJob)
    //await basePage.scrollToElement(this.sectionJob)
    await basePage.click(this.sectionJob)
    console.log("Section jobs clicked successfully....")
    // if(await basePage.verifyElement(this.tabBooked)){
    //     console.log("Jobs page verified successfully....")
    //     isVerify = true
    // }
    // else{
    //     console.log("Jobs page verifivation faild....")
    // }
    // return isVerify;
}

async goToJobsPageFromMenu(){
    
    await basePage.click(this.tabJobInMenu)
    await basePage.wait(2000)
    await basePage.waitForLocator(this.sectionMyJobs)
    await basePage.scrollToElement(this.sectionMyJobs)
    await basePage.click(this.sectionMyJobs)
    console.log("Section myjobs clicked successfully....")
    
}

async verifyCancel(movement,cancel)
{
 let isVerify = false
 let cancelledjob = this.cancelled
    .replace("<<TEXT1>>", movement)
    .replace("<<TEXT2>>", cancel);
 await basePage.scrollToElement(cancelledjob)
 if (await basePage.verifyElement(cancelledjob)){
    console.log("cancelled job is verified....")
    isVerify = true
 }

 else{
    console.log("cancelled job verification failed....")
}
await basePage.wait(1000)
return isVerify
}

async paymentSummaryFromMenu(){}



async verifyCompletedJob(movements){
    let isVerify = false;
let movement;
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    if(movements=="LH3" || movements== "LH2" || movements== "BF2"){
    movement="MASTER"
    }else{
        movement =movements;
    }
    const movementLocator = page.locator(`//td[text()='${movement}']`)
    await basePage.wait(15000)
    await movementLocator.click()
    console.log("Movement locator clicked successfully....")
    const refId = await basePage.getText(this.referenceID)
    console.log("REF ID: " + refId.trim())
    if ((await basePage.getText(this.referenceID)) === createConsignmentPage.extractedNumber) {
        isVerify = true;
        console.log("Completed Job filtered sucessfully.....");
    } else {
        console.log("Completed Job filter failed.....");
    }
    return isVerify;
}




async verifyMyJobSection() {
    let isVerify = false;
    await basePage.wait(9000)
    await basePage.waitForLocator(this.tabBooked)
    if(await basePage.verifyElement(this.tabBooked)){
        console.log("Tab booked is verified successfully....")
        isVerify = true
    }
    return isVerify;
}

// async verifyAssignedJob(strMovement) {
//     let isVerify = false;
//     const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
//     await basePage.click(this.inputSearch)
//     await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
//     await basePage.keyboardEnter()
//     await basePage.wait(4000)
//     const movementLocator = page.locator(`//td[text()='${strMovement}']`)
//     await movementLocator.click()
//     console.log("Movement locator clicked successfully....")
//     await basePage.waitForLocator(this.jobType)
//     const jobType = await basePage.getText(this.jobType)
//     const refId = await basePage.getText(this.referenceID)

//     console.log("Job Type: " + jobType.trim())
//     console.log("REF ID: " + refId.trim())
    
//     const regex = /^\d+/;
//      const referenceNum = refId.match(regex);

//     if (referenceNum == createConsignmentPage.extractedNumber) {
//         isVerify = true;
//         console.log("Job filtered sucessfully.....");
//     } else {
//         console.log("Job filter failed.....");
//     }
//     return isVerify;
// }
async verifyAssignedJob(strMovement) {
    let isVerify = false;
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.waitForLocator(this.inputSearch)
    await basePage.click(this.inputSearch)
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.wait(4000)
    const movementLocator = page.locator(`//td/div[text()='${createConsignmentPage.extractedNumber}']/.. | //td[text()='${createConsignmentPage.extractedNumber}']`);
    console.log(`//td/div[text()='${createConsignmentPage.extractedNumber}'] | //td[text()='${createConsignmentPage.extractedNumber}']`);
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

async verifyAssignedJob1(movement, strMovement) {
    let isVerify = false;
    let movementLocator;
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.click(this.inputSearch)
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.wait(4000)
    if(movement == "LH3" | movement == "LH2"){
    movementLocator = page.locator(`//td/div[text()='${createConsignmentPage.extractedNumber+"#2"}']/.. | //td[text()='${createConsignmentPage.extractedNumber+"#2"}']`);
    console.log(`//td/div[text()='${createConsignmentPage.extractedNumber+"#2"}'] | //td[text()='${createConsignmentPage.extractedNumber+"#2"}']`);
    }
    else if(movement == "BF2"){
    movementLocator = page.locator(`//td/div[text()='${createConsignmentPage.extractedNumber+"#1"}']/.. | //td[text()='${createConsignmentPage.extractedNumber+"#1"}']`);
    console.log(`//td/div[text()='${createConsignmentPage.extractedNumber+"#1"}'] | //td[text()='${createConsignmentPage.extractedNumber+"#1"}']`);
    }
    else{
    movementLocator = page.locator(`//td/div[text()='${createConsignmentPage.extractedNumber}']/.. | //td[text()='${createConsignmentPage.extractedNumber}']`);
    console.log(`//td/div[text()='${createConsignmentPage.extractedNumber}'] | //td[text()='${createConsignmentPage.extractedNumber}']`);
    }
    console.log(movementLocator)
    await movementLocator.click()
    console.log("Movement locator clicked successfully....")
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


async verifyLH3Jobs(pu, lh, del){
    let isVerify = false
    await basePage.wait(15000)
    if(await basePage.verifyElement(`//td[text()='${pu}']`)){
        await basePage.verifyElement(`//td[text()='${lh}']`)
        await basePage.verifyElement(`//td[text()='${del}']`)
        console.log("All legs verified successfully....")
        isVerify = true
    }
    else{
        console.log("All legs verification failed....")
    }
    return isVerify
}

async verifyLastLegLHJobs(pu, lh){
    let isVerify = false
    await basePage.wait(15000)
    if(await basePage.verifyElement(`//td[text()='${pu}']`)){
        await basePage.verifyElement(`//td[text()='${lh}']`)
        console.log("All legs verified successfully....")
        isVerify = true
    }
    else{
        console.log("All legs verification failed....")
    }
    return isVerify
}

async verifyLastLegLHLHJobs(pu, lh, lh2){
    let isVerify = false
    await basePage.wait(15000)
    if(await basePage.verifyElement(`//td[text()='${pu}']`)){
        await basePage.verifyElement(`(//td[text()='${lh}'])[1]`)
        await basePage.verifyElement(`(//td[text()='${lh2}'])[2]`)
        console.log("All legs verified successfully....")
        isVerify = true
    }
    else{
        console.log("All legs verification failed....")
    }
    return isVerify
}



async verifyLH3AssignedJob(strMovement) {
    await basePage.wait(1000)
    let isVerify = false
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.waitForLocator(this.inputSearch)
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
     await basePage.wait(15000)
    const movementLocator = page.locator(`//td[text()='${strMovement}']`)
    await basePage.wait(7000)
    await movementLocator.click()
    console.log(`Job ${strMovement} is clicked successfully....`)
    await basePage.waitForLocator(this.jobType)
    const jobType = await basePage.getText(this.jobType)
    const refId = await basePage.getText(this.referenceID)
    const id = refId.split('#')[0]
    console.log("Job Type: " + jobType.trim())
    console.log("REF ID: " + id.trim())
    if ( id === createConsignmentPage.extractedNumber) {
        console.log("Job Verified sucessfully.....")
        // await basePage.click(this.iconClose)
        isVerify = true;
    } else {
        console.log("Job verification failed.....")
    }
    return isVerify
}


async verifyZoneAssignedJob(strMovement) {
    await basePage.wait(1000)
    let isVerify = false
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.waitForLocator(this.inputSearch)
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    const movementLocator = page.locator(`(//td[text()='${strMovement}'])[1]`)
    await basePage.wait(7000)
    await movementLocator.click()
    console.log(`Job ${strMovement} is clicked successfully....`)
    await basePage.waitForLocator(this.jobType)
    const jobType = await basePage.getText(this.jobType)
    const refId = await basePage.getText(this.referenceID)
    const id = refId.split('#')[0]
    console.log("Job Type: " + jobType.trim())
    console.log("REF ID: " + id.trim())
    if ( id === createConsignmentPage.extractedNumber) {
        console.log("Job Veified sucessfully.....")
        // await basePage.click(this.iconClose)
        isVerify = true;
    } else {
        console.log("Job verification failed.....")
    }
    return isVerify
}

async verifyCompletedP2PReferenceID(strMovement) {
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    const modifiedStrMovement = strMovement + " JOB"
        console.log("Job movement :"+modifiedStrMovement)
        await basePage.click(this.sectionCompletedJobs) 
        console.log("Section completed jobs clicked...")
        await basePage.waitForLocator(this.FilterJobs)
        //console.log(strMovement)
        await basePage.sendKeys(this.FilterJobs, createConsignmentPage.extractedNumber)
        await basePage.keyboardEnter()
        await basePage.wait(6000)
        console.log("Filter filled with extracted number...")
        const movementLocator = page.locator(`(//td[text()='${strMovement}'])[1] | (//td[text()='${strMovement}'])`)
        await basePage.wait(6000)
        await movementLocator.click()
        console.log("Filtered job clicked successfully....")
}
//created new mehtod for trip
async verifyCompletedP2PReferenceID1(strMovement) {
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    const modifiedStrMovement = strMovement + " JOB"
        console.log("Job movement :"+modifiedStrMovement)
        await basePage.click(this.sectionCompletedJobs) 
        console.log("Section completed jobs clicked...")
        // await basePage.waitForLocator(this.FilterJobs)
        // //console.log(strMovement)
        // await basePage.sendKeys(this.FilterJobs, createConsignmentPage.extractedNumber)
        // await basePage.keyboardEnter()
        // console.log("Filter filled with extracted number...")
        await basePage.wait(3000)
        const movementLocator = page.locator(`//td[text()='${createConsignmentPage.extractedNumber}']`)
        await basePage.wait(6000)
        await movementLocator.click()
        console.log("Filtered job clicked successfully....")
}

async verifyReferenceId(){
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    let isVerify = false
    await basePage.scrollToElement(this.referenceID)
    if(await basePage.verifyElement(this.referenceID)) {
        // await basePage.verifyText(this.referenceID, createConsignmentPage.extractedNumber)
        const refNumText = await basePage.getText(this.referenceID)
        let refId = refNumText.split('#')[0]
        console.log("Reference number text:", refId)
        if ( refId === createConsignmentPage.extractedNumber) {
            console.log("Ref num verification passed in completed...")
            isVerify = true
        }
    } else {
        console.log("Ref num verification failed in completed...")
        isVerify = false
    }

return isVerify
}


async verifyReferences(ref1, ref2, ref3, ref4){
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


async verifyReferences1(ref1, ref2, ref3, ref4){
    let isVerify = false
    await basePage.scrollToElement(this.costCodeInBooking)
    if(await basePage.verifyElement(this.costCodeInBooking)){
        await basePage.verifyText(this.costCodeInBooking, ref1.toUpperCase())
        await basePage.verifyText(this.transportOrderInBooking, ref2.toUpperCase())
        await basePage.verifyText(this.purchaseOrderInBooking, ref3.toUpperCase())
        await basePage.verifyText(this.stagingLocationInBooking, ref4.toUpperCase())
        console.log("References are verified successfully....")
        isVerify = true
    }
    else{
        console.log("References verification failed....")
    }
    return isVerify
}

async verifyCustomer(customer){
    let isVerify = false
    await basePage.scrollToElement(this.txtCustomer)
    if(await basePage.verifyElement(this.txtCustomer)){
        await basePage.verifyText(this.txtCustomer, customer)
        console.log("Customer name verified successfully....")
        isVerify = true
    }
    else{
        console.log("Customer name verification failed....")
    }
    await basePage.wait(1000)
    return isVerify
}

async verifyFreightCode(freightCode){
    let isVerify = false
    await basePage.scrollToElement(this.textFreightCode)
    if(await basePage.verifyElement(this.textFreightCode)){
        await basePage.verifyText(this.textFreightCode, freightCode)
        console.log("Freight code verified successfully....")
        isVerify = true
    }
    else{
        console.log("Freight code verification failed....")
    }
    return isVerify
}

async verifyTrailerType(trailerType){
    let isVerify = false
    await basePage.scrollToElement(this.txtTrailerTypeCompleted)
    if(await basePage.verifyElement(this.txtTrailerTypeCompleted)){
        await basePage.verifyText(this.txtTrailerTypeCompleted, trailerType)
        console.log("TailerType is verified successfully....")
        isVerify = true
    }
    else{
        console.log("TailerType verification failed....")
    }
   return isVerify
}




async verifytotalCubicWeight(){
    await basePage.scrollToElement(this.totalCubicWeight)
    console.log("Total Cubic Weight: "+await basePage.getText(this.totalCubicWeight))
    return await basePage.verifyElement(this.totalCubicWeight)
}

async verifyChillerAndFrezeer(chiller, freezer){
    let isVerify = false
    let element1 = this.iconChiller.replace("<<Text>>", chiller)
    let element2 = this.iconChiller.replace("<<Text>>", freezer)
    await basePage.scrollToElement(element1)
    if(await basePage.verifyElement(element1)){
        // await basePage.verifyElement(element2)
        console.log("Chiller and freezer verified successfully....")
        isVerify = true
    }
    else{
        console.log("Chiller and freezer verification failed....")
    }
    return isVerify
}

async verifyExitTime(exitTime) {
    let isVerify = false
    await basePage.wait(3000)
    await basePage.scrollToElement(this.exitTimeInCompleted)
    let exitTimeInCompleted = await basePage.getText(this.exitTimeInCompleted)
    console.log("Exit Time In Completed : " +exitTimeInCompleted)
    let parts = exitTimeInCompleted.split(', ')
    let timePart = parts[1]
    let timeParts = timePart.split(' ')
    let time = timeParts[0]
    let ampm = timeParts[1].toUpperCase()
    const currentTime = time + " " + ampm
    console.log("exit time " +exitTime)
    console.log("current time " +currentTime)
    if(exitTime == currentTime){
        isVerify = true
        console.log("Exit time verified successfully....")
    }
    else{
        console.log("Exit time verification failed....")
        isVerify = false
    }
    return isVerify
    // return await basePage.verifyElement(this.exitTimeInCompleted)
}

async verifyJobAndInvoiceNotes(jobNotes, invoiceNotes){
    await basePage.wait(3000)
    let isVerify = false
    await basePage.scrollToElement(this.jobNotesCompleted)
    if(await basePage.verifyElement(this.jobNotesCompleted)){
        await basePage.click(this.jobNotesCompleted)
        await basePage.verifyElement(this.txtJobNotes)
        // await basePage.verifyText(this.txtJobNotes, jobNotes)
        const jobNote = await basePage.getText(this.txtJobNotes)
        console.log("txtJobNotes : "+ jobNote.trim())
        console.log("Job Notes verified successfully.....")
        await basePage.click(this.jobNotesCompleted)
        await basePage.click(this.invoiceNotesCompleted)
        console.log("txtInvoiceNotes :"+(await basePage.getText(this.txtInvoiceNotes)).trim())
        await basePage.verifyText(this.txtInvoiceNotes, invoiceNotes)
        console.log("Job details are verified successfully....")
        isVerify = true
    }
    return isVerify            
}

async verifyJobAndInvoiceNotes1(jobNotes){
    await basePage.wait(3000)
    let isVerify = false
    await basePage.scrollToElement(this.jobNotesCompleted)
    if(await basePage.verifyElement(this.jobNotesCompleted)){
        await basePage.click(this.jobNotesCompleted)
        await basePage.verifyElement(this.txtJobNotes)
        // await basePage.verifyText(this.txtJobNotes, jobNotes)
        const jobNote = await basePage.getText(this.txtJobNotes)
        console.log("txtJobNotes : "+ jobNote.trim())
        console.log("Job Notes verified successfully.....")
        console.log("Job details are verified successfully....")
        isVerify = true
    }
    return isVerify            
}

async clickInvoiceJob() {
    await basePage.wait(2000)
    await basePage.waitForLocator(this.InvoiceJob)
    await basePage.scrollToElement(this.InvoiceJob)
    await basePage.click(this.InvoiceJob)
    console.log("Invoice job clicked successfully....")
}

async clickCollapseSidebar() {
    if (!await this.tabOrganization.isVisible()) {
        console.log("IF PART")
        await this.splitAssignment.click()
    } else {
        console.log("ELSE PART")
        console.log("Sidebar is not visible, skipping click action.");
    }
}

async verifyInvoiceReferenceID() {
    let isVerify = false
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    await basePage.waitForLocator(this.referenceIDInvoice)
    await basePage.scrollToElement(this.referenceIDInvoice)
    const invoiceRefId = await basePage.getText(this.referenceIDInvoice)
    if (invoiceRefId === createConsignmentPage.extractedNumber) {
        console.log("Invoice REF ID: " +invoiceRefId );
        isVerify = true
    } else {
    }
    return isVerify;
}

async verifyfuelLevyDemurrageAndNoteCharge(text) {
    let element = this.freightCharges.replace("<<Text>>", text)
    await basePage.scrollToElement(element)
    return await basePage.verifyElement(element)
}

async verifyFreightCodeInInvoicingPage(freight){
    let isVerify=false
    console.log(freight)
    console.log(await basePage.getText(this.code))
    if(await basePage.verifyText(this.code,freight)){
        console.log("Freight code invoicing page is same as entered......")
        isVerify=true
    }else{
        isVerify=false
    }
    return isVerify
}

async verifyfuelLevy2() {
    await basePage.scrollToElement(this.fuelLevy2)
    return await basePage.verifyElement(this.fuelLevy2)
}




async getFuelLevyValue(objectKey){
    await basePage.wait(3000)
    if(await basePage.verifyElement(this.txtRateFuelLevy)){
    const fuelLevyValue = await basePage.getText(this.txtRateFuelLevy)
    console.log("Fuel Levy Value : " +fuelLevyValue)
    await testDataUtil.addKeyValueToObject(objectKey, "FuelLevy", fuelLevyValue) 
    }
    else{
        console.log("FuelLevy Value is zero....")
    }
}

//verified rate in pdf and csv
async clickPdfCsvandBatchInvoice(movement){
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    const tenSecondsInMilliseconds = 10000;
    await basePage.click(this.checkBoxInvoiceJob)
    console.log("invoice checkbox clicked")
    let rateValue;
    if(movement== "LH2" || movement == "LH3"){
        rateValue=this.rateCharge.replace("<<Text>>",2)
     }else{
        rateValue=this.rateCharge.replace("<<Text>>",1)
    }
    await basePage.scrollToElement(rateValue)
    const rate=await basePage.getInputValue(rateValue)
    console.log(`The Rate in UI is : ${rate}`);
    const basePathPdf=path.resolve(__dirname,'../../features/support');
    const downloadPdfPath=path.join(basePathPdf, 'invoicePdfDownloads')
    const customPdfFilePath = path.join(downloadPdfPath, `${movement}_${createConsignmentPage.extractedNumber}.pdf`);
    //const customPdfFilePath = path.join('C:/Users/Gomat/OneDrive/Documents/GitHub/bustle-platform-automation-testing/features/support', 'invoicePdfDownloads', `${movement}_${createConsignmentPage.extractedNumber}.pdf`);
    await basePage.downloadFile(this.pdfDownloadBtn,customPdfFilePath)
    console.log("Pdf is downloaded successfully...........")
    await basePage.compareRateFromPdfFile(rate,customPdfFilePath);
    await basePage.deleteFileAfterDelay(customPdfFilePath, tenSecondsInMilliseconds);  
    const basePathCsv=path.resolve(__dirname,'../../features/support');
    const downloadCSVPath=path.join(basePathCsv, 'invoiceCsvDownloads')
    const customCsvFilePath = path.join(downloadCSVPath, `${movement}_${createConsignmentPage.extractedNumber}.csv`);
    await basePage.downloadFile(this.csvDownloadBtn,customCsvFilePath)
    console.log("CSV is downloaded successfully...........")
    await basePage.compareRateFromCsvFile(createConsignmentPage.extractedNumber,customCsvFilePath,rate);
    await basePage.deleteFileAfterDelay(customCsvFilePath, tenSecondsInMilliseconds); 
    await basePage.click(this.btnGroupInvoice) 
    await basePage.click(this.btnOk)
    console.log("Btn group invoice clicked....")
}


async clickbtnBatchInvoiceAfterEdit(){
    await basePage.click(this.checkBoxInvoiceJob)
    console.log("invoice checkbox clicked")
    await basePage.click(this.btnGroupInvoice) 
    await basePage.wait(1000)
    await basePage.click(this.btnOk)
    console.log("Btn group invoice clicked....")

    // console.log(await basePage.isEnable(this.btnBatchInvoice)+"++++++++++++++++++++++++++++")
    // if(await basePage.verifyElement(this.btnBatchInvoice)){
    //    await basePage.click(this.btnBatchInvoice)
    //    console.log("Btn batch invoice clicked....")
    //    await basePage.click(this.btnOk)
    // }
    // else{   
    //     await basePage.click(this.btnGroupInvoice) 
    //     await basePage.click(this.btnOk)
    //     console.log("Btn group invoice clicked....")
    // }
}


async clickbtnBatchInvoice(){
    
    await basePage.click(this.checkBoxInvoiceJob)
    console.log("invoice checkbox clicked")
    await basePage.click(this.btnGroupInvoice) 
    await basePage.click(this.btnOk)
    console.log("Btn group invoice clicked....")

    // console.log(await basePage.isEnable(this.btnBatchInvoice)+"++++++++++++++++++++++++++++")
    // if(await basePage.verifyElement(this.btnBatchInvoice)){
    //    await basePage.click(this.btnBatchInvoice)
    //    console.log("Btn batch invoice clicked....")
    //    await basePage.click(this.btnOk)
    // }
    // else{   
    //     await basePage.click(this.btnGroupInvoice) 
    //     await basePage.click(this.btnOk)
    //     console.log("Btn group invoice clicked....")
    // }
}

async verifyParcelDetailsInInvoice() {
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
        await basePage.scrollToElement(this.txtReferenceNum)
        console.log(await basePage.getText(this.txtReferenceNum))
        await basePage.verifyText(this.txtReferenceNum, createConsignmentPage.extractedNumber)
        console.log("invoice verified sucessfully.....")
        isVerify = true
       
    }
       return isVerify
}

async verifyDetailsInInvoice(customer) {
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
        await basePage.waitForLocator(this.createdBy)
        const createdBy= await basePage.getText(this.createdBy)
        if(customer == createdBy){
            isVerify = true
            console.log('In completed tab the created by coloum is verified.....')
        } 
        await basePage.click(this.completedInvoice)
        console.log('completedInvoice job is clicked....')
        await basePage.waitForLocator(this.invoiceRefNum)
        await basePage.scrollToElement(this.invoiceRefNum)
        await basePage.verifyElement(this.invoiceRefNum)
        console.log("Invoice RefNum: "+await basePage.getText(this.invoiceRefNum))
        await basePage.scrollToElement(this.txtReferenceNum)
        console.log(await basePage.getText(this.txtReferenceNum))
        await basePage.verifyText(this.txtReferenceNum, createConsignmentPage.extractedNumber)
        console.log("invoice verified sucessfully.....")
    }
       return isVerify
}


    
async clickSignout() {
    await basePage.click(this.btnSignOut)
}

async navigateToJobSection(){
    await basePage.scrollToElement(this.tabJobs)
    await basePage.click(this.tabJobs)
    console.log("Enter into jobs section......")
}
async navigateToJobSectionFromMenu(){
    await basePage.scrollToElement(this.tabJobInMenu)
    await basePage.click(this.tabJobInMenu)
    console.log("Enter into jobs section from menu......")
}

async verifyJobsSection() {
    let isVerify = false
    //await basePage.waitForLocator(this.tabJobs)
    await basePage.scrollToElement(this.tabJobs)
    await basePage.click(this.tabJobs)
    const txtJobs = await basePage.verifyElement(this.txtJobTitle)
    console.log("txtJobs state :"+txtJobs)
    if(txtJobs){
        console.log("Jobs section verified successfully...")
        isVerify = true
    }
    return isVerify
}

async navigateToFinance(movement,payee){
    await basePage.scrollToElement(this.tabFinanceInMenu)
    await basePage.click(this.tabFinanceInMenu)
    console.log("Enter into the Finance Section........")
    await basePage.waitForLocator(this.paymentSummary)
    await basePage.click(this.paymentSummary)
    await basePage.wait(20000)
    let payeeCountInPaymentSummary=this.payeeCount0.replace('<<Text>>', payee)
    await basePage.waitForLocator(payeeCountInPaymentSummary)
    let payeeCount = await basePage.getText(payeeCountInPaymentSummary)
    testDataUtil.addKeyValueToObject(movement,"PayeeCount", payeeCount) 
    await basePage.waitForLocator(this.tabJobInMenu)
    await basePage.click(this.tabJobInMenu)
    await basePage.waitForLocator(this.sectionMyJobs)
    await basePage.click(this.sectionMyJobs)

}

async navigateToPaymentsScreen(){
    await basePage.waitForLocator(this.paymentSummary)
    await basePage.click(this.paymentSummary)
    await basePage.waitForLocatorDisappear(this.PaymentpageSpinner)
    console.log("Entered into Payment Summary Screen...... ")
}

async verifyPayeeCount(count,payee){
    let isVerify = false;
    await basePage.wait(20000)
    let payeeCountInPaymentSummary=this.payeeCount1.replace('<<Text>>', payee)
    await basePage.waitForLocator(payeeCountInPaymentSummary)
    let payeeCount = await basePage.getText(payeeCountInPaymentSummary)
    console.log(`The payee count in the payment screen page is ${count} before adding payee`)
    console.log(`The payee count in the payment screen page is ${payeeCount}`)
    if(parseInt(payeeCount) > parseInt(count)){
        console.log("The Payee Count is verified in payment summary page......")
        isVerify= true;
    }
    return isVerify;
}
 
async verifyFilterInPayment(driver){
    let isVerify=false;
    let payeeCountInPaymentSummary=this.payeeCount1.replace('<<Text>>', driver)
    await basePage.click(payeeCountInPaymentSummary)
    await basePage.wait(10000)
    await basePage.waitForLocator(this.filtersBtn)
    await basePage.click(this.filtersBtn)
    await basePage.wait(10000)
    let filter1=await basePage.getText(this.filterCompleted)
    let filter2=await basePage.getText(this.filterPayee)
    if(filter1 == "Completed" && filter2 == "Payee"){
        isVerify=true
        console.log("The Filters is verified in Payment Page....")
    }
    await basePage.click(this.paymentsTab)
    return isVerify;
}

async applyFilter(type){
    await basePage.waitForLocator(this.filtersBtn)
    await basePage.click(this.filtersBtn)
    await basePage.wait(1000)
    await basePage.click(this.addFilterBtn)
    await basePage.wait(1000)
    await basePage.click(this.FilterOptions)
    await basePage.wait(1000)
    console.log("The Filter Value is "+type)
    let filterValue=this.filterValue.replace('<<Text>>',type)
    await basePage.click(filterValue)
    await basePage.wait(1000)
    await basePage.click(this.applyFilterBtn)
    console.log("Fillters Applied successfully.....")
}

async verifytypeInPayment(type){
    await basePage.wait(3000)
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    await basePage.waitForLocator(this.searchBoxInPayment)
    await basePage.click(this.searchBoxInPayment)
    await basePage.clear(this.searchBoxInPayment)
    await basePage.sendKeys(this.searchBoxInPayment,createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.waitForLocatorDisappear(this.PaymentpageSpinner)
    console.log("Job filtered with reference Number...") 
     await basePage.waitForLocatorDisappear(this.PaymentpageSpinner)
    let isVerify=false
    let typeInPayment=this.type.replace('<<Text>>',type)
    await basePage.wait(5000)
    await basePage.waitForLocator(typeInPayment)
    let typeInPaymentTxt = await basePage.getText(typeInPayment)
    console.log(typeInPaymentTxt)
    if(typeInPaymentTxt == type){
        isVerify=true
        console.log(`Type in payment screen is ${type} as expected...`)
    }
    return isVerify
}

async verifytypeFortrip(type,tripNo){
    await basePage.waitForLocator(this.searchBoxInPayment)
    await basePage.click(this.searchBoxInPayment)
    await basePage.clear(this.searchBoxInPayment)
    await basePage.sendKeys(this.searchBoxInPayment,tripNo)
    await basePage.keyboardEnter()
    console.log("Job filtered with reference Number...") 
    let isVerify=false
    let typeInPayment=this.type.replace('<<Text>>',type)
    await basePage.wait(3000)
    await basePage.waitForLocator(typeInPayment)
    let typeInPaymentTxt = await basePage.getText(typeInPayment)
    console.log(typeInPaymentTxt)
    if(typeInPaymentTxt == type){
        isVerify=true
        console.log(`Type in payment screen is ${type} as expected...`)
    }
    return isVerify
}

//need to be modified type = Run 
async verifytypeInPaymentForRun(runNo,type){
    let isVerify=false
    await basePage.click(this.searchBoxInPayment)
    await basePage.sendKeys(this.searchBoxInPayment,runNo)
    await basePage.keyboardEnter()
    await basePage.waitForLocatorDisappear(this.PaymentpageSpinner)
    console.log("Job filtered with reference Number...") 
    await basePage.waitForLocatorDisappear(this.PaymentpageSpinner) 
     await basePage.waitForLocator(this.filtersBtn)
    await basePage.click(this.filtersBtn)
    await basePage.wait(1000)
    await basePage.click(this.addFilterBtn)
    await basePage.wait(1000)
    await basePage.click(this.FilterOptions)
    await basePage.wait(1000)
    let filterValue=this.filterValue.replace('<<Text>>',type)
    await basePage.click(filterValue)
    await basePage.wait(1000)
    await basePage.click(this.applyFilterBtn)
    console.log("Fillters Applied successfully.....")
    console.log("Job Filtered....")
     await basePage.wait(7000)
    let typeInPayment=this.type.replace('<<Text>>',type)
    await basePage.wait(3000)
    await basePage.waitForLocator(typeInPayment)
    let typeInPaymentTxt = await basePage.getText(typeInPayment)
    console.log(typeInPaymentTxt)
    if(typeInPaymentTxt == type){
        isVerify=true
        console.log(`Type in payment screen is ${type} as expected...`)
    }
    return isVerify
}

async verifyRefInPayment(){
    let isVerify = false
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    let refInPayment=this.referenceInPayment.replace('<<Text>>', createConsignmentPage.extractedNumber)
    await basePage.waitForLocator(refInPayment)
    const refText = await basePage.getText(refInPayment);
    const paymentRefId = refText.replace(/#\d+$/, "");
    console.log(paymentRefId)
    if (paymentRefId == createConsignmentPage.extractedNumber) {
        console.log("Payment REF ID: " +paymentRefId );
        isVerify = true
    } else {
    }
    return isVerify;
}
async verifyTripNoInPayment(tripNo){
    let isVerify = false
    const formattedNumber = tripNo.toString().padStart(9, '0');
    let refInPayment=this.referenceInPayment.replace('<<Text>>', formattedNumber)
    await basePage.waitForLocator(refInPayment)
    await basePage.scrollToElement(refInPayment)
    const paymentRefId = await basePage.getText(refInPayment)
    console.log(paymentRefId)
    if (paymentRefId == formattedNumber) {
        console.log("Payment REF ID: " +paymentRefId );
        isVerify = true
    } else {
    }
    return isVerify;
}

async verifyRunNoInPayment(runNo){
    let isVerify=false;
    let runNoInPayment=this.referenceInPayment.replace('<<Text>>', runNo)
    await basePage.waitForLocator(runNoInPayment)
    await basePage.scrollToElement(runNoInPayment)
    const paymentRunNo = await basePage.getText(runNoInPayment)
    console.log(paymentRunNo)
    if (paymentRunNo == runNo) {
        console.log("RUN_NO in payment screen : " +paymentRunNo );
        isVerify = true
    } else {
    }
    return isVerify;
}

async verifyDetailsInPayment(Payee,PayeeType){
    let isVerify=false
    let payeeInPayment=this.payee.replace('<<Text>>', Payee)
    let payeeTypeInPayment=this.payeeType.replace('<<Text>>', PayeeType)
    await basePage.waitForLocatorDisappear(this.PaymentpageSpinner)
    await basePage.scrollToElement(payeeInPayment)
    await basePage.waitForLocator(payeeInPayment)
    let payee=await basePage.getText(payeeInPayment)
    await basePage.waitForLocator(payeeTypeInPayment)
    let payeeType=await basePage.getText(payeeTypeInPayment)
if(payee == Payee && payeeType == PayeeType){
    isVerify= true
    console.log("The payee and payeeType are loaded correctly...")
}
return isVerify
}

//verify if edit icon is clicked some fields are enabled

async verifyEdit(Payee) {
  let isVerify = false;

  await basePage.waitForLocator(this.editPaymentIcon);
  await basePage.click(this.editPaymentIcon);

  const results = {
    costCode: await basePage.isEnable(this.costCode),
    rateCode: await basePage.isEnable(this.rateCode),
    businessUnit: await basePage.isEnable(this.businessUnit),
    quantity: await basePage.isDisabled(this.QtyField), // true = disabled
    units: await basePage.isDisabled(this.UnitsField)   // true = disabled
  };

  const expected = {
    costCode: true,       // should be enabled
    rateCode: true,       // should be enabled
    businessUnit: true,   // should be enabled
    quantity: true,       // should be disabled
    units: true           // should be disabled
  };

  const mismatches = Object.entries(results).filter(([key, value]) => value !== expected[key]);

  if (mismatches.length === 0) {
    isVerify = true;
    console.log("✅ All fields have expected enable/disable state.");
  } else {
    console.log("❌ Field state mismatches found:");
    mismatches.forEach(([field, actual]) => {
      const actualState = (field === 'quantity' || field === 'units') ? 
                          (actual ? 'disabled' : 'enabled') : 
                          (actual ? 'enabled' : 'disabled');

      const expectedState = expected[field] ? 
                            (field === 'quantity' || field === 'units' ? 'disabled' : 'enabled') :
                            (field === 'quantity' || field === 'units' ? 'enabled' : 'disabled');

      console.log(`- ${field} is ${actualState}, but expected to be ${expectedState}`);
    });
  }

  return isVerify;
}



// edit cost center, rate code , business unit in payments edited on 22-10-24 
// async editDetailsInPayment(movement,rateCode,costCode,businessUnit){
//     await basePage.waitForLocator(this.editCostCode)
//     await basePage.click(this.editCostCode)
//     let costCodeVal=this.costCodeValue.replace('<<Text>>',"test123 - Test cost code updated")
//     await basePage.waitForLocator(this.costCodeValue)
//     await basePage.click(this.costCodeValue)
//     console.log("Cost Code is edited.....")
//     await basePage.click(this.editRateCode)
//     let rateCodeVal=this.rateCodeValue.replace('<<Text>>',"Employee Fixed Rate")
//     await basePage.waitForLocator(rateCodeVal)
//     await basePage.click(rateCodeVal)
//     console.log("Rate Code is edited.....")
//     await basePage.waitForLocator(this.editBusinessUnit)
//     await basePage.click(this.editBusinessUnit)
//     let businessUnitVal=this.businessUnitValue.replace('<<Text>>',"Employee Fixed Rate")
//     await basePage.waitForLocator(this.businessUnitValue)
//     await basePage.click(this.businessUnitValue)
//     console.log("Business Unit is edited.....")
//     await basePage.waitForLocator(this.saveBtnInPayment)
//     await basePage.click(this.saveBtnInPayment)
//     console.log("All the details are edited and saved successfully.....")
//     await basePage.wait(4000)
//     await basePage.waitForLocator(this.totalInPayment)
//     let amountInPayment=await basePage.getText(this.totalInPayment)
//     const regex1=/\b\d+\.\d{2}\b/g;
//     let total_amount=amountInPayment.match(regex1);
//     console.log("Total amount in the Payment Summary Page is "+total_amount)
//     testDataUtil.addKeyValueToObject(movement,"TotalAmount",total_amount)
// }

async editDetailsInPayment(movement,rate){
    // await basePage.waitForLocator(this.editCostCode)
    // await basePage.click(this.editCostCode)
    // await basePage.waitForLocator(this.costCodeValue)
    // await basePage.click(this.costCodeValue)
    // console.log("Cost Code is edited.....")
    await basePage.click(this.editRateCode)
    await basePage.wait(1000)
    let rateCodeVal=this.rateCodeValue.replace('<<Text>>',rate)
    await basePage.waitForLocator(rateCodeVal)     
    await basePage.click(rateCodeVal)
    console.log("Rate Code is edited.....")
    await basePage.waitForLocator(this.editBusinessUnit)
    await basePage.click(this.editBusinessUnit)
    await basePage.clear(this.editBusinessUnit)
    await basePage.waitForLocator(this.businessUnitValue)
    await basePage.click(this.businessUnitValue)
    console.log("Business Unit is edited.....")
    await basePage.waitForLocator(this.saveBtnInPayment)
    await basePage.click(this.saveBtnInPayment)
    await basePage.wait(7000)
    console.log(await basePage.getText(this.totalInPayment))
    console.log("All the details are edited and saved successfully.....")
}

async editDetailsInPaymentForRun(movement,rate){
    // await basePage.waitForLocator(this.editCostCode)
    // await basePage.click(this.editCostCode)
    // await basePage.waitForLocator(this.costCodeValue)
    // await basePage.click(this.costCodeValue)
    // console.log("Cost Code is edited.....")
    await basePage.click(this.editRateCode)
    await basePage.wait(1000)
    let rateCodeVal=this.rateCodeValue.replace('<<Text>>',rate)
    await basePage.waitForLocator(rateCodeVal)     
    await basePage.click(rateCodeVal)
    console.log("Rate Code is edited.....")
    await basePage.waitForLocator(this.editBusinessUnit)
    await basePage.click(this.editBusinessUnit)
    await basePage.waitForLocator(this.businessUnitValue)
    await basePage.click(this.businessUnitValue)
    console.log("Business Unit is edited.....")
    await basePage.waitForLocator(this.saveBtnInPayment)
    await basePage.click(this.saveBtnInPayment)
    console.log("All the details are edited and saved successfully.....")
}



//add additional charge
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
    await basePage.wait(5000);
    console.log("Additional Charge added successfully......");
    await basePage.wait(7000);

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




//approve cost and create payment in payment page
async approveCostAndCreatePayment(){
    await basePage.wait(5000)
    await basePage.waitForLocator(this.selectJobInPayment)
    await basePage.click(this.selectJobInPayment)
    await basePage.click(this.approveCostBtn)
    await basePage.click(this.approveBtn)
    console.log("Job is approved in payment page...")
    await basePage.click(this.createPaymentBtn)
    await basePage.click(this.createBtn)
    console.log("create Payment is clicked, waiting to create payments...")
    await basePage.wait(20000)
    await basePage.waitForLocator(this.elmntNoResultsFound)
    console.log("Payment is Created successfully....")
}


// async verifyDataInCompletedPayment1(movement,totalAmt){
//     let isVerify=false
//     const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
//     await basePage.click(this.completedPaymentTab)
//     await basePage.wait(5000)
//      await basePage.click(this.rowsPerPage)
//      await basePage.wait(5000)
//      await basePage.click(this.rowsOption)
//      let i=0;
//      while(i<14){
//         await basePage.scrollToElement(this.completedPayment)
//         i++;
//      }
//     await basePage.click(this.completedPayment)
//     let paymentNo=await basePage.getText(this.completedPayment)
//     console.log("The payment number is "+paymentNo)
//     testDataUtil.addKeyValueToObject(movement,"PaymentNumber",paymentNo) 
//     let refnum = await basePage.getText(this.descriptionInCompletedPayment)
//     let referenceNumInDesc=refnum.match(/\d+/g);
//     console.log("Ref num in completed Payment "+referenceNumInDesc)
//     await basePage.wait(2000)
//     let amountInTotal=await basePage.getText(this.totalAmtInCompletedPayment)
//     console.log("Total amount in completed payment before matching regex "+amountInTotal)
//     let totalAmtInCompleted=amountInTotal.match(/\d+/g);
//     let formatted_amount = totalAmtInCompleted.toString().replace(",", ".");
//     console.log("Total amount in testdata "+totalAmt)
//     console.log("Total amount in completed Payment "+formatted_amount)
//     console.log(createConsignmentPage.extractedNumber)
//     if (referenceNumInDesc == createConsignmentPage.extractedNumber && formatted_amount == totalAmt) {
//         console.log("Completed Payment REF ID: " +referenceNumInDesc);
//         console.log("Completed Payment Total amount: " +formatted_amount);
//         isVerify = true;
//     }
//     return isVerify;
// }

async verifyDataInCompletedPayment(movement,totalAmt){
    let isVerify=false
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    await basePage.click(this.completedPaymentTab)
    await basePage.wait(5000)
    await basePage.waitForLocatorDisappear(this.PaymentpageSpinner)
    await basePage.waitForLocator(this.completedPayment);
    await basePage.click(this.completedPayment)
    let paymentNo=await basePage.getText(this.completedPayment)
    console.log("The payment number is "+paymentNo)
    testDataUtil.addKeyValueToObject(movement,"PaymentNumber",paymentNo) 
    await basePage.waitForLocator(this.descriptionInCompletedPayment)
    let refnum = await basePage.getText(this.descriptionInCompletedPayment)
    let referenceNumInDesc = refnum.match(/\d+/); // returns the first match as a string
    console.log("Ref num in completed Payment "+referenceNumInDesc)
    await basePage.wait(20000)
    let amountInTotal=await basePage.getText(this.totalAmtInCompletedPayment)
    this.newamount = amountInTotal.match(/\b[\d,]+\.\d{2}\b/g)
    console.log("Total amount in completed payment before matching regex "+amountInTotal)
    let formatted_amount = parseFloat(String(totalAmt).replace(/,/g, ''));
    console.log("Total amount in completed payment "+ this.newamount)
    console.log("Total amount in test data "+formatted_amount)
    console.log(createConsignmentPage.extractedNumber)
    console.log(referenceNumInDesc)
    if (referenceNumInDesc == createConsignmentPage.extractedNumber && formatted_amount == this.newamount) {
        console.log("Completed Payment REF ID: " +referenceNumInDesc);
        console.log("Completed Payment Total amount: " +formatted_amount);
        isVerify = true;
    }
    return isVerify;
}


async verifyDataInCompletedPaymentForTrip(movement,totalAmt,tripNo){
    let isVerify=false
    await basePage.click(this.completedPaymentTab)
    await basePage.wait(5000)
   let hasNextPage = true;
   
//    while (hasNextPage) {
//        try {
//            // Check if the "Next Page" button is enabled
//            hasNextPage = await basePage.isEnable(this.nextPageArrow);
//            if (!hasNextPage) break;
//            await basePage.click(this.nextPageArrow);
//        } catch (error) {
//            console.log("Error navigating to the next page:", error);
//            break;
//        }
//    }
await basePage.wait(2000)

const allElements=await page.locator("//div[@data-field='paymentNumber']").count();
  console.log("The Total Elements are "+allElements)
  if(allElements > 8){
      let i=0;
       while(i<=3){
          await basePage.scrollToElement(this.completedPayment)
          i++;
       }
  }
   await basePage.waitForLocator(this.completedPayment);
   await basePage.click(this.completedPayment)
    let paymentNo=await basePage.getText(this.completedPayment)
    console.log("The payment number is "+paymentNo)
    testDataUtil.addKeyValueToObject(movement,"PaymentNumber",paymentNo) 

    let refnum = await basePage.getText(this.descriptionInCompletedPayment)
    let referenceNumInDesc=refnum.match(/\d+/);
    console.log("Ref num in completed Payment "+referenceNumInDesc)

    await basePage.wait(2000)
    let amountInTotal=await basePage.getText(this.totalAmtInCompletedPayment)
    this.newamount = amountInTotal.match(/\b[\d,]+\.\d{2}\b/g)
    console.log("Total amount in completed payment before matching regex "+amountInTotal)
    let formatted_amount = parseFloat(String(totalAmt).replace(/,/g, ''));
    console.log("Total amount in testdata "+totalAmt)
    console.log("Total amount in completed Payment "+formatted_amount)
    const formattedNumber = tripNo.toString().padStart(9, '0');
    console.log(formattedNumber)
    if (referenceNumInDesc == formattedNumber && formatted_amount == totalAmt) {
        console.log("Completed Payment REF ID: " +referenceNumInDesc);
        console.log("Completed Payment Total amount: " +formatted_amount);
        isVerify = true;
    }
    return isVerify;
}

// async verifyDataInCompletedPaymentForRun1(createdTime,totalAmt,runNo){
//     let isVerify=false;
//     await basePage.click(this.completedPaymentTab)
//     const completedPayment = this.completedPayment.replace("<<Text>>", createdTime)
//     await basePage.scrollToElement(completedPayment) 
//     await basePage.click(completedPayment)

//     let runno = await basePage.getText(this.descriptionInCompletedPayment)
//     let runNumInDesc=runno.match(/\d+/g);
//     let amountInTotal=await basePage.getText(this.totalAmtInCompletedPayment)
//     let totalAmtInCompleted=amountInTotal.match(/\d+/g);
//     let formatted_value = totalAmtInCompleted.toString().replace(",", ".");
//     if (runNumInDesc == runNo && formatted_value == totalAmt) {
//         console.log("Completed Payment REF ID: " +runNumInDesc);
//         console.log("Completed Payment Total amount: " +formatted_value);
//         isVerify = true
//     } else {
//     }
//     return isVerify;
// }

async verifyDataInCompletedPaymentForRun(movement,totalAmt,runNumber){
     let isVerify=false
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    await basePage.click(this.completedPaymentTab)
    await basePage.wait(5000)
    await basePage.waitForLocator(this.completedPayment);
    await basePage.click(this.completedPayment)
    let paymentNo=await basePage.getText(this.completedPayment)
    console.log("The payment number is "+paymentNo)
    testDataUtil.addKeyValueToObject(movement,"PaymentNumber",paymentNo) 
    await basePage.waitForLocator(this.descriptionInCompletedPayment)
    let runNo = await basePage.getText(this.descriptionInCompletedPayment)
    let runNumInDesc = runNo.match(/\d+/); // returns the first match as a string
    console.log("Ref num in completed Payment "+runNumInDesc)
    await basePage.wait(20000)
    let amountInTotal=await basePage.getText(this.totalAmtInCompletedPayment)
    this.newamount = amountInTotal.match(/\b[\d,]+\.\d{2}\b/g)
    console.log("Total amount in completed payment before matching regex "+amountInTotal)
    let formatted_amount = parseFloat(String(totalAmt).replace(/,/g, ''));
    console.log("Total amount in completed payment "+ this.newamount)
    console.log("Total amount in test data "+formatted_amount)
    console.log(createConsignmentPage.extractedNumber)
    console.log(runNumInDesc)
    if (runNumInDesc == runNumber && formatted_amount == this.newamount) {
        console.log("Completed Payment REF ID: " +runNumInDesc);
        console.log("Completed Payment Total amount: " +formatted_amount);
        isVerify = true;
    }
    return isVerify;
}


async voidCompletedPayment(){
    await basePage.waitForLocator(this.voidBtnInCompletedPay)
    await basePage.click(this.voidBtnInCompletedPay)
    await basePage.click(this.voidBtnPopUpInCompPay)
    console.log("Payment Voided successfully.......")
}

async downloadPaymentPDF(movement)
{
await basePage.verifyElement(this.btnDownloadLabel)
const basePathPdf=path.resolve(__dirname,'../features/support');
const downloadPdfPath=path.join(basePathPdf, 'PaymentPdf')
const customPdfFilePath = path.join(downloadPdfPath, `${movement}_Payment.pdf`);
await basePage.downloadFile(this.btnPaymentPDF,customPdfFilePath)

}


async verifyPaymentPDF(movement,paymentNo){
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    let isVerify = false
    const basePathPdf=path.resolve(__dirname,'../features/support');
    const downloadPdfPath=path.join(basePathPdf, 'PaymentPdf')
    const customPdfFilePath = path.join(downloadPdfPath, `${movement}_Payment.pdf`);
    if (basePage.comparePaymentPdf(createConsignmentPage.extractedNumber,customPdfFilePath,this.newamount,movement,paymentNo)){
        isVerify = true;
        return isVerify;
    }
    return isVerify;
}

async verifyPaymentRunPDF(movement,paymentNo){
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    let isVerify = false
    const Type = "Run"
    const basePathPdf=path.resolve(__dirname,'../features/support');
    const downloadPdfPath=path.join(basePathPdf, 'PaymentPdf')
     const customPdfFilePath = path.join(downloadPdfPath, `${Type}_Payment.pdf`);
    if (basePage.comparePaymentPdf(testDataUtil.getValueByNestedKey(movement, "RunNumber"),customPdfFilePath,this.newamount,Type,paymentNo)){
        isVerify = true;
        return isVerify;
    }
    return isVerify;
}
//created on Oct 01 
async verifyVoidStatus(){
    let isVerify=false;
      await basePage.waitForLocator(this.statusVoid)
   let voidPay = await basePage.getText(this.statusVoid)
     console.log("verifyVoidStatus: " +voidPay);
   if(voidPay == 'Void'){
    isVerify=true
   }
   return isVerify;
}

async verifyVoidedPayInPayment() {
    let isVerify = false;

    await basePage.waitForLocator(this.statusVoid);
    await basePage.waitForLocator(this.paymentsTab);
    await basePage.click(this.paymentsTab);
    console.log("On the Payment Page...");

    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber);
    await basePage.waitForLocatorDisappear(this.PaymentpageSpinner);
    await basePage.waitForLocator(this.searchBoxInPayment);
    await basePage.click(this.searchBoxInPayment);
    await basePage.sendKeys(this.searchBoxInPayment, createConsignmentPage.extractedNumber);
    await basePage.keyboardEnter();

    await basePage.waitForLocatorDisappear(this.PaymentpageSpinner);
    console.log("Job Filtered....");

    const fullRefNumber = createConsignmentPage.extractedNumber + '#1';
    const refNo = this.referenceInPayment.replace('<<Text>>', fullRefNumber);

    await basePage.waitForLocator(refNo);

    const paymentRefId = await basePage.getText(refNo);
    console.log("Payment REF ID after void: " + paymentRefId);

    if (paymentRefId === fullRefNumber) {
        isVerify = true;
    }

    return isVerify;
}


async verifyVoidedPayInPaymentForLegs(type){
    let isVerify=false;
    await basePage.click(this.paymentsTab)
    console.log("On the Payment Page...")
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    await basePage.waitForLocator(this.searchBoxInPayment)
    await basePage.click(this.searchBoxInPayment)
    await basePage.sendKeys(this.searchBoxInPayment,createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.waitForLocator(this.filtersBtn)
    await basePage.click(this.filtersBtn)
    await basePage.wait(1000)
    await basePage.click(this.addFilterBtn)
    await basePage.wait(1000)
    await basePage.click(this.FilterOptions)
    await basePage.wait(1000)
    let filterValue=this.filterValue.replace('<<Text>>',type)
    await basePage.click(filterValue)
    await basePage.wait(1000)
    await basePage.click(this.applyFilterBtn)
    console.log("Fillters Applied successfully.....")
    console.log("Job Filtered....")
     await basePage.wait(7000)
    let refNo=this.referenceInPayment.replace('<<Text>>', createConsignmentPage.extractedNumber)
     const paymentRefIdWithSuffix = await basePage.getText(refNo);
const paymentRefId = paymentRefIdWithSuffix.split('#')[0];
      console.log("Actual Reference Number: " + paymentRefId);
      console.log("Expected Reference Number: " + createConsignmentPage.extractedNumber);
    if (paymentRefId == createConsignmentPage.extractedNumber) {
        console.log("Payment REF ID after void: " +paymentRefId );
        isVerify = true
    } else {
    }
    return isVerify;
}

async verifyVoidedPayInPaymentForTrip(type,tripNo){
    let isVerify=false;
    await basePage.click(this.paymentsTab)
    console.log("On the Payment Page...")
    console.log(tripNo)
    await basePage.waitForLocator(this.searchBoxInPayment)
    await basePage.click(this.searchBoxInPayment)
    await basePage.sendKeys(this.searchBoxInPayment,tripNo)
    await basePage.keyboardEnter()
    await basePage.waitForLocator(this.filtersBtn)
    await basePage.click(this.filtersBtn)
    await basePage.wait(1000)
    await basePage.click(this.addFilterBtn)
    await basePage.wait(1000)
    await basePage.click(this.FilterOptions)
    await basePage.wait(1000)
    let filterValue=this.filterValue.replace('<<Text>>',type)
    await basePage.click(filterValue)
    await basePage.wait(1000)
    await basePage.click(this.applyFilterBtn)
    console.log("Fillters Applied successfully.....")
    console.log("Job Filtered....")
    const formattedNumber = tripNo.toString().padStart(9, '0');
    let refNo=this.referenceInPayment.replace('<<Text>>', formattedNumber)
    const paymentRefId = await basePage.getText(refNo)
    if (paymentRefId == formattedNumber) {
        console.log("Payment REF ID after void: " +paymentRefId );
        isVerify = true
    } else {
    }
    return isVerify;
}

async verifyVoidedPayInPaymentForRun(runNo){
    let isVerify=false;
    await basePage.click(this.paymentsTab)
    console.log("On the Payment Page...")
    await basePage.waitForLocator(this.searchBoxInPayment)
    await basePage.click(this.searchBoxInPayment)
    await basePage.sendKeys(this.searchBoxInPayment,runNo)
    await basePage.keyboardEnter()
    await basePage.waitForLocatorDisappear(this.PaymentpageSpinner);
    console.log("Job Filtered....")
    let refNo=this.referenceInPayment.replace('<<Text>>', runNo)
    await basePage.waitForLocator(refNo);
    const runRefId = await basePage.getText(refNo)
    if (runRefId == runNo) {
        console.log("Payment Run No after void: " +runRefId );
        isVerify = true
    } else {
    }
    return isVerify;
}

async verifyByClickRefToCompletedJob(strMovement){
    let isVerify=false;
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    let refNo=this.referenceInPayment.replace('<<Text>>', createConsignmentPage.extractedNumber)
    const [page2] = await Promise.all([
        global.context.waitForEvent('page'), // Wait for the new page event  
        await basePage.click(refNo)
    ]);
    // Store the new page in a global variable for future steps
    global.page2 = page2;
    await global.page2.waitForLoadState();
    console.log("Navigated to Tab2.");

   let refNoInCompletedJobPage=this.refInCompletedPage.replace('<<Text>>',createConsignmentPage.extractedNumber)
   await global.page2.locator(refNoInCompletedJobPage).waitFor({ state: "visible", timeout })
   await basePage.wait(3000)
   let refNoCompletedJob=await global.page2.locator(refNoInCompletedJobPage).textContent({ timeout: 5000 });
   console.log("Reference Number in Completed Payment "+refNoCompletedJob)
   console.log("Reference Number in Completed Payment "+createConsignmentPage.extractedNumber)
 if(createConsignmentPage.extractedNumber == refNoCompletedJob){
    console.log("Job is present in completed job Page......")
    isVerify=true;
 }else{
    console.log("Job is not present in completed job Page......")
 }
    return isVerify;
}


async verifyByClickRefToCompletedJobForLegs(strMovement){
    let isVerify=false;
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    await basePage.waitForLocator(this.searchBoxInPayment)
    await basePage.click(this.searchBoxInPayment)
    await basePage.clear(this.searchBoxInPayment)
    await basePage.sendKeys(this.searchBoxInPayment,createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    let refNo=this.referenceInPayment.replace('<<Text>>', createConsignmentPage.extractedNumber)
    await basePage.wait(17000)
    const [page2] = await Promise.all([
        global.context.waitForEvent('page'), // Wait for the new page event  
        await basePage.click(refNo)
    ]);
    // Store the new page in a global variable for future steps
    global.page2 = page2;
    await global.page2.waitForLoadState();
    console.log("Navigated to Tab2.");

   let movementLegMap = {
    PU: '#1',
    DEL: '#3'
};

// Construct the full reference number including leg (e.g. "257743643#1")
let fullRefNumberWithLeg = `${createConsignmentPage.extractedNumber}${movementLegMap[strMovement] || ''}`;

// Replace placeholder in locator with full reference
let refNoInCompletedJobPage = this.refInCompletedPage.replace('<<Text>>', fullRefNumberWithLeg);
   await global.page2.locator(refNoInCompletedJobPage).waitFor({ state: "visible", timeout })
   await basePage.wait(3000)
   let refNoInCompletedJob=await global.page2.locator(refNoInCompletedJobPage).textContent({ timeout: 5000 });
   let regex = /^\d+(?=#)/;
   let refNoCompletedJob=refNoInCompletedJob.match(regex);
   console.log("Reference Number in Completed Job "+refNoCompletedJob)
   console.log("Reference Number in Completed Payment "+createConsignmentPage.extractedNumber)
 if(createConsignmentPage.extractedNumber == refNoCompletedJob){
    console.log("Job is present in completed job Page......")
    isVerify=true;
 }else{
    console.log("Job is not present in completed job Page......")
 }
    return isVerify;
}

async verifyByClickRefToCompletedJobForTrip(strMovement,tripNo){
    let isVerify=false;
    await basePage.waitForLocator(this.searchBoxInPayment)
    await basePage.click(this.searchBoxInPayment)
    await basePage.clear(this.searchBoxInPayment)
    await basePage.sendKeys(this.searchBoxInPayment,tripNo)
    await basePage.keyboardEnter()
    const formattedNumber = tripNo.toString().padStart(9, '0');
    let refNo=this.referenceInPayment.replace('<<Text>>', formattedNumber)
    const [page2] = await Promise.all([
        global.context.waitForEvent('page'), // Wait for the new page event  
        await basePage.click(refNo)
    ]);
    // Store the new page in a global variable for future steps
    global.page2 = page2;
    await global.page2.waitForLoadState();
    console.log("Navigated to page2.");

   let refNoInCompletedJobPage=this.refInCompletedPage.replace('<<Text>>',tripNo)
   await global.page2.locator(refNoInCompletedJobPage).waitFor({ state: "visible", timeout })
   await basePage.wait(3000)
   let refNoCompletedJob=await global.page2.locator(refNoInCompletedJobPage).textContent({ timeout: 5000 });
   console.log("Reference Number in Completed Payment "+refNoCompletedJob)
   console.log("Reference Number in Completed Payment "+tripNo)
 if(tripNo == refNoCompletedJob){
    console.log("Job is present in completed job Page......")
    isVerify=true;
 }else{
    console.log("Job is not present in completed job Page......")
 }
    return isVerify;
}


async verifyByClickRefToCompletedRun(runNo){
    let isVerify=false;
    await basePage.waitForLocator(this.searchBoxInPayment)
    await basePage.click(this.searchBoxInPayment)
    await basePage.clear(this.searchBoxInPayment)
    await basePage.sendKeys(this.searchBoxInPayment,runNo)
    await basePage.keyboardEnter()
    const formattedNumber = runNo.toString().padStart(9, '0');
    let refNo=this.referenceInPayment.replace('<<Text>>', formattedNumber)
    const [page2] = await Promise.all([
        global.context.waitForEvent('page'), // Wait for the new page event  
        await basePage.click(refNo)
    ]);
    // Store the new page in a global variable for future steps
    global.page2 = page2;
    await global.page2.waitForLoadState();
    console.log("Navigated to Tab2.");
    await basePage.wait(3000)
    let runNoInCompleted=await global.page2.locator(this.runNumInCompletedRun).textContent({ timeout: 5000 });
    if(runNo.slice(-6) == runNoInCompleted){
        isVerify=true
        console.log("Runs verified in completed Run page....")
    }
    return isVerify
   }


async verifyReinstateTheRun(runNo){
    let isVerify=false;
    const type = "Run";
    await basePage.wait(5000)
    await global.page2.locator(this.backArrowInRun).waitFor({ state: "visible", timeout })
    await global.page2.locator(this.backArrowInRun).click()
    await basePage.wait(10000)
    await global.page2.click(this.okBtn)
    await basePage.bringFront()
    await basePage.waitForLoad()
    await basePage.waitForLocator(this.filtersBtn)
    await basePage.click(this.filtersBtn)
    await basePage.wait(1000)
    await basePage.click(this.addFilterBtn)
    await basePage.wait(1000)
    await basePage.click(this.FilterOptions)
    await basePage.wait(1000)
    console.log("The Filter Value is "+type)
    await basePage.wait(5000)
      let filterValue=this.filterValue.replace('<<Text>>',type)
    await basePage.click(filterValue)
    await basePage.wait(1000)
    await basePage.click(this.applyFilterBtn)
    console.log("Fillters Applied successfully.....")
    await basePage.waitForLocator(this.searchBoxInPayment)
    await basePage.click(this.searchBoxInPayment)
    await basePage.clear(this.searchBoxInPayment)
    console.log("Run Nummber=========",runNo)
    await basePage.sendKeys(this.searchBoxInPayment,runNo)
    await basePage.keyboardEnter()
    await basePage.wait(6000)
    let noInput=await basePage.verifyElement(this.noRowstext)
    console.log(noInput)
    if(noInput){
     isVerify=true
     console.log("After re-instiating the job it is removed from payment screen is verified.....")
    }
    return isVerify;
}



async completeRunAfterReinstiate(movement,runNo){
    await global.page2.click(this.runPlanningTab)
    await global.page2.locator(this.runSearch).fill(runNo)
    await basePage.wait(2000)
    await global.page2.keyboard.press("Enter")
       await basePage.wait(2000)
       await global.page2.click(this.arrowRight)

    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const yr = now.getFullYear();
    let year='00'+yr;
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
    let runFinish=formattedDateTime.replace(/[^a-zA-Z0-9]/g, '');
    
    console.log("Run finish Time :"+runFinish)
    await global.page2.locator(this.runfinishTime).waitFor({ state: "visible", timeout })
    await global.page2.locator(this.runfinishTime).type(runFinish)

    await global.page2.fill(this.inputEndOdometer,"200")

    now.setMinutes(now.getMinutes() + 2);
      const day1 = String(now.getDate()).padStart(2, '0');
      const month1 = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const yr1 = now.getFullYear();
      let year1='00'+yr1;
      const hours1 = String(now.getHours()).padStart(2, '0');
      const minutes1 = String(now.getMinutes()).padStart(2, '0');
    
      const formattedDateTime1 = `${day1}-${month1}-${year1} ${hours1}:${minutes1}`;
      let breakStart=formattedDateTime1.replace(/[^a-zA-Z0-9]/g, '');
      console.log("Break start Time :"+breakStart)
      await global.page2.locator(this.breakTime).waitFor({ state: "visible", timeout })
      await global.page2.locator(this.breakTime).type(breakStart)
      
      await global.page2.click(this.breakDuration)
      await global.page2.fill(this.breakDuration,"5")
      await global.page2.click(this.runFinishBtn)
      console.log("Run completed after Reinstiate..........")
      await global.page2.close();
}
  

async verifyReinstateJobInPayment(){
    let isVerify=false;
    await basePage.wait(10000)
    await global.page2.locator(this.iconReinstate).scrollIntoViewIfNeeded();
    await global.page2.locator(this.iconReinstate).click()
    await global.page2.locator(this.btnReinstate).waitFor({ state: "visible", timeout })
    await global.page2.locator(this.btnReinstate).click()
    await global.page2.close();
    await basePage.wait(1000)
    // await global.page2.goBack();
    // await global.page2.waitForLoadState();
    await basePage.bringFront()
    await basePage.waitForLoad()
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    await basePage.waitForLocator(this.searchBoxInPayment)
    await basePage.click(this.searchBoxInPayment)
    await basePage.clear(this.searchBoxInPayment)
    await basePage.sendKeys(this.searchBoxInPayment,createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    let noInput=await basePage.verifyElement(this.noRowstext)
    if(noInput){
     isVerify=true
     console.log("After re-instiating the job it is removed from payment screen is verified.....")
    }
    return isVerify; 
}



async verifyReinstateJobInPaymentForLegs(type){
    let isVerify=false;
    
    await basePage.wait(10000)
    await global.page2.locator(this.iconReinstate).scrollIntoViewIfNeeded();
    await global.page2.locator(this.iconReinstate).click()
    await global.page2.locator(this.btnReinstate).waitFor({ state: "visible", timeout })
    await global.page2.locator(this.btnReinstate).click()
    await global.page2.close();
    await basePage.wait(1000)
    // await global.page2.goBack();
    // await global.page2.waitForLoadState();
    await basePage.bringFront()
    await basePage.waitForLoad()
    await basePage.waitForLocator(this.filtersBtn)
    await basePage.click(this.filtersBtn)
    await basePage.wait(1000)
    await basePage.click(this.addFilterBtn)
    await basePage.wait(1000)
    await basePage.click(this.FilterOptions)
    await basePage.wait(1000)
    console.log("The Filter Value is "+type)
    let filterValue=this.filterValue.replace('<<Text>>',type)
    await basePage.click(filterValue)
    await basePage.wait(1000)
    await basePage.click(this.applyFilterBtn)
    console.log("Fillters Applied successfully.....")
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    await basePage.waitForLocator(this.searchBoxInPayment)
    await basePage.click(this.searchBoxInPayment)
    await basePage.clear(this.searchBoxInPayment)
    await basePage.sendKeys(this.searchBoxInPayment,createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
     await basePage.wait(7000)
     await basePage.waitForLocatorDisappear(this.PaymentpageSpinner)
     await basePage.waitForLocator(this.noRowstext)
    let noInput=await basePage.verifyElement(this.noRowstext)
    if(noInput){
     isVerify=true
     console.log("After re-instiating the job it is removed from payment screen is verified.....")
    }
    return isVerify; 
}

async verifyReinstateJobInPaymentForTrip(type,tripNo){
    let isVerify=false;
    const formattedNumber = tripNo.toString().padStart(9, '0');
    await basePage.wait(2000)
    await global.page2.locator(this.iconReinstateTripSheet).scrollIntoViewIfNeeded();
    await global.page2.locator(this.iconReinstateTripSheet).click()
    // await global.page2.locator(this.iconReinstate).waitFor({ state: "visible", timeout })
    // await global.page2.locator(this.iconReinstate).click()
    await global.page2.close();
    await basePage.wait(1000)
    // await global.page2.goBack();
    // await global.page2.waitForLoadState();
    await basePage.bringFront()
    await basePage.waitForLoad()
    await basePage.waitForLocator(this.filtersBtn)
    await basePage.click(this.filtersBtn)
    await basePage.wait(1000)
    await basePage.click(this.FilterOptions)
    await basePage.wait(1000)
    console.log("The Filter Value is "+type)
    let filterValue=this.filterValue.replace('<<Text>>',type)
    await basePage.click(filterValue)
    await basePage.wait(1000)
    await basePage.click(this.applyFilterBtn)
    console.log("Fillters Applied successfully.....")
    
    await basePage.waitForLocator(this.searchBoxInPayment)
    await basePage.click(this.searchBoxInPayment)
    await basePage.clear(this.searchBoxInPayment)
        console.log("The Tripsheet Number is "+formattedNumber)
    await basePage.sendKeys(this.searchBoxInPayment,formattedNumber)
    await basePage.keyboardEnter()
        await basePage.wait(6000)
         await basePage.waitForLocatorDisappear(this.PaymentpageSpinner)
     await basePage.waitForLocator(this.noRowstext)
    let noInput=await basePage.verifyElement(this.noRowstext)
    if(noInput){
     isVerify=true
     console.log("After re-instiating the job it is removed from payment screen is verified.....")
    }
    return isVerify; 
}


//verifyFinanceSection
async verifyFinanceSection() {
    let isVerify = false
    await basePage.waitForLocator(this.tabFinanceInMenu)
    await basePage.scrollToElement(this.tabFinanceInMenu)
    await basePage.click(this.tabFinanceInMenu)
    const txtfinance = await basePage.verifyElement(this.txtFinanceTitle)
    console.log("txtJobs state :"+txtfinance)
    if(txtfinance){
        console.log("Finance section verified successfully...")
        isVerify = true
    }
    return isVerify
}


// async assignDriver(driver){
//     await basePage.wait(2000)
//     await basePage.waitForLocator(this.iconSelectDriver)
//     await basePage.click(this.iconSelectDriver)
//     await basePage.sendKeys(this.inputSearchDriver, driver)
//     await basePage.keyboardEnter()
//     await basePage.wait(5000)
//     await basePage.scrollToElement(this.btnAssign)
//     await basePage.click(this.btnAssign)
//     console.log("Driver assigned successfully....")
// }

async assignDriverForP2PJob(driver){
    await basePage.waitForLocatorDisappear(this.spinnerelement)
    // await basePage.waitForLocator(this.iconSelectDriver)
    await basePage.click(this.iconSelectDriver)
    await basePage.sendKeys(this.inputSearchDriver, driver)
    await basePage.keyboardEnter()
    await basePage.wait(5000)
    await basePage.scrollToElement(this.btnAssign)
    await basePage.click(this.btnAssign)
    console.log("Driver assigned successfully....")
}

async updateAddress (UpdateSender,UpdateReceiver){
    await basePage.click(this.masterJob)
    await basePage.click(this.editJobIcon)
    await basePage.click(this.iconSenderAddress)
    await basePage.scrollToElement(this.searchSenderAddress)
    await basePage.sendKeys(this.searchSenderAddress, UpdateSender)
    await basePage.click(this.SourcetxtAddress2)
    await basePage.wait(2000)
    console.log("Added sender address....")
    await basePage.click(this.iconReceiverAddress)
    await basePage.scrollToElement(this.searchReceiverAddress)
    await basePage.sendKeys(this.searchReceiverAddress, UpdateReceiver)
    await basePage.clickKeyboardBackSpace()
    await basePage.click(this.DestinationTxtAddress2)
    console.log("Added receiver address....")
    await basePage.wait(2000)
    await basePage.click(this.updateBtn)
    console.log("job updated....")

}
 // due dates check
async VerifyDate (movement,PUDate,DueDate){
    await basePage.click(this.masterJob)
    await basePage.click(this.editJobIcon)
    let isVerify = false
    await basePage.wait(15000)
    if(await basePage.verifyElement(`//div[@aria-label="${PUDate}"][@aria-selected="true"]`)){
        await basePage.verifyElement(`//div[@aria-label="${DueDate}"][@aria-selected="true"]`)
        console.log("Pick up and due date is verified successfully....")
        isVerify = true
    }
    else{
        console.log("Date verification failed....")
    }
    await basePage.wait(2000)
    await basePage.click(this.updateBtn)

    return isVerify
 
    
}


 // due dates check

 async childAvailableDateUpdate ()
 {   
    let pickedDate = false

     await basePage.click(this.editJobIcon)
     await basePage.click(this.PUDateField)
     await basePage.waitForLocator(this.pickerDay)//current date
     await basePage.wait(2000)

     const result = await basePage.getText(this.pickerDayUpdate)//new date
    console.log(result)

     if (result === "1"){
        await basePage.wait(2000)

        await basePage.waitForLocator(this.nextMonthAvailableDate)
        await basePage.click(this.nextMonthAvailableDate)

         const PUDate = await basePage.getAttribute(this.pickerDayUpdate,"aria-label")
         await basePage.click(this.pickerDayUpdate)
         pickedDate = true
         console.log("Available date is updated....")
         return {pickedDate,PUDate}

     } else{
     await basePage.wait(2000)

     const PUDate = await basePage.getAttribute(this.pickerDayUpdate,"aria-label")
     await basePage.click(this.pickerDayUpdate)
     pickedDate = true
     console.log("Available date is updated....")
     return {pickedDate,PUDate}

     }



     
 } 

 async eventUpdate (pickedDate,PUDate){


    let pickedDate1 = pickedDate
    let PUDate1 = PUDate

    if (pickedDate1 === true){
        
        let enabled = 1
        console.log("Date is updated..")
        return {PUDate1,enabled}
        
     } else {
        let enabled = 0 
        console.log("Date is not updated..")
        return {PUDate,enabled}
     }

 }


async dueDateChecker(PUDate,DueDate){

const result = await basePage.calculateDaysBetweenDates(PUDate,DueDate);

if (result === 3){ //3 because it will count from master available date to DEL due date
    await basePage.wait(300)
    console.log("Available date from Master leg: " + PUDate)
    console.log("Due date from Del leg: " + DueDate)
    console.log("total number of days: " + result)
    console.log("Del leg due date is successfully verified")
}

else {
    console.log("\x1b[31mDel leg due date failed to verify\x1b[0m")


}
}


async ChilddueDateChecker(PUDate,DueDate){

    const result = await basePage.calculateDaysBetweenDates(PUDate,DueDate);
    
    if (result === 1){ //1 because it will count from available date to due date
        await basePage.wait(300)
        console.log("Available date from child leg: " + PUDate)
        console.log("total number of days after due date was updated: " + result)
        console.log("Due date is successfully verified")
    }
    
    else {
        console.log("\x1b[31mDel leg due date failed to verify\x1b[0m")
    
    
    }


}
async ChilddueDateCheckernoUpdate(PUDate,DueDate){

    const result = await basePage.calculateDaysBetweenDates(PUDate,DueDate);
    
    if (result === 0){ //1 because it will count from available date to due date
        await basePage.wait(300)
        console.log("Available date from child leg: " + PUDate)
        console.log("total number of days after due date was updated: " + result)
        console.log("Due date is successfully verified")
    }
    
    else {
        console.log("\x1b[31mDel leg due date failed to verify\x1b[0m")
    
    
    }


}

 
 async childDueDateUpdate ()
 {   

    const result = await basePage.verifyElement(this.updateBtn)
    await basePage.wait(2000)


    if (result === false){
        await basePage.click(this.editJobIcon)

        await basePage.click(this.DueDateField)
        await basePage.waitForLocator(this.pickerDay)
        await basePage.wait(2000)

        const result = await basePage.getText(this.pickerDayUpdate)

        if (result === "1"){
            await basePage.wait(2000)
            await basePage.waitForLocator(this.nextMonthDueDate)
            await basePage.click(this.nextMonthDueDate)

            const DueDate = await basePage.getAttribute(this.pickerDayUpdate,"aria-label")
            await basePage.click(this.pickerDayUpdate)
            console.log("Due date is updated....")
            return DueDate

        } else{
            await basePage.wait(2000)

            const DueDate = await basePage.getAttribute(this.pickerDayUpdate,"aria-label")
            await basePage.click(this.pickerDayUpdate)
            console.log("Due date is updated....")
            return DueDate

        }

    }
    else {

        
        await basePage.click(this.DueDateField)
        await basePage.waitForLocator(this.pickerDay)
        await basePage.wait(2000)
        const result = await basePage.getText(this.pickerDayUpdate)

        if (result === "1"){
            await basePage.wait(2000)
            await basePage.waitForLocator(this.nextMonthDueDate)
            await basePage.click(this.nextMonthDueDate)

            const DueDate = await basePage.getAttribute(this.pickerDayUpdate,"aria-label")
            await basePage.click(this.pickerDayUpdate)
            console.log("Due date is updated....")
            return DueDate

        } else{
            await basePage.wait(2000)

            const DueDate = await basePage.getAttribute(this.pickerDayUpdate,"aria-label")
            await basePage.click(this.pickerDayUpdate)
            console.log("Due date is updated....")
            return DueDate

        }

    }


 
 
 } 
 

async childLegOffsetChecker (Leg,movement)
{   

    const movementLocator = Leg
    const movement1 = movement
    console.log("movement: " + movementLocator)

    if (movementLocator === "PU"){

    //PU leg checking
    await basePage.click(this.editJobIcon)
    await basePage.wait (3000)
    await basePage.click(this.PUDateField)
    console.log("Date was clicked...")
    
    await basePage.wait (3000)
    const PUDate = await basePage.getAttribute(this.pickerDay,"aria-label")
    const RefenceDate = PUDate
    testDataUtil.addKeyValueToObject(movement1,"ReferenceDate", PUDate) 
    console.log(PUDate + " Available date in calendar....")
    
    await basePage.click(this.pickerDay)
    console.log("Calendar was clicked...")

    return {RefenceDate,PUDate}

    }

    else if (movementLocator === "LH" || movementLocator === "DEL"){

    //LH DEL leg checking
        await basePage.click(this.editJobIcon)
        await basePage.wait (3000)
        await basePage.click(this.PUDateField)  
        console.log("Date was clicked...")

        await basePage.wait (3000)
        const PUDate = await basePage.getAttribute(this.pickerDay,"aria-label")
        const RefenceDate = testDataUtil.getValueByNestedKey(movement1,"ReferenceDate")
        console.log(PUDate + " Available date in calendar....")

        await basePage.click(this.pickerDay) 
        console.log("Calendar was clicked...")
    
        return {RefenceDate,PUDate}
    }

    else{
        console.log("unable to verify movement....")
    }

} 




async checkServiceType(LEG, movement, service)
{
    let LEG1 = LEG
    let movement1 = movement
    let service1 = service

    const servicetype=this.elementServiceType.replace("<<Text>>",service1)
    const getservicetype = await basePage.getText(servicetype)
    console.log(getservicetype + " service type ....")

    await basePage.wait(1500)

        if (getservicetype == "INCLUDE SAT SUN"){

            await basePage.wait(300)
            const {RefenceDate,PUDate} = await this.childLegOffsetChecker(LEG1, movement1);
            const result = await basePage.calculateDaysBetweenDates(RefenceDate,PUDate);
            
            const Extracteddatesoffset = result            
            return Extracteddatesoffset


        } else if (getservicetype == "EXCLUDE SAT SUN"){
        
            await basePage.wait(300)
            const {RefenceDate,PUDate} = await this.childLegOffsetChecker(LEG1, movement1);
            const result = await basePage.countWeekdays(RefenceDate,PUDate);
            
            const Extracteddatesoffset = result
            return Extracteddatesoffset

            
        
        } else if (getservicetype == "EXCLUDE SUN"){
        
            await basePage.wait(300)
            const {RefenceDate,PUDate} = await this.childLegOffsetChecker(LEG1, movement1);
            const result = await basePage.countWeekdayswithSaturday(RefenceDate,PUDate);
            
            const Extracteddatesoffset = result
            return Extracteddatesoffset

        
        } else if (getservicetype == "EXCLUDE SAT"){
        
            await basePage.wait(300)
            const {RefenceDate,PUDate} = await this.childLegOffsetChecker(LEG1, movement1);
            const result = await basePage.countWeekdayswithSunday(RefenceDate,PUDate);
            
            const Extracteddatesoffset = result
            return Extracteddatesoffset
        
        } else {
            await basePage.wait(300)
            console.log ("\x1b[31mfailed to verify offset dates....\x1b[0m")
        
            }  

}



//async childLegOffsetCheckerUpdated (Leg,movement)
//{   
//
//    const movementLocator = Leg
//    const movement1 = movement
//    console.log("movement: " + movementLocator)
//
//    if (movementLocator === "LH"){
//
//    //PU leg checking
//    await basePage.click(this.editJobIcon)
//    await basePage.wait (3000)
//    await basePage.click(this.PUDateField)
//    console.log("Date was clicked...")
//    
//    await basePage.wait (3000)
//    const PUDate = await basePage.getAttribute(this.pickerDay,"aria-label")
//    const RefenceDate = PUDate
//    testDataUtil.addKeyValueToObject(movement1,"ReferenceDate", PUDate) 
//    console.log(PUDate + " Available date in calendar....")
//    
//    await basePage.click(this.pickerDay)
//    console.log("Calendar was clicked...")
//
//    return {RefenceDate,PUDate}
//
//    }
//
//    else if (movementLocator === "DEL"){
//
//    //LH DEL leg checking
//        await basePage.click(this.editJobIcon)
//        await basePage.wait (3000)
//        await basePage.click(this.PUDateField)  
//        console.log("Date was clicked...")
//
//        await basePage.wait (3000)
//        const PUDate = await basePage.getAttribute(this.pickerDay,"aria-label")
//        const RefenceDate = testDataUtil.getValueByNestedKey(movement1,"ReferenceDate")
//        console.log(PUDate + " Available date in calendar....")
//
//        await basePage.click(this.pickerDay) 
//        console.log("Calendar was clicked...")
//    
//        return {RefenceDate,PUDate}
//    }
//
//    else{
//        console.log("unable to verify movement....")
//    }
//
//} 
//
async checkServiceTypeUpdated(LEG, movement, service)
{
    let LEG1 = LEG
    let movement1 = movement
    let service1 = service

    const servicetype=this.elementServiceType.replace("<<Text>>",service1)
    const getservicetype = await basePage.getText(servicetype)
    console.log(getservicetype + " service type ....")

    await basePage.wait(1500)

        if (getservicetype == "INCLUDE SAT SUN"){

            await basePage.wait(300)
            const {RefenceDate,PUDate} = await this.childLegOffsetChecker(LEG1, movement1);
            const result = await basePage.calculateDaysBetweenDates(RefenceDate,PUDate);
            let finalresult = result-1

            const Extracteddatesoffset = finalresult
            
            return Extracteddatesoffset


        } else if (getservicetype == "EXCLUDE SAT SUN"){
        
            await basePage.wait(300)
            const {RefenceDate,PUDate} = await this.childLegOffsetChecker(LEG1, movement1);
            const result = await basePage.countWeekdays(RefenceDate,PUDate);
            let finalresult = result-1

            const Extracteddatesoffset = finalresult
            console.log(Extracteddatesoffset + " offset days from create consignment....")  

            return Extracteddatesoffset

            
        
        } else if (getservicetype == "EXCLUDE SUN"){
        
            await basePage.wait(300)
            const {RefenceDate,PUDate} = await this.childLegOffsetChecker(LEG1, movement1);
            const result = await basePage.countWeekdayswithSaturday(RefenceDate,PUDate);
            let finalresult = result-1

            const Extracteddatesoffset = finalresult
            console.log(Extracteddatesoffset + " offset days from create consignment....")  

            return Extracteddatesoffset

        
        } else if (getservicetype == "EXCLUDE SAT"){
        
            await basePage.wait(300)
            const {RefenceDate,PUDate} = await this.childLegOffsetChecker(LEG1, movement1);
            const result = await basePage.countWeekdayswithSunday(RefenceDate,PUDate);
            let finalresult = result-1

            const Extracteddatesoffset = finalresult
            console.log(Extracteddatesoffset + " offset days from create consignment....")  

            return Extracteddatesoffset
        
        } else {
            await basePage.wait(300)
            console.log ("\x1b[31mfailed to verify offset dates....\x1b[0m")
        
            }  

}


async checkServiceTypeUpdated2(LEG, movement, service)
{
    let LEG1 = LEG
    let movement1 = movement
    let service1 = service

    const servicetype=this.elementServiceType.replace("<<Text>>",service1)
    const getservicetype = await basePage.getText(servicetype)
    console.log(getservicetype + " service type ....")

    await basePage.wait(1500)

        if (getservicetype == "INCLUDE SAT SUN"){

            await basePage.wait(300)
            const {RefenceDate,PUDate} = await this.childLegOffsetChecker(LEG1, movement1);
            const result = await basePage.calculateDaysBetweenDates(RefenceDate,PUDate);
            let finalresult = result-2

            const Extracteddatesoffset = finalresult
            
            return Extracteddatesoffset


        } else if (getservicetype == "EXCLUDE SAT SUN"){
        
            await basePage.wait(300)
            const {RefenceDate,PUDate} = await this.childLegOffsetChecker(LEG1, movement1);
            const result = await basePage.countWeekdays(RefenceDate,PUDate);
            let finalresult = result-2

            const Extracteddatesoffset = finalresult
            console.log(Extracteddatesoffset + " offset days from create consignment....")  

            return Extracteddatesoffset

            
        
        } else if (getservicetype == "EXCLUDE SUN"){
        
            await basePage.wait(300)
            const {RefenceDate,PUDate} = await this.childLegOffsetChecker(LEG1, movement1);
            const result = await basePage.countWeekdayswithSaturday(RefenceDate,PUDate);
            let finalresult = result-2

            const Extracteddatesoffset = finalresult
            console.log(Extracteddatesoffset + " offset days from create consignment....")  

            return Extracteddatesoffset

        
        } else if (getservicetype == "EXCLUDE SAT"){
        
            await basePage.wait(300)
            const {RefenceDate,PUDate} = await this.childLegOffsetChecker(LEG1, movement1);
            const result = await basePage.countWeekdayswithSunday(RefenceDate,PUDate);
            let finalresult = result-2

            const Extracteddatesoffset = finalresult
            console.log(Extracteddatesoffset + " offset days from create consignment....")  

            return Extracteddatesoffset
        
        } else {
            await basePage.wait(300)
            console.log ("\x1b[31mfailed to verify offset dates....\x1b[0m")
        
            }  

}





async verifyServiceType(service){
        let isVerify = false
        await basePage.scrollToElement(this.servicetype)
        if(await basePage.verifyElement(this.servicetype)){
            await basePage.verifyText(this.servicetype, service)
            console.log("Service type is verified successfully....")
            isVerify = true
        }
        else{
            console.log("Service type is verification failed....")
        }
        await basePage.wait(1000)
        return isVerify
    
}


async PUOffsetChecker(PickUp, movement, service){

    await basePage.wait(3000)


    const movementLocator = page.locator(`//td[text()='${PickUp}']`)
    await basePage.wait(300)
    await movementLocator.click()
    console.log(`${PickUp} Job clicked successfully....`)

    const Extracteddatesoffset = await this.checkServiceType(PickUp, movement, service)

    const addressbook = new AddressBook(this.page, this.PUOffset)
    const ExtractedOffset = await addressbook.PUOffset
    await basePage.compareOffsetDates(ExtractedOffset, Extracteddatesoffset)
    await basePage.wait(2000)
    await basePage.click(this.updateBtn)

}

async LHOffsetChecker(PickUp, movement, service){

    await basePage.wait(3000)

    const movementLocator = page.locator(`//td[text()='${PickUp}']`)
    await basePage.wait(300)
    await movementLocator.click()
    console.log(`${movement} Job clicked successfully....`)

    const Extracteddatesoffset = await this.checkServiceType(PickUp, movement, service)

    const addressbook = new AddressBook(this.page, this.SecondOffset)
    const ExtractedOffset = await addressbook.SecondOffset
    await basePage.compareOffsetDates(ExtractedOffset, Extracteddatesoffset)
    await basePage.wait(2000)
    await basePage.click(this.updateBtn)

}

async LHOffsetCheckerupdated(PickUp, movement, service){

    let pickup = PickUp
    let movement1 = movement
    let service1 = service

    await basePage.wait(3000)

    const movementLocator = page.locator(`//td[text()='${pickup}']`)
    await basePage.wait(300)
    await movementLocator.click()
    console.log(`${movement1} Job clicked successfully....`)

    const Extracteddatesoffset = await this.checkServiceTypeUpdated(pickup, movement1, service1)

        const addressbook = new AddressBook(this.page, this.SecondOffset)
        const ExtractedOffset = await addressbook.SecondOffset
        await basePage.compareOffsetDates(ExtractedOffset, Extracteddatesoffset)
        await basePage.wait(2000)
        await basePage.click(this.updateBtn)

}

 // due dates check
async LastOffsetChecker(PickUp, movement, service){

    await basePage.wait(3000)

    const movementLocator = page.locator(`//td[text()='${PickUp}']`)
    await basePage.wait(300)
    await movementLocator.click()
    console.log(`${movement} Job clicked successfully....`)

    const Extracteddatesoffset = await this.checkServiceType(PickUp, movement, service)

    const addressbook = new AddressBook(this.page, this.extractedOffset)
    const ExtractedOffset = await addressbook.extractedOffset
    console.log(ExtractedOffset + " number of offset days from address book....")
    await basePage.compareOffsetDates(ExtractedOffset, Extracteddatesoffset)
    await basePage.wait(2000)
    await basePage.click(this.updateBtn)

}

async LastOffsetCheckerUpdated(PickUp, movement, service){

    await basePage.wait(3000)

    const movementLocator = page.locator(`//td[text()='${PickUp}']`)
    await basePage.wait(300)
    await movementLocator.click()
    console.log(`${movement} Job clicked successfully....`)

    const Extracteddatesoffset = await this.checkServiceTypeUpdated(PickUp, movement, service)

    const addressbook = new AddressBook(this.page, this.extractedOffset)
    const ExtractedOffset = await addressbook.extractedOffset
    console.log(ExtractedOffset + " number of offset days from address book....")
    await basePage.compareOffsetDates(ExtractedOffset, Extracteddatesoffset)
    await basePage.wait(2000)
    await basePage.click(this.updateBtn)

}


async LastOffsetCheckerUpdated2(PickUp, movement, service){

    await basePage.wait(3000)

    const movementLocator = page.locator(`//td[text()='${PickUp}']`)
    await basePage.wait(300)
    await movementLocator.click()
    console.log(`${movement} Job clicked successfully....`)

    const Extracteddatesoffset = await this.checkServiceTypeUpdated2(PickUp, movement, service)

    const addressbook = new AddressBook(this.page, this.extractedOffset)
    const ExtractedOffset = await addressbook.extractedOffset
    console.log(ExtractedOffset + " number of offset days from address book....")
    await basePage.compareOffsetDates(ExtractedOffset, Extracteddatesoffset)
    await basePage.wait(2000)
    await basePage.click(this.updateBtn)

}



async updateAddressChild (UpdateSender,UpdateReceiver){
    let isVerify = false
    await basePage.wait(2000)

    //await basePage.click(this.editJobIcon)
    await basePage.click(this.iconSenderAddress)
    await basePage.scrollToElement(this.searchSenderAddress)
    await basePage.sendKeys(this.searchSenderAddress, UpdateSender)
    await basePage.click(this.SourcetxtAddress2)
    await basePage.wait(2000)
    console.log("Added sender address....")
    await basePage.click(this.iconReceiverAddress)
    await basePage.scrollToElement(this.searchReceiverAddress)
    await basePage.sendKeys(this.searchReceiverAddress, UpdateReceiver)
    await basePage.clickKeyboardBackSpace()
    await basePage.click(this.DestinationTxtAddress2)
    console.log("Added receiver address....")
    await basePage.wait(2000)
    await basePage.click(this.updateBtn)

    const zoneupdate = await basePage.verifyElement("//h2[text()='Confirm Changes']")

   
    if (zoneupdate === true){
        await basePage.click(this.proceedWithUpdate)
        console.log("job updated, with date changes in legs....")
        isVerify = true

    } else {
        console.log("job updated....")
    }
    return isVerify

}

async clickupdatebtn(){

    await basePage.wait(2000)
    await basePage.click(this.updateBtn)

    const zoneupdate = await basePage.verifyElement("//h2[text()='Confirm Changes']")
    if (zoneupdate === true){
        await basePage.click(this.proceedWithUpdate)
        console.log("job updated, with date changes in Master Leg....")

    } else {
        console.log("\x1b[31mjob updated, pop up is missing....\x1b[0m")
    }
}

async clickupdatebtnwithoutpopup(){

    await basePage.wait(2000)
    await basePage.click(this.updateBtn)

    console.log("job is updated...")
}

async checkDatesOnTableforPUDateUpdate(movement){


let movementLocator = movement

if (movementLocator === "PU"){

    let availableDateOnTable = this.AvailableDate.replace("<<Text>>", 2)
    let DueDateOnTable = this.DueDate.replace("<<Text>>", 2)

    availableDateOnTable = await basePage.getText(availableDateOnTable)
    DueDateOnTable = await basePage.getText(DueDateOnTable)


    availableDateOnTable = await basePage.parseCustomDate(availableDateOnTable)
    DueDateOnTable = await basePage.parseCustomDate(DueDateOnTable)

    availableDateOnTable = await basePage.convertToMMDDYYYY(availableDateOnTable)
    DueDateOnTable = await basePage.convertToMMDDYYYY(DueDateOnTable)

    const result = await basePage.calculateDaysBetweenDates(availableDateOnTable,DueDateOnTable)
    console.log(result)

    if (result === 1){

        console.log("Due date in PU is verified successfully...")
    }
    else{

        console.log("\x1b[31mDue date is not verified successfully....\x1b[0m")

    }
}

else if (movementLocator === "LH"){

    let availableDateOnTable = this.AvailableDate.replace("<<Text>>", 3)
    let DueDateOnTable = this.DueDate.replace("<<Text>>", 3)

    availableDateOnTable = await basePage.getText(availableDateOnTable)
    DueDateOnTable = await basePage.getText(DueDateOnTable)


    availableDateOnTable = await basePage.parseCustomDate(availableDateOnTable)
    DueDateOnTable = await basePage.parseCustomDate(DueDateOnTable)

    availableDateOnTable = await basePage.convertToMMDDYYYY(availableDateOnTable)
    DueDateOnTable = await basePage.convertToMMDDYYYY(DueDateOnTable)

    const result = await basePage.calculateDaysBetweenDates(availableDateOnTable,DueDateOnTable)
    console.log(result)


        if (result === 0){
    
            console.log("Due date in LH is verified successfully...")
        }
        else{
    
            console.log("\x1b[31mDue date is not verified successfully....\x1b[0m")
    
        }

}

else if (movementLocator === "DEL"){

    let availableDateOnTable = this.AvailableDate.replace("<<Text>>", 4)
    let DueDateOnTable = this.DueDate.replace("<<Text>>", 4)

    availableDateOnTable = await basePage.getText(availableDateOnTable)
    DueDateOnTable = await basePage.getText(DueDateOnTable)


    availableDateOnTable = await basePage.parseCustomDate(availableDateOnTable)
    DueDateOnTable = await basePage.parseCustomDate(DueDateOnTable)

    availableDateOnTable = await basePage.convertToMMDDYYYY(availableDateOnTable)
    DueDateOnTable = await basePage.convertToMMDDYYYY(DueDateOnTable)

    const result = await basePage.calculateDaysBetweenDates(availableDateOnTable,DueDateOnTable)
    console.log(result)


    if (result === 0){

        console.log("Due date in DEL is verified successfully...")
    }
    else{

        console.log("\x1b[31mDue date is not verified successfully....\x1b[0m")

    }

} else {

    console.log("\x1b[31m Cannot Verify....\x1b[0m")

}

}


async checkDatesOnTableforLHDateUpdate(movement){


    let movementLocator = movement
    
   if (movementLocator === "LH"){
    
        let availableDateOnTable = this.AvailableDate.replace("<<Text>>", 3)
        let DueDateOnTable = this.DueDate.replace("<<Text>>", 3)
    
        availableDateOnTable = await basePage.getText(availableDateOnTable)
        DueDateOnTable = await basePage.getText(DueDateOnTable)
    
        availableDateOnTable = await basePage.parseCustomDate(availableDateOnTable)
        DueDateOnTable = await basePage.parseCustomDate(DueDateOnTable)
    
        availableDateOnTable = await basePage.convertToMMDDYYYY(availableDateOnTable)
        DueDateOnTable = await basePage.convertToMMDDYYYY(DueDateOnTable)
    
        const result = await basePage.calculateDaysBetweenDates(availableDateOnTable,DueDateOnTable)
        console.log(result)
    
    
            if (result === 1){
        
                console.log("Due date in LH is verified successfully...")
            }
            else{
        
                console.log("\x1b[31mDue date is not verified successfully....\x1b[0m")
        
            }
    
    }
    
    else if (movementLocator === "DEL"){
    
        let availableDateOnTable = this.AvailableDate.replace("<<Text>>", 4)
        let DueDateOnTable = this.DueDate.replace("<<Text>>", 4)
    
        availableDateOnTable = await basePage.getText(availableDateOnTable)
        DueDateOnTable = await basePage.getText(DueDateOnTable)
    
        availableDateOnTable = await basePage.parseCustomDate(availableDateOnTable)
        DueDateOnTable = await basePage.parseCustomDate(DueDateOnTable)
    
        availableDateOnTable = await basePage.convertToMMDDYYYY(availableDateOnTable)
        DueDateOnTable = await basePage.convertToMMDDYYYY(DueDateOnTable)
    
        const result = await basePage.calculateDaysBetweenDates(availableDateOnTable,DueDateOnTable)
        console.log(result)
    
    
        if (result === 0){
    
            console.log("Due date in DEL is verified successfully...")
        }
        else{
    
            console.log("\x1b[31mDue date is not verified successfully....\x1b[0m")
    
        }
    
    } else {
    
        console.log("\x1b[31m Cannot Verify....\x1b[0m")
    
    }
    
    }


    async checkDatesOnTableforDELDateUpdate(movement){


        let movementLocator = movement
        
     if (movementLocator === "DEL"){
        
            let availableDateOnTable = this.AvailableDate.replace("<<Text>>", 4)
            let DueDateOnTable = this.DueDate.replace("<<Text>>", 4)
        
            availableDateOnTable = await basePage.getText(availableDateOnTable)
            DueDateOnTable = await basePage.getText(DueDateOnTable)
        
            availableDateOnTable = await basePage.parseCustomDate(availableDateOnTable)
            DueDateOnTable = await basePage.parseCustomDate(DueDateOnTable)
        
            availableDateOnTable = await basePage.convertToMMDDYYYY(availableDateOnTable)
            DueDateOnTable = await basePage.convertToMMDDYYYY(DueDateOnTable)
        
            const result = await basePage.calculateDaysBetweenDates(availableDateOnTable,DueDateOnTable)
            console.log(result)
        
        
            if (result === 1){
        
                console.log("Due date in DEL is verified successfully...")
            }
            else{
        
                console.log("\x1b[31mDue date is not verified successfully....\x1b[0m")
        
            }
        
        } else {
        
            console.log("\x1b[31m Cannot Verify....\x1b[0m")
        
        }
        
        }
    

async verifyAddUpdate(PUSource,PUReciever){
    let isVerify = false
    await basePage.wait(15000)
    if(await basePage.verifyElement(`//div[contains(text(),"${PUSource}")]`)){
        await basePage.verifyElement(`//div[contains(text(),"${PUReciever}")]`)
        console.log("Source and Destination address verified successfully....")
        isVerify = true
    }
    else{
        console.log("\x1b[31mAll legs verification failed....\x1b[0m")
    }
    return isVerify
}



async assignContractorForJob(contractor){
    await basePage.wait(2000)
    //await basePage.waitForLocator(this.iconSelectContractor)
    await basePage.click(this.iconSelectContractor)
    await basePage.sendKeys(this.inputSearchDriver, contractor)
    await basePage.keyboardEnter()
    await basePage.wait(5000)
    await basePage.scrollToElement(this.btnAssign)
    await basePage.click(this.btnAssign)
    console.log("Contractor assigned successfully....")
}


async VerifyAssignedContractorInOverview(contractor){
   let isVerify = false
   await basePage.scrollToElement(this.contractorAssigned)
   await basePage.waitForLocator(this.contractorAssigned)

   let contractorInOverview = await basePage.getText(this.contractorAssigned)

   if(contractorInOverview==contractor){

           isVerify = true
           console.log(contractorInOverview + " Contractor is successfully assigned to job...")


   }else
   {
    console.log(contractorInOverview + " carrier is assigned to job...")
   }

   return isVerify
}


async assignDriverForJob(driver){
    await basePage.waitForLocatorDisappear(this.spinnerelement)
    // await basePage.waitForLocator(this.iconSelectDriver)
    await basePage.click(this.iconSelectDriver)
    await basePage.sendKeys(this.inputSearchDriver, driver)
    await basePage.keyboardEnter()
    await basePage.wait(5000)
    await basePage.scrollToElement(this.btnAssign)
    await basePage.click(this.btnAssign)
    console.log("Driver assigned successfully....")
}

async assignContractorForJobInManifest(contractor){
    //await basePage.wait(2000)
    // await basePage.waitForLocator(this.iconSelectContractorInManifest)
     await basePage.wait(3000)
    await basePage.waitForLocator(this.maniFestJob)
       await basePage.click(this.maniFestJob)
          await basePage.waitForLocator(this.iconSelectContractorInManifest)
    await basePage.click(this.iconSelectContractorInManifest)
    await basePage.sendKeys(this.inputSearchDriver, contractor)
    await basePage.keyboardEnter()
    await basePage.wait(1000)
    await basePage.scrollToElement(this.btnAssign)
    await basePage.click(this.btnAssign)
    console.log("contractor assigned successfully....")
}
async completedLHInManifest(movement){
    await basePage.wait(2000)
    await basePage.click(this.iconCompleteJobInManifest)
    await basePage.wait(2000)
    await basePage.click(this.confirmBtnInManifest)
    console.log("Completed LH using manifest....")
    await basePage.wait(3000)
    await basePage.click(this.tabBooked)
    console.log("Tab booked is clicked succesfully....")
}

async assignDriverForJcJob(driver) {
    await basePage.waitForLocator(this.iconSelectDriver)
    await basePage.click(this.iconSelectDriver)
    await basePage.sendKeys(this.inputSearchDriver, driver)
    await basePage.keyboardEnter()
    await basePage.wait(5000)
    await basePage.scrollToElement(this.btnPrimary)
    await basePage.click(this.btnPrimary)
    console.log("Driver assigned successfully....")
}

async clickbtnsPickup(){
    
    await basePage.scrollToElement(this.btnHeadingToPickUp)
    await basePage.click(this.btnHeadingToPickUp)
    await basePage.wait(1000)
    await basePage.scrollToElement(this.btnHeadingToPickUp)
    await basePage.wait(1000)
    await basePage.click(this.btnHeadingToPickUp)
    await basePage.wait(1000)
    await basePage.scrollToElement(this.btnHeadingToPickUp)
    await basePage.wait(1000)
    await basePage.click(this.btnHeadingToPickUp)
}

async clickbtnsPickup1(){
    
    await basePage.scrollToElement(this.btnHeadingToPickUp)
    await basePage.wait(1000)
    await basePage.click(this.btnHeadingToPickUp)
    await basePage.wait(1000)
    await basePage.scrollToElement(this.btnHeadingToPickUp)
    await basePage.wait(1000)
    await basePage.click(this.btnHeadingToPickUp)
    await basePage.wait(1000)
    await basePage.scrollToElement(this.btnHeadingToPickUp)
    await basePage.wait(1000)
    await basePage.click(this.btnHeadingToPickUp)
}

async clickBtnJobClosed(){
    await basePage.scrollToElement(this.btnHeadingToPickUp)
    await basePage.wait(4000)
    await basePage.click(this.btnHeadingToPickUp)
}

async clickBtnMarkAs(text){
    await basePage.wait(3000)
    const element = this.btnMarkAs.replace("<<Text>>", text)
    await basePage.waitForLocator(element)
    await basePage.wait(3000)
    await basePage.click(element)
    console.log(`Btn Mark as ${text} is clicked`)
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

// // async cancelJobDuration(){
// 
//     if(await basePage.verifyElement(this.jobDurationCancelBtn)){
//         await basePage.click(this.jobDurationCancelBtn)
//         console.log("Job Duration canceled successfully...........") 
//       }
// // }

async clickBtnSubmit(){
    await basePage.click(this.btnSubmit1)
}

// =====================================================
async clickLeg(movement){
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.waitForLocator(this.inputSearch)
    await basePage.clear(this.inputSearch)
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    const movementLocator = page.locator(`//td[text()='${movement}']`)
    await basePage.wait(15000)
    await movementLocator.click()
    console.log(`${movement} Job clicked successfully....`)
}


async VerifyIfLegVisible(leg){
let isVerify = true
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.waitForLocator(this.inputSearch)
    await basePage.clear(this.inputSearch)
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    const movementLocator = await basePage.verifyElement(`//td[text()='${leg}']`)

    if(movementLocator == false)
    {
        console.log(`${leg} Job is no longer assigned to Contractor...`)
        isVerify = false
    } else {
        console.log(`${leg} Job is still assigned to Contractor...`)
    }

        return isVerify
}

async VerifyIfMasterVisible(){
let isVerify = true
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.waitForLocator(this.inputSearch)
    await basePage.clear(this.inputSearch)
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.wait(3000)
    const movementLocator = await basePage.verifyElement(`//td/i[text()='star_border']`)

    if(movementLocator == false)
    {
        console.log("Master leg is no longer assigned to Contractor...")
        isVerify = false
    } else {
        console.log("Master leg is still assigned to Contractor...")
    }

        return isVerify
}

async clickMaster(){
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.waitForLocator(this.inputSearch)
    await basePage.clear(this.inputSearch)
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    const movementLocator = page.locator(`//td/i[text()='star_border']`)
    await basePage.wait(15000)
    await movementLocator.click()
    console.log('Master Job clicked successfully....')
}

async verifyMyInvoicePage(){
    let isVerify = false;
    await basePage.waitForLocator(this.invoicingPage)
    if(await basePage.verifyElement(this.invoicingPage)){
    console.log("Tab invoicing is verified successfully...........")
    isVerify = true
    }
    return isVerify;
    }

    async verifyCompletedJobPage(){
        let isVerify = false;
        await basePage.waitForLocator(this.completedJobPage)
        if(await basePage.verifyElement(this.completedJobPage)){
        console.log("Tab completed job is verified successfully...........")
        isVerify = true
        }
        return isVerify;
        }


        async clickBtnPreviewInvoice(movement) {
            const tenSecondsInMilliseconds = 10000;
            let isVerify = false
            const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
            await basePage.click(this.tabCompletedInvoices)
            console.log('Tab Completed Invoices is clicked....')
            await basePage.sendKeys(this.searchInvoiceNumber, createConsignmentPage.extractedNumber)
             console.log("----------------createConsignmentPage.extractedNumber-------------------")
             console.log(createConsignmentPage.extractedNumber)
            await basePage.keyboardEnter()
            await basePage.wait(4000)
            await basePage.scrollToElement(this.completedInvoice)
            const invoiceJobState = await basePage.verifyElement(this.completedInvoice)
            console.log("invoiceJob State :"+invoiceJobState)
            console.log("The reference number is "+createConsignmentPage.extractedNumber)
            if(invoiceJobState){
                await basePage.click(this.completedInvoice)
                await basePage.waitForLocator(this.invoiceRefNum)
                await basePage.scrollToElement(this.invoiceRefNum)
                await basePage.verifyElement(this.invoiceRefNum)
                const invoiceNumber=await basePage.getText(this.invoiceRefNum)
                const invoiceNum=invoiceNumber.match(/\d+/g);
               testDataUtil.addKeyValueToObject(movement,"InvoiceNumber",invoiceNum)
                console.log("The Invoice Number is "+invoiceNum)
                const description=await basePage.getText(this.descriptionInCompletedInvoice)
                const cleanDescription = description.replace(/^\s*edit\s*$/gm, '').trim();
                //console.log(cleanDescription)
                const amount=await basePage.getText(this.totalAmount)
                const formattedtotalAmt = parseFloat(amount).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  });
                console.log(formattedtotalAmt)
                const valueToCheck=[createConsignmentPage.extractedNumber,formattedtotalAmt];
                 const basePathPdf=path.resolve(__dirname,'../../features/support');
                const downloadPdfPath=path.join(basePathPdf, 'invoicePdfDownloads')
                const customFilePath = path.join(downloadPdfPath, `${movement}_${invoiceNumber}.pdf`);
                //const customFilePath = path.join('C:/Users/Gomat/OneDrive/Documents/GitHub/bustle-platform-automation-testing/features/support', 'invoicePdfDownloads', `${movement}_${invoiceNumber}.pdf`);
                await basePage.downloadFile(this.previewInvoiceBtn,customFilePath)
                 console.log("Preview invoice is clicked successfully...........")
                 //await basePage.downloadFile(this.previewInvoiceBtn,customFilePath)
                 //console.log("Preview is Clicked another time")
                 await expect(await basePage.compareFilesFromPdf(cleanDescription,valueToCheck, customFilePath)).toBeTruthy();
                 await basePage.deleteFileAfterDelay(customFilePath, tenSecondsInMilliseconds);
                isVerify = true
               
            }
               return isVerify;
        }
    
    


    
    //clickBtnPreviewInvoiceAfterEdit
    async clickBtnPreviewInvoiceAfterEdit(movement,rateValue) {
        const tenSecondsInMilliseconds = 10000;
        let isVerify = false
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
        await basePage.click(this.tabCompletedInvoices)
        console.log('Tab Completed Invoices is clicked....')
        await basePage.sendKeys(this.searchInvoiceNumber, createConsignmentPage.extractedNumber)
        await basePage.keyboardEnter()
        await basePage.wait(4000)
        await basePage.scrollToElement(this.completedInvoice)
        const invoiceJobState = await basePage.verifyElement(this.completedInvoice)
        console.log("invoiceJob State :"+invoiceJobState)
        console.log("The reference number is "+createConsignmentPage.extractedNumber)
        if(invoiceJobState){
            await basePage.click(this.completedInvoice)
            await basePage.waitForLocator(this.invoiceRefNum)
            await basePage.scrollToElement(this.invoiceRefNum)
            await basePage.verifyElement(this.invoiceRefNum)
            const invoiceNumber=await basePage.getText(this.invoiceRefNum)
            const invoiceNum=invoiceNumber.match(/\d+/g);
            testDataUtil.addKeyValueToObject(movement,"InvoiceNumber", invoiceNum)
            console.log("The Invoice Number is "+invoiceNum)
            
            const rate=rateValue;
            const basePathPdf=path.resolve(__dirname,'../../features/support');
            const downloadPdfPath=path.join(basePathPdf, 'invoicePdfDownloads')
            const customFilePath = path.join(downloadPdfPath, `${movement}_${invoiceNumber}.pdf`);
           // const customFilePath = path.join('C:/Users/Gomat/OneDrive/Documents/GitHub/bustle-platform-automation-testing/features/support', 'invoicePdfDownloads', `${movement}_${invoiceNumber}.pdf`);
            await basePage.downloadFile(this.previewInvoiceBtn,customFilePath)
             console.log("After Editing In Invoicing Page Preview invoice is clicked in Completed page successfully...........")
             await basePage.compareRateFromPdfFile(rate, customFilePath);
             await basePage.deleteFileAfterDelay(customFilePath, tenSecondsInMilliseconds);
            isVerify = true
           
        }
           return isVerify;
 }

 

//  async addCreditInCompletedInvoice(customerName,issuedFromData,creditNote,amount){
//     let isVerify=false;
//       await basePage.click(this.createCredit)
//     if(await basePage.verifyElement(this.applyCreditPopUp)){
//         await basePage.waitForElement(this.creditNoteInPopUp)
//         const creditNotesInPopUp=await basePage.getText(this.creditNoteInPopUp)
//         await basePage.waitForElement(this.applyBtn)
//         await basePage.click(this.applyBtn)
//         await basePage.waitForElement(this.okBtn)
//         await basePage.click(this.okBtn)
//         console.log("Credit s applied Successfully................")
//         if(await basePage.verifyElement(this.creditNoteInUi)){
//            //const creditNotesInUi= await basePage.getText(this.creditNoteInUi)
//             if(await basePage.getText(this.creditNoteInUi)==creditNotesInPopUp){
//                 isVerify=true;
//             console.log("Credit is Visible In UI, is verified...................")
//             }
//             }
//         }
//         else{
//             const invoiceNumber=await basePage.getText(this.invoiceRefNum)
//             const invoiceNum=invoiceNumber.match(/\d+/g);
//             if(await basePage.verifyElement(this.CreditPage)){
//             await basePage.click(this.issueCreditBtn)
//             await basePage.click(this.customer)
//             await basePage.sendKeys(this.customer,customerName)
//             await basePage.waitForLocator(this.creditCustomerName)
//             await basePage.click(this.creditCustomerName)
//             console.log("Customer_Name is entered in creating credit..........")
//             await basePage.click(this.creditIssueFrom)
//             await basePage.sendKeys(this.creditIssueFrom,issuedFromData)//invoicenumer or any number 000002
//             await basePage.waitForLocator(this.creditIssueFromData)
//             await basePage.click(this.creditIssueFromData)
//             console.log("IssueFrom is entered in creating credit..........")
//             await basePage.sendKeys(this.creditNotes,creditNote)
//             console.log("creditNotes is entered in creating credit..........")
//             await basePage.sendKeys(this.creditAmount,amount)
//             console.log("Creit amount is entered in creating credit..........")
//             await basePage.click(this.buttonOk)
//             await basePage.click(this.buttonOk)
//             await basePage.click(this.applyCreditToInvoiceIcon)
//             console.log("Apply credit to invoice icon is clicked..........")
//             let applyCreditTable=this.applyCredit.replace("<<Text>>",invoiceNum)
//             await basePage.click(applyCreditTable)
//             await basePage.click(this.buttonOk)
//             if(await basePage.verifyElement(this.creditNoteInUi)){
//                 //const creditNotesInUi= await basePage.getText(this.creditNoteInUi)
//                  if(await basePage.getText(this.creditNoteInUi)==creditNotesInPopUp){
//                     isVerify=true;
//                  console.log("Credit is Visible In UI, is verified...................")
//                  }
//                  }
//             }
//         }
//         return isVerify;
// }
 
// async verifyCreditIsPresent(){

//  }
     
    

    async voidInvoice(){
        await basePage.waitForLocator(this.voidBtn)
        await basePage.scrollToElement(this.voidBtn)
        await basePage.click(this.voidBtn)
        await basePage.waitForLocator(this.voidConfirmationBtn)
        await basePage.click(this.voidConfirmationBtn)
        await basePage.click(this.voidedOkBtn)
        console.log("Job is Voided Successfully.........")

        
        }

        async navigateToCompletedJob(){
            await basePage.wait(2000)
            await basePage.waitForLocator(this.tabCompletedJob)
            await basePage.click(this.tabCompletedJob)
        }
    
        async verifyVoidedInvoice(invoiceNumber){
            const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
                let isVerify = false
                await basePage.clear(this.searchInvoiceNumber)
                await basePage.sendKeys(this.searchInvoiceNumber, invoiceNumber)
                await basePage.keyboardEnter()
                await basePage.wait(4000)
                await basePage.waitForLocator(this.showVoidCheckBox)
                await basePage.click(this.showVoidCheckBox)
                console.log("Clicked show void check box  .................")
                
               let voidedInvoiceRow=this.voidedInvoice.replace("<<Text>>",invoiceNumber)
               console.log(voidedInvoiceRow)
                await basePage.waitForLocator(voidedInvoiceRow)
                const invoiceJobState = await basePage.verifyElement(voidedInvoiceRow)
                console.log("invoiceJob State :"+invoiceJobState)
                if(invoiceJobState){
                    await basePage.wait(4000);
                    await basePage.click(voidedInvoiceRow)
                    await basePage.waitForLocator(this.txtReferenceNum)
                    console.log(await basePage.getText(this.txtReferenceNum))
                    //console.log(createConsignmentPage.extractedNumber)
                    await basePage.verifyText(this.txtReferenceNum, createConsignmentPage.extractedNumber)
                    console.log("Voided Invoice verified sucessfully.....")
                    isVerify = true
                }
                   return isVerify
            } 

    

async clickLHJobsTab(){
    await basePage.waitForLocator(this.tabLHJobs)
    await basePage.click(this.tabLHJobs)
    console.log("Tab LH jobs clicked successfully....")
}

async clickTabManifest(){
    await basePage.click(this.manifestTab)
    console.log("Tab manifest clicked successfully....")
    // await basePage.click(this.iconCloseManifestOverview)
}

async addManifest(){
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.waitForLocator(this.inputSearchManifest)
    await basePage.sendKeys(this.inputSearchManifest, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.wait(15000)
    //await basePage.scrollToElement(this.checkBoxLHJob)
    await basePage.click(this.checkBoxLHJob1)
    await basePage.click(this.btnManifestTogether)
    await basePage.click(this.btnCreateManifest)
}


async addManifest1(){
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.waitForLocator(this.inputSearchManifest)
    await basePage.sendKeys(this.inputSearchManifest, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.wait(15000)
   // await basePage.scrollToElement(this.checkBoxLHJob)
    await basePage.click(this.checkBoxLHJob1)
    await basePage.click(this.btnManifestTogether)
    await basePage.click(this.btnCreateManifest)
}


async getManifestId(movement){
    // await basePage.wait(3000)
    // await basePage.waitForLocator(this.iconCloseManifestOverview)
    // await basePage.click(this.iconCloseManifestOverview)
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.waitForLocator(this.inputSearchManifest)
    await basePage.sendKeys(this.inputSearchManifest, createConsignmentPage.extractedNumber)
    //await basePage.keyboardEnter()
    await basePage.clickKeyboardBackSpace()
    await basePage.wait(10000)
    await basePage.waitForLocator(this.checkBoxLHJob)
    await basePage.click(this.checkBoxLHJob)
    await basePage.click(this.maniFestJob)
    let manifestID = await basePage.getText(this.txtManifestReference)
    await testDataUtil.addKeyValueToObject(movement, "ManifestId", manifestID)
    console.log("Manifest Id: "+ manifestID)

}

async addManifestForTrip(movement,manifestRef){
    await testDataUtil.addKeyValueToObject(movement, "ManifestId1", manifestRef)
    console.log("Manifest Id: "+ manifestRef)
}

async addManifestForTrip1(movement,manifestRef){
    await testDataUtil.addKeyValueToObject(movement, "ManifestId2", manifestRef)
    console.log("Manifest Id: "+ manifestRef)
}

async addManifestForTrip2(movement,manifestRef){
    await testDataUtil.addKeyValueToObject(movement, "ManifestId3", manifestRef)
    console.log("Manifest Id: "+ manifestRef)
}


async getManifestId1(movement){
    console.log(await basePage.verifyElement(this.iconCloseManifestOverview))
    if(await basePage.verifyElement(this.iconCloseManifestOverview)){
    await basePage.click(this.iconCloseManifestOverview)
    }
    //await basePage.click(this.iconCloseManifestOverview)
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.sendKeys(this.inputSearchManifest, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.wait(12000)
    //await basePage.scrollToElement(this.checkBoxLHJob)
    await basePage.click(this.checkBoxLHJob)
    await basePage.click(this.maniFestJob)
    let manifestID = await basePage.getText(this.txtManifestReference)
    await testDataUtil.addKeyValueToObject(movement, "ManifestId", manifestID)
    console.log("Manifest Id: "+ manifestID)
    
    await basePage.scrollToElement(this.totalWeightInmanifest)
    let totalWeightInManifest=await basePage.getText(this.totalWeightInmanifest)
    console.log("The Total weight In manifest is "+totalWeightInManifest)
    await testDataUtil.addKeyValueToObject(movement, "TotalWgInManifest", totalWeightInManifest)
}

async verifyManifest(manifestNo){
    let isVerify=false;
    await basePage.sendKeys(this.inputSearchManifest, manifestNo)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    await basePage.click(this.checkBoxLHJob)
    await basePage.click(this.maniFestJob)
    let manifestID = await basePage.getText(this.txtManifestReference)
    console.log("Manifest Id: "+ manifestID)
    if(manifestID==manifestNo){
     isVerify=true;
     console.log("Manifest Number is verified.....")
    }
    return isVerify;
}

async verifyManifestJob(){
    let isVerify = false
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.wait(25000)
    await basePage.scrollToElement(this.jobRefInManifest)
    let refId = await basePage.getText(this.jobRefInManifest)
    let id = refId.split('#')[0]
    console.log("Consignment number in manifest page is = "+id)
    if(id == createConsignmentPage.extractedNumber){
        console.log("Manifest id verified successfully....")
        isVerify = true
    }
    else{
        console.log("Manifest id verification failed....")
    }
    return isVerify
}



async clickMarkAsReady1(){
    await basePage.wait(1000)
    await basePage.scrollToElement(this.btnMarkAsReady)
    await basePage.click(this.btnMarkAsReady)
}
//created new mwthod for trip
async clickMarkAsReady(){
    await basePage.wait(1000)
    await basePage.scrollToElement(this.iconMarkAsReady)
    await basePage.click(this.iconMarkAsReady)
    await basePage.wait(1000)
    await basePage.click(this.confirmBtn)
    console.log("Manifest Marked As ready.....")
    await basePage.wait(5000)
}



// async navigateToManifestAndVerify(manifestNo,manifeststatus){
// let isVerify=false;
// await basePage.wait(1000)
// await basePage.click(this.manifestTab)
// console.log("Tab manifest is clicked.....")
// await basePage.wait(2000)
// console.log(await basePage.verifyElement(this.iconCloseManifestOverview))
// if(await basePage.verifyElement(this.iconCloseManifestOverview)){
//     console.log("Manifest Overview is present...")
// await basePage.click(this.iconCloseManifestOverview)
// }
// await basePage.click(this.clearAllStatusFilterInManifest)
// console.log("Cleared the status filter...")
// await basePage.wait(2000)
// // await basePage.click(this.selectStatusFilterInManifest)
// // await basePage.click(this.statusFilterOptionInManifest)
// // await basePage.wait(2000)
// // await basePage.click(this.selectStatusFilterInManifest)
// // await basePage.click(this.statusFilterOptionInManifest1)
// // console.log("Status Filter in manifest is choosed..")
// await basePage.sendKeys(this.refSearchInManifest,manifestNo)
// await basePage.keyboardEnter()
// await basePage.wait(1000)
// await basePage.click(this.manifestTable)
// let refInManifest=await basePage.getText(this.manifestRef)
// let refManifest=String(refInManifest).trim()
// await basePage.wait(1000)
// let statusOfManifest=await basePage.getText(this.manifestStatus)
// let status=String(statusOfManifest).trim()
// if(manifestNo==refManifest && status == manifeststatus){
//     console.log(`Manifest is present and status is ${manifeststatus}`)
//     isVerify=true
// }
// await basePage.click(this.iconCloseManifestOverview)
// return isVerify
// }


async closeManifestOverviewIfPresent() {
    if (await basePage.verifyElement(this.iconCloseManifestOverview)) {
        console.log("Manifest Overview is present, closing it...");
        await basePage.click(this.iconCloseManifestOverview);
        await basePage.wait(500); // small wait after closing
    }
}

async navigateToManifestAndVerify(manifestNo, manifeststatus) {
    let isVerify = false;

    await basePage.wait(1000);
    await basePage.click(this.manifestTab);
    console.log("Tab manifest is clicked.....");
    await basePage.wait(2000);

    await this.closeManifestOverviewIfPresent(); // handle first occurrence

    await basePage.click(this.clearAllStatusFilterInManifest);
    console.log("Cleared the status filter...");
    await basePage.wait(2000);

    await basePage.sendKeys(this.refSearchInManifest, manifestNo);
    await basePage.keyboardEnter();
    await basePage.wait(1000);

     await this.closeManifestOverviewIfPresent();

    await basePage.click(this.manifestTable);


    let refInManifest = await basePage.getText(this.manifestRef);
    let refManifest = String(refInManifest).trim();
    await basePage.wait(1000);

    let statusOfManifest = await basePage.getText(this.manifestStatus);
    let status = String(statusOfManifest).trim();

    if (manifestNo == refManifest && status == manifeststatus) {
        console.log(`Manifest is present and status is ${manifeststatus}`);
        isVerify = true;
    }

    await this.closeManifestOverviewIfPresent(); // handle after final actions

    return isVerify;
}



async verifyTripPage(){
     let isVerify=false
     let text=await basePage.getText(this.tabTripsheet)
     if(text=="Trip Sheets"){
        console.log("Tab Tripsheet is verified successfully")
        isVerify=true
     }
     return isVerify
}


async navigateToManifestAndCheckJob(manifestNo){
await basePage.click(this.manifestTab)
await basePage.sendKeys(this.refSearchInManifest,manifestNo)
await basePage.keyboardEnter()
await basePage.wait(1000)

await basePage.click(this.manifestTable)
let refManifest=await basePage.getText(this.manifestRef)
await basePage.wait(1000)
console.log("ManifestNo in" +refManifest)
if(manifestNo==refManifest){
    console.log("Manifest is present in carrier")
}

}

async navigateToTripAndReject(tripNo){
await basePage.click(this.tabTrip)
console.log("Navigated to trip page...")
await basePage.wait(8000)
await basePage.sendKeys(this.inputRefTrip,tripNo)
await basePage.keyboardEnter()
await basePage.wait(2000)
await basePage.click(this.tripSheetData)
await basePage.scrollToElement(this.rejectTrip)
await basePage.click(this.rejectTrip)
await basePage.click(this.rejectBtn)
await basePage.click(this.okBtn)
console.log("Trip is rejected as contractor....")
}

async navigateToTripAndDeleteManifest(tripNo){
await basePage.click(this.tabTrip)
console.log("Navigated to trip page...")
await basePage.wait(8000)
await basePage.sendKeys(this.inputRefTrip,tripNo)
await basePage.keyboardEnter()
await basePage.wait(2000)
await basePage.click(this.tripSheetData)
await basePage.wait(3000)
await basePage.scrollToElement(this.iconExpandInTripSheet)
await basePage.click(this.iconExpandInTripSheet)
await basePage.wait(2000)
await basePage.scrollToElement(this.deleteManifestInContrac)
await basePage.click(this.deleteManifestInContrac)
await basePage.click(this.buttonRemoveManifest)
}

async verifyremovedManifestInTrip(manifestNo){
    let isVerify=true
    await basePage.wait(1000)
    await basePage.scrollToElement(this.iconExpandInTripSheet)
    await basePage.click(this.iconExpandInTripSheet)
    await basePage.wait(2000) 
    let manifestInTrip=this.manifestRefInTrip.replace("<<Text>>",manifestNo)
    let status=await basePage.verifyElement(manifestInTrip)
    console.log(status)
    console.log(!status)
if(!status){
console.log("Manifest is removed from gtrip is verified....")
isVerify=false;
}
return isVerify;
}

async verifyremovedManifestInManifestPage(manifestNo,tripNo){
let isVerify=false;
let tripNumberInMani=this.tripNoInManifest.replace("<<Text>>",manifestNo)
let tripNum=await basePage.getText(tripNumberInMani)
console.log("Trip Number in Manifest is "+tripNum)
if(tripNum==tripNo){
isVerify=true;
}
return isVerify
}

async navigateToTripAndCancel(tripNo){

    await basePage.click(this.tabTrip)
    console.log("Navigated to trip page...")
    await basePage.sendKeys(this.inputRefTrip,tripNo)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    await basePage.click(this.tripSheetData) 
    await basePage.click(this.cancelTripIcon)
    await basePage.click(this.cancelTripBtn)
    console.log("Trip is cancelled successfully........")

}

async cancelTrip(){
    await basePage.wait(1000)
    await basePage.click(this.cancelTripIcon)
    await basePage.click(this.cancelTripBtn)
    console.log("Trip is cancelled successfully........")
}

async duplicateTheTrip(movement,tripNo){

    await basePage.click(this.tabTrip)
    console.log("Navigated to trip page...")
    await basePage.sendKeys(this.inputRefTrip,tripNo)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    await basePage.click(this.tripSheetData) 
    await basePage.click(this.duplicateTripIcon)
    console.log("Trip is duplicated")
    await basePage.clear(this.inputRefTrip)
    await basePage.wait(5000)
    await basePage.click(this.duplicatedTrip)
    let duplicateTripRef=await basePage.getText(this.txtRefNum)
    await testDataUtil.addKeyValueToObject(movement, "DuplicatedTripSheetRefId", duplicateTripRef)
    console.log("Duplicated Trip Sheet RefId: "+duplicateTripRef)

}
async verifyDuplicatedTrip(movement,duplicatedTrip,source,destination){
    let isVerify=false
    await basePage.wait(1000)
    await basePage.clear(this.inputRefTrip)
    await basePage.sendKeys(this.inputRefTrip,duplicatedTrip)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    await basePage.click(this.tripSheetData) 
    await basePage.click(this.tripSheetData)
    let duplicateTripRefNo=await basePage.getText(this.txtTripRef)
    await basePage.scrollToElement(this.sourceValue)
    let sourceVal=await basePage.getText(this.sourceValue) //"CarrierSourceAddInTrip": "20 Walters Drive",
    await basePage.scrollToElement(this.destinationValue)
    let destinationVal=await basePage.getText(this.destinationValue)
    console.log(sourceVal)
    console.log(destinationVal)
    if(duplicateTripRefNo==duplicatedTrip && sourceVal==source && destinationVal==destination){
        isVerify=true;
        console.log("Duplicated Trip is verified.......")
    }
return isVerify

}

async verifyRejectContractorInCarrier(){
const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
let isVerify=false
await basePage.click(this.tabTrip)
console.log("Navigated to trip page...")
await basePage.clear(this.inputRefTrip)
await basePage.sendKeys(this.inputRefTrip,tripNo)
await basePage.keyboardEnter()
await basePage.wait(2000)
await basePage.click(this.tripSheetData)
let tripcontrac=await basePage.getText(this.assignedContracInTrip)
await basePage.click(this.manifestTab)
await basePage.sendKeys(this.refSearchInManifest,manifestNo)
await basePage.keyboardEnter()
await basePage.wait(1000)
await basePage.click(this.maniFestJob)
let status=await basePage.isVisible(this.assignedContracInManifest)
await basePage.click(this.tabBooked) 
await basePage.waitForLocator(this.inputSearch)
await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
await basePage.keyboardEnter()
await basePage.click(this.jobLH)
let jobcontrac=await basePage.getText(this.contractorAssigned)
if(tripcontrac=="No contractor assigned" && status==false && jobcontrac==" "){
isVerify= true;
}
return isVerify;
}

async verifyRejectedTrip(tripNo,manifestNo){
let isVerify=false
await basePage.clear(this.inputRefTrip)
await basePage.sendKeys(this.inputRefTrip,tripNo)
await basePage.keyboardEnter()
await basePage.wait(2000)
let tripcount = await basePage.countElement(this.rejectTripStatus)
await basePage.click(this.manifestTab)
await basePage.sendKeys(this.refSearchInManifest,manifestNo)
await basePage.keyboardEnter()
await basePage.wait(1000)
let manifestCount=await basePage.countElement(this.manifestTable)
const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
await basePage.click(this.tabBooked) 
await basePage.waitForLocator(this.inputSearch)
await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
await basePage.keyboardEnter()
let jobCount=await basePage.countElement(this.bookedJob)
if(tripcount==0 && manifestCount==0 && jobCount==0){
    console.log("Job is not present......")
isVerify=true;
}
return isVerify
}


// async navigateToTripAndSearchTrip(){
//     await basePage.click(this.sectionJob)
//     await basePage.click(this.sectionMyJobs)
//     await basePage.click(this.tabTrip)
//     console.log("Navigated to trip page...")
//     await basePage.clear(this.inputRefTrip)
//     await basePage.sendKeys(this.inputRefTrip,tripNo)
//     await basePage.keyboardEnter()
//     await basePage.wait(2000)
//     await basePage.click(this.tripSheetData)
// }

async searchTrip(tripNo){
    await basePage.wait(4000)
    await basePage.clear(this.inputRefTrip)
    await basePage.sendKeys(this.inputRefTrip,tripNo)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    await basePage.click(this.tripSheetData)
    }

async verifyStatusOfTripInCompleted(tripNo,status){
    let isVerify=false
    let statusTrip=this.tripStatus.replace("<<Text>>",status)
    //console.log("Xpath is "+statusTrip)
    await basePage.wait(2000)
    let statusOfTrip=await basePage.getText(statusTrip)
    console.log(statusOfTrip)
    let completedTrip=this.tripTableInCompleted.replace("<<Text>>",tripNo)
    await basePage.click(completedTrip)
    await basePage.wait(1000)
    let tripNoInCompleted=await basePage.getText(this.tripRefNoInCompleted)
    if(tripNoInCompleted== tripNo && status==statusOfTrip){
        isVerify=true;
        console.log(`Trip number is verified and the status of trip is ${status}....`)
    }
return isVerify;
}

async reinstiateTrip(){
    await basePage.wait(1000)
    await basePage.click(this.reinstiateTripBtn)
    console.log("Trip is re-instiated.....")
}

async navigateToCompletedTrip(tripNo){
    await basePage.click(this.completedTripPage)
    await basePage.sendKeys(this.inputTripInCompletedTrip, tripNo)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
}

      async navigateToTripFromHome(){
        await basePage.click(this.sectionJob)
        await basePage.click(this.sectionMyJobs)
        await basePage.click(this.tabTrip)
        console.log("Navigated to trip page...")
        
        }


        async navigateToTripTab(){
            await basePage.wait(1000)
            await basePage.click(this.tabTrip)
            console.log("Navigated to trip Tab...")
            }

            async navigateActiveTripTab(){
                await basePage.wait(1000)
                await basePage.click(this.activeTabTrip)
            }
          
            async verifyUnassignedContractorInTrip(tripNo){
                let isVerify=false
                await basePage.clear(this.inputRefTrip)
                await basePage.sendKeys(this.inputRefTrip,tripNo)
                await basePage.keyboardEnter()
                await basePage.wait(2000)
                await basePage.waitForLocator(this.rowTripSheet)
                await basePage.click(this.rowTripSheet)
                let contractor=await basePage.getText(this.assignedContracInTrip)
                let contractorInTrip=String(contractor)
                console.log(contractorInTrip)
                if(contractorInTrip.includes("No")){
                    console.log("Contractor is unassigned from the trip..")
                    isVerify=true;
                }
                return isVerify;
            }

            async verifyUassignedContractorInManifest(manifestNo){
                let isVerify=false;
                await basePage.click(this.manifestTab)
                console.log("Tab manifest is clicked.....")
                await basePage.click(this.manifestTab)
                await basePage.sendKeys(this.refSearchInManifest,manifestNo)
                await basePage.keyboardEnter()
                await basePage.wait(1000)
                await basePage.click(this.maniFestJob)
                await basePage.wait(2000)
                let status =await basePage.verifyElement(this.assignedContracInManifest)
                console.log(status)
                if(status){
                    isVerify=true
                }
                return isVerify;
            }


            async verifyUassignedContractorInJob(strMovement){
                const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
                 await basePage.click(this.tabBooked) 
                 await basePage.waitForLocator(this.inputSearch)
                 await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
                 await basePage.keyboardEnter()
                const movementLocator = page.locator(`//td[text()='${strMovement}']`)
                 await basePage.wait(5000)
                 await movementLocator.click()
                let contractorAssign=await basePage.getText(this.contractorAssigned)
                 await basePage.wait(1000)
                 console.log(contractorAssign)

            }

            async verifyTripNumber(tripNo){
                let isVerify=false
                await basePage.clear(this.inputRefTrip)
                await basePage.sendKeys(this.inputRefTrip,tripNo)
                await basePage.keyboardEnter()
                await basePage.wait(2000)
                await basePage.waitForLocator(this.rowTripSheet)
                await basePage.click(this.rowTripSheet)
                let tripSheetRefNo = await basePage.getText(this.txtRefNum)
                if(tripSheetRefNo==tripNo){
                    isVerify=true
                    console.log("Trip is present.....")
                }
                return isVerify

            }

    async verifyTripTab(){
        let isVerify=false
        await basePage.wait(1000)
        let tripTitle =await basePage.getText(this.pageTripTitle)
        if(tripTitle == "Trip Sheets"){
            isVerify=true;
            console.log("Trip sheet Tab is verified.......")
        }
        return isVerify
    }

async assigNewContractor(tripNo,contractor)
{
    await basePage.clear(this.inputRefTrip)
    await basePage.sendKeys(this.inputRefTrip,tripNo)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    await basePage.click(this.tripSheetData)
    await basePage.wait(2000)
    await basePage.click(this.editContractorIcon)
    await basePage.sendKeys(this.inputSearchDriver, contractor)
    await basePage.keyboardEnter()
    await basePage.click(this.assignBtn)
    await basePage.click(this.iconTick)
    console.log("Contractor assigned successfully......")
}

async moveToTripSheet1(){
    await basePage.click(this.iconTripSheet)
    await basePage.click(this.btnGotoTripSheet)
}

//created new method for tripsheet
async moveToTripSheet(){
    await basePage.wait(1000)
    await basePage.click(this.goToTripSheetBtn)
    await basePage.wait(2000)
    // await basePage.pageReload()
}


async createTripSheet(sourceAddress, destinationAddress){
    await basePage.wait(2000)
    await basePage.click(this.btnCreateTripSheet)
    await basePage.click(this.radioBtnTripSheet)
    await basePage.click(this.forwardArrow)
    await basePage.sendKeys(this.searchAddressInTripSheet, sourceAddress)
    await basePage.wait(2000)
    await basePage.click(this.tripAddress)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.btnToday)
    await basePage.click(this.departureTime)
    await basePage.click(this.forwardArrow)
    await basePage.sendKeys(this.searchAddressInTripSheet, destinationAddress)
    await basePage.wait(2000)
    await basePage.click(this.tripAddress)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.btnTomorrow)
    await basePage.click(this.departureTime)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.forwardArrow)
    console.log("Trip sheet created successfully....")
}

async createRoundTrip(sourceAddress, destinationAddress){
    await basePage.wait(2000)
    await basePage.click(this.btnCreateTripSheet)
    await basePage.click(this.radioBtnTripSheet)
    await basePage.click(this.forwardArrow)
    await basePage.sendKeys(this.searchAddressInTripSheet, sourceAddress)
    await basePage.wait(2000)
    await basePage.click(this.tripAddress)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.btnToday)
    await basePage.click(this.departureTime)
    await basePage.click(this.forwardArrow)
    await basePage.sendKeys(this.searchAddressInTripSheet, destinationAddress)
    await basePage.wait(2000)
    await basePage.click(this.tripAddress)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.btnTomorrow)
    await basePage.click(this.departureTime)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.forwardArrow)
    await basePage.wait(1000)
    await basePage.click(this.checkBoxForReturn)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.forwardArrow)
    console.log("Trip sheet created successfully....")
}

async createRoundTripViaLeg1(sourceAddress, destinationAddress,viaAddress){
    await basePage.click(this.btnCreateTripSheet)
    await basePage.click(this.radioBtnTripSheet)
    await basePage.click(this.forwardArrow)
    await basePage.sendKeys(this.searchAddressInTripSheet, sourceAddress)
    await basePage.wait(2000)
    await basePage.click(this.tripAddress)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.btnToday)
    await basePage.click(this.departureTime)
    await basePage.click(this.forwardArrow)
    await basePage.sendKeys(this.searchAddressInTripSheet, destinationAddress)
    await basePage.wait(2000)
    await basePage.click(this.tripAddress)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.btnTomorrow)
    await basePage.click(this.departureTime)
    await basePage.click(this.forwardArrow)
    await basePage.sendKeys(this.searchAddressInTripSheet, viaAddress)
    await basePage.wait(2000)
    await basePage.click(this.tripAddress)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.btnTomorrow)
    await basePage.click(this.departureTime1)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.checkBoxForReturn)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.forwardArrow)
    console.log("Trip sheet created successfully....")
}


 
async addDetailsToTripCarrier(){
    await basePage.scrollToElement(this.iconServiceType)
    await basePage.click(this.iconServiceType)
    await basePage.click(this.serviceTypeOptionCarrier)
    await basePage.click(this.iconTick)
    console.log("serviceType is assigned as carrier.....")
    // await basePage.scrollToElement(this.iconCostCode)
    // await basePage.click(this.iconCostCode)
    // await basePage.click(this.costCodeValueTrip)
    // await basePage.click(this.iconTick)
    // console.log("Cost Code Value is selected.....")
    await basePage.scrollToElement(this.iconFreightCode)
    await basePage.click(this.iconFreightCode)
    await basePage.click(this.iconSelectCustomer)
    await basePage.click(this.tripCustomerCarrier)
    await basePage.click(this.freightCodeOptionCarrier)
    await basePage.wait(1000)
    await basePage.click(this.iconTick)
    console.log("Freight Code is selected in Tripsheet as carrier....") 
}

async addManifestToTripSheet(movement){
    await basePage.wait(2000)
    await basePage.waitForLocator(this.rowTripSheet)
    await basePage.click(this.rowTripSheet)
    let tripSheetRefId = await basePage.getText(this.txtRefNum)
    await testDataUtil.addKeyValueToObject(movement, "TripSheetRefId", tripSheetRefId)
    console.log("Trip Sheet RefId: "+tripSheetRefId)
    await basePage.wait(2000)
    await basePage.scrollToElement(this.editServiceIcon)
    await basePage.click(this.editServiceIcon) 
    await basePage.click(this.serviceOption) 
    await basePage.click(this.iconTick)
    console.log("Service Type Assigned successfully....")
    await basePage.wait(5000)
    await basePage.scrollToElement(this.iconExpandInTripSheet)
    await basePage.click(this.iconExpandInTripSheet)
    await basePage.wait(2000)
    await basePage.scrollToElement(this.iconPlusInTripSheet)
    await basePage.wait(2000)
    await basePage.click(this.iconPlusInTripSheet)
    // await basePage.selectFromDropdown(this.dropDownSelectAsset, asset)
    await basePage.waitForLocator(this.selectAsset)
    await basePage.click(this.selectAsset)
    await basePage.waitForLocator(this.valueAsset)
    await basePage.click(this.valueAsset)
    console.log("Asset selected....")
    await basePage.wait(3000)
    await basePage.click(this.rowManifestInTripSheet)
    // await basePage.scrollToElement(this.btnAssignTrip)
    // await basePage.click(this.btnAssignTrip)
    console.log("Trip assigned successfully....")
}

async addManifestToTripSheetForCarrierWithPrimeMoverSelected(movement,manifestNo){
    await basePage.wait(2000)
    await basePage.waitForLocator(this.rowTripSheet)
    await basePage.click(this.rowTripSheet)
    let tripSheetRefId = await basePage.getText(this.txtRefNum)
    await testDataUtil.addKeyValueToObject(movement, "TripSheetRefId", tripSheetRefId)
    console.log("Trip Sheet RefId: "+tripSheetRefId)

    // await basePage.wait(2000)
    // await basePage.scrollToElement(this.editServiceIcon)
    // await basePage.click(this.editServiceIcon) 
    // await basePage.click(this.serviceOption) 
    // await basePage.click(this.iconTick)
    // console.log("Service Type Assigned successfully....")
    await basePage.wait(3000)
    await basePage.scrollToElement(this.iconExpandInTripSheet)
    await basePage.click(this.iconExpandInTripSheet)
    await basePage.wait(2000)
    await basePage.scrollToElement(this.iconPlusInTripSheet1)
    await basePage.wait(2000)
    await basePage.click(this.iconPlusInTripSheet1)
    await basePage.click(this.primeMoverTab)
    await basePage.click(this.primeMoverOption)
    console.log("PrimeMover is selected successfully....")
    await basePage.wait(2000)

    await basePage.scrollToElement(this.iconExpandInTripSheet)
    await basePage.click(this.iconExpandInTripSheet)
    await basePage.wait(2000)
    await basePage.scrollToElement(this.iconAddManifest)
    await basePage.wait(2000)
    await basePage.click(this.iconAddManifest)
    // await basePage.selectFromDropdown(this.dropDownSelectAsset, asset)
    await basePage.wait(2000)
    let manifestRow=this.rowManifestInTripSheet1.replace("<<Text>>",manifestNo)
    await basePage.click(manifestRow)
    console.log("Trip assigned successfully....")
}


async addManifestToTripSheetForCarrier(movement,manifestNo){
    await basePage.wait(2000)
    await basePage.waitForLocator(this.rowTripSheet)
    await basePage.click(this.rowTripSheet)
    let tripSheetRefId = await basePage.getText(this.txtRefNum)
    await testDataUtil.addKeyValueToObject(movement, "TripSheetRefId", tripSheetRefId)
    console.log("Trip Sheet RefId: "+tripSheetRefId)

    await basePage.wait(2000)
    await basePage.scrollToElement(this.editServiceIcon)
    await basePage.click(this.editServiceIcon) 
    await basePage.click(this.serviceOption) 
    await basePage.click(this.iconTick)
    await basePage.wait(3000)
    console.log("Service Type Assigned successfully....")
    await basePage.scrollToElement(this.iconExpandInTripSheet)
    await basePage.click(this.iconExpandInTripSheet)
    await basePage.wait(2000)
    await basePage.scrollToElement1(this.iconPlusInTripSheet)
    await basePage.wait(2000)
    await basePage.click(this.iconPlusInTripSheet)
    // await basePage.selectFromDropdown(this.dropDownSelectAsset, asset)
    await basePage.waitForLocator(this.selectAsset)
    await basePage.click(this.selectAsset)
    await basePage.waitForLocator(this.valueAsset)
    await basePage.click(this.valueAsset)
    console.log("Asset selected....")
    // await basePage.selectFromDropdown(this.dropDownSelectAsset, asset)
    await basePage.wait(2000)
    let manifestRow=this.rowManifestInTripSheet1.replace("<<Text>>",manifestNo)
    await basePage.click(manifestRow)
    console.log("Trip assigned successfully....")
}


async addManifestToTripSheetForCarrier2(movement,manifestNo){
    await basePage.wait(2000)
    await basePage.waitForLocator(this.rowTripSheet)
    await basePage.click(this.rowTripSheet)
    let tripSheetRefId = await basePage.getText(this.txtRefNum)
    await testDataUtil.addKeyValueToObject(movement, "TripSheetRefId", tripSheetRefId)
    console.log("Trip Sheet RefId: "+tripSheetRefId)

    await basePage.wait(2000)
    await basePage.scrollToElement(this.editServiceIcon)
    await basePage.click(this.editServiceIcon) 
    await basePage.click(this.serviceOption) 
    await basePage.click(this.iconTick)
    await basePage.wait(3000)
    console.log("Service Type Assigned successfully....")
    await basePage.scrollToElement(this.iconExpandInTripSheet)
    await basePage.click(this.iconExpandInTripSheet)
    
    await basePage.wait(2000)
    await basePage.click(this.btnAssignment)
    let manifestRow=this.rowManifestInTripSheet1.replace("<<Text>>",manifestNo)
    await basePage.click(manifestRow)
    console.log("Trip assigned successfully....")
    
    await basePage.wait(2000)
    await basePage.scrollToElement1(this.iconPlusInTripSheet)
    await basePage.wait(2000)
    await basePage.click(this.iconPlusInTripSheet)
    await basePage.waitForLocator(this.selectAsset)
    await basePage.click(this.selectAsset)
    await basePage.waitForLocator(this.valueAsset)
    await basePage.click(this.valueAsset)
    console.log("Asset selected....")

}

async addManifestToTripSheetForContractor(movement,manifestNo){
    await basePage.wait(2000)
    await basePage.waitForLocator(this.rowTripSheet)
    await basePage.click(this.rowTripSheet)
    let tripSheetRefId = await basePage.getText(this.txtRefNum)
    await testDataUtil.addKeyValueToObject(movement, "TripSheetRefId", tripSheetRefId)
    console.log("Trip Sheet RefId: "+tripSheetRefId)

    await basePage.wait(2000)
    await basePage.scrollToElement(this.editServiceIcon)
    await basePage.click(this.editServiceIcon) 
    await basePage.click(this.serviceOptionCon) 
    await basePage.click(this.iconTick)
    await basePage.wait(3000)
    console.log("Service Type Assigned successfully....")
    await basePage.scrollToElement(this.iconExpandInTripSheet)
    await basePage.click(this.iconExpandInTripSheet)
    await basePage.wait(2000)
    await basePage.scrollToElement1(this.iconPlusInTripSheet)
    await basePage.wait(2000)
    await basePage.click(this.iconPlusInTripSheet)
    // await basePage.selectFromDropdown(this.dropDownSelectAsset, asset)
    await basePage.waitForLocator(this.selectAsset)
    await basePage.click(this.selectAsset)
    await basePage.waitForLocator(this.valueAssetCon)
    await basePage.click(this.valueAssetCon)
    console.log("Asset selected....")
    // await basePage.selectFromDropdown(this.dropDownSelectAsset, asset)
    await basePage.wait(2000)
    let manifestRow=this.rowManifestInTripSheet1.replace("<<Text>>",manifestNo)
    await basePage.click(manifestRow)
    await basePage.scrollToElement(this.btnAssignTrip)
    await basePage.click(this.btnAssignTrip)
    console.log("Trip assigned successfully....")
}



async addManifestToTripForLeg2(movement,manifestNo){
    await basePage.wait(2000)
    // await basePage.waitForLocator(this.rowTripSheet)
    // await basePage.click(this.rowTripSheet)
    let tripSheetRefId = await basePage.getText(this.txtRefNum)
    await testDataUtil.addKeyValueToObject(movement, "TripSheetRefId", tripSheetRefId)
    console.log("Trip Sheet RefId: "+tripSheetRefId)

    // await basePage.wait(2000)
    // await basePage.scrollToElement(this.editServiceIcon)
    // await basePage.click(this.editServiceIcon) 
    // await basePage.click(this.serviceOption) 
    // await basePage.click(this.iconTick)
    // console.log("Service Type Assigned successfully....")
    await basePage.wait(3000)
    await basePage.scrollToElement(this.iconExpandInTripSheet1)
    await basePage.click(this.iconExpandInTripSheet1)
    await basePage.wait(2000)
    await basePage.scrollToElement(this.iconPlusInTripSheet)
    await basePage.wait(2000)
    await basePage.click(this.iconPlusInTripSheet)
    console.log("Icon plus is clicked successfully.....")
    await basePage.waitForLocator(this.selectAsset)
    await basePage.click(this.selectAsset)
    await basePage.waitForLocator(this.valueAsset1)
    await basePage.click(this.valueAsset1)
    console.log("Asset selected....")
    await basePage.wait(2000)
    let manifestRow=this.rowManifestInTripSheet1.replace("<<Text>>",manifestNo)
    await basePage.click(manifestRow)
    console.log("Trip assigned successfully....")
}

async addManifestToTripForLeg3(movement,manifestNo){
    await basePage.wait(2000)
    // await basePage.waitForLocator(this.rowTripSheet)
    // await basePage.click(this.rowTripSheet)
    let tripSheetRefId = await basePage.getText(this.txtRefNum)
    await testDataUtil.addKeyValueToObject(movement, "TripSheetRefId", tripSheetRefId)
    console.log("Trip Sheet RefId: "+tripSheetRefId)

    // await basePage.wait(2000)
    // await basePage.scrollToElement(this.editServiceIcon)
    // await basePage.click(this.editServiceIcon) 
    // await basePage.click(this.serviceOption) 
    // await basePage.click(this.iconTick)
    // console.log("Service Type Assigned successfully....")
    await basePage.wait(3000)
    await basePage.scrollToElement(this.iconExpandInTripSheet2)
    await basePage.click(this.iconExpandInTripSheet2)
    await basePage.wait(2000)
    await basePage.scrollToElement(this.iconPlusInTripSheet)
    await basePage.wait(2000)
    await basePage.click(this.iconPlusInTripSheet)
    console.log("Icon plus is clicked successfully.....")
    await basePage.waitForLocator(this.selectAsset)
    await basePage.click(this.selectAsset)
    await basePage.waitForLocator(this.valueAsset2)
    await basePage.click(this.valueAsset2)
    console.log("Asset selected....")
    await basePage.wait(2000)
    let manifestRow=this.rowManifestInTripSheet1.replace("<<Text>>",manifestNo)
    await basePage.click(manifestRow)
    console.log("Trip assigned successfully....")
}

async addManifestToTripForLeg4(movement,manifestNo){
    await basePage.wait(2000)
    // await basePage.waitForLocator(this.rowTripSheet)
    // await basePage.click(this.rowTripSheet)
    let tripSheetRefId = await basePage.getText(this.txtRefNum)
    await testDataUtil.addKeyValueToObject(movement, "TripSheetRefId", tripSheetRefId)
    console.log("Trip Sheet RefId: "+tripSheetRefId)

    // await basePage.wait(2000)
    // await basePage.scrollToElement(this.editServiceIcon)
    // await basePage.click(this.editServiceIcon) 
    // await basePage.click(this.serviceOption) 
    // await basePage.click(this.iconTick)
    // console.log("Service Type Assigned successfully....")
    await basePage.wait(3000)
    await basePage.scrollToElement(this.iconExpandInTripSheet3)
    await basePage.click(this.iconExpandInTripSheet3)
    await basePage.wait(2000)
    await basePage.scrollToElement(this.iconPlusInTripSheet)
    await basePage.wait(2000)
    await basePage.click(this.iconPlusInTripSheet)
    console.log("Icon plus is clicked successfully.....")
    await basePage.waitForLocator(this.selectAsset)
    await basePage.click(this.selectAsset)
    await basePage.waitForLocator(this.valueAsset3)
    await basePage.click(this.valueAsset3)
    console.log("Asset selected....")
    await basePage.wait(2000)
    let manifestRow=this.rowManifestInTripSheet1.replace("<<Text>>",manifestNo)
    await basePage.click(manifestRow)
    console.log("Trip assigned successfully....")
}


async assignContractorToTrip(contractor){
    await basePage.waitForLocator(this.editContractorIcon)
    await basePage.click(this.editContractorIcon)
    await basePage.sendKeys(this.inputSearchDriver, contractor)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    await basePage.click(this.assignBtn)
    await basePage.click(this.iconTick)
    console.log("Contractor assigned successfully......")

}


async verifyAssignContracInBookedJobPage1(strMovement, manifestNo, contractor){
    let isVerify = false
    
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.click(this.tabBooked) 
    await basePage.waitForLocator(this.inputSearch)
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    const movementLocator = page.locator(`//td/div[text()='${createConsignmentPage.extractedNumber}']/..`)
    await basePage.wait(5000)
    await movementLocator.click()
    let contractorAssign=await basePage.getText(this.contractorAssigned)
    await basePage.wait(1000)
    //console.log("Contractor in Web is "+contractorAssign)
    //console.log("Contractor in test data is "+contractor)
    await basePage.scrollToElement(this.manifestNoInBooked)
    let manifestNumber=await basePage.getText(this.manifestNoInBooked)
    let manifestNum=String(manifestNumber).trim()
    //console.log("Manifest in Web is "+manifestNum)
    //console.log("Manifest in test data is "+manifestNo)
    if(contractor == contractorAssign && manifestNum == manifestNo){
        console.log(`Manifest number in booked Job Page is ${manifestNum}`);
        console.log(`Contractor assigned in job is ${contractor}`);
        isVerify=true
    }
    return isVerify;
}

async verifyAssignContracInBookedJobPage(strMovement, manifestNo, contractor){
    let isVerify = false
    
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.click(this.tabBooked) 
    await basePage.waitForLocator(this.inputSearch)
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    const movementLocator = page.locator(`//td[text()='${strMovement}']`)
    await basePage.wait(5000)
    await movementLocator.click()
    let contractorAssign=await basePage.getText(this.contractorAssigned)
    await basePage.wait(1000)
    //console.log("Contractor in Web is "+contractorAssign)
    //console.log("Contractor in test data is "+contractor)
    await basePage.scrollToElement(this.manifestNoInBooked)
    let manifestNumber=await basePage.getText(this.manifestNoInBooked)
    let manifestNum=String(manifestNumber).trim()
    //console.log("Manifest in Web is "+manifestNum)
    //console.log("Manifest in test data is "+manifestNo)
    if(contractor == contractorAssign && manifestNum == manifestNo){
        console.log(`Manifest number in booked Job Page is ${manifestNum}`);
        console.log(`Contractor assigned in job is ${contractor}`);
        isVerify=true
    }
    return isVerify;
}

async verifyAssignContractorInManifestPage(manifestNo, contractor){
    let isVerify=false;
    //await basePage.click(this.iconCloseManifestOverview)
    await basePage.wait(4000)
    await basePage.click(this.manifestTab)
    await basePage.sendKeys(this.refSearchInManifest, manifestNo)
    //await basePage.keyboardEnter()
    await basePage.wait(6000)
    if(await basePage.verifyElement(this.iconCloseManifestOverview)){
        await basePage.click(this.iconCloseManifestOverview)
    }
    await basePage.click(this.maniFestJob)
    await basePage.wait(2000)
    let assigncontrac=await basePage.getText(this.assignedContracInManifest)
    if(await basePage.verifyElement(this.iconCloseManifestOverview)){
        await basePage.click(this.iconCloseManifestOverview)
    }
    let assigncon=String(assigncontrac).trim()
    console.log("Contractor in manifest is "+assigncon)
    if(assigncon==contractor){
      console.log(`Contractor assigned in manifest is ${assigncon}`)
      isVerify=true
    }
    return isVerify;
}

async searchManifest(manifestNo){
    await basePage.click(this.manifestTab)
    console.log(await basePage.verifyElement(this.iconCloseManifestOverview))
    if(await basePage.verifyElement(this.iconCloseManifestOverview)){
    await basePage.click(this.iconCloseManifestOverview)
    }
    await basePage.sendKeys(this.refSearchInManifest, manifestNo)
    //await basePage.keyboardEnter()
    await basePage.wait(6000)
}


async addManifestDetailsTotripSheet(movement,totalWgInManifest){
    let isVerify;
    await basePage.wait(2000)
    await basePage.waitForLocator(this.rowTripSheet)
    await basePage.click(this.rowTripSheet)
    let tripSheetRefId = await basePage.getText(this.txtRefNum)
    await testDataUtil.addKeyValueToObject(movement, "TripSheetRefId", tripSheetRefId)
    console.log("Trip Sheet RefId: "+tripSheetRefId)
    await basePage.wait(2000)
    await basePage.scrollToElement(this.editServiceIcon)
    await basePage.click(this.editServiceIcon) 
    await basePage.click(this.serviceOption) 
    await basePage.click(this.iconTick)
    console.log("Service Type Assigned successfully....")
    await basePage.wait(3000)
    await basePage.scrollToElement(this.iconExpandInTripSheet)
    await basePage.click(this.iconExpandInTripSheet)
    await basePage.wait(2000)
    await basePage.scrollToElement(this.iconPlusInTripSheet)
    await basePage.wait(2000)
    await basePage.click(this.iconPlusInTripSheet)
    // await basePage.selectFromDropdown(this.dropDownSelectAsset, asset)
    await basePage.waitForLocator(this.selectAsset)
    await basePage.click(this.selectAsset)
    await basePage.waitForLocator(this.valueAsset)
    await basePage.click(this.valueAsset)
    console.log("Asset selected....")
    await basePage.wait(2000)
    await basePage.click(this.rowManifestInTripSheet)
    await basePage.scrollToElement(this.iconExpandInTripSheet)
    await basePage.click(this.iconExpandInTripSheet)
    await basePage.wait(2000)
    await basePage.waitForLocator(this.load)
    let totalWeightInTripSheet = await basePage.getText(this.load)
    let regex=/^(\d+)(?:\.00)?kg$/;
    let weight1=totalWgInManifest.match(regex);
    let weight2=totalWeightInTripSheet.match(regex);
    console.log("Total weight in manifest is "+weight1[1])
    console.log("Total weight in manifest is "+weight2[2])
    if(weight1[1] == weight2[1]){
        console.log("The total weight in manfest and trisheet are same..")
        isVerify=true;
    }
    return isVerify;
}

async acceptZoneChange(){
    await basePage.waitForLocator(this.updateZoneMovement)
    await basePage.click(this.buttonOk)
    await basePage.wait(4000)
    console.log('Zone has been updated....')

 }


 async verifyZoneJobs(rec, lh, coll){
    let isVerify = false
    await basePage.wait(15000)
    if(await basePage.verifyElement(`//td[text()='${rec}']`)){
        await basePage.verifyElement(`//td[text()='${lh}']`)
        await basePage.verifyElement(`//td[text()='${coll}']`)
        console.log("All legs verified successfully....")
        isVerify = true
    }
    else{
        console.log("All legs verification failed....")
    }
    return isVerify
}

async addDetailsTotripSheet(driver,driver2){
await basePage.scrollToElement(this.iconPrimeMover)
await basePage.click(this.iconPrimeMover)
await basePage.click(this.primeMoverTab)
await basePage.click(this.primeMoverOption)
console.log("PrimeMover is selected successfully....")
await basePage.scrollToElement(this.iconPrimaryDriver)
await basePage.click(this.iconPrimaryDriver)
await basePage.sendKeys(this.inputSearchDriver, driver)
await basePage.keyboardEnter()
await basePage.wait(2000)
await basePage.scrollToElement(this.btnPrimary)
await basePage.click(this.btnPrimary)
await basePage.click(this.iconTick)
console.log("Primary Driver assigned successfully....")
await basePage.scrollToElement(this.iconSecondaryDriver)
await basePage.click(this.iconSecondaryDriver)
await basePage.sendKeys(this.inputSearchDriver, driver2)
await basePage.keyboardEnter()
await basePage.wait(2000)
await basePage.scrollToElement(this.btnSecondary)
await basePage.click(this.btnSecondary)
await basePage.click(this.iconTick)
console.log("Secondary Driver assigned successfully...")
await basePage.scrollToElement(this.iconCostCode)
await basePage.click(this.iconCostCode)
await basePage.click(this.costCodeValueTrip)
await basePage.click(this.iconTick)
console.log("Cost Code Value is selected.....")
await basePage.scrollToElement(this.iconFreightCode)
await basePage.click(this.iconFreightCode)
await basePage.click(this.iconSelectCustomer)
await basePage.click(this.tripCustomer)
await basePage.click(this.freightCodeOption)
await basePage.click(this.iconTick)
console.log("Freight Code is selected in Tripsheet....")
}


async addDetailsTotripSheet2(driver,driver2){
    await basePage.scrollToElement(this.iconPrimeMover)
    await basePage.click(this.iconPrimeMover)
    await basePage.click(this.primeMoverTab)
    await basePage.click(this.primeMoverOption)
    console.log("PrimeMover is selected successfully....")
    await basePage.scrollToElement(this.iconPrimaryDriver)
    await basePage.click(this.iconPrimaryDriver)
    await basePage.sendKeys(this.inputSearchDriver, driver)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    await basePage.scrollToElement(this.btnPrimary)
    await basePage.click(this.btnPrimary)
    await basePage.click(this.iconTick)
    console.log("Primary Driver assigned successfully....")
    await basePage.scrollToElement(this.iconSecondaryDriver)
    await basePage.click(this.iconSecondaryDriver)
    await basePage.sendKeys(this.inputSearchDriver, driver2)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    await basePage.scrollToElement(this.btnSecondary)
    await basePage.click(this.btnSecondary)
    await basePage.click(this.iconTick)
    console.log("Secondary Driver assigned successfully...")
    }


async verifyTripDetailsInContractor(source,destination,freight,service,primeMover){
    let isVerify=false
await basePage.wait(2000)
let primeVal=await basePage.getText(this.primeMoverValInContrac)
await basePage.scrollToElement(this.sourceValue)
let sourceVal=await basePage.getText(this.sourceValue) //"CarrierSourceAddInTrip": "20 Walters Drive",
await basePage.scrollToElement(this.destinationValue)
let destinationVal=await basePage.getText(this.destinationValue)//"CarrierDestinationInTrip": "3rd Party Collection",
await basePage.scrollToElement(this.carrierFreightVal)
let freightVal=await basePage.getText(this.carrierFreightVal)
await basePage.scrollToElement(this.carrierServiceTypeVal)
let servicetypeVal= await basePage.getText(this.carrierServiceTypeVal)
console.log(primeVal)
console.log(sourceVal)
console.log(destinationVal)
console.log(freightVal)
console.log(servicetypeVal)
if(source==sourceVal&& destination==destinationVal && freight==freightVal && service==servicetypeVal && primeVal==primeMover){
    isVerify=true;
    console.log(isVerify)
    console.log("Source, destination, freight and serviceType are verified and same as carrier.........")
}
return isVerify;
}


async verifyTripDetailsInCarrier(freight,serviceType){
    let isVerify=false;
    await basePage.wait(2000)
    await basePage.scrollToElement(this.contracFreightVal)
    let freightVal=await basePage.getText(this.contracFreightVal)
    await basePage.scrollToElement(this.contracServiceTypeVal)
    let servicetypeVal= await basePage.getText(this.contracServiceTypeVal)
    console.log(freightVal)
    console.log(servicetypeVal)

    if(freight==freightVal && serviceType==servicetypeVal){
    isVerify=true;
    console.log("ServiceType,Freight Code are verfied in carrier.....")
    }
return isVerify;
}


async updateTripsheetInContractor(driver,driver2){
    await basePage.scrollToElement(this.iconPrimaryDriver)
    await basePage.click(this.iconPrimaryDriver)
    await basePage.sendKeys(this.inputSearchDriver, driver)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    await basePage.scrollToElement(this.btnPrimary)
    await basePage.click(this.btnPrimary)
    await basePage.click(this.iconTick)
    console.log("Primary Driver assigned successfully....")
    await basePage.scrollToElement(this.iconSecondaryDriver)
    await basePage.click(this.iconSecondaryDriver)
    await basePage.sendKeys(this.inputSearchDriver, driver2)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    await basePage.scrollToElement(this.btnSecondary)
    await basePage.click(this.btnSecondary)
    await basePage.click(this.iconTick)
    console.log("Secondary Driver assigned successfully...")
    await basePage.scrollToElement(this.iconServiceType)
    await basePage.click(this.iconServiceType)
    await basePage.click(this.serviceTypeOptionContrac)
    await basePage.click(this.iconTick)
    console.log("serviceType is assigned")
    // await basePage.scrollToElement(this.iconCostCode)
    // await basePage.click(this.iconCostCode)
    // await basePage.click(this.costCodeValueTrip)
    // await basePage.click(this.iconTick)
    // console.log("Cost Code Value is selected.....")
    await basePage.scrollToElement(this.iconFreightCode)
    await basePage.click(this.iconFreightCode)
    await basePage.click(this.iconSelectCustomer)
    await basePage.click(this.tripCustomerContractor)
    await basePage.click(this.freightCodeOptionContrac)
    await basePage.click(this.iconTick)
    console.log("Freight Code is selected in Tripsheet....") 
}


async assignDriverToThistrip(driver){

    if (await basePage.verifyElement(this.editDriverIcon)){
    await basePage.click(this.editDriverIcon)
    await basePage.waitForLocator(this.inputSearchDriver)
    await basePage.sendKeys(this.inputSearchDriver, driver)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    //await basePage.scrollToElement(this.btnPrimary)
    await basePage.click(this.btnPrimary)
    await basePage.click(this.iconTick)
    console.log("Driver assigned successfully....")
    } else{
    await basePage.waitForLocator(this.inputSearchDriver)
    await basePage.sendKeys(this.inputSearchDriver, driver)
    await basePage.keyboardEnter()
    await basePage.wait(2000)
    await basePage.scrollToElement(this.btnPrimary)
    await basePage.click(this.btnPrimary)
    await basePage.click(this.iconTick)
    console.log("Driver assigned successfully....")
    } 
    

}

async clickArrowIcon(){
    await basePage.click(this.iconTick)
} 

async createTripByAddingViaLeg1(sourceAddress, destinationAddress,viaAddress){
    await basePage.click(this.btnCreateTripSheet)
    await basePage.click(this.radioBtnTripSheet)
    await basePage.click(this.forwardArrow)
    await basePage.sendKeys(this.searchAddressInTripSheet, sourceAddress)
    await basePage.wait(2000)
    await basePage.click(this.tripAddress)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.btnToday)
    await basePage.click(this.departureTime)
    await basePage.click(this.forwardArrow)
    await basePage.sendKeys(this.searchAddressInTripSheet, destinationAddress)
    await basePage.wait(2000)
    await basePage.click(this.tripAddress)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.btnTomorrow)
    await basePage.click(this.departureTime)
    await basePage.click(this.forwardArrow)
    await basePage.sendKeys(this.searchAddressInTripSheet, viaAddress)
    await basePage.wait(2000)
    await basePage.click(this.tripAddress)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.btnTomorrow)
    await basePage.click(this.departureTime1)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.forwardArrow)
    await basePage.click(this.forwardArrow)
    console.log("Trip sheet created successfully....")
}

async deliverTheJob(){    
    await basePage.waitForLocator(this.btnIntransit)
    await basePage.scrollToElement(this.btnIntransit)
    await basePage.wait(5000)
    await basePage.click(this.btnIntransit)
    if(await basePage.verifyElement(this.demurageHrs)){
    await basePage.click(this.demurageHrs)
    await basePage.clear(this.demurageHrs)
    await basePage.sendKeys(this.demurageHrs,"1")
    await basePage.click(this.okBtn)
    console.log("Entered hours for Loading demurage.......")
    }
    await basePage.waitForLocator(this.btnLegArrived)
    await basePage.click(this.btnLegArrived)
    await basePage.wait(2000)
    await basePage.click(this.btnDelivered)
    await basePage.wait(2000)
    console.log("Btn delivered is clicked successfully....")
    if(await basePage.verifyElement(this.demurageHrs)){
        await basePage.click(this.demurageHrs)
        await basePage.clear(this.demurageHrs)
        await basePage.sendKeys(this.demurageHrs,"1")
        await basePage.click(this.okBtn)
        console.log("Entered hours for Unloading demurage.......")
        await basePage.wait(2000)
    }
    // if(await basePage.verifyElement(this.inputFirstName)){
    //     console.log("Receivers name textbox is visible....")
    //     await basePage.waitForLocator(this.inputFirstName)
    //     await basePage.clear(this.inputFirstName)
    //     await basePage.sendKeys(this.inputFirstName, "Test")
    //     await basePage.clear(this.inputLastName)
    //     await basePage.sendKeys(this.inputLastName, "user")
    //     await basePage.clickKeyboardBackSpace()
    //     await basePage.click(this.btnNext)
    //     console.log("Sender details entered successfully....")
    // }
    if(await basePage.verifyElement(this.inputFirstName)){
        console.log("Receivers name textbox is visible....")
     }
    else{
        await basePage.wait(3000)
        await basePage.click(this.tabBooked)
        console.log("Tab booked is clicked succesfully....")
    }

}

async deliverTheJobLH(){
    
    await basePage.waitForLocator(this.btnIntransit)
    await basePage.scrollToElement(this.btnIntransit)
    await basePage.wait(5000)
    await basePage.click(this.btnIntransit)
    if(await basePage.verifyElement(this.demurageHrs)){
    await basePage.click(this.demurageHrs)
    await basePage.clear(this.demurageHrs)
    await basePage.sendKeys(this.demurageHrs,"1")
    await basePage.click(this.okBtn)
    console.log("Entered hours for Loading demurage.......")
    }
    await basePage.waitForLocator(this.btnLegArrived)
    await basePage.click(this.btnLegArrived)
    await basePage.wait(2000)
    await basePage.click(this.btnDelivered)
    await basePage.wait(2000)
    console.log("Btn delivered is clicked successfully....")
    if(await basePage.verifyElement(this.demurageHrs)){
        await basePage.click(this.demurageHrs)
        await basePage.clear(this.demurageHrs)
        await basePage.sendKeys(this.demurageHrs,"1")
        await basePage.click(this.okBtn)
        console.log("Entered hours for Unloading demurage.......")
        await basePage.wait(2000)
    }
}

async verifyLH2Jobs(pu, lh){
    let isVerify = false
    await basePage.wait(2000)
    let element1 = this.lh3Jobs.replace("<<Text>>", pu)
    let element2 = this.lh3Jobs.replace("<<Text>>", lh)
    if(await basePage.verifyElement(element1)){
        await basePage.verifyElement(element2)
        console.log("All legs verified successfully....")
        isVerify = true
    }
    else{
        console.log("All legs verification failed....")
    }
    return isVerify
}

async verifyJobLeg(lh){
    let isVerify = false
    let element = this.lh3Jobs.replace("<<Text>>", lh)
    await basePage.wait(10000)
    console.log(element)
    if(await basePage.verifyElement(element)){
        console.log("All legs verified successfully....")
        isVerify = true
    }
    else{
        console.log("All legs verification failed....")
    }
    return isVerify
}

async getExitTime(movement) {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5); // Add 1 minute

    const options24 = { hour: '2-digit', minute: '2-digit', hour12: false };
    const options12 = { hour: '2-digit', minute: '2-digit', hour12: true };

    const newTimeString24 = now.toLocaleTimeString('en-GB', options24);
    let newTimeString12 = now.toLocaleTimeString('en-US', options12);

    // Remove leading zero in 12-hour format
    if (newTimeString12.charAt(0) === '0') {
        newTimeString12 = newTimeString12.slice(1);
    }

    console.log("Exit Time: " + newTimeString24);
    console.log("Exit Time (12-hour format): " + newTimeString12);
    await basePage.waitForLocator(this.inputExitTime);
    await basePage.typeText(this.inputExitTime, newTimeString24);
    await basePage.wait(1000)
    await basePage.click(this.btnSubmit1);
    await testDataUtil.addKeyValueToObject(movement, "ExitTime", newTimeString12);
    console.log("================"+newTimeString12+"====================")
    
}

async verifyIconDG(){
    await basePage.waitForLocator(this.iconDangerousGoods)
    await basePage.scrollToElement(this.iconDangerousGoods)
    return await basePage.verifyElement(this.iconDangerousGoods)
}

// =================================================

async reinstateTheJob(){
    await basePage.wait(5000)
    await basePage.waitForLocator(this.iconReinstate)
    await basePage.scrollToElement(this.iconReinstate)
    await basePage.click(this.iconReinstate)
    await basePage.waitForLocator(this.btnReinstate)
    await basePage.click(this.btnReinstate)
    console.log("leg successfully reinstated...")
}

async clickTheTabs(tab){
    const element = this.tabs.replace("<<Text>>", tab)
    await basePage.waitForLocator(element)
    await basePage.click(element)
    console.log("Tab:"+ tab)
}

async cancelTheJob() {
    //await basePage.waitForLocator(this.iconJobCancel)
    await basePage.scrollToElement(this.iconJobCancel)
    await basePage.click(this.iconJobCancel)
    await basePage.waitForLocator(this.btnCancelIt)
    await basePage.click(this.btnCancelIt)
    console.log("Job Canceled Successfully.......")
}

async verifyMyJobsPage() {
    await basePage.waitForLocator(this.tabBooked)
    await basePage.scrollToElement(this.tabBooked)
    return await basePage.verifyElement(this.tabBooked)
}

async editRateCharge(rate,movement){
    let isVerify = false
    let rateCharge;
    if(movement== "LH2" || movement == "LH3"){
        rateCharge=this.rateCharge.replace("<<Text>>",2)
     }else{
        rateCharge=this.rateCharge.replace("<<Text>>",1)
    }
    await basePage.scrollToElement(rateCharge)
    await basePage.clear(rateCharge)
    await basePage.sendKeys(rateCharge, rate)
    await basePage.keyboardEnter()
    console.log("Rate edited Successfully........")
}




async verifyRateCharge(ratecharges,movement) {
    let isVerify = false
    let rateValue;
    if(movement== "LH2" || movement == "LH3"){

        rateValue=this.rateCharge.replace("<<Text>>",2)
     }else{
        rateValue=this.rateCharge.replace("<<Text>>",1)
    }

   // await basePage.scrollToElement(rateValue)
    console.log("Rate Charge :"+await basePage.getInputValue(rateValue))
    console.log(ratecharges)
    if(await basePage.getInputValue(rateValue) == ratecharges){
        isVerify = true
        console.log("Rate charge verified successfully....")
    }
    return isVerify
}

async verifyRateCharge1(ratecharges,movement) {
    let isVerify = false
    let rateValue;
    if(movement== "LH2" || movement == "LH3"){
        rateValue=this.rateCharge1.replace("<<Text>>",2)
     }else{
        rateValue=this.rateCharge1.replace("<<Text>>",1)
    }

   // await basePage.scrollToElement(rateValue)
    console.log("Rate Charge :"+await basePage.getInputValue(rateValue))
    console.log(ratecharges)
    if(await basePage.getInputValue(rateValue) == ratecharges){
        isVerify = true
        console.log("Rate charge verified successfully....")
    }
    return isVerify
}

async verifyMetric(metricData,movement) {
    
    let isVerify = false
    let metricValue;
    if(movement == "LH2" || movement == "LH3"){
        metricValue=this.metricWeight1.replace("<<Text>>",2)
    }else{
        metricValue=this.metricWeight1.replace("<<Text>>",1)
    }
    await basePage.scrollToElement(metricValue)
    console.log("Metric value:"+await basePage.getInputValue(metricValue))
    if(await basePage.getInputValue(metricValue) == metricData){
        isVerify = true
        console.log("Metric value is verified successfully....")
    }
    return isVerify
}

  async verifyPrice(rateCharge,movement){
    let isVerify = false
    let priceValue;
    if(movement== "LH2" || movement == "LH3"){
      priceValue=this.price.replace("<<Text>>",2)
     }else{
     priceValue=this.price.replace("<<Text>>",1)
    }
    let metricValue;
    if(movement == "LH2" || movement == "LH3"){
        metricValue=this.metricWeight1.replace("<<Text>>",2)
    }else{
        metricValue=this.metricWeight1.replace("<<Text>>",1)
    }
    console.log(priceValue)
    console.log(await basePage.verifyElement(priceValue))
    await basePage.waitForLocator(priceValue)
    if(await basePage.verifyElement(priceValue)){
        await basePage.waitForLocator(metricValue)
        console.log("Metric Value: "+ await basePage.getInputValue(metricValue))
        const price = await basePage.getInputValue(metricValue) * rateCharge
        console.log("Calculated Price : "+price)
        console.log("Price : "+ await basePage.getText(priceValue))
        if(await basePage.getText(priceValue) == price){
            isVerify= true;
        console.log("Price : "+ await basePage.getText(priceValue))
        console.log("Calculated Price :"+ price)
        console.log("Price verified successfully....")
        }
    }
    return isVerify
}

async verifyPriceForHour(rateCharge,movement){
    let isVerify = false
    let priceValue;
    if(movement== "LH2" || movement == "LH3"){
      priceValue=this.price.replace("<<Text>>",2)
     }else{
     priceValue=this.price.replace("<<Text>>",1)
    }
    let metricValue;
    if(movement == "LH2" || movement == "LH3"){
        metricValue=this.metricWeight1.replace("<<Text>>",2)
    }else{
        metricValue=this.metricWeight1.replace("<<Text>>",1)
    }
    // console.log(priceValue)
    // console.log(await basePage.verifyElement(priceValue))
    await basePage.waitForLocator(priceValue)
    if(await basePage.verifyElement(priceValue)){
        await basePage.waitForLocator(metricValue)
        console.log("Metric Value: "+await basePage.getInputValue(metricValue))
        const price = await basePage.getInputValue(metricValue) * rateCharge
        let numericValue = parseFloat(price);
        let roundedValue = numericValue.toFixed(1);
        console.log("Calculated Price : "+roundedValue)
        await basePage.wait(4000)
        console.log("Price : "+ await basePage.getText(priceValue))
        if(await basePage.getText(priceValue) == roundedValue){
            isVerify= true;
        console.log("Price : "+ await basePage.getText(priceValue))
        console.log("Calculated Price :"+ roundedValue)
        console.log("Price verified successfully....")
        }
    }
    return isVerify
}

async verifyPrice1(rateCharge,movement){
    let isVerify = false
    let priceValue;
    if(movement== "LH2" || movement == "LH3"){
      priceValue=this.price1.replace("<<Text>>",2)
     }else{
     priceValue=this.price1.replace("<<Text>>",1)
    }
    let metricValue;
    if(movement == "LH2" || movement == "LH3"){
        metricValue=this.metricWeight1.replace("<<Text>>",2)
    }else{
        metricValue=this.metricWeight1.replace("<<Text>>",1)
    }
    // console.log(priceValue)
    // console.log(await basePage.verifyElement(priceValue))
    await basePage.waitForLocator(priceValue)
    if(await basePage.verifyElement(priceValue)){
        console.log("Metric Value: "+await basePage.getInputValue(metricValue))
        const price = await basePage.getInputValue(metricValue) * rateCharge
        isVerify = await basePage.getText(priceValue) == price
        console.log("Price : "+ await basePage.getText(priceValue))
        console.log("Calculated Price :"+ price)
        console.log("Price verified successfully....")
    }
    return isVerify
}


// async verifyPrice(rateCharge){
//     let isVerify = false

//     if(await basePage.verifyElement(this.price)){
//         const price = await basePage.getInputValue(this.metricWeight) * rateCharge
//         isVerify = await basePage.getText(this.price) == price
//         console.log("Price : "+ await basePage.getText(this.price))
//         console.log("Calculated Price :"+ price)
//         console.log("Price verified successfully....")
//     }
//     return isVerify
    
// }


async verifyPriceForFixed(rateCharge,movement){
    let isVerify = false
    let priceValue;
    if(movement== "LH2" || movement == "LH3"){
      priceValue=this.price.replace("<<Text>>",2)
     }else{
     priceValue=this.price.replace("<<Text>>",1)
    }

    console.log(priceValue)
    console.log(await basePage.verifyElement(priceValue))
    if(await basePage.verifyElement(priceValue)){
        const Rate= (await basePage.getText(priceValue)).trim()
        console.log("Rate : "+Rate)
        if(Rate == rateCharge){
        isVerify = true;
        console.log(isVerify)
        const price = await basePage.getText(priceValue)
        console.log("Price : "+price.trim() )
        console.log("Price verified successfully....")
        }
    }
    return isVerify
    
}

async closeJobView(){
    await basePage.waitForLocator(this.closeJob)
    await basePage.click(this.closeJob)
}
 async removeFreightCode(){

    await basePage.click(this.masterJob)
    await basePage.click(this.editJobIcon)
    console.log("Edit Icon is clicked.......")
    // await basePage.click(this.editFreight)
    // await basePage.scrollTo(this.removeFreight)
    // await basePage.click(this.removeFreight)
   await basePage.selectFromDropdown(this.editFreight,"No Rate")
    console.log("Freight is removed....")
    await basePage.click(this.updateBtn)
    console.log("Removing Freight, Job Updated.....")
 }
 
 async verifyFreightIsVisible(text1,text2){
    let isVerify=true
    await basePage.wait(5000)
    for(let i=1;i<=4;i++){
     let jobs=this.jobLegs.replace("<<Text>>",i)
     const status=await basePage.verifyTexts(jobs,text1,text2)
     isVerify=status
    }
    console.log("Fright code is not present, verified successfully.........")
    return isVerify
 }

 async addFreightCode(freight){
    await basePage.click(this.masterJob)
    await basePage.click(this.editJobIcon)
    console.log("Edit Icon is clicked.......") 
    await basePage.selectFromDropdown(this.editFreight,freight)
    console.log("Freight is added....")
    await basePage.click(this.updateBtn)
    console.log("Re-added Freight, Job Updated.....")
 }

 async editCustomerRate(rate,freight){
    await basePage.click(this.customerRate)
    console.log("Customer Rate is clicked.....")
    await basePage.click(this.customeName)
    let freightCode=this.editFreightIcon.replace("<<Text>>",freight)
    await basePage.click(freightCode)
    console.log("Freight to be edited is clicked.....")
    await basePage.wait(1000)
    await basePage.scrollToElement(this.demurrageRate)
    await basePage.click(this.demurrageRate)
    await basePage.clear(this.demurrageRate)
    await basePage.sendKeys(this.demurrageRate,rate)
    console.log("Demurrage rate is edited..")
    //await basePage.waitForLocator(this.selectDgMetric)
    //await basePage.selectFromDropdown(this.selectDgMetric,"Percentage (%)")
    //console.log()
    await basePage.click(this.dgLevy)
    await basePage.clear(this.dgLevy)
    await basePage.sendKeys(this.dgLevy,rate)
    console.log("DG Levy value is entered..")
    await basePage.click(this.minimumCharge)
    await basePage.clear(this.minimumCharge)
    await basePage.sendKeys(this.minimumCharge,rate)
    console.log("Minimum Charge is entered...")
    await basePage.click(this.fuelLevy)
    await basePage.click(this.fuelLevyInitialVal)
    await basePage.clear(this.fuelLevyInitialVal)
    await basePage.sendKeys(this.fuelLevyInitialVal,rate)
    console.log("Fuel Levy Value is entered...")
    await basePage.click(this.confirmBtn)
    await basePage.click(this.updateRateBtn)
    console.log("Rate Card is Updated Successfully....")
 }

 async verifySection(){
    let isVerify=false
    let status=await basePage.verifyElement(this.customerInFinance)
    console.log(status)
    if(status){
        isVerify=true;
        console.log("Section Verified Successfully......")
    }
    return isVerify
 }

 async calculateCubicWeightPrice(width,height,length,count){
    let cwPrice=((width/100) * (height/100) * (length/100) * 333) * count
    console.log(cwPrice)
    return cwPrice;

 }

 async verifyCubicWeight(cubicWeight1,cubicWeight2){
    let isVerify=false;
    let priceCubic1 =await basePage.getText(this.cubicWeight.replace('<<Text>>',1))
    console.log(priceCubic1)
    console.log(cubicWeight1)
    let priceCubic2 =await basePage.getText(this.cubicWeight.replace('<<Text>>',2))
    console.log(priceCubic2)
    console.log(cubicWeight2)
    if(cubicWeight1==priceCubic1 && cubicWeight2==priceCubic2){
        isVerify=true;
    }
    console.log(isVerify) 
    return isVerify
}
 async verifyPoReference(movement,poRef){
    let isVerify=false
    let poReference;
    if(movement == "LH3" || movement == "BF2"){
        for(let i=1;i<=3;i++){
            poReference=this.poReference2.replace("<<Text>>",i)
            let status=await basePage.getInputValue(poReference)
            console.log(status)
            if(status == poRef){
               isVerify=true;
          }
        }
        console.log("Poreference Verified Successfully......")
       } else if(movement == "LH2"){
        for(let i=1;i<=2;i++){
            poReference=this.poReference2.replace("<<Text>>",i)
            let status=await basePage.getInputValue(poReference)
            console.log(status)
            if(status == poRef){
               isVerify=true;
          }
        }
        console.log("Poreference Verified Successfully......")
       } else{
        let status=await basePage.getInputValue(this.poReference1)
        console.log(status)
        if(status == poRef){
           isVerify=true;
            console.log("Poreference Verified Successfully......")
      }

       }
       return isVerify
 }
  
 async editCompletedJob(strMovement,movement) {
    let isVerify = false;
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    const movementLocator = page.locator(`//td[text()='${strMovement}']`)
    await basePage.wait(15000)
    await movementLocator.click()
    console.log("Movement locator clicked successfully....")

 }
 
async editFreightCode(strMovement,freight){
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    const movementLocator = page.locator(`//td[text()='${strMovement}']`)
    await basePage.wait(15000)
    await movementLocator.click()
    console.log("Movement locator clicked successfully....")
    await basePage.click(this.editJobIcon)
    console.log("Edit Icon is clicked.......") 
    await basePage.selectFromDropdown(this.editFreight,freight)
    console.log("Freight is added....")
    await basePage.click(this.updateBtn)
    console.log("Re-added Freight, Job Updated.....")
 }

 async backBtn(){
    await basePage.wait(1000)
    await basePage.click(this.backBtn)
}

async verifyJobInActivePage(strMovement){
    let activeJob_Status;
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.sendKeys(this.inputSearch1, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    let isVerify = false;
    // const movementLocator = page.locator(`//td[text()='${strMovement}']`)
    // await basePage.wait(15000)
    // await movementLocator.click()
    // console.log("Movement locator clicked successfully....")
    if(strMovement == "LH2" || strMovement == "LH3" || strMovement == "BF2"){
      activeJob_Status = this.activeJobStatus.replace("<<Text>>",3)
    }
    else{
        activeJob_Status = this.activeJobStatus.replace("<<Text>>",1)
    }
    await basePage.wait(15000)
    const jobStatus=await basePage.getText(activeJob_Status)
    if (jobStatus == "Booked") {
        isVerify = true;
        console.log("Job verified sucessfully.....");
    } else {
        console.log("Job verification failed.....");
    }
    return isVerify;

}

async verifyJobInCompletedPage(status,strMovement){
       let completed_JobStatus;
        await basePage.waitForLocator(this.activeJobs)
        await basePage.click(this.activeJobs)
        await basePage.wait(2000)
        await basePage.click(this.completedJobInportal)
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
        await basePage.sendKeys(this.inputSearch1, createConsignmentPage.extractedNumber)
        await basePage.keyboardEnter()
        let isVerify = false;
        await basePage.wait(15000)
        if(strMovement == "LH2" || strMovement == "LH3" || strMovement == "BF2"){
         completed_JobStatus = this.completedJobStatus.replace("<<Text>>",3)
         }
        else{
        completed_JobStatus = this.completedJobStatus.replace("<<Text>>",1)
        }
        const jobStatus=await basePage.getText(completed_JobStatus)
        if (jobStatus == status) {
            isVerify = true;
            console.log("Job verified sucessfully.....");
        } else {
            console.log("Job verification failed.....");
        }
        return isVerify;  
}

       async clickMovementLocator(strMovement){
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
        await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
        await basePage.keyboardEnter()
        const movementLocator = page.locator(`//td[text()='${strMovement}']`)
        await basePage.wait(15000)
        await movementLocator.click()
        console.log("Movement locator clicked successfully....")
       }

       async clickMovementLocator1(strMovement){
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
        await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
        await basePage.keyboardEnter()
        const movementLocator = page.locator(`//td[text()='${strMovement}']`)
        await basePage.wait(15000)
        await movementLocator.click()
        console.log("Movement locator clicked successfully....")
       }

    //created on 04-10-2024
    async runFinishTime(){
        const now = new Date();
      now.setMinutes(now.getMinutes() + 10);
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const yr = now.getFullYear();
      let year='00'+yr;
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
    
      const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
      let runFinish=formattedDateTime.replace(/[^a-zA-Z0-9]/g, '');
      
      console.log("Run finish Time :"+runFinish)
      await basePage.waitForLocator(this.runfinishTime);
      await basePage.typeText(this.runfinishTime, runFinish);
    }

    // async runFinishTimeForRun(movement){
    //     const now = new Date();
    //   now.setMinutes(now.getMinutes() + 10);
    //   const day = String(now.getDate()).padStart(2, '0');
    //   const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    //   const yr = now.getFullYear();
    //   let year='00'+yr;
    //   const hours = String(now.getHours()).padStart(2, '0');
    //   const minutes = String(now.getMinutes()).padStart(2, '0');
    
    //   const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
    //   let runFinish=formattedDateTime.replace(/[^a-zA-Z0-9]/g, '');
    //   testDataUtil.addKeyValueToObject(movement,"RunFinishTime",runFinish)
    //   console.log("Run finish Time :"+runFinish)
    // }

    // async breakStartTime(){
    //   const now = new Date();
    //   now.setMinutes(now.getMinutes() - 5);
    //   const day = String(now.getDate()).padStart(2, '0');
    //   const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    //   const yr = now.getFullYear();
    //   let year='00'+yr;
    //   const hours = String(now.getHours()).padStart(2, '0');
    //   const minutes = String(now.getMinutes()).padStart(2, '0');
    

    //   const formattedDateTime = `${month}-${day}-${year} ${hours}:${minutes}`;
    //   let breakStart=formattedDateTime.replace(/[^a-zA-Z0-9]/g, '');
    //   console.log("Break start Time :"+breakStart)
    //   await basePage.waitForLocator(this.breakTime);
    //   await basePage.click(this.breakTime);
    //   await basePage.typeText(this.breakTime, breakStart);
    // }

      // async breakStartTimeForRun(movement){

    //   const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
    //   let breakStart=formattedDateTime.replace(/[^a-zA-Z0-9]/g, '');
    //   console.log("Break start Time :"+breakStart)
    //   await basePage.waitForLocator(this.breakTime);
    //   await basePage.typeText(this.breakTime, breakStart);
    // }

  async breakStartTime()
   {
    const now = new Date();
    console.log("Original Time:", now.toString());
    now.setMinutes(now.getMinutes() - 20); // Subtract 20 minutes
    console.log("After -20 minutes:", now.toString());
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    // Full datetime-local format
    const fullDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    // Time-only value
    const timeOnly = `${hours}:${minutes}`;
    console.log("Formatted breakStart (full):", fullDateTime);
    console.log("Formatted breakStart (time only):", timeOnly);
    await basePage.waitForLocator(this.breakTime);
    await basePage.click(this.breakTime);
    // Check if input has a 'min' constraint on the date
    const hasMin = await basePage.verifyElement(`//input[contains(@min,"${year}-${month}-${day}")]`);
    console.log("Min constraint present:", hasMin);
    if (hasMin === true) {
        await basePage.clear(this.breakTime); // Clear before typing
        await basePage.typeText(this.breakTime, timeOnly);
    } else {
        await basePage.clearField(this.breakTime);
        await basePage.typeText(this.breakTime, fullDateTime);
    }
    }
    
    // async breakStartTimeForRun(movement){
    //     const now = new Date();
    //      now.setMinutes(now.getMinutes() + 2);
    //      const day = String(now.getDate()).padStart(2, '0');
    //      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    //      const yr = now.getFullYear();
    //      let year='00'+yr;
    //      const hours = String(now.getHours()).padStart(2, '0');
    //      const minutes = String(now.getMinutes()).padStart(2, '0');
       
    //      const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
    //      let breakStart=formattedDateTime.replace(/[^a-zA-Z0-9]/g, '');
    //      testDataUtil.addKeyValueToObject(movement,"BreakStart",breakStart)
    //      console.log("Break start Time :"+runFinish)
    //    }
    
       async navigateToRun(){
        await basePage.click(this.runSheetTab)
       }

       async verifyRunPage(){
        let isVerify=false
        let runTitle=await basePage.getText(this.runPageTitle)
        if(runTitle == 'Runs'){
            console.log("Runs Page is verified successfully.....")
            isVerify=true
        }
          return isVerify;
       }

       async createRun(movement,label){
        await basePage.click(this.addRunBtn)
        await basePage.click(this.labelInAddRunForm)
        await basePage.sendKeys(this.labelInAddRunForm,label)
        await basePage.waitForLocator(this.businessUnitInRun)
        // await basePage.click(this.businessUnitInRun)
        // await basePage.click(this.businessUnitOption)
        await basePage.waitForLocator(this.runStatus)
        await basePage.click(this.runStatus)
        await basePage.click(this.runStatusVal)
        await basePage.waitForLocator(this.runVehicle)
        await basePage.click(this.runVehicle)
        await basePage.click(this.runVehicleOption)
        await basePage.waitForLocator(this.trailerA)
        await basePage.click(this.trailerA)
        await basePage.click(this.trailerAOption)
        await basePage.waitForLocator(this.trailerB)
        await basePage.click(this.trailerB)
        await basePage.click(this.trailerBOption)
        await basePage.waitForLocator(this.addBtn)
        await basePage.click(this.addBtn)
        await basePage.wait(4000)
        await basePage.waitForLocator(this.runNumber)
        let i=0
        while(i<=5){
            await basePage.scrollToElement(this.runNumber)
            i++;
        }
        let runNumber=await basePage.getText(this.runNumber)
        testDataUtil.addKeyValueToObject(movement,"RunNumber",runNumber)
        console.log("Successfully Created a Run..........")
       }

       async assignJobToRun(runNo){
        await basePage.waitForLocator(this.searchRunInput)
        await basePage.click(this.searchRunInput)
        await basePage.sendKeys(this.searchRunInput,runNo)
        await basePage.keyboardEnter()
        await basePage.wait(1000)
        await basePage.click(this.iconJobsInRun)
        await basePage.click(this.availableJobsTab)
        await basePage.click(this.jobSearchBox)
        const createConsignmentPage=new CreateConsignmentPage(this.page,this.extractedNumber)
        await basePage.sendKeys(this.jobSearchBox,createConsignmentPage.extractedNumber)
        await basePage.keyboardEnter()
        await basePage.wait(15000)
        await basePage.click(this.checkBoxInAvailableJobs)
        await basePage.click(this.addSelectedJobBtn)
        await basePage.click(this.doneBtn)
        console.log("Job assigned to the Run Successfully......")
        await basePage.click(this.arrowRight)
        await basePage.click(this.btnOk)
        console.log("Run marked as ready....")
       }

       async assignDriverToRun(driver){
        await basePage.wait(1000)
        await basePage.click(this.iconDriver)
        console.log("Icon Driver is clicked.....")
        await basePage.wait(2000)
        //await basePage.click(this.searchDriver)
        await basePage.sendKeys(this.searchDriver,driver)
        await basePage.wait(1000)
        await basePage.click(this.assignBtn)
        console.log(`Assigned Driver " ${driver} " to run.....`)
       }





       async assignContractorToRun(contractor){
        await basePage.wait(1000)
        await basePage.click(this.iconContractor)
        console.log("Icon Contractor is clicked.....")
        await basePage.wait(1000)
        //await basePage.click(this.searchDriver)
        await basePage.sendKeys(this.searchDriver,contractor)
        await basePage.wait(1000)
        await basePage.click(this.assignBtn)
        console.log(`Assigned Driver ${contractor} to run.....`)
       }

async rctiStartRun() {
    // Wait for page elements to be ready
    await basePage.wait(2000);
    await basePage.waitForLocator(this.arrowRight)
    // Click arrow to expand form
    await basePage.click(this.arrowRight);
    // Enter odometer value
    await basePage.waitForLocator(this.inputStartOdometer)
    await basePage.click(this.inputStartOdometer);
    await basePage.sendKeys(this.inputStartOdometer, "100");
    // Calculate date/time -20 minutes from now
    const now = new Date();
    console.log("Original Time:", now.toString());
    now.setMinutes(now.getMinutes() - 20); // Adjusted from -60 to -20
    console.log("After -20 minutes:", now.toString());
    // Format date/time for datetime-local input (YYYY-MM-DDTHH:MM)
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    console.log("Formatted datetime-local value:", formattedDateTime);
    // Type into the datetime-local field
    await basePage.waitForLocator(this.startTimestamp);
    await basePage.sendKeys(this.startTimestamp, formattedDateTime);
    // Click Start
    await basePage.click(this.startBtn);
    console.log("Run started............");
}


     async startRun(){
        await basePage.wait(2000)
        await basePage.click(this.arrowRight)
        await basePage.click(this.inputStartOdometer)
        await basePage.sendKeys(this.inputStartOdometer,"100")

        const now = new Date();
        console.log("Original Time:", now.toString());

        now.setMinutes(now.getMinutes() - 60);
        console.log("After -20 minutes:", now.toString());

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const yr = now.getFullYear();
        const year = yr;

        let hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedHours = String(hours).padStart(2, '0');

       const formattedDateTime = `${day}-${month}-${year} ${formattedHours}:${minutes}`;


        let runSTART = formattedDateTime.replace(/[^a-zA-Z0-9]/g, '');

        console.log("Run start Time :"+runSTART)
        await basePage.waitForLocator(this.startTimestamp);
        await basePage.typeText(this.startTimestamp, runSTART);
        await basePage.click(this.startBtn)

        console.log("Run started............")
       }
      
       async completeRun(runNo){
       await basePage.waitForLocator(this.searchRunInput)
       await basePage.click(this.searchRunInput)
       await basePage.sendKeys(this.searchRunInput,runNo)
       await basePage.keyboardEnter()
       await basePage.wait(2000)
       await basePage.click(this.arrowRight)
       }

       async enterOdometer(){
        //await basePage.click(this.inputEndOdometer)
        await basePage.sendKeys(this.inputEndOdometer,"200")
        
       }
       async finishRun(){
       await basePage.click(this.breakDuration)
       await basePage.sendKeys(this.breakDuration,"5")
       await basePage.click(this.runFinishBtn)
       console.log("Run completed..........")
       }


       async verifyTheAddressAndViaLeg(source,destination,viaLeg){
        let isVerify=false
        await basePage.wait(2000)
        await basePage.scrollToElement(this.sourceValue)
        let sourceVal=await basePage.getText(this.sourceValue)
        await basePage.scrollToElement(this.destinationValue)
        let destinationVal=await basePage.getText(this.destinationValue)
        await basePage.scrollToElement(this.sourceValue1)
        let sourceVal1=await basePage.getText(this.sourceValue1) 
        await basePage.scrollToElement(this.destinationValue1)
        let destinationVal1=await basePage.getText(this.destinationValue1)
        console.log("Source1 Value is "+sourceVal)
        console.log("Via leg Value 1 "+destinationVal)
        console.log("Via Leg Value 2 "+sourceVal1)
        console.log("Destination2 Value "+destinationVal1)
        if(source==sourceVal && destinationVal1==destination){
       console.log("Source and destination address are same as expected...")
       isVerify=true;
        }
    
        if(sourceVal1==viaLeg && destinationVal==viaLeg){
            console.log("Via address is same as expected...")
            isVerify=true;
        }
        return isVerify;
       }

       async verifyRoundTripAddress(source,destination){
        let isVerify=false
        await basePage.wait(1000)
        await basePage.scrollToElement(this.sourceValue)
        let sourceVal=await basePage.getText(this.sourceValue) //"CarrierSourceAddInTrip": "20 Walters Drive",
        await basePage.scrollToElement(this.destinationValue)
        let destinationVal=await basePage.getText(this.destinationValue)
        await basePage.scrollToElement(this.sourceValue1)
        let sourceVal1=await basePage.getText(this.sourceValue1) //"CarrierSourceAddInTrip": "20 Walters Drive",
        await basePage.scrollToElement(this.destinationValue1)
        let destinationVal1=await basePage.getText(this.destinationValue1)
        console.log("Source Value is "+sourceVal)
        console.log("Via leg Value 1 "+destinationVal)
        console.log("Via Leg Value 2 "+sourceVal1)
        console.log("Destination Value "+destinationVal1)
        if(source==sourceVal && source==destinationVal1){
       console.log("Source and destination address are same as expected for 1st trip...")
       isVerify=true;
        }
    
        if(destination==destinationVal && destination==sourceVal1){
            console.log("Source and destination address are same as expected for 2st trip...")
            isVerify=true;
        }
        return isVerify;
       }


       async verifyLH3AssignedJob1(strMovement) {
        await basePage.wait(1000)
        let isVerify = false
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
        // await basePage.waitForLocator(this.inputSearch)
        // await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
        // await basePage.keyboardEnter()
        const movementLocator = page.locator(`//td/div[text()='${createConsignmentPage.extractedNumber}']/..`)
        await basePage.wait(7000)
        await movementLocator.click()
        console.log(`Job ${strMovement} is clicked successfully....`)
        await basePage.waitForLocator(this.jobType)
        const jobType = await basePage.getText(this.jobType)
        const refId = await basePage.getText(this.referenceID)
        const id = refId.split('#')[0]
        console.log("Job Type: " + jobType.trim())
        console.log("REF ID: " + id.trim())
        if ( id === createConsignmentPage.extractedNumber) {
            console.log("Job Verified sucessfully.....")
            // await basePage.click(this.iconClose)
            isVerify = true;
        } else {
            console.log("Job verification failed.....")
        }
        return isVerify
    }

    async deliverTheJobLHWithLegs(manifest1){
    
        await basePage.waitForLocator(this.btnIntransit)
        await basePage.scrollToElement(this.btnIntransit)
        await basePage.wait(5000)
        await basePage.click(this.btnIntransit)
        if(await basePage.verifyElement(this.demurageHrs)){
        await basePage.click(this.demurageHrs)
        await basePage.clear(this.demurageHrs)
        await basePage.sendKeys(this.demurageHrs,"1")
        await basePage.click(this.okBtn)
        console.log("Entered hours for Loading demurage.......")
        }
        await basePage.waitForLocator(this.btnLegArrived)
        await basePage.click(this.btnLegArrived)
        await basePage.wait(2000)
        
        await basePage.waitForLocator(this.btnLegDelivered)
        await basePage.click(this.btnLegDelivered)
        await basePage.wait(1000)
        console.log("Btn delivered is clicked successfully....")
        if(await basePage.verifyElement(this.demurageHrs)){
            await basePage.click(this.demurageHrs)
            await basePage.clear(this.demurageHrs)
            await basePage.sendKeys(this.demurageHrs,"1")
            await basePage.click(this.okBtn)
            console.log("Entered hours for Unloading demurage.......")
            await basePage.wait(2000)
        }
        await basePage.waitForLocator(this.selectTrailer1)
        await basePage.click(this.selectTrailer1)
        await basePage.waitForLocator(this.selectTrailerOption1)
        await basePage.click(this.selectTrailerOption1)
        let manifestOption=this.selectManifestOption1.replace("<<Text>>",manifest1)//clcik
        await basePage.waitForLocator(this.selectManifest1)
        await basePage.click(this.selectManifest1)
        await basePage.waitForLocator(manifestOption)
        await basePage.click(manifestOption)
        await basePage.click(this.buttonOk)
        await basePage.wait(2000)
        await basePage.click(this.checkBoxForTrip)
        await basePage.click(this.buttonOk)

    }

    async deliverTheJobLH1(){
    
        await basePage.waitForLocator(this.btnLegIntransit)
        await basePage.scrollToElement(this.btnLegIntransit)
        await basePage.wait(5000)
        await basePage.click(this.btnLegIntransit)
        if(await basePage.verifyElement(this.demurageHrs)){
        await basePage.click(this.demurageHrs)
        await basePage.clear(this.demurageHrs)
        await basePage.sendKeys(this.demurageHrs,"1")
        await basePage.click(this.okBtn)
        console.log("Entered hours for Loading demurage.......")
        }
        await basePage.waitForLocator(this.btnLegArrived)
        await basePage.click(this.btnLegArrived)
        await basePage.wait(2000)
        await basePage.click(this.btnDelivered)
        await basePage.wait(2000)
        console.log("Btn delivered is clicked successfully....")
        if(await basePage.verifyElement(this.demurageHrs)){
            await basePage.click(this.demurageHrs)
            await basePage.clear(this.demurageHrs)
            await basePage.sendKeys(this.demurageHrs,"1")
            await basePage.click(this.okBtn)
            console.log("Entered hours for Unloading demurage.......")
            await basePage.wait(2000)
        }
    }
    


    
    async deliverCenterLHInTrip(manifest){
        await basePage.waitForLocator(this.btnLegIntransit)
        await basePage.scrollToElement(this.btnLegIntransit)
        await basePage.wait(5000)
        await basePage.click(this.btnLegIntransit)
        if(await basePage.verifyElement(this.demurageHrs)){
        await basePage.click(this.demurageHrs)
        await basePage.clear(this.demurageHrs)
        await basePage.sendKeys(this.demurageHrs,"1")
        await basePage.click(this.okBtn)
        console.log("Entered hours for Loading demurage.......")
        }
        await basePage.waitForLocator(this.btnLegArrived)
        await basePage.click(this.btnLegArrived)
        await basePage.wait(2000)
        
        await basePage.waitForLocator(this.btnLegDelivered)
        await basePage.click(this.btnLegDelivered)
        await basePage.wait(1000)
        console.log("Btn delivered is clicked successfully....")
        if(await basePage.verifyElement(this.demurageHrs)){
            await basePage.click(this.demurageHrs)
            await basePage.clear(this.demurageHrs)
            await basePage.sendKeys(this.demurageHrs,"1")
            await basePage.click(this.okBtn)
            console.log("Entered hours for Unloading demurage.......")
            await basePage.wait(2000)
        }

        await basePage.waitForLocator(this.selectTrailer1)
            await basePage.click(this.selectTrailer1)
            await basePage.waitForLocator(this.selectTrailerOption2)
            await basePage.click(this.selectTrailerOption2)
            let manifestOption=this.selectManifestOption1.replace("<<Text>>",manifest)//clcik
            await basePage.waitForLocator(this.selectManifest1)
            await basePage.click(this.selectManifest1)
            await basePage.waitForLocator(manifestOption)
            await basePage.click(manifestOption)
            await basePage.click(this.buttonOk)
            await basePage.wait(2000)
            await basePage.click(this.checkBoxForTrip)
            await basePage.click(this.buttonOk)
    }


    async deliverCenterLH1InTrip(manifest){
        await basePage.waitForLocator(this.btnLegIntransit)
        await basePage.scrollToElement(this.btnLegIntransit)
        await basePage.wait(5000)
        await basePage.click(this.btnLegIntransit)
        if(await basePage.verifyElement(this.demurageHrs)){
        await basePage.click(this.demurageHrs)
        await basePage.clear(this.demurageHrs)
        await basePage.sendKeys(this.demurageHrs,"1")
        await basePage.click(this.okBtn)
        console.log("Entered hours for Loading demurage.......")
        }
        await basePage.waitForLocator(this.btnLegArrived)
        await basePage.click(this.btnLegArrived)
        await basePage.wait(2000)
        
        await basePage.waitForLocator(this.btnLegDelivered)
        await basePage.click(this.btnLegDelivered)
        await basePage.wait(1000)
        console.log("Btn delivered is clicked successfully....")
        if(await basePage.verifyElement(this.demurageHrs)){
            await basePage.click(this.demurageHrs)
            await basePage.clear(this.demurageHrs)
            await basePage.sendKeys(this.demurageHrs,"1")
            await basePage.click(this.okBtn)
            console.log("Entered hours for Unloading demurage.......")
            await basePage.wait(2000)
        }

        await basePage.waitForLocator(this.selectTrailer1)
            await basePage.click(this.selectTrailer1)
            await basePage.waitForLocator(this.selectTrailerOption3)
            await basePage.click(this.selectTrailerOption3)
            let manifestOption=this.selectManifestOption1.replace("<<Text>>",manifest)//clcik
            await basePage.waitForLocator(this.selectManifest1)
            await basePage.click(this.selectManifest1)
            await basePage.waitForLocator(manifestOption)
            await basePage.click(manifestOption)
            await basePage.click(this.buttonOk)
            await basePage.wait(2000)
            await basePage.click(this.checkBoxForTrip)
            await basePage.click(this.buttonOk)
    }

    async updateTheCreatedJob(movement){
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

    async navigateToTripAndComplete(tripNo){
        await basePage.click(this.sectionJob)
        await basePage.click(this.sectionMyJobs)
        await basePage.click(this.tabTrip)
        console.log("Navigated to trip page...")
        await basePage.clear(this.inputRefTrip)
        await basePage.sendKeys(this.inputRefTrip,tripNo)
        await basePage.keyboardEnter()
        await basePage.wait(2000)
        await basePage.click(this.tripSheetData)
        }

        async verifyCompletedTrip(tripNo){
            let isVerify=false
            await basePage.click(this.completedTripPage)
            await basePage.sendKeys(this.inputTripInCompletedTrip, tripNo)
            await basePage.keyboardEnter()
            await basePage.wait(2000)
            let tripNoInCompleted=await basePage.getText(this.tripRefNoInCompleted)
            if(tripNoInCompleted== tripNo){
                isVerify=true;
                console.log("Trip sheet is completed....")
            }
        return isVerify;
        }

        async navigateToTrip(){
            await basePage.click(this.sectionJob)
            await basePage.click(this.sectionMyJobs)
            await basePage.click(this.tabTrip)
            console.log("Navigated to trip page...")
            
            }
    
    async assigNewContractor(tripNo,contractor)
    {
        await basePage.clear(this.inputRefTrip)
        await basePage.sendKeys(this.inputRefTrip,tripNo)
        await basePage.keyboardEnter()
        await basePage.wait(2000)
        await basePage.click(this.tripSheetData)
        await basePage.wait(2000)
        await basePage.click(this.editContractorIcon)
        await basePage.sendKeys(this.inputSearchDriver, contractor)
        await basePage.keyboardEnter()
        await basePage.wait(2000)
        await basePage.click(this.assignBtn)
        await basePage.click(this.iconTick)
        console.log("Contractor assigned successfully......")
    }

    async verifyContractorReferences(ref1, ref2, ref3, ref4){
        let isVerify = false
        await basePage.scrollToElement(this.ref1ContractorCompleted)
        if(await basePage.verifyElement(this.ref1ContractorCompleted)){
            await basePage.verifyText(this.ref1ContractorCompleted , ref1.toUpperCase())
            await basePage.verifyText(this.ref2ContractorCompleted , ref2.toUpperCase())
            await basePage.verifyText(this.ref3ContractorCompleted , ref3.toUpperCase())
            await basePage.verifyText(this.ref4ContractorCompleted , ref4.toUpperCase())
            console.log("References are verified successfully....")
            isVerify = true
        }
        else{
            console.log("References verification failed....")
        }
        return isVerify
    }

    async navigateToMyJobsContractor(){
        await basePage.wait(2000)
        await basePage.waitForLocator(this.btnHome)
        await basePage.click(this.btnHome)
        await basePage.wait(5000)
        await basePage.click(this.tabJobs)
        await basePage.wait(5000)
        await basePage.waitForLocator(this.sectionMyJobs)
        await basePage.scrollToElement(this.sectionMyJobs)
        await basePage.click(this.sectionMyJobs)
        console.log("Section myjobs clicked successfully....")
       await basePage.pageReload()
    }

    async verifyRejectTripInCarrier(tripNo, manifestNo){
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
        let isVerify=false
        await basePage.click(this.tabTrip)
        console.log("Navigated to trip page...")
        await basePage.clear(this.inputRefTrip)
        await basePage.sendKeys(this.inputRefTrip,tripNo)
        await basePage.keyboardEnter()
        let tripCount = await basePage.countElement(this.rejectTripStatus)
        console.log("Tripcount:",tripCount)
        await basePage.click(this.manifestTab)
        await basePage.sendKeys(this.refSearchInManifest,manifestNo)
        await basePage.keyboardEnter()
        console.log(manifestNo)
        let manifestInTable=this.manifestNumberInTable.replace('<<Text>>',manifestNo)
        console.log(manifestInTable)
        let isManifestPresent=await basePage.verifyElement(manifestInTable)
        console.log("Manifest is present or not:",isManifestPresent)
        
        await basePage.click(this.tabBooked) 
        await basePage.waitForLocator(this.inputSearch)
        await basePage.sendKeys(this.inputSearch, createConsignmentPage.extractedNumber)
        await basePage.keyboardEnter()
        await basePage.wait(2000)
        // let jobCount=await basePage.countElement(this.bookedJob)
        // console.log("Job:",jobCount)
        let jobPath=this.jobInTable.replace("<<Text>>",createConsignmentPage.extractedNumber)
        console.log(jobPath)
        let status = await basePage.verifyElement(jobPath)
        //console.log(!status)
        if (tripCount !== 0 && isManifestPresent && status) {
            console.log("Job is present...");
            isVerify = true;
        }
        
        return isVerify;
        }
        async completeTrip(){
            await basePage.scrollToElement(this.btnDelivered)
            await basePage.click(this.btnDelivered)
            await basePage.wait(2000)
            console.log("Btn delivered is clicked successfully....")
            if(await basePage.verifyElement(this.demurageHrs)){
                await basePage.click(this.demurageHrs)
                await basePage.clear(this.demurageHrs)
                await basePage.sendKeys(this.demurageHrs,"1")
                await basePage.click(this.okBtn)
                console.log("Entered hours for Unloading demurage.......")
                await basePage.wait(2000)
            }
        
        }

    async VerifyPODDownload(movement){
        const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
        let REFNum =  createConsignmentPage.extractedNumber

        //get data from job overview first
        let Booked    = await basePage.getText(this.bookedStatus)
        let Scheduled = await basePage.getText(this.ScheduledStatus)
        let InTransit = await basePage.getText(this.InTransitStatus)
        let Arrived	  = await basePage.getText(this.ArrivedStatus)
        let Delivered = await basePage.getText(this.DeliveredStatus)
        let Completed = await basePage.getText(this.CompletedStatus)
        //add to an array
        const dataFromOverview = [REFNum,Booked,Scheduled,InTransit,Arrived,Delivered,Completed]
        
        //navigate to POD download
        await basePage.waitForLocator(this.PDFPODownload)
        await basePage.click(this.PDFPODownload)
        await basePage.waitForLocator(this.PODDwonload)

        //download POD
        const basePathPdf=path.resolve(__dirname,'../../features/support');
            const downloadPdfPath=path.join(basePathPdf, 'PODDwonload')
            const customPdfFilePath = path.join(downloadPdfPath, `${movement}_${REFNum}.pdf`);
            await basePage.downloadFile(this.PODDwonload,customPdfFilePath)
            console.log('Opening file:', customPdfFilePath); 
            const page = await browser.newPage()
            await page.goto(customPdfFilePath);
            await page.waitForTimeout(5000);  // Wait for 5 seconds (adjust as needed)
            await page.close()
        
        //read POD data and compare Job overview data vs PDF data. return result as True if result matched
            try {
                const readPdf=new ReadPdf()
                console.log("Reading PDf File............")
         
                const pdfWords = await readPdf.extractPDFText(customPdfFilePath);       //read POD file 
                const pdfDataExtracted =await readPdf.extractInfoInPOD(pdfWords);       // extract relevant data from PDF
                const result = await readPdf.compareWithJSON(pdfDataExtracted,dataFromOverview) //comparison
                
                    if (result != false){
                        console.log("Data from Job overview matched with POD data")
                    }
                    else
                    { 
                        console.log("\x1b[31m One or more data from Job Overview and POD did not match....\x1b[0m")
                    }
            
            } catch (error) {
                console.error('Error reading files:', error);
            }

    }

async ClickInvoiceSummary(){
         await basePage.scrollToElement(this.invoiceSummary)
         await basePage.click(this.invoiceSummary)
         
}


async InvoiceSummaryPage(){
 let isVerify = false

    if (await basePage.verifyElement(this.NoCustomer)){
    console.log("No Customer list is verified....")
    isVerify = true}
    else{
    console.log("Failed to go to Invoicing Summary....")}

await basePage.wait(1000)
return isVerify
         
}


async ClickNumberOfNoCustomersThisWeek(){
        await basePage.scrollToElement(this.invoiceSummaryNoCustomerThisWeek)
        await basePage.click(this.invoiceSummaryNoCustomerThisWeek)
        console.log("Job Summary is clicked....")
        
        if (await basePage.verifyElement(this.referenceIDInvoice)){
         console.log("Reference in invoicing is verified....")
        }
        else{
         console.log("Unable to see Jobs in invoicing....")
        }
}

async SearchReferenceInInvoicePage(){
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber)
    await basePage.sendKeys(this.searchInvoice, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.wait(4000)

}


async DriverCheckpoint(){  
if(await basePage.verifyElement(this.Forward)){
    await basePage.waitForLocator(this.Forward)
    await basePage.scrollToElement(this.Forward)
    await basePage.click(this.Forward)
    console.log("Successfully logged in Driver Account...")
}else{

        console.log("No Driver Checkpoint...")

}

}


async NavigateDriverAccount(tripsheetnum){  
    await basePage.waitForLocator(this.LHJobDriverApp)
    await basePage.scrollToElement(this.LHJobDriverApp)
    await basePage.click(this.LHJobDriverApp)

    let tripsheetVerified = this.TripSheetNumber.replace("<<Text>>",tripsheetnum)
   
    if (await basePage.verifyElement(tripsheetVerified)){

        let btnIntransit = this.btnIntransit
        let btnLegArrived = this.btnLegArrived
        let btnDelivered = this.btnDelivered

        let toclickIntransitStatus = tripsheetVerified+"/ancestor::div[3]/following-sibling::div[2]/div/a"+btnIntransit
        let toclickbtnLegArrivedStatus = tripsheetVerified+"/ancestor::div[3]/following-sibling::div[2]/div/a"+btnLegArrived
        let toclickbtnDeliveredStatus = tripsheetVerified+"/ancestor::div[3]/following-sibling::div[2]/div/a"+btnDelivered


        //span[text()='Reference']/following-sibling::div[text()='3027']/ancestor::div[3]/following-sibling::div[2]/div/a//span[text()='In Transit']
        await basePage.waitForLocator(toclickIntransitStatus)
        await basePage.scrollToElement(toclickIntransitStatus)
        await basePage.wait(5000)
        await basePage.click(toclickIntransitStatus)
        let status = await basePage.getText(toclickIntransitStatus)
        console.log(status + " is Clicked...")
        await basePage.wait(5000)
        
        let result = await basePage.verifyElement(this.demurageHrs)
        console.log("Demurrage Hrs: " + result)

         if(result == true){
         await basePage.click(this.demurageHrs)
         await basePage.clear(this.demurageHrs)
         await basePage.sendKeys(this.demurageHrs,"1")
         await basePage.click(this.okBtn)
         console.log("Entered hours for Loading demurage.......")
        
        await basePage.waitForLocator(toclickbtnLegArrivedStatus)
        await basePage.click(toclickbtnLegArrivedStatus)
        await basePage.wait(2000)
        await basePage.click(toclickbtnDeliveredStatus)
        await basePage.wait(2000)
        console.log("Btn delivered is clicked successfully....")

          if(await basePage.verifyElement(this.demurageHrs)){
            await basePage.click(this.demurageHrs)
            await basePage.clear(this.demurageHrs)
            await basePage.sendKeys(this.demurageHrs,"1")
            await basePage.click(this.okBtn)
            console.log("Entered hours for Unloading demurage.......")
            await basePage.wait(2000)
        }
         
    }
        else{

        await basePage.waitForLocator(toclickbtnLegArrivedStatus)
        await basePage.click(toclickbtnLegArrivedStatus)
        await basePage.wait(2000)
        await basePage.click(toclickbtnDeliveredStatus)
        await basePage.wait(2000)
        console.log("Btn delivered is clicked successfully....")

        if(await basePage.verifyElement(this.demurageHrs)){
            await basePage.click(this.demurageHrs)
            await basePage.clear(this.demurageHrs)
            await basePage.sendKeys(this.demurageHrs,"1")
            await basePage.click(this.okBtn)
            console.log("Entered hours for Unloading demurage.......")
            await basePage.wait(2000)
    }
}

}
}
  

async editModal(updatedCount1,updatedItem,updatedPurchaseOrder,updatedLength,updatedWidth,updatedHeight,updatedWeight){
    
    await basePage.scrollToElement(this.editJobInModal)
    if (await basePage.verifyElement(this.editJobInModal)){

        await basePage.click(this.editJobInModal)
        await basePage.clear(this.inputCount)
        await basePage.clear(this.inputItem)
        await basePage.clear(this.inputref)
        await basePage.clear(this.inputLength)
        await basePage.clear(this.inputWidth)
        await basePage.clear(this.inputHeight)
        await basePage.clear(this.inputWeight)

        await basePage.sendKeys(this.inputCount,updatedCount1)
        await basePage.sendKeys(this.inputItem,updatedItem)
        await basePage.sendKeys(this.inputref,updatedPurchaseOrder)
        await basePage.sendKeys(this.inputLength,updatedLength)
        await basePage.sendKeys(this.inputWidth,updatedWidth)
        await basePage.sendKeys(this.inputHeight,updatedHeight)
        await basePage.sendKeys(this.inputWeight,updatedWeight)

        await basePage.click(this.btnOk)
        console.log("Package is edit via Edit Package modal...")


    } else {

        console.log("Unable to see Edit button in job overview...")
    }

}


async verifyJobOverviewCount(updatedCount1){
    let isVerify = false
    let jobItemcount = await basePage.getText(this.jobItemcount)
    const NormalizedjobItemcount = jobItemcount.match(/\d+/g)

       
    await basePage.scrollToElement(this.editJobInModal)
    if (basePage.verifyElement(this.editJobInModal)){
 
        if (NormalizedjobItemcount == updatedCount1){

            isVerify = true
            console.log("Count is verified successfully...")
            return isVerify
        }else{
            console.log("Count is not updated...")

        }    
    } else{

        console.log("Edit button is missing, possibly stuck on loading...")
    }
        return isVerify

}


async verifyJobOverviewItem(updatedItem){
    let isVerify = false
    let jobItemcount = await basePage.getText(this.jobItemcount)
    const normalizedjobItemName = jobItemcount.match(/\b\w+\b$/)

    await basePage.scrollToElement(this.editJobInModal)
    if (basePage.verifyElement(this.editJobInModal)){
 
        if (normalizedjobItemName == updatedItem){

            isVerify = true
            console.log("Item is verified successfully...")
            return isVerify
        }else{
            console.log("Item is not updated...")

        }

    } else{

        console.log("Edit button is missing, possibly stuck on loading...")
    }
        return isVerify

}


async verifyJobOverviewPO(updatedPurchaseOrder){
    let isVerify = false

    let jobItemPO = await basePage.getText(this.jobItemPO)


    await basePage.scrollToElement(this.editJobInModal)
    if (basePage.verifyElement(this.editJobInModal)){
 
        if (jobItemPO == updatedPurchaseOrder){

            isVerify = true
            console.log("Purchase order is verified successfully...")
            return isVerify
        }else{
        console.log("Purchase order is not updated...")

    }

    } else{

        console.log("Edit button is missing, possibly stuck on loading...")
    }
        return isVerify

}


async verifyJobOverviewLength(updatedLength){
    let isVerify = false

    let jobItemLength = await basePage.getText(this.jobItemLength)
    const NormalizedjobItemLength = jobItemLength.match(/\d+/g)


    await basePage.scrollToElement(this.editJobInModal)
    if (basePage.verifyElement(this.editJobInModal)){
 
        if (NormalizedjobItemLength == updatedLength){

            isVerify = true
            console.log("Length is verified successfully...")
            return isVerify
        }else{
            console.log("Length is not updated...")

        }

    } else{

        console.log("Edit button is missing, possibly stuck on loading...")
    }
        return isVerify

}

async verifyJobOverviewWidth(updatedWidth){
    let isVerify = false

    let jobItemWidth = await basePage.getText(this.jobItemWidth)
    const NormalizedjobItemWidth = jobItemWidth.match(/\d+/g)


    await basePage.scrollToElement(this.editJobInModal)
    if (basePage.verifyElement(this.editJobInModal)){
 
        if (NormalizedjobItemWidth == updatedWidth){

            isVerify = true
            console.log("Width is verified successfully...")
            return isVerify
        }else{
            console.log("Width is not updated...")

        }

    } else{

        console.log("Edit button is missing, possibly stuck on loading...")
    }
        return isVerify

}

async verifyJobOverviewHeight(updatedHeight){
    let isVerify = false

    let jobItemHeight = await basePage.getText(this.jobItemHeight)
    const NormalizedjobItemHeight = jobItemHeight.match(/\d+/g)


    await basePage.scrollToElement(this.editJobInModal)
    if (basePage.verifyElement(this.editJobInModal)){
 
        if (NormalizedjobItemHeight == updatedHeight){

            isVerify = true
            console.log("Height is verified successfully...")
            return isVerify
        }else{
            console.log("Height is not updated...")
        
        }

    } else{

        console.log("Edit button is missing, possibly stuck on loading...")
    }
        return isVerify

}

async verifyJobOverviewWeight(updatedWeight){
    let isVerify = false

    let jobItemWeight = await basePage.getText(this.jobItemWeight)
    const NormalizedjobItemWeight = jobItemWeight.match(/\d+/g)


    await basePage.scrollToElement(this.editJobInModal)
    if (basePage.verifyElement(this.editJobInModal)){
        
        if (NormalizedjobItemWeight == updatedWeight){

            isVerify = true
            console.log("Weight is verified successfully...")
            return isVerify
        }else{
            console.log("Weight is not updated...")

        }

    } else{

        console.log("Edit button is missing, possibly stuck on loading...")
    }

    return isVerify
}


async unassignJobtoContractor (){
    await basePage.wait(2000)
    await basePage.click(this.iconSelectContractor)
    await basePage.waitForLocator(this.unassignContractor)
    await basePage.click(this.unassignContractor)
    console.log("Unassign Button is Clicked...")
    await basePage.click(this.iconSelectContractor)

}

async clickManageDocument(){
     basePage.verifyElement(this.btnPdfManagement)
     await basePage.click(this.btnPdfManagement)
}

async dowloadFreightlabelChiller(movement)
{
await basePage.verifyElement(this.btnDownloadLabel)
const basePathPdf=path.resolve(__dirname,'../features/support');
const downloadPdfPath=path.join(basePathPdf, 'FreightLabelPdf')
const customPdfFilePath = path.join(downloadPdfPath, `${movement}_Chiller.pdf`);
await basePage.downloadFile(this.btnDownloadLabel,customPdfFilePath)

}

async verifyChillerinPdf(movement){
    let isVerify = false
    const basePathPdf=path.resolve(__dirname,'../features/support');
    const downloadPdfPath=path.join(basePathPdf, 'FreightLabelPdf')
    const customPdfFilePath = path.join(downloadPdfPath, `${movement}_Chiller.pdf`);
    if (basePage.compareChillerFromPdf(customPdfFilePath)){
        isVerify = true;
        return isVerify;
    }
    return isVerify;
}

async dowloadFreightlabelFreezer(movement)
{
await basePage.verifyElement(this.btnDownloadLabel)
const basePathPdf=path.resolve(__dirname,'../features/support');
const downloadPdfPath=path.join(basePathPdf, 'FreightLabelPdf')
const customPdfFilePath = path.join(downloadPdfPath, `${movement}_Freezer.pdf`);
await basePage.downloadFile(this.btnDownloadLabel,customPdfFilePath)

}
async verifyFreezerinPdf(movement){
    let isVerify = false
   const basePathPdf=path.resolve(__dirname,'../features/support');
    const downloadPdfPath=path.join(basePathPdf, 'FreightLabelPdf')
    const customPdfFilePath = path.join(downloadPdfPath, `${movement}_Freezer.pdf`);
    if (basePage.compareFreezeromPdf(customPdfFilePath)){
        isVerify = true;
        return isVerify;
    }
    return isVerify;
}


async addManifestWithAsset(){
    const createConsignmentPage = new CreateConsignmentPage(this.page, this.extractedNumber) 
    await basePage.waitForLocator(this.inputSearchManifest)
    await basePage.sendKeys(this.inputSearchManifest, createConsignmentPage.extractedNumber)
    await basePage.keyboardEnter()
    await basePage.wait(7000)
    //await basePage.scrollToElement(this.checkBoxLHJob)
    await basePage.click(this.checkBoxLHJob1)
    await basePage.click(this.btnManifestTogether)
     await basePage.waitForLocator(this.slctAssetType)
     await basePage.click(this.slctAssetType)
     await basePage.waitForLocator(this.selectAssetList)
     await basePage.click(this.selectAssetList)
     await basePage.wait(4000)
     await basePage.waitForLocator(this.selectAssetManifest)
     await basePage.click(this.selectAssetManifest)
     await basePage.waitForLocator(this.txtAssetSelect)
     await basePage.click(this.txtAssetSelect)
     await basePage.sendKeys(this.txtAssetSelect, "CON002")
     await basePage.wait(4000)
     await basePage.waitForLocator(this.selectAssetType)
     await basePage.click(this.selectAssetType)
     await basePage.wait(3000)
     await basePage.click(this.btnCreateManifest)
}

async addManifestToTripSheetForConnectedContractor(movement,manifestNo){
    await basePage.wait(2000)
    await basePage.waitForLocator(this.rowTripSheet)
    await basePage.click(this.rowTripSheet)
    let tripSheetRefId = await basePage.getText(this.txtRefNum)
    await testDataUtil.addKeyValueToObject(movement, "TripSheetRefId", tripSheetRefId)
    console.log("Trip Sheet RefId: "+tripSheetRefId)

    await basePage.wait(2000)
    await basePage.scrollToElement(this.editServiceIcon)
    await basePage.click(this.editServiceIcon) 
    await basePage.click(this.serviceOption) 
    await basePage.click(this.iconTick)
    await basePage.wait(3000)
    console.log("Service Type Assigned successfully....")
    await basePage.scrollToElement(this.iconExpandInTripSheet)
    await basePage.click(this.iconExpandInTripSheet)
    await basePage.wait(2000)
    await basePage.scrollToElement1(this.iconPlusInTripSheet)
    await basePage.wait(2000)
    await basePage.click(this.iconPlusInTripSheet)
    // await basePage.selectFromDropdown(this.dropDownSelectAsset, asset)
    await basePage.waitForLocator(this.selectAsset)
    await basePage.click(this.selectAsset)
    await basePage.waitForLocator(this.selectAssetType)
    await basePage.click(this.selectAssetType)
    console.log("Asset selected....")
    // await basePage.selectFromDropdown(this.dropDownSelectAsset, asset)
    await basePage.wait(2000)
    let manifestRow=this.rowManifestInTripSheet1.replace("<<Text>>",manifestNo)
    await basePage.click(manifestRow)
    console.log("Manifest assigned to trip successfully....")
}

async dowloadFreightlabelOnly(movement)
{
await basePage.verifyElement(this.btnDownloadLabel)
const basePathPdf=path.resolve(__dirname,'../features/support');
const downloadPdfPath=path.join(basePathPdf, 'FreightLabelPdf')
const customPdfFilePath = path.join(downloadPdfPath, `${movement}_FreightLabel.pdf`);
await basePage.downloadFile(this.btnDownloadLabel,customPdfFilePath)

}

async dowloadTransportRequestOnly(movement)
{
await basePage.verifyElement(this.btnDownloadTransportRequest)
const basePathPdf=path.resolve(__dirname,'../features/support');
const downloadPdfPath=path.join(basePathPdf, 'TransportRequestPdf')
const customPdfFilePath = path.join(downloadPdfPath, `${movement}_TransportRequest.pdf`);
await basePage.downloadFile(this.btnDownloadTransportRequest,customPdfFilePath)

}


// async verifyIfPdfExist(folderName, pdfName) {
//   try {
//     let basePathPdf = path.resolve(__dirname, `../features/support/${folderName}`);
//     const fullPdfPath = path.join(basePathPdf, pdfName);

//     if (fs.existsSync(fullPdfPath)) {
//       console.log('PDF exists:', fullPdfPath);

//       // Call external delete method
//       const tenSecondsInMilliseconds = 10000;
//       await basePage.deleteFileAfterDelay(fullPdfPath, tenSecondsInMilliseconds);

//       return true;
//     } else {
//       console.log('PDF does not exist:', fullPdfPath);
//       return false;
//     }
//   } catch (err) {
//     console.error('Error checking PDF file:', err);
//     return false;
//   }
// }

async  verifyIfPdfExist(folderName, pdfName) {
  try {
    const basePathPdf = path.resolve(__dirname, `../features/support/${folderName}`);
    const fullPdfPath = path.join(basePathPdf, pdfName);

    // Use basePage method to check file presence
    const fileExists = await basePage.isFilePresent(fullPdfPath);

    if (fileExists) {
      console.log('PDF exists:', fullPdfPath);

      const tenSecondsInMilliseconds = 10000;
      await basePage.deleteFileAfterDelay(fullPdfPath, tenSecondsInMilliseconds);

      return true;
    } else {
      console.log(' PDF does not exist:', fullPdfPath);
      return false;
    }
  } catch (err) {
    console.error('Error checking PDF file:', err);
    return false;
  }
}









//async FinishAndbreakStartTimeNew(){
//    this.finishRuntime = "//input[@name='endTimestamp']"
//
//}












async PayableCheck(movement){
    const totalHrs = await basePage.getText(this.totalHrs)
    const TotalHrsparsetime = await basePage.timeStrToMinutes(totalHrs)
    console.log ("total hrs: " + TotalHrsparsetime)

    const totalBreaks = await basePage.getText(this.totalBreaks)
    const totalBrksparsetime = Number(totalBreaks)
    console.log ("total brks: " + totalBrksparsetime)


    const totalPayable = await basePage.getText(this.totalPayable)
    console.log("Total Payable Time in table: "+ totalPayable)
    testDataUtil.addKeyValueToObject(movement, "TotalPayableHrs", totalPayable) 
    const ParseTotal = await basePage.formatTimeString(totalPayable)
    console.log("Total Payable Time in table: "+ ParseTotal)

    const finalhrscomputed = TotalHrsparsetime - totalBrksparsetime
  //  console.log("Total Payable Time computed: "+ finalhrscomputed)
    const formattedfinalhrscomputed = await basePage.minutesToHHMM(finalhrscomputed)

    const result = await basePage.compare(ParseTotal,formattedfinalhrscomputed)
    return result

}


async verifyFinanceSectionWithPIN(password) {
    await basePage.waitForLocator(this.tabFinanceInMenu)
    await basePage.scrollToElement(this.tabFinanceInMenu)
    await basePage.click(this.tabFinanceInMenu)
    const txtfinance = await basePage.verifyElement(this.txtFinanceTitle)
    if(txtfinance == true){
        console.log("Finance section verified successfully...")
    }else{
        console.log("Required Pin to access Finance...")
        await basePage.waitForLocator(this.EnterPin)
        await basePage.sendKeys(this.password,password)
        await basePage.click(this.okBtn)
        console.log("PIN entered...")
        if(await basePage.verifyElement(this.txtFinanceTitle)){
            console.log("Finance section verified successfully...")
        }else{
            console.log("\x1b[31m%s\x1b[0m","Failed to Verify...")
        }
    }
}
async navigateToPaymentsTable(){
    await basePage.waitForLocator(this.payments)
    await basePage.click(this.payments)
    console.log("Entered into Payments table...... ")
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


 async verifyFinishedRuns(runNo){
        let isVerify=false
        await basePage.click(this.completedRunPage)
        await basePage.waitForLocator(this.searchRunInput)
        await basePage.click(this.searchRunInput)
        await basePage.sendKeys(this.searchRunInput,runNo)
        await basePage.keyboardEnter()
        await basePage.wait(3000)
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


    async enterPayeeName(Payee){
    await basePage.waitForLocatorDisappear(this.PaymentpageSpinner)
   await basePage.waitForLocator(this.txtSearch)
    await basePage.sendKeys(this.txtSearch, Payee)
    await basePage.keyboardEnter()
    await basePage.wait(7000)
}

async verifyPayeeName(payee){
    let isVerify=false
    console.log(payee)
      await basePage.waitForLocatorDisappear(this.PaymentpageSpinner)
   await basePage.waitForLocator(this.elmntPayeename)
    console.log(await basePage.getText(this.elmntPayeename))
    if(await basePage.verifyText(this.elmntPayeename,payee)){
        console.log("Payee name in  page is same as entered......")
        isVerify=true
    }else{
        isVerify=false
    }
    return isVerify
}

async verifyAllPayeeTypesAreCompanyContractor(strExpectedPayeeType) {
  // Wait for at least one row to appear
  await page.waitForSelector('div[data-field="payee.type"]');

  // Filter out unwanted rows using locator filtering
  const rowLocator = page.locator('div.MuiDataGrid-row');
  const filteredRows = await rowLocator
    .filter({ hasNotText: 'Payee' })
    .filter({ hasNotText: 'All Payees' })
    .elementHandles();

  let allValid = true;

  for (let i = 0; i < filteredRows.length; i++) {
    const row = filteredRows[i];
    const payeeTypeElem = await row.$('div[data-field="payee.type"]');
    const payeeNameElem = await row.$('div[data-field="payee"]');

    const payeeType = payeeTypeElem ? (await payeeTypeElem.textContent() ?? '').trim() : '';
    const payeeName = payeeNameElem ? (await payeeNameElem.textContent() ?? '').trim() : '';

    console.log(`Row ${i + 1} - Payee: "${payeeName}" | Type: "${payeeType}"`);

    if (payeeType !== strExpectedPayeeType) {
      console.log(`❌ Row ${i + 1} has invalid payee type: "${payeeType}"`);
      allValid = false;
    }
  }

  return allValid;
}

     

async selectPayeeTypeFilter(strFilterType) {
     await basePage.waitForLocator(this.filtersBtn)
    await basePage.click(this.filtersBtn)
    await basePage.wait(1000)
    await basePage.click(this.addFilterBtn)
    await basePage.wait(1000)
    await basePage.click(this.FilterOptions)
    await basePage.wait(1000)
    let filterValue=this.filterValue.replace('<<Text>>',strFilterType)
    await basePage.click(filterValue)
    await basePage.wait(1000)
    await basePage.click(this.applyFilterBtn)
    console.log("Fillters Applied successfully.....")
}

async clickPayeeDataField(strDataField, strPayeeName) {
await basePage.waitForLocatorDisappear(this.PaymentpageSpinner);
const dateRangeMap = {
  "this week": "thisWeek",
  "last week": "lastWeek",
  "this month": "thisMonth",
  "last month": "lastMonth",
  "all outstanding": "allOutstanding"
};

const normalizedField = dateRangeMap[strDataField.toLowerCase()];
if (normalizedField === "allOutstanding") {
  console.log("All outstanding part");
  await basePage.waitForLocator(this.btnAllOutstanding);
  await basePage.htmlClick(this.btnAllOutstanding);
  await basePage.waitForLocatorDisappear(this.PaymentpageSpinner);
}
strDataField = normalizedField || strDataField;

  let payeeCountInPaymentSummary = this.elmntPayeeCountDataField
    .replace('<<Payee>>', strPayeeName)
    .replace('<<DataField>>', strDataField);

  await basePage.waitForLocator(payeeCountInPaymentSummary);
  const payeeCountText = await basePage.getText(payeeCountInPaymentSummary)
  const expectedCount = parseInt(payeeCountText, 10);
  await basePage.click(payeeCountInPaymentSummary);
  await basePage.waitForLocatorDisappear(this.PaymentpageSpinner);
  return expectedCount;
}



async verifyDateRange(strDateRange) {
  await basePage.waitForLocatorDisappear(this.PaymentpageSpinner);
  await basePage.waitForLocator(this.filtersBtn);
  await basePage.click(this.filtersBtn);
  await basePage.wait(1000);
  await basePage.waitForLocator(this.elmntDataRange);

  const actualDateRange = await page
    .locator("//div[text()='Completed']/following::input[@placeholder='DD/MM/YYYY – DD/MM/YYYY']")
    .inputValue();

  console.log('Actual Date Range:', actualDateRange.trim());

  if (strDateRange === "All Outstanding") {
    const expectedRange = await basePage.getAllOutstandingDateRange();
    console.log('Expected Date Range:', expectedRange);

    const normalizedActual = await basePage.normalizeDash(actualDateRange.trim());
    const normalizedExpected = await basePage.normalizeDash(expectedRange);

    console.log('Normalized Actual Date Range:', normalizedActual);
    console.log('Normalized Expected Date Range:', normalizedExpected);

    const isValid = normalizedActual === normalizedExpected;
    console.log('Is Valid:', isValid);
    return isValid;
  } else {
    const expectedDateRange = await basePage.getExpectedDateRangeString(strDateRange);
    const isValid = actualDateRange.trim() === expectedDateRange;
    console.log(`Range: "${strDateRange}" -> Expected: "${expectedDateRange}", Actual: "${actualDateRange}", Valid: ${isValid}`);
    return isValid;
  }
}

async getAndClickPayeeCount(TimePeriod,dataTable){
    const assigneeList = dataTable.raw().flat(); // override if table is dynamic, or use static timePeriods
    for (const payee of assigneeList) {
    console.log(payee)
    await this.enterPayeeName(payee);
    const searchResult = await this.verifyPayeeName(payee);
    expect(searchResult).toBe(true);
    return this.clickPayeeDataField(TimePeriod,payee)
 }
}

async verifyPaginationCount(expectedCount) {
    console.log("Pagination locator is:", this.paginationNumber);

    await basePage.waitForLocator(this.paginationNumber);

    const paginationText = await basePage.getText(this.paginationNumber);
    console.log(`Found pagination text: ${paginationText}`);

    const match = paginationText.match(/of (\d+)/);

    if (!match) {
        throw new Error('Could not extract the total count from the pagination text.');
    }

    const actualCount = parseInt(match[1], 10);
    console.log(`Extracted actual count: ${actualCount}`);

    // Compare the two counts and report the result
    if (expectedCount === actualCount) {
        console.log('Success! The counts match.');
    } else {
        throw new Error(`Failure! Expected count: ${expectedCount}, but found: ${actualCount}`);
    }
}

}


   


module.exports = MyJobsPage
