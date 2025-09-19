const {When, Given,Then } = require("@cucumber/cucumber")
const LoginPage = require('../../pageobjects/LoginPage');
const {test, expect} = require('@playwright/test');
const TestDataUtil = require('../support/Utils/TestDataUtil');
const MyJobsPage = require("../../pageobjects/MyJobsPage");
const myJobsPage=new MyJobsPage()
const testDataUtil = new TestDataUtil()


Given('I am on the bustle login page', async function () {
  let loginpage = new LoginPage(page)
  await loginpage.LaunchURL()
});


When('I enter the valid username and password', async () =>{
  let loginpage = new LoginPage(page)
  await expect(await loginpage.verifyBustleLoginPage()).toBeTruthy()
  await loginpage.enterCredentials()
});

When('I enter the valid username and password 2', async () =>{
  let loginpage = new LoginPage(page)
  expect(await loginpage.verifyBustleLoginPage()).toBeTruthy()
  await loginpage.enterCredentialsForCarrier2()
});

When('I enter valid username and password', async () =>{
  let loginpage = new LoginPage(page)
  await expect(await loginpage.verifyBustleLoginPage()).toBeTruthy()
  await loginpage.enterCredentials1()
});

When('I enter carrier username and password', async () =>{
  let loginpage = new LoginPage(page)
  await expect(await loginpage.verifyBustleLoginPage()).toBeTruthy()
  await loginpage.enterCredentialsForCarrier()
});

When('I enter contractor username and password', async () =>{
  let loginpage = new LoginPage(page)
  await expect(await loginpage.verifyBustleLoginPage()).toBeTruthy()
  await loginpage.enterContractorCredentials()
});


  When('I enter the valid {string} and {string}', async function (strUserName, strPassword) {
    let loginpage = new LoginPage(page);
    await expect(await loginpage.verifyBustleLoginPage()).toBeTruthy()
    await loginpage.enterCredentials(testDataUtil.getValueByNestedKey("Login", strUserName), testDataUtil.getValueByNestedKey("Login", strPassword))
  });

  Then('I should see the bustle home page', async function () {
    let loginpage = new LoginPage(page);
    await expect(await loginpage.verifyBustleHomePage()).toBeTruthy()
  });

  
  Given('I am on the Home Page',async()=>{
    let loginpage = new LoginPage(page)
    await expect(await loginpage.verifyBustleHomePage()).toBeTruthy()
  
  })

When('I enter Toll username and password', async () =>{
  let loginpage = new LoginPage(page)
  await expect(await loginpage.verifyBustleLoginPage()).toBeTruthy()
  await loginpage.enterCredentialsForToll()
});