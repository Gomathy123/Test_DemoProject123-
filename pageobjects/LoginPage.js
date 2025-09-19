
const {expect, test} = require ('@playwright/test');
const basePage = require ('../features/support/BasePage.js')
const testData = require('../features/support/Testdata/TestData.json')
const path = require('path');
const { setWorldConstructor } = require('@cucumber/cucumber');

class LoginPage {
    
constructor(page)
{
    this.page = page;
    //this.environment=environment;
    this.url = 'https://staging-meteor-server-mw6eoasgka-ts.a.run.app/'
    this.btnExistingUser = "//a[text()='Existing User']"
    this.txtSignIn = "//span[text()='Sign In'])[2]"
    this.btnSignInWithActiveDirectory = '#at-azure'
    this.inputBoxUsername = "//label[text()='Username or email']/following-sibling::input"
    this.inputBoxPassword = "//label[text()='Password']/following-sibling::input"
    this.btnSignIn = "#at-btn"
    this.txtHome = "//div[text()='Home']"
    this.tabOrganisation = "//span[text()='Organisation']/parent::div"
    //this.logoutBtn="//button[@id='signOutBtn']"
    this.logoutBtn="//button[@id='signOutBtn']/i"
    this.orgHome = "//a[@id='sideNavHomeBtn']"
    this.continue="//a[contains(text(),'Continue')]"

}


// async CustomWorld(parameters) {
//     this.parameters = parameters; // Store parameters (e.g., { env: 'prod' })
// }


async LaunchURL() {
    let env=global.environment;
    let environment = String(env).trim();
     const url =String(testData.Login[environment].Url).trim()
    console.log(url)
    await basePage.loadUrl(url);
     console.log("Url launched successfully.....")
   }

  async launchURL1(url) {
    await basePage.loadUrl(url);
    console.log("Url launched successfully.....")
   }

async  verifyBustleLoginPage(){
    let isVerify = false
    await basePage.waitForLocator(this.btnExistingUser)
    await basePage.scrollToElement(this.btnExistingUser)
    await basePage.click(this.btnExistingUser)
    if(await basePage.verifyElement(this.btnSignInWithActiveDirectory)){
        console.log("login page verified successfully....")
        isVerify = true
    }
    else{
        isVerify = false
        console.log("login page verification failed....")
    }
    return isVerify
}

async enterCredentials(){
    let env=global.environment;
    let environment = String(env).trim();
    let username=String(testData.Login[environment].Username).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.waitForLocator(this.inputBoxUsername)
    await basePage.sendKeys(this.inputBoxUsername, username)
    await basePage.sendKeys(this.inputBoxPassword, password)
    await basePage.click(this.btnSignIn)
    console.log("signed in successfully...")
}

async enterCredentials1(){
    let env=global.environment;
     let environment = String(env).trim();
    let username=String(testData.Login[environment].PortalUsername).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.waitForLocator(this.inputBoxUsername)
    await basePage.sendKeys(this.inputBoxUsername, username)
    await basePage.sendKeys(this.inputBoxPassword, password)
    await basePage.click(this.btnSignIn)
    console.log("signed in successfully...")
}

async enterCredentialsForCarrier(){
    let env=global.environment;
    let environment = String(env).trim();
    let username=String(testData.Login[environment].Carrier).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.waitForLocator(this.inputBoxUsername)
    await basePage.sendKeys(this.inputBoxUsername, username)
    await basePage.sendKeys(this.inputBoxPassword, password)
    await basePage.click(this.btnSignIn)
    console.log("signed in successfully...")
}


async enterCredentialsForCarrier2(){
    let env=global.environment;
    let environment = String(env).trim();
    let username=String(testData.Login[environment].Username1).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.waitForLocator(this.inputBoxUsername)
    await basePage.sendKeys(this.inputBoxUsername, username)
    await basePage.sendKeys(this.inputBoxPassword, password)
    await basePage.click(this.btnSignIn)
    console.log("signed in successfully...")
}


async enterCredentialsForContractor(){
    let env=global.environment;
    let environment = String(env).trim();
    let username=String(testData.Login[environment].Contractor).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.waitForLocator(this.inputBoxUsername)
    await basePage.sendKeys(this.inputBoxUsername, username)
    await basePage.sendKeys(this.inputBoxPassword, password)
    await basePage.click(this.btnSignIn)
    console.log("signed in successfully...")
}

async verifyBustleHomePage(){
    let isVerify = false
    await basePage.waitForLocator(this.txtHome)
    if(await basePage.verifyElement(this.txtHome)){
        console.log("Home page verified successfully.....")
        isVerify = true
    }
    else{
        console.log("Home page verification failed.....")
    }
    return isVerify

}


// async login(strUsername,strPassword){
//     await basePage.waitForLocator(this.inputBoxUsername)
//     await basePage.sendKeys(this.inputBoxUsername, strUsername)
//     await basePage.sendKeys(this.inputBoxPassword, strPassword)
//     await basePage.click(this.btnSignIn)
//     console.log("signed in successfully...")
// }

// async logout(){
//     await basePage.waitForLocator(this.logoutBtn)
//     await basePage.click(this.logoutBtn)
//     console.log("Signed Out successfully...")
// }


async logoutLogin(){
    let env=global.environment;
    let environment = String(env).trim();
    let username=String(testData.Login[environment].Username).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.wait(5000)
    await basePage.waitForLocator(this.logoutBtn)
    await basePage.click(this.logoutBtn)
    console.log("Signed Out successfully...")
    await basePage.wait(3000)
    await basePage.waitForLocator(this.btnExistingUser)
    //await basePage.scrollToElement(this.btnExistingUser)
    await basePage.click(this.btnExistingUser)
    console.log("Btn Existing user clicked....")
    await basePage.waitForLocator(this.inputBoxUsername)
    await basePage.sendKeys(this.inputBoxUsername, username)
    await basePage.sendKeys(this.inputBoxPassword, password)
    await basePage.click(this.btnSignIn)
    console.log("signed in successfully...")
}

// async logoutLogin1(strUsername,strPassword){
    
//     await basePage.wait(5000)
//     await basePage.waitForLocator(this.logoutBtn)
//     await basePage.click(this.logoutBtn)
//     console.log("Signed Out successfully...")
//     await basePage.pageReload()
//     await basePage.sendKeys(this.inputBoxUsername, "minesite2@bustle.com")
//     await basePage.sendKeys(this.inputBoxPassword, "password")
//     await basePage.click(this.btnSignIn)
//     await basePage.wait(5000)
//     await basePage.waitForLocator(this.btnExistingUser)
//     //await basePage.scrollToElement(this.btnExistingUser)
//     await basePage.click(this.btnExistingUser)
//     console.log("Btn Existing user clicked....")
//     await basePage.waitForLocator(this.inputBoxUsername)
//     await basePage.sendKeys(this.inputBoxUsername, strUsername)
//     await basePage.sendKeys(this.inputBoxPassword, strPassword)
//     await basePage.click(this.btnSignIn)
//     console.log("signed in successfully...")
// }
 async logoutLogin1(){
    let env=global.environment;
    let environment = String(env).trim();
    //let username=String(testData.Login[environment].Username).trim()
    let potalUsername=String(testData.Login[environment].PortalUsername).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.wait(5000)
    await basePage.waitForLocator(this.logoutBtn)
    await basePage.click(this.logoutBtn)
    console.log("Signed Out successfully...")
    //await basePage.pageReload()
    // await basePage.sendKeys(this.inputBoxUsername, potalUsername)
    // await basePage.sendKeys(this.inputBoxPassword, password)
    // await basePage.click(this.btnSignIn)
    // await basePage.wait(5000)
    await basePage.waitForLocator(this.btnExistingUser)
    //await basePage.scrollToElement(this.btnExistingUser)
    await basePage.click(this.btnExistingUser)
    console.log("Btn Existing user clicked....")
    await basePage.waitForLocator(this.inputBoxUsername)
    await basePage.sendKeys(this.inputBoxUsername, potalUsername)
    await basePage.sendKeys(this.inputBoxPassword, password)
    await basePage.click(this.btnSignIn)
    console.log("signed in successfully...")

}

async logoutLoginContractor(){
    let env=global.environment;
    let environment = String(env).trim();
    let username=String(testData.Login[environment].Contractor).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.wait(5000)
    await basePage.waitForLocator(this.logoutBtn)
    await basePage.click(this.logoutBtn)
    console.log("Signed Out successfully...")
    await basePage.wait(3000)
    await basePage.waitForLocator(this.btnExistingUser)
    //await basePage.scrollToElement(this.btnExistingUser)
    await basePage.click(this.btnExistingUser)
    console.log("Btn Existing user clicked....")
    await basePage.waitForLocator(this.inputBoxUsername)
    await basePage.sendKeys(this.inputBoxUsername, username)
    await basePage.sendKeys(this.inputBoxPassword, password)
    await basePage.click(this.btnSignIn)
    console.log("signed in successfully...")  

}




async logoutLoginCarrier(){
    let env=global.environment;
    let environment = String(env).trim();
    let username=String(testData.Login[environment].Carrier).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.wait(5000)
    await basePage.waitForLocator(this.logoutBtn)
    await basePage.click(this.logoutBtn)
    console.log("Signed Out successfully...")
    await basePage.wait(3000)
    await basePage.waitForLocator(this.btnExistingUser)
    //await basePage.scrollToElement(this.btnExistingUser)
    await basePage.click(this.btnExistingUser)
    console.log("Btn Existing user clicked....")
    await basePage.waitForLocator(this.inputBoxUsername)
    await basePage.sendKeys(this.inputBoxUsername, username)
    await basePage.sendKeys(this.inputBoxPassword, password)
    await basePage.click(this.btnSignIn)
    console.log("signed in successfully...")  

}

async logoutLoginContractor2(){
    let env=global.environment;
    let environment = String(env).trim();
    let username=String(testData.Login[environment].Contractor).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.click(this.orgHome)
    await basePage.wait(5000)
    await basePage.waitForLocator(this.logoutBtn)
    await basePage.click(this.logoutBtn)
    console.log("Signed Out successfully...")

    const result = await basePage.verifyElement(this.btnExistingUser)
    console.log(result)
   
    if (result===true) {
        await basePage.wait(3000)
        await basePage.waitForLocator(this.btnExistingUser)
        await basePage.click(this.btnExistingUser)
        console.log("Btn Existing user clicked....")
        await basePage.waitForLocator(this.inputBoxUsername)
        await basePage.sendKeys(this.inputBoxUsername, username)
        await basePage.sendKeys(this.inputBoxPassword, password)
        await basePage.click(this.btnSignIn)
        console.log("signed in successfully...")  
       
    }
    else{
        await basePage.wait(3000)
        await basePage.waitForLocator(this.inputBoxUsername)
        await basePage.sendKeys(this.inputBoxUsername, username)
        await basePage.sendKeys(this.inputBoxPassword, password)
        await basePage.click(this.btnSignIn)
        console.log("signed in successfully...")  
    }

}

async logoutLoginCarrier2(){


    let env=global.environment;
    let environment = String(env).trim();
    let username=String(testData.Login[environment].Username).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.click(this.orgHome)
    await basePage.wait(5000)
    await basePage.waitForLocator(this.logoutBtn)
    await basePage.click(this.logoutBtn)

    const checkpoint = await basePage.verifyElement(this.continue) //for mobile
    if (checkpoint == true){

            await basePage.click(this.continue)
            console.log("Signed Out successfully...")

    } else {
            console.log("Signed Out successfully...")

    }

    const result = await basePage.verifyElement(this.btnExistingUser)
    console.log(result)
   
    if (result===true) {
        await basePage.wait(3000)
        await basePage.waitForLocator(this.btnExistingUser)
        await basePage.click(this.btnExistingUser)
        console.log("Btn Existing user clicked....")
        await basePage.wait(3000)
        await basePage.waitForLocator(this.inputBoxUsername)
        await basePage.sendKeys(this.inputBoxUsername, username)
        await basePage.sendKeys(this.inputBoxPassword, password)
        await basePage.click(this.btnSignIn)
        console.log("signed in successfully...")  
       
    }
    else{
        await basePage.wait(3000)
        await basePage.waitForLocator(this.inputBoxUsername)
        await basePage.sendKeys(this.inputBoxUsername, username)
        await basePage.sendKeys(this.inputBoxPassword, password)
        await basePage.click(this.btnSignIn)
        console.log("signed in successfully...")  
    }

   

}

async logoutLoginCarrier3(){


    let env=global.environment;
    let environment = String(env).trim();
    let username=String(testData.Login[environment].Username1).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.click(this.orgHome)
    await basePage.wait(5000)
    await basePage.waitForLocator(this.logoutBtn)
    await basePage.click(this.logoutBtn)

    const checkpoint = await basePage.verifyElement(this.continue) //for mobile
    if (checkpoint == true){

            await basePage.click(this.continue)
            console.log("Signed Out successfully...")

    } else {
            console.log("Signed Out successfully...")

    }

    const result = await basePage.verifyElement(this.btnExistingUser)
    console.log(result)
   
    if (result===true) {
        await basePage.wait(3000)
        await basePage.waitForLocator(this.btnExistingUser)
        await basePage.click(this.btnExistingUser)
        console.log("Btn Existing user clicked....")
        await basePage.wait(3000)
        await basePage.waitForLocator(this.inputBoxUsername)
        await basePage.sendKeys(this.inputBoxUsername, username)
        await basePage.sendKeys(this.inputBoxPassword, password)
        await basePage.click(this.btnSignIn)
        console.log("signed in successfully...")  
       
    }
    else{
        await basePage.wait(3000)
        await basePage.waitForLocator(this.inputBoxUsername)
        await basePage.sendKeys(this.inputBoxUsername, username)
        await basePage.sendKeys(this.inputBoxPassword, password)
        await basePage.click(this.btnSignIn)
        console.log("signed in successfully...")  
    }

   

}


async logoutLoginDriver(){
    let env=global.environment;
    let environment = String(env).trim();
    let username=String(testData.Login[environment].Driver).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.click(this.orgHome)
    await basePage.wait(5000)
    await basePage.waitForLocator(this.logoutBtn)
    await basePage.click(this.logoutBtn)
    console.log("Signed Out successfully...")

    await page.reload();
    const result = await basePage.verifyElement(this.btnExistingUser)
    console.log(result)
   
    if (result===true) {
        await basePage.wait(3000)
        await basePage.waitForLocator(this.btnExistingUser)
        await basePage.click(this.btnExistingUser)
        console.log("Btn Existing user clicked....")
        await basePage.waitForLocator(this.inputBoxUsername)
        await basePage.sendKeys(this.inputBoxUsername, username)
        await basePage.sendKeys(this.inputBoxPassword, password)
        await basePage.click(this.btnSignIn)
        console.log("signed in successfully...")  
       
    }
    else{
        await basePage.wait(3000)
        await basePage.waitForLocator(this.inputBoxUsername)
        await basePage.sendKeys(this.inputBoxUsername, username)
        await basePage.sendKeys(this.inputBoxPassword, password)
        await basePage.click(this.btnSignIn)
        console.log("signed in successfully...")  
    }

}   

async enterCredentialsForToll(){
    let env=global.environment;
    let environment = String(env).trim();
    let username=String(testData.Login[environment].TollUsername).trim()
    let password=String(testData.Login[environment].Password).trim()
    await basePage.waitForLocator(this.inputBoxUsername)
    await basePage.sendKeys(this.inputBoxUsername, username)
    await basePage.sendKeys(this.inputBoxPassword, password)
    await basePage.click(this.btnSignIn)
    console.log("signed in successfully...")
}


}
module.exports = LoginPage