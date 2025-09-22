const { Before, BeforeAll, AfterAll, After, AfterStep, setDefaultTimeout, Status } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const fs = require('fs');
const path = require('path');
const TestDataUtil = require('../support/Utils/TestDataUtil');
const KageMetric=require('../support/Utils/Kage_Metric');
const { timeout } = require("../../playwright.config1");
const testDataUtil = new TestDataUtil();
const kagemetric=new KageMetric();

// Set default timeout for steps
setDefaultTimeout(200000);

let overallStartTime, overallEndTime;
let statusColor = '\x1b[32m';
let currentFeatureName = '';
let scenarioName='';
let status='PASS'

// Launch the browser before all scenarios
BeforeAll(async function () {
    
   
    overallStartTime = new Date();
    global.browser = await chromium.launch({
        headless: false,
        //  channel: 'msedge',
        slowMo: 300,
        args: ['--start-maximized'], // Add this line to start the browser maximized
        permissions: [], // No permissions granted


    });
    const environment = process.env.ENV; // Default to 'stage' if not set
    global.environment = environment;
    //console.log(`Running tests in ${this.environment} environment`);
    console.log("<========================== browser instance created ================================>")
    global.context = await global.browser.newContext({
        headless: false,
        viewport: null, // Add this line to ensure viewport is set to null for full screen
        behaviour:'allow',
        permissions: [], // No permissions granted

    });
    global.page = await global.context.newPage();
     global.page.on('load', async () => {
        await page.evaluate(() => {
            const scale = 0.90;
            document.body.style.transform = `scale(${scale})`;
            document.body.style.transformOrigin = '0 0';  // Set transform origin to top-left
            document.body.style.position = 'absolute';    // Ensure the body takes up the entire viewport
            document.body.style.left = '0';
            document.body.style.top = '0';
            document.body.style.width = `${100 / scale}%`;  // Adjust width and height to compensate for scaling
            document.body.style.height = `${100 / scale}%`;
            document.body.style.overflow = 'hidden'; 
        });
    });


    // global.browser2 = await chromium.launch({ headless: false });

    // // Create a new incognito context
    // global.context2 = await global.browser2.newContext({
    //   viewport: { width: 1280, height: 720 }, // Customize the viewport if needed
    //   userAgent: 'any string like firefox!'
    // });
  
    // // Open a new page within the incognito context
    // global.page3 = await global.context2.newPage();
    // global.page3.on('load', async () => {
    //     await page.evaluate(() => {
    //         const scale = 0.50;
    //         document.body.style.transform = `scale(${scale})`;
    //         document.body.style.transformOrigin = '0 0';  // Set transform origin to top-left
    //         document.body.style.position = 'absolute';    // Ensure the body takes up the entire viewport
    //         document.body.style.left = '0';
    //         document.body.style.top = '0';
    //         document.body.style.width = `${100 / scale}%`;  // Adjust width and height to compensate for scaling
    //         document.body.style.height = `${100 / scale}%`;
    //         document.body.style.overflow = 'hidden'; 
    //     });
    // });
    
  

});

// Close the browser after all scenarios
AfterAll(async function () {
    overallEndTime = new Date();
    testDataUtil.addKeyValueToObject("FeatureName", "Feature", currentFeatureName);
    await global.page.waitForTimeout(2000);

    if (global.browser) {
        try {
            await global.browser.close();
            console.log("\x1b[36mBrowser closed successfully.\x1b[0m"); 
        } catch (error) {
            console.error("\x1b[31mError while closing the browser:\x1b[0m", error); 
        }
    } else {
        console.warn("\x1b[33mNo browser instance found or browser is already closed.\x1b[0m"); 
    }

    // Calculate the overall execution time
    const overallDuration = overallEndTime - overallStartTime;
    const formattedDuration = formatDuration(overallDuration);
    console.log(`\x1b[35mOverall execution time: ${formattedDuration}\x1b[0m`); 
    testDataUtil.addKeyValueToObject("Execution_Time", "OverAllTime", formattedDuration);
5});

// Track the start time before each scenario
Before(async function (scenario) {
    scenarioStartTime = new Date();
    // Get the feature name from the scenario
    currentFeatureName = scenario.gherkinDocument.feature.name;
    // testDataUtil.addKeyValueToObject("FeatureName", "Feature", currentFeatureName);
});

// Capture screenshot and calculate execution time after each scenario
After(async function (testCase) {
    scenarioEndTime = new Date();
    const scenarioDuration = scenarioEndTime - scenarioStartTime;
    const scenarioExecTime = formatDuration(scenarioDuration);

    if (testCase.result.status === Status.FAILED) {
        statusColor = '\x1b[31m'; 
    }
    else{
        try {
            await global.page.waitForTimeout(5000);
            const img = await global.page.screenshot();
            const screenshotPath = saveScreenshot(img, testCase);
            console.log(`\x1b[32mScreenshot saved successfully....\x1b[0m`);
            await this.attach(img, 'image/png'); // Attach screenshot to the Cucumber report
        } catch (error) {
            console.error("\x1b[31mError while capturing screenshot:\x1b[0m", error); 
        }
    }
    console.log(`Scenario: \x1b[94m${testCase.pickle.name}\x1b[0m executed in ${scenarioExecTime} seconds.`); 
    console.log(`Status: ${statusColor}${testCase.result.status}\x1b[0m`);
    if(testCase.result.status=="PASSED"){
         status='PASS'
    }else{
         status='FAIL'
    }
    //await kagemetric.updateReport(testCase.pickle.name,status);
    // Attach the scenario execution time to the scenario
    await this.attach(`Execution time: ${scenarioExecTime} seconds`, 'text/plain');
});

// Log step names with emphasized formatting
AfterStep(async function (step) {
    await global.page.waitForTimeout(5000); 
    if (step.result.status === Status.FAILED) {
        statusColor = '\x1b[31m';

        // Take screenshot on step failure
        try {
            await global.page.waitForTimeout(5000);
            const img = await global.page.screenshot({ timeout: 15000 });
            const screenshotPath = saveScreenshot(img, step);
            console.log(`\x1b[32mScreenshot saved successfully.....\x1b[0m`);
            await this.attach(img, 'image/png'); 
        } catch (error) {
            console.error("\x1b[31mError while capturing screenshot:\x1b[0m", error); 
        }
    } else {
        statusColor = '\x1b[32m'; 
    }

    console.log(`\x1b[33m${step.pickleStep.text}\x1b[0m: ${statusColor}${step.result.status}\x1b[0m`);
});

// Function to save screenshot to file system
function saveScreenshot(imageBuffer, entity) {
    const screenshotsDir = path.join(__dirname, 'Screenshots/');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
    }
    const screenshotPath = path.join(screenshotsDir, `${entity.pickle.name}.png`);
    fs.writeFileSync(screenshotPath, imageBuffer, 'base64');
    return screenshotPath;
}

// Function to format duration in a human-readable format
function formatDuration(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${hours}h ${minutes}m ${seconds}s`;
}



