const { exec } = require('child_process');
const fs = require('fs');
const pdf = require('pdf-parse');


function splitMobileData(raw) {
  return raw
    .replace(/kg/gi, '')               // Remove 'kg' (case insensitive)
    .match(/MOBILE|\d+\.\d+|\d+/g) || [];  // Match 'MOBILE' or numbers (with decimals or integers)
}


class ReadPdf {
    async extractPDFText(pdfPath){
        try {
        console.log("Reading PDF:", pdfPath);
        const buffer = fs.readFileSync(pdfPath);
        const data = await pdf(buffer);
        return data.text;
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        throw error 
         }

    }
    async normalizeText(text){
        return text.replace(/\s+/g, ' ').trim();
      }
      

async extractRelevantDataFromPDF(pdfText) {
  const cleanText = pdfText.replace(/\r/g, ''); // Normalize
  const lines = cleanText.split('\n');
  const joinedText = lines.join('\n');

  // Debug output to check what we’re matching
  //console.log("======= SAMPLE TEXT =========");
  //console.log(joinedText.slice(joinedText.indexOf("Item(s)"), joinedText.indexOf("Fuel Levy") + 100));
  //console.log("======= END =========");
 const regex = /\d+\s+Item\(s\),[\s\S]*?Source:[^\n]*\n[^\n]*Destination:[^\n]*\n?[^\d\n]*\d{4},?\s?[A-Z]{2,3}/;

  const match = joinedText.match(regex)?.[0];
  console.log("MATCHED BLOCK:");
  console.log(match);
  return match ? match : 'No matching data found.';
}




        
      async extractRelevantDataFromPDFManifest(pdfText) {

          // Split the text into rows (assuming rows are separated by newlines)
          const rows = pdfText.split('\n');

          // Initialize an array to store the rows and columns
          const tableData = [];

          // Process each row, starting from the 6th row (index 6)
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i].trim();
          
            // Ignore empty rows or separator rows (like '---------------------')
            if (row === '' || row.includes('----------------------')) {
              continue;
            }
          
            // Split the row into columns (based on '|' delimiter) and clean up whitespace
            const  columns = row
              .split('|')
              .filter(cell => cell.length > 0)
              .flat(); // Flatten the array one level

         //     console.log(columns)

          
              let finalData = [].concat(
                ...columns.map(item => {
                  let valuesToExclude = ['Phone:','Items','Total','Cubic','Bustle','CUSTOMER:'
                    ,'415505013','Weight','No.','Sender','Receiver','Asset',
                    'Type','Job','Item','PAGE','MANIFEST','OF','REFERENCE:',
                    'L:','W:','H:','Due','Cubic','Count','Date','Weight',
                    'Label','reference','125852485','PM002','Welshpool','Road',
                    'Dimensions','Service','kg','cm','.00KG'

                  ];  // Values to exclude (can be an array of substrings)
              
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
                          .replace(/[(),-]/g, '')
                          .trim()              
                          .split(' ')
                          .map(s => s.trim())
                          .flatMap(s => {
                              if (/MOBILE/i.test(s)) {
                                return splitMobileData(s);
                              }
                              return [s];
                            })                    
                          .filter(s => typeof s === 'string' && s.trim().length > 0)
                                          
                        } else {
                          // If it's neither an array nor a string, return the item
                          return item;
                        }
                        
                  }))
  
                tableData.push(...finalData);
  
        }
                  return tableData;
  
      }




  async extractInfoInPOD(pdfWords) {
    try {
        const lines = pdfWords.split(/\r?\n/).map(line => line.trim()).filter(Boolean);

        // 1. Extract 9-digit number
        const idLine = lines.find(line => /^\d{9}$/.test(line));
        if (!idLine) {
            console.log("❌ No 9-digit ID found.");
            return [];
        }

        const statuses = ["Booked", "Scheduled", "In Transit", "Arrived", "Delivered", "Completed"];
        const extractedStatuses = [];

        // 2. Loop through lines and find each status
        for (const status of statuses) {
            const match = lines.find(line => line.toLowerCase().startsWith(status.toLowerCase()));
            if (match) {
                extractedStatuses.push(status);
            } else {
                console.log(`❌ Missing status: ${status}`);
                return [];  // Required status not found
            }
        }

        const result = [idLine, ...extractedStatuses];
        console.log("✅ Extracted from PDF:", result);
        return result;
    } catch (err) {
        console.error("❌ Error extracting info:", err);
        return [];
    }
}

  
  async  compareWithJSON(pdfDataExtracted, parsedOverviewData) {


    function areArraysEqual(arr1, arr2) {
      // Check if lengths are equal
      if (arr1.length !== arr2.length) {
          return false;
      }
      
      // Check each element for equality
      for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
              return false; // Return false as soon as a mismatch is found
          }
      }
      
      return true; // Arrays are identical
  }

    const matchFound = areArraysEqual(pdfDataExtracted, parsedOverviewData);
    console.log("Data from Job: " + parsedOverviewData)
    console.log("Data from PDF: " + pdfDataExtracted)

    if (matchFound === true){
      console.log("✅ Match found:", matchFound);
    } else
    console.log("❌ Match Not found");

return matchFound

}


}




module.exports = ReadPdf;

  
