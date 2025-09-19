
var reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');
const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, 'features/support/Testdata/TestData.json'), 'utf-8'));
const overallExecutionTime = jsonData.Execution_Time.OverAllTime;
const featureFile = jsonData.FeatureName.Feature;
//const 

var options = {
        theme: 'bootstrap',
        jsonFile: "report/cucumber_report.json",
        output: `report/html_report/${featureFile}.html`,
        screenshotsDirectory: `screenshots/${featureFile}.png`,
        storeScreenshots: false,
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            // "Test Environment": "STAGING",
            "Test Environment": process.env.ENV,
           // "Browser": "msedge",
             "Browser": "chrome",
            "Platform": "Windows 10",
            "Parallel": "NA",
            "Executed": "NA",
            "Overall Execution Time": overallExecutionTime
        },
        failedSummaryReport: true,
    };

    reporter.generate(options);
    