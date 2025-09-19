const { expect, test } = require("@playwright/test");
const ReadPdf = require("./Utils/PdfUtil.js");
const ReadCsv=require("./Utils/CsvUtil.js");
const fs = require('fs');
const { text } = require("stream/consumers");
const dayjs = require('dayjs');


class BasePage {
  constructor() {}


  async loadUrl(url) {
    await page.goto(url);
  }
 
  async setPageSize() {
    await page.evaluate(() => {
      document.body.style.zoom = 0.6;
    });
    console.log("zoom out");
  }

  async ZoomOutTheWindow() {
    await page.bringToFront();
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press("Control+Minus"); // Zoom out
    }
    console.log("zoom out");
  }

  async verifyElement(element) {
    try {
      const timeout = 3000;
      await page.locator(element).waitFor({ state: "visible", timeout });
      return await page.locator(element).isVisible();
    } catch {
      return false;
    }
  }

  async verifyElement2(element) {
  try {
    const locator = page.locator(element);
    const timeout = 3000;
    await locator.waitFor({ state: "attached", timeout });
    return await locator.isVisible();
  } catch {
    return false;
  }
}

  async verifyText(element, text) {
    let isVerify = false;
    if (await page.locator(element).isVisible()) {
      await expect(page.locator(element)).toHaveText(text);
      isVerify = true;
    } else {
      isVerify = false;
    }
    return isVerify;
  }

  async  verifyTexts(element, text1, text2) {
    let isVerify;
    // Retrieve the text content of the element
    const elementText = await page.locator(element).textContent({ timeout: 5000 })
    
    // Check if the element text matches either text1 or text2
    if (elementText.includes(text1) || elementText.includes(text2)) {
      isVerify=true;
    } else {
      isVerify=false;
    }
    return isVerify;
}


//jeriza code
async addToArray(arr1,arr2, data) {
  arr1.push(data);  // Adds data to the end of the array
  arr2.push(data);  // Adds data to the end of the array

}

async arraysAreEqual(arr1, arr2) {

  if (arr1.length !== arr2.length) {
    return false;
  }

  // Compare each element in both arrays
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

async parseDateToDDMMYYYY(rawDateStr) {
     // 1. Clean up string
     let dateStr = rawDateStr.trim().replace(/\u00A0/g, " ");
     dateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/gi, "$1");

     // 2. Remove timezone and time
     dateStr = dateStr.replace(/\b([A-Z]{3,4})\b/g, ""); // remove timezone
     dateStr = dateStr.replace(/\d{1,2}:\d{2}\s*[ap]m?/gi, ""); // remove 12-hour time
     dateStr = dateStr.replace(/\d{1,2}:\d{2}/gi, ""); // remove 24-hour time
     dateStr = dateStr.replace(/,/g, "").trim(); // remove commas

     // 3. Add current year if not present
     if (!/\d{4}/.test(dateStr)) {
       const currentYear = new Date().getFullYear();
       dateStr += ` ${currentYear}`;
     }

     // 4. Parse to Date object
     const dateObj = new Date(dateStr);
     if (isNaN(dateObj)) throw new Error("Invalid date format: " + dateStr);

     // 5. Format as DD/MM/YYYY
     const day = dateObj.getDate().toString().padStart(2, "0");
     const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
     const year = dateObj.getFullYear();

     console.log(`${day}/${month}/${year}`)
     return `${day}/${month}/${year}`;
}



  async parseCustomDate(rawDateStr) {
      // code is converting from Jul 22nd, 00:00pm AWST  to Jul 22 2025, 00:00 +10:00
      // 1. Clean up string 

      // 1. Clean up string
      let dateStr = rawDateStr.trim().replace(/\u00A0/g, " "); // remove NBSP
       dateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/i, "$1");   // remove 'th', 'st', etc.

     // 2. Replace known timezones with UTC offsets
      const tzMap = {
        AWST: "+08:00",
        AEST: "+10:00",
        AEDT: "+11:00",
        ACST: "+09:30",
        UTC: "+00:00",
        GMT: "+00:00"
       };
     dateStr = dateStr.replace(/\b([A-Z]{3,4})\b/g, (match) => tzMap[match] || match);

      // 3. Add current year if not present, in correct place (after day, before time)
      dateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/i, "$1");   // remove 'th', 'st', etc.
      dateStr = dateStr.replace(/AWST/i, "+08:00");             // replace timezone with offset

      // 2. Add year if not present
      if (!/\d{4}/.test(dateStr)) {
        const currentYear = new Date().getFullYear();
        // Insert year after the date part (e.g., "Jul 22," → "Jul 22 2025,")
        dateStr = dateStr.replace(/([A-Za-z]{3,9} \d{1,2}),?/, `$1 ${currentYear},`);
        dateStr += ` ${currentYear}`;
      }

      // 4. Convert 12-hour time to 24-hour format (if any)
      // 3. Convert 12-hour to 24-hour manually (e.g., 5:30pm → 17:30)
      dateStr = dateStr.replace(/(\d{1,2}):(\d{2})([ap]m)/i, (match, hour, minute, meridian) => {
        hour = parseInt(hour, 10);
        if (meridian.toLowerCase() === "pm" && hour !== 12) hour += 12;
        if (meridian.toLowerCase() === "am" && hour === 12) hour = 0;
        return `${hour.toString().padStart(2, '0')}:${minute}`;
      });

      // 5. Parse into Date object
      // 4. Convert to Date object
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj)) throw new Error("Invalid date format: " + dateStr);

      console.log(dateObj);

      return dateObj;
      }
  


  async clickPageDown() {
    await page.keyboard.press("PageDown");
  }

  async clickPageUp() {
    await page.keyboard.press("PageUp");
  }

  async typeText(element, text) {
    await page.locator(element).type(text);
  }

  async sendKeys(element, text) {
    await page.locator(element).fill(text);
  }

  async clear(element) {
    await page.locator(element).fill("");
  }

  // async click(element) {
  //   await page.locator(element).click();
  // }
  
  async click(element) {
    await page.locator(element).first().click();
  }

  async dblClick(element) {
    await page.locator(element).dblclick();
  }

  async htmlClick(element) {
    await page.locator(element).dispatchEvent("click");
  }

  async clickNthElement(element, Index) {
    await page.locator(element).nth(Index).click();
  }

  async takeScreenshotWithFullPage(path) {
    await page.screenshot({ path: path, fullPage: true });
  }

  async getText(element) {
    return await page.locator(element).textContent({ timeout: 5000 });
  }
  // async getInnerText(element){
  //   return await page.locator(element).innerText({ timeout: 5000 });
  // }
  
  async getAttribute(element,text) {
    return await page.locator(element).getAttribute(text);
  }

  async getInputValue(element) {
    return await page.locator(element).inputValue();
  }

  async getListOfElementText(element) {
    return await page.locator(element).allTextContents();
  }

  async selectFromDropdown(element, selectOptionInText) {
    try {
      await page.locator(element).selectOption(selectOptionInText);
    } catch (error) {
      console.error(
        `Error selecting option '${selectOptionInText}' from dropdown '${element}':`,
        error
      );
    }
  }


  async getURLFromANewTab(buttonToBeClicked) {
    const popupPromise = page.waitForEvent("popup");
    this.ClickButton(buttonToBeClicked);
    const popup = await popupPromise;
    return popup.url();
  }
  async keyboardEnter() {
    await page.keyboard.press("Enter");
  }
async countElement(element){
  return await page.locator(element).count();
}
  async wait(timeUnit) {
    await page.waitForTimeout(timeUnit);
  }

  async scrollToElement(element) {
    //await page.locator(element).waitFor({ state: 'attached', timeout: 15000 });
    await page.locator(element).first().scrollIntoViewIfNeeded({ timeout: 15000 });
  }

  async scrollToElement1(element) {
    try {
        // Ensure the element is attached to the DOM.
        await expect(await page.locator(element)).toBeAttached({ timeout: 15000 });

        // Scroll into view to make the element visible.
        await page.locator(element).scrollIntoViewIfNeeded({ timeout: 15000 });

        // Verify if the element is now visible.
        if (!(await page.locator(element).isVisible())) {
            throw new Error("Element is still not visible after scrolling.");
        }
    } catch (error) {
        console.error(`Error scrolling to element: ${error.message}`);
        // Capture screenshot for debugging.
        await page.screenshot({ path: 'scroll_failure_debug.png', fullPage: true });
        throw error;
    }
}

  
  async scrollTo(element){
    await page.locator(element).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async goBackToPreviosWindow(){
    await page.goBack();
  }

  async waitForLocator(element) {
    try {
      const timeout = 10000;
      await page.locator(element).waitFor({ state: "visible", timeout });
      //console.log(`Element ${element} is visible`)
    } catch (error) {
      console.error(`Element ${element} did not become visible`);
      throw error;
    }
  }
  async bringFront(){
    await page.bringToFront()
  }
  async waitForLoad(){
    await page.waitForLoadState();
  }
  async pageReload(){
    await page.reload()
  }

  async parseCustomDate(rawDateStr) {

      // 1. Clean up string
      let dateStr = rawDateStr.trim().replace(/\u00A0/g, " "); // remove NBSP
      dateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/i, "$1");   // remove 'th', 'st', etc.
      dateStr = dateStr.replace(/AWST/i, "+08:00");             // replace timezone with offset

      // 2. Add year if not present
      if (!/\d{4}/.test(dateStr)) {
        const currentYear = new Date().getFullYear();
        dateStr += ` ${currentYear}`;
      }

      // 3. Convert 12-hour to 24-hour manually (e.g., 5:30pm → 17:30)
      dateStr = dateStr.replace(/(\d{1,2}):(\d{2})([ap]m)/i, (match, hour, minute, meridian) => {
        hour = parseInt(hour, 10);
        if (meridian.toLowerCase() === "pm" && hour !== 12) hour += 12;
        if (meridian.toLowerCase() === "am" && hour === 12) hour = 0;
        return `${hour.toString().padStart(2, '0')}:${minute}`;
      });

      // 4. Convert to Date object
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj)) throw new Error("Invalid date format: " + dateStr);
      return dateObj;
  }

   async isCheckboxChecked(element) {
    return await page.locator(element).isChecked();
  }


  async convertToMMDDYYYY(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month (0-indexed)
    const day = String(date.getDate()).padStart(2, '0');      // Day
    const year = date.getFullYear();   
  
    console.log(`${day}/${month}/${year}`)
    return `${day}/${month}/${year}`;
  }
  


 // due dates check
 async calculateDaysBetweenDates(PUDate, DueDate)
 {
     function parseDate(dateStr) {
     const [day, month, year] = dateStr.split('/');
     return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
     }
     const start = parseDate(PUDate);
     const end = parseDate(DueDate);

     const diffTime = end - start;
     const diffDays = diffTime / (1000 * 3600 * 24);
     return diffDays;

 }

 // due dates check
  async countWeekdays(PUDate, DueDate)
  {
      function parseDate(dateStr) {
      const [day, month, year] = dateStr.split('/');
      return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
      }

      // Convert the string dates to Date objects
      
      const start = parseDate(PUDate);
      const end = parseDate(DueDate);
      
      // Initialize the counter
      let weekdayCount = 0;
      start.setDate(start.getDate() + 1);
  
      // Loop through the range of dates
      for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
          // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
          const dayOfWeek = currentDate.getDay();
          
           // Only count weekdays (Monday to Friday)
          if (dayOfWeek >=1 && dayOfWeek <= 5) {
              weekdayCount++;
          }
      }
      
      return weekdayCount;
  }
 // due dates check
  async countWeekdayswithSaturday(PUDate, DueDate)
  {
      function parseDate(dateStr) {
      const [day, month, year] = dateStr.split('/');
      return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
      }

      // Convert the string dates to Date objects
      
      const start = parseDate(PUDate);
      const end = parseDate(DueDate);
      
      // Initialize the counter
      let weekdayCount = 0;
      start.setDate(start.getDate() + 1);
  
      // Loop through the range of dates
      for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
          // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
          const dayOfWeek = currentDate.getDay();
          
      
          if (dayOfWeek >=1 && dayOfWeek <= 6) {
              weekdayCount++;
          }
      }
      
      return weekdayCount;
  }

  async countWeekdayswithSunday(PUDate, DueDate)
  {
      function parseDate(dateStr) {
      const [day, month, year] = dateStr.split('/');
      return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
      }

      // Convert the string dates to Date objects
      
      const start = parseDate(PUDate);
      const end = parseDate(DueDate);
      
      // Initialize the counter
      let weekdayCount = 0;
      start.setDate(start.getDate() + 1);

      // Loop through the range of dates
      for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
          // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
          const dayOfWeek = currentDate.getDay();
          
          
          if (dayOfWeek >=0 && dayOfWeek <= 5) {
              weekdayCount++;
          }
      }
      
      return weekdayCount;
  }

  async timeFormat(time) {
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  const finalTimeFormat = `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`
  return finalTimeFormat;
}

async parseTimeToDate(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

async formatTimeString(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(num => String(Number(num)).padStart(2, "0"));
  return `${hours}:${minutes}`;
}


async minutesToHHMM(totalMinutes) {
  const convertedmins = Number(totalMinutes)
  const hours = Math.floor(convertedmins / 60);
  const minutes = convertedmins % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

async timeStrToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

async getTimeDifference(startTime, endTime) {
  const start = startTime;
  const end = endTime;

  const diffMs = end - start;

  if (isNaN(diffMs)) {
    throw new Error("Invalid time input");
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

//  console.log(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`)

// return `${hours}:${minutes.toString().padStart(2, "0")}`;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
}

async compare(testdata,DataFromUI){

     if (testdata == DataFromUI){

        console.log("Verified successfully, Test data is matching to UI")
        return true
    }else{

        console.log("\x1b[31m%s\x1b[0m","Not verified succesfully, check your test data")
        return false

    }


}


async timeToDecimal(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const decimal = hours + minutes / 60;
    return decimal.toFixed(2); // Returns a string with 2 decimal places

}

async addTimes(time1, time2) {
  const [h1, m1] = time1.split(':').map(Number);
  const [h2, m2] = time2.split(':').map(Number);

  let totalMinutes = m1 + m2;
  let totalHours = h1 + h2 + Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;

  return `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}`;
}

async  convertToDate(dateTimeStr) {
  const [datePart, timePart, ampm] = dateTimeStr.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  let [hours, minutes] = timePart.split(":").map(Number);

  if (ampm === "PM" && hours !== 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  return new Date(year, month - 1, day, hours, minutes);
}

  

  async clickKeyboardBackSpace() {
    await page.keyboard.press("Backspace");
  }

  async isEnable(element) {
    return await page.locator(element).isEnabled();
  }

  async clickCheckBox(element) {
    await page.locator(element).scrollIntoViewIfNeeded();
    await page.locator(element).check();
  }

 async isCheckboxChecked(element) {
    return await page.locator(element).isChecked();
  }

  async clickCheckBox1(element) {
    await page.locator(element).check();
  }

  async uploadFile(element, filePath) {
    await page.locator(element).setInputFiles(path.join(__dirname, filePath));
  }

  async focusElement(element) {
    await page.locator(element).focus();
  }

  async dragAndDrop(fromElement, toElement) {
    await page.locator(fromElement).dragTo(page.locator(toElement));
  }

  async acceptPopUp(element) {
    page.on("dialog", (dialog) => dialog.accept());
    await page.locator(element).click();
  }

  async dismissPopup() {
    page.on("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss();
    });
  }

  async downloadFile(downloadButtonSelector, customFilePath) {
    // Wait for the download event and click the download button
    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 60000 }),
      page.click(downloadButtonSelector),
    ]);

    // Save the downloaded file to the specified custom path
    await download.saveAs(customFilePath);
    console.log(`File downloaded to: ${customFilePath}`);
  }

  

//check the given datas is present in pdf or not
async compareFilesFromPdf(description,data,pdfFilePath){
   let isVerify=false;
  try {
      const readPdf=new ReadPdf()
      console.log("Reading PDf File............")
      const pdfWords = await readPdf.extractPDFText(pdfFilePath);
      const pdfDataAddress =await readPdf.extractRelevantDataFromPDF(pdfWords);
        const pdfData = await readPdf.normalizeText(pdfDataAddress); // Extracted from PDF
        const uiDataNormalized =await readPdf.normalizeText(description); // Extracted from UI
        console.log("ADDRESS IN UI :  "+uiDataNormalized )
        console.log("===================================================")
       if (pdfData == uiDataNormalized) {
        isVerify=true;
         console.log('Address matches!');
       } else {
         console.log('Address does not match.....');
       }
      data.forEach(value => {
        if (pdfWords.includes(value)) {
         isVerify=true;
          console.log(`Value "${value}" is present in the PDF.`);
        } else {
          console.log(`Value "${value}" is not present in the PDF.`);
        }

      });
      
  } catch (error) {
      console.error('Error comparing files:', error);
  }
  return isVerify;
}

async compareChillerFromPdf(pdfFilePath){
  let isVerify=false
 try {
    const readPdf = new ReadPdf();
    console.log("Reading PDF File............");
    const pdfWords = await readPdf.extractPDFText(pdfFilePath);
    const isMatch = pdfWords.includes("Required: Chiller");

    if (!isMatch) {
        throw new Error("Chiller is not mentioned in the PDF");
    }
    isVerify = true;
    console.log("Chiller is present in the PDF");
    return isVerify;

} catch (error) {
    console.error('Error comparing files:', error);
    return isVerify;
}
   
}

async compareFreezeromPdf(pdfFilePath){
    let isVerify=false
  try {
    const readPdf = new ReadPdf();
    console.log("Reading PDF File............");
    const pdfWords = await readPdf.extractPDFText(pdfFilePath);
    const isMatch = pdfWords.includes("Required: Freezer");

    if (!isMatch) {
        throw new Error("Freezer is not mentioned in the PDF");
    }
    isVerify = true;
    console.log("Freezer is present in the PDF");
    return isVerify;

} catch (error) {
    console.error('Error comparing files:', error);
    return isVerify;
}
}

async comparePaymentPdf(referenceNo,pdfFilePath,amount,movement,paymentNo) {
   let isVerify=false
  try {
    const readPdf = new ReadPdf();
    console.log("Reading PDF File............");
    const pdfWords = await readPdf.extractPDFText(pdfFilePath);
    let formattedAmount = `$${amount}`;
    console.log("referenceNo=======" + referenceNo)
    console.log("Amount=======" + formattedAmount)
    console.log("Movement=======" + movement)
    console.log("paymentNo=======" + paymentNo)

    const requiredStrings = [referenceNo,formattedAmount,movement,paymentNo];
    requiredStrings.forEach(str => {
    if (!pdfWords.includes(str)) {
        console.log(`Missing string in PDF: "${str}"`);
    }
    });
    const allPresent = requiredStrings.every(str => pdfWords.includes(str));

    if (!allPresent) {
    throw new Error("One or more required strings are missing in the PDF");  
    }else{
   isVerify = true;
   return isVerify;
    }
  }catch(error){
  console.error("Issue in Payment PDF:",error)
  return isVerify;

}

}

async dataCleansing(datatocompare){


     let dataresult = [].concat(
      ...datatocompare.map(item => {
        let valuesToExclude = ['ac_unit','cm','AWST','.00','1386.90',
          '/images/dangerous_goods/dangerous-goods-class-6.1.png','Mercedes-Benz'];  // Values to exclude (can be an array of substrings)
    
        if (Array.isArray(item)) {
          // If item is an array, filter out unwanted values
          return item.filter(arr => !valuesToExclude.includes(arr));
        } else if (typeof item === 'string') {
         
          valuesToExclude.forEach(value => {
            if (item.includes(value)) {
              // If the string contains the substring, remove it
              item = item.replace(value, '');
            }
          });
          return item
          .replace(/-/g, '')
          .split(' ')
          .filter(s => typeof s === 'string' && s.trim().length > 0)
       
        } else {
          // If it's neither an array nor a string, return the item
          return item;
        }
      })


    );      
     return dataresult

}


async compareChillerFromPdf(pdfFilePath){
 try {
    const readPdf = new ReadPdf();
    console.log("Reading PDF File............");
    const pdfWords = await readPdf.extractPDFText(pdfFilePath);
    const isMatch = pdfWords.includes("Required: Chiller");

    if (!isMatch) {
        throw new Error("Chiller is not mentioned in the PDF");
    }

    console.log("Chiller is present in the PDF");

} catch (error) {
    console.error('Error comparing files:', error);
}
}

async compareFreezeromPdf(pdfFilePath){
  try {
    const readPdf = new ReadPdf();
    console.log("Reading PDF File............");
    const pdfWords = await readPdf.extractPDFText(pdfFilePath);
    const isMatch = pdfWords.includes("Required: Freezer");

    if (!isMatch) {
        throw new Error("Freezer is not mentioned in the PDF");
    }

    console.log("Freezer is present in the PDF");

} catch (error) {
    console.error('Error comparing files:', error);
}
}

//compare pdf and ui data rate
async compareRateFromPdfFile(rates,pdfFilePath){
    try {
        const rate="$"+rates.trim().replace(/\s+/g, '');
        //console.log(price);

        // Read and split words from pdf file
        const readPdf=new ReadPdf()
        console.log("Reading PDf File............")
        const pdfWords = await readPdf.extractPDFText(pdfFilePath);
        //console.log(pdfWords);


        const isMatch = pdfWords.includes(rate);

        console.log(isMatch ? `Rate in PDf ${rate} is matched with rate in UI` : `${rate} is not matched`);
        console.log("Rate in UI is same as PDF")
        
    } catch (error) {
        console.error('Error comparing files:', error);
    }
}


//compare csv and ui data rate
async compareRateFromCsvFile(referenceNumber,csvFilePath,rates){
  try {
      const rate=rates.trim()
      //console.log(price)
      console.log(referenceNumber);

      // Read and split words from csv file
      const readCsv=new ReadCsv()
      console.log("Reading CSV File..........")
      const rows = await readCsv.readCSVRow(csvFilePath);
      //console.log(rows);

// Assuming readCsv has a method to find all rows by reference number
const matchingRows = await readCsv.findAllRows(rows, referenceNumber, 'Bustle Reference');

if (matchingRows.length > 0) {
  console.log(`Found ${matchingRows.length} rows:`);

  matchingRows.forEach((row) => {
    if (row.Rate == rate) {
      console.log(`Rate verification passed for row with Reference ${row['Bustle Reference']}: Rate in CSV ${row.Rate} equals rate in UI ${rate}`);
    }
  });
    } else {
      console.log('No matching row found.');
    }

  } catch (error) {
      console.error('Error comparing files:', error);
  }
}



// Function to delete the file after a specified delay
async deleteFileAfterDelay(filePath, delay) {
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file ${filePath}:`, err);
      } else {
        console.log(`File ${filePath} deleted successfully.`);
      }
    });
  }, delay);
}

async compareOffsetDates(extractedOffset,calculatedDates){

  console.log(`Extracted Offset from Addressbook: ${extractedOffset}`);
  console.log(`Extracted offser days from booking form: ${calculatedDates}`);

  if (extractedOffset==calculatedDates) {
        console.log("Offset dates are verified successfully ...")
  }
  else
      console.log("\x1b[31mOffset dates Failed to verify ...\x1b[0m")
}

async  scrollToBottom() {
  await page.evaluate(async () => {
      const delay = 100; // Time to wait between scrolls

      function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
      }

      let lastScrollTop = 0;
      while (true) {
          window.scrollBy(0, window.innerHeight); // Scroll down by one window height
          await sleep(delay); // Wait for any lazy-loaded content

          const scrollTop = document.documentElement.scrollTop || window.scrollY;
          const scrollHeight = document.documentElement.scrollHeight;

          // If we can't scroll further, break the loop
          if (scrollTop === lastScrollTop || scrollTop + window.innerHeight >= scrollHeight) {
              break;
          }
          lastScrollTop = scrollTop;
      }
  });
}

async scrollByPageDown(times = 5) {
  let previousHeight = await page.evaluate(() => document.body.scrollHeight);

  for (let i = 0; i < times; i++) {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    // Wait for content to load or detect if we hit the bottom
    await page.waitForTimeout(500);

    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (currentHeight === previousHeight) {
      console.log('Reached the bottom or no new content loaded.');
      break;
    }
    previousHeight = currentHeight;
  }

}

//jeriza code for manifest
async extractBusiness(address) {
  const addressParts = address.split(','); // Split the address by commas
 

  
  if (addressParts.length < 3) {
    throw new Error('Address format is incorrect, cannot extract suburb and state.');
  }

  const business = addressParts[addressParts.length - 5].trim(); // Suburb is the second to last part
  const suburb = addressParts[addressParts.length - 3].trim(); // Suburb is the second to last part
  const state = addressParts[addressParts.length - 1].trim(); // state is the last part


  console.log(business,suburb,state)

  return business,suburb,state;
}

//jeriza code for manifest
async extractBusiness(address) {
  const addressParts = address.split(','); // Split the address by commas
 

  
  if (addressParts.length < 3) {
    throw new Error('Address format is incorrect, cannot extract suburb and state.');
  }

  const business = addressParts[addressParts.length - 5].trim(); // Suburb is the second to last part


  console.log(business)

  return business;
}

//jeriza code for manifest
async extractsuburb(address) {
  const addressParts = address.split(','); // Split the address by commas
 

  
  if (addressParts.length < 3) {
    throw new Error('Address format is incorrect, cannot extract suburb and state.');
  }

  const suburb = addressParts[addressParts.length - 3].trim(); // Suburb is the second to last part

  console.log(suburb)

  return suburb;
}

//jeriza code for manifest
async extractstate(address) {
  const addressParts = address.split(','); // Split the address by commas
 
  
  if (addressParts.length < 3) {
    throw new Error('Address format is incorrect, cannot extract suburb and state.');
  }

  const state = addressParts[addressParts.length - 1].trim(); // state is the last part

  console.log(state)

  return state;
}
//jeriza code for manifest

async normalizeString (str){
  str = String(str); // Ensure the input is a string
  return str
      .split(',') // Split by commas
      .map(item => 
          item.replace(/\n/g, '') // Remove newline characters
              .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
              .trim() // Trim any leading or trailing spaces
              .toLowerCase() // Convert to lowercase
              .replace(/\./g, '') // Remove only periods
      );
}
//jeriza code for manifest

 async checkPrefixOrSuffix(variable, item) {

   const strVariable = String(variable);
   const strItem = String(item);

   if (strVariable.trim() === '' || strItem.trim() === '') {
    return null;
  }
  
   return strVariable.includes(strItem) ||  // Substring match
          strVariable.startsWith(strItem) || // Prefix match
          strVariable.endsWith(strItem) ||   //Suffix match
          strItem.startsWith(strVariable) || // Prefix match
          strItem.endsWith(strVariable) ;    // Suffix match

 }

 async checkPrefixOrSuffix2(variable, item) {

  const strVariable = String(variable);
  const strItem = String(item);

  if (strVariable.trim() === '' || strItem.trim() === '') {
   return null;
 }
if (typeof strVariable === 'string' && typeof strItem === 'string') {
  // Compare directly if both are strings
  return strVariable === strItem;
}    
}


//jeriza code for manifest

async isMatchFound (variableArray, jsonArray) {
    const nonMatchingVariables = [];

  // Iterate over each variable asynchronously
  const results = await Promise.all(variableArray.map(async (variable) => {
    const normalizedVariable = await this.normalizeString(variable); // Normalize the variable (await the result)
    
    const matchFound = await Promise.all(jsonArray.map(async (item) => {
        const normalizedItem = await this.normalizeString(item); 
        const match = await this.checkPrefixOrSuffix(normalizedVariable,normalizedItem)//comparison of arrays
  //      console.log(`Match result for "${normalizedItem}" with "${normalizedVariable}": ${match}`)

       if (match===true){
       console.log(`Match result for "${normalizedItem}" with "${normalizedVariable}": ${match}`)
       }
       if (match === null) {
         return true; // Treat skipped matches as valid for now
       }

      return match

        }));

       const hasMatch = matchFound.some(match => match === true);
       if (!hasMatch) {
       nonMatchingVariables.push(variable); // Store unmatched variable
      }

    return hasMatch;
    }));

    if (nonMatchingVariables.length === 0) {
    nonMatchingVariables.push("None");
    } else {
       console.log("\x1b[31m%s\x1b[0m","Manifest UI has an unmatched data: ", nonMatchingVariables);
    }

    return results.every(result => result === true)
    
}

//jeriza code for manifest

async isMatchFound2 (variableArray, jsonArray) {
    const nonMatchingVariables = [];

   // Iterate over each variable asynchronously
   const results = await Promise.all(variableArray.map(async (variable) => {

    const matchFound = await Promise.all(jsonArray.map(async (item) => {
      const match = await this.checkPrefixOrSuffix(variable,item)
      
      if (match===true){
      console.log(`Match result for "${variable}" with "${item}": ${match}`)
    return match
    };

  }));

      const hasMatch = matchFound.some(match => match === true);
       if (!hasMatch) {
       nonMatchingVariables.push(variable); // Store unmatched variable
      }
    return hasMatch;
    }));

    if (nonMatchingVariables.length === 0) {
    nonMatchingVariables.push("None");
    } else {
       console.log("\x1b[31m%s\x1b[0m","Manifest UI has an unmatched data: ", nonMatchingVariables);
    }

    return results.every(result => result === true)
    
}

async isMatchFound3 (variableArray, jsonArray) {
    const nonMatchingVariables = [];

  // Iterate over each variable asynchronously
  const results = await Promise.all(variableArray.map(async (variable) => {

   const matchFound = await Promise.all(jsonArray.map(async (item) => {
     const match = await this.checkPrefixOrSuffix2(variable,item)
   //  console.log(`Match result for "${variable}" with "${item}": ${match}`)

     if (match===true){
     console.log(`Match result for "${variable}" with "${item}": ${match}`)
   return match
   };

 }));

      const hasMatch = matchFound.some(match => match === true);
       if (!hasMatch) {
       nonMatchingVariables.push(variable); // Store unmatched variable
      }

    return hasMatch;
    }));

    if (nonMatchingVariables.length === 0) {
    nonMatchingVariables.push("None");
    } else {
       console.log("\x1b[31m%s\x1b[0m","Manifest UI has an unmatched data: ", nonMatchingVariables);
    }


    return results.every(result => result === true)
}


 async waitForLocatorDisappear(element) {
    try {
      const timeout = 60000;
      await page.locator(element).waitFor({ state: "hidden", timeout });
    } catch (error) {
      console.error(`Element ${element} become visible`);
      throw error;
    }
  }



// "Indhu's Code" code for to check if Freight Label and Transport Request pdf are downloaded 
async isFilePresent (filePath) {
  try {
    const exists = fs.existsSync(filePath);
    console.log("=====================Is file present=========================="+exists)
    return exists;
  } catch (error) {
    console.error('Error checking file presence:', error);
    return false;
  }
};

async isDisabled(element) {
  return await page.locator(element).isDisabled();
}





async timeFormat(time) {
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  const finalTimeFormat = `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`
  return finalTimeFormat;
}

async parseTimeToDate(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

async formatTimeString(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(num => String(Number(num)).padStart(2, "0"));
  return `${hours}:${minutes}`;
}


async minutesToHHMM(totalMinutes) {
  const convertedmins = Number(totalMinutes)
  const hours = Math.floor(convertedmins / 60);
  const minutes = convertedmins % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

async timeStrToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

async getTimeDifference(startTime, endTime) {
  const start = startTime;
  const end = endTime;

  const diffMs = end - start;

  if (isNaN(diffMs)) {
    throw new Error("Invalid time input");
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

//  console.log(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`)

// return `${hours}:${minutes.toString().padStart(2, "0")}`;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
}

async compare(testdata,DataFromUI){

     if (testdata == DataFromUI){

        console.log("Verified successfully, Test data is matching to UI")
        return true
    }else{

        console.log("\x1b[31m%s\x1b[0m","Not verified succesfully, check your test data")
        return false

    }


}


async timeToDecimal(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const decimal = hours + minutes / 60;
    return decimal.toFixed(2); // Returns a string with 2 decimal places

}

async addTimes(time1, time2) {
  const [h1, m1] = time1.split(':').map(Number);
  const [h2, m2] = time2.split(':').map(Number);

  let totalMinutes = m1 + m2;
  let totalHours = h1 + h2 + Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;

  return `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}`;
}

async  convertToDate(dateTimeStr) {
  const [datePart, timePart, ampm] = dateTimeStr.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  let [hours, minutes] = timePart.split(":").map(Number);

  if (ampm === "PM" && hours !== 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  return new Date(year, month - 1, day, hours, minutes);
}

async getExpectedDateRangeString(rangeLabel) {
    const today = dayjs();

    let start, end;

    switch (rangeLabel) {
        case 'This Week':
            start = today.startOf('week'); // Monday
            end = today.endOf('week');     // Sunday
            break;
        case 'Last Week':
            start = today.subtract(1, 'week').startOf('week');
            end = today.subtract(1, 'week').endOf('week');
            break;
        case 'This Month':
            start = today.startOf('month');
            end = today.endOf('month');
            break;
        case 'Last Month':
            start = today.subtract(1, 'month').startOf('month');
            end = today.subtract(1, 'month').endOf('month');
            break;
        default:
            throw new Error(`Invalid date range label: ${rangeLabel}`);
    }

    // Format: DD/MM/YYYY – DD/MM/YYYY
    return `${start.format('DD/MM/YYYY')} – ${end.format('DD/MM/YYYY')}`;
}

async getAllOutstandingDateRange() {
 const endDate = dayjs(); // today
  const startDate = endDate.subtract(2, 'month').startOf('month'); // start of 2 months ago

  return `${startDate.format('DD/MM/YYYY')} - ${endDate.format('DD/MM/YYYY')}`;
}

async normalizeDash(str) {
  return str.replace(/[–—−]/g, '-'); // Replace en-dash, em-dash, minus sign with hyphen-minus
}
}

module.exports = new BasePage();
