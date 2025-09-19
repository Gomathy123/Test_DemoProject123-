const csv = require('csv-parser');
const fs = require('fs');

class ReadCsv{

    // async extractCsvData(filePath){
    // try {
    //         let contentArray = [];
    
    //         await new Promise((resolve, reject) => {
                
    //             fs.createReadStream(filePath)
    //                 .pipe(csv())
    //                 .on('data', (row) => {
    //                     // Convert each row to a string and split by , : \n and whitespace
    //                     const values = Object.values(row).map(value => {
    //                         // Remove double quotes and trim spaces
    //                         return value.replace(/"/g, '').trim();
    //                     });
    //                     contentArray.push(...values);
    //                 })
    //                 .on('end', () => {
    //                     resolve(contentArray);
    //                 })
    //                 .on('error', (err) => {
    //                     reject(err);
    //                 });
    //         });
    
    //         return contentArray;
    //     } catch (error) {
    //         console.error('Error reading CSV:', error);
    //         throw error;
    //     }
    // }



// async readCSVRow(filePath) {
//     let results = [];
//     return new Promise((resolve, reject) => {
//         fs.createReadStream(filePath)
//             .pipe(csv())
//             .on('data', (data) => results.push(data))
//             .on('end', () => resolve(results))
//             .on('error', (error) => reject(error));
//     });
// }

async readCSVRow(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows))
      .on('error', (error) => reject(error));
  });
}

  // async findFirstRow(results, value, columnName){
  //   return results.find(row => row[columnName] == value) || null;
  // };
  
    async findAllRows(rows, referenceNumber, columnName) {
      // Filter rows to find all matches for the given referenceNumber
      return rows.filter(row => row[columnName] === referenceNumber);
    }
  
 

}

module.exports= ReadCsv;
