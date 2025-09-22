const { Before, BeforeAll, AfterAll, After, AfterStep, setDefaultTimeout, Status } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const fs = require('fs');
const path = require('path');
const TestDataUtil = require('../support/Utils/TestDataUtil');
const KageMetric = require('../support/Utils/Kage_Metric');
const testDataUtil = new TestDataUtil();
const kagemetric = new KageMetric();

// Set default timeout for steps
setDefaultTimeout(200000);

let overallStartTime, overallEndTime;
let currentFeatureName = '';
let scenarioStartTime;
let status = 'PASS';
let statusColor = '\x1b[32m';

BeforeAll(async function () {
    overallStartTime = new Date();

    // Set global environment variable
    const environment = process.env.ENV;  
    global.environment = environment;
    console.log(`\x1b[36mRunning tests in environment: ${global.environment}\x1b[0m`);

    // Launch browser (full view, no viewport restriction)
    global.browser = await chromium.launch({
        headless: false,
        slowMo: 300,
        args: ['--start-maximized'],
    });

    // Create context without viewport restriction for full screen Chrome
    global.context = await global.browser.newContext({
        viewport: null,  // fullscreen viewport
        permissions: [],
    });

    global.page = await global.context.newPage();

    // Optional zoom only if not running in CI (local debugging)
    // if (!process.env.CI) {
    //     try {
    //         await global.page.evaluate(() => {
    //             document.body.style.zoom = '90%';
    //         });
    //         console.log('\x1b[32mApplied 90% zoom for local environment.\x1b[0m');
    //     } catch (error) {
    //         console.warn('\x1b[33mFailed to apply zoom:\x1b[0m', error);
    //     }
    // }

    console.log("<========================== Browser instance created ================================>");
});

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
        console.warn("\x1b[33mNo browser instance found to close.\x1b[0m");
    }

    const overallDuration = overallEndTime - overallStartTime;
    const formattedDuration = formatDuration(overallDuration);
    console.log(`\x1b[35mOverall execution time: ${formattedDuration}\x1b[0m`);
    testDataUtil.addKeyValueToObject("Execution_Time", "OverAllTime", formattedDuration);
});

Before(async function (scenario) {
    scenarioStartTime = new Date();
    currentFeatureName = scenario.gherkinDocument.feature.name;
});

After(async function (testCase) {
    const scenarioEndTime = new Date();
    const scenarioDuration = scenarioEndTime - scenarioStartTime;
    const scenarioExecTime = formatDuration(scenarioDuration);

    if (testCase.result.status === Status.FAILED) {
        statusColor = '\x1b[31m';
    } else {
        try {
            await global.page.waitForTimeout(5000);
            const img = await global.page.screenshot();
            saveScreenshot(img, testCase);
            console.log(`\x1b[32mScreenshot saved successfully....\x1b[0m`);
            await this.attach(img, 'image/png');
        } catch (error) {
            console.error("\x1b[31mError while capturing screenshot:\x1b[0m", error);
        }
    }

    console.log(`Scenario: \x1b[94m${testCase.pickle.name}\x1b[0m executed in ${scenarioExecTime}.`);
    console.log(`Status: ${statusColor}${testCase.result.status}\x1b[0m`);

    status = testCase.result.status === "PASSED" ? "PASS" : "FAIL";

    // await kagemetric.updateReport(testCase.pickle.name, status);

    await this.attach(`Execution time: ${scenarioExecTime}`, 'text/plain');
});

AfterStep(async function (step) {
    // Optional wait to stabilize page before next step or screenshot
    await global.page.waitForTimeout(5000);

    if (step.result.status === Status.FAILED) {
        statusColor = '\x1b[31m';

        try {
            await global.page.waitForTimeout(5000);
            const img = await global.page.screenshot({ timeout: 15000 });
            saveScreenshot(img, step);
            console.log(`\x1b[32mScreenshot saved successfully on step failure.....\x1b[0m`);
            await this.attach(img, 'image/png');
        } catch (error) {
            console.error("\x1b[31mError while capturing screenshot on step failure:\x1b[0m", error);
        }
    } else {
        statusColor = '\x1b[32m';
    }

    console.log(`\x1b[33m${step.pickleStep.text}\x1b[0m: ${statusColor}${step.result.status}\x1b[0m`);
});

// Screenshot saving helper
function saveScreenshot(imageBuffer, entity) {
    const screenshotsDir = path.join(__dirname, 'Screenshots');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
    }
    const safeName = entity.pickle?.name || entity.text || 'screenshot';
    const fileName = `${safeName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
    const screenshotPath = path.join(screenshotsDir, fileName);
    fs.writeFileSync(screenshotPath, imageBuffer, 'base64');
    return screenshotPath;
}

// Duration formatting helper
function formatDuration(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
}
