
// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './features',
  retries: 1,
  workers: 1,
  timeout: 60 * 1000, // Maximum time one test can run for
  expect: {
    timeout: 120 * 1000 // Expect timeout
  },
  reporter: 'html',
  projects : [
  
    {
      name : 'chrome',
      use: {

        browserName : 'chromium',
        channel: 'chrome',
        launchOptions: {
          args: ["--start-maximized"]
      } ,
        headless : false,
        fullyParallel: true,
        screenshot : 'on',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        trace: 'on' // trace setting
      }
    },
    
  ],
 
};

module.exports = config;


