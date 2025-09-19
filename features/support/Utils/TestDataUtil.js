const fs = require('fs');
const filePath = `features/support/Testdata/TestData.json`

class TestDataUtil {
    constructor() {
    }

    readTestData() {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
            
        } catch (error) {
            console.error('Error reading test data:', error);
            return null;
        }
    }

    writeTestData(testData) {
        try {
            const jsonData = JSON.stringify(testData, null, 2);
            fs.writeFileSync(filePath, jsonData);
            console.log('Test data has been successfully written to', filePath);
        } catch (error) {
            console.error('Error writing test data:', error);
        }
    }

    getValueByKey(key) {
        const testData = this.readTestData();
        if (testData && key in testData) {
            return testData[key];
        } else {
            console.error(`Key '${key}' not found in test data.`);
            return null;
        }
    }
    
     getNumber(key) {
        const testData = this.readTestData();
        // Access the 'Number' array
        const numberArray = testData[key]?.Number;
        // Return the first element of the array if it exists
        return numberArray && numberArray.length > 0 ? numberArray[0] : null;
      };


    
    getValueByNestedKey(objectKey, nestedKey) {
        
        const testData = this.readTestData();
        if (testData && objectKey in testData && nestedKey in testData[objectKey]) {
            return testData[objectKey][nestedKey];
        } else {
            console.error(`Key '${objectKey}' or nested key '${nestedKey}' not found in test data.`);
            return null;
        }
    }


    getNestedValue(path) {
        const testData = this.readTestData();
        const keys = path.split('.');
        let current = testData;

        for (let key of keys) {
            if (current && key in current) {
                current = current[key];
            } else {
                console.error(`Path '${path}' not found in test data.`);
                return null;
            }
        }
        return current;
    }


    addKeyValue(key, value) {
        const testData = this.readTestData();
        testData[key] = value;
        this.writeTestData(testData);
    }

    addKeyValueToObject(objectKey, key, value) {
        const testData = this.readTestData();
        if (!testData || !testData[objectKey]) {
            console.error(`Object '${objectKey}' not found in test data.`);
            return;
        }

        const keys = key.split('.');
        let current = testData[objectKey];

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in current)) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = value;
        this.writeTestData(testData);
    }

     getValueByIndex(object, key, index) {
        
        if (object && key !== undefined && key !== null) {
            // Split the key into parts (assuming dot notation for nested keys)
            const keys = key.split('.');
            
            // Iterate through the keys to navigate the nested structure
            let value = object;
            for (let k of keys) {
                if (value[k] !== undefined) {
                    value = value[k];
                } else {
                    return null; // Return null if key path is not valid
                }
            }
            
            // If value is an array and index is provided, return the value at the specified index
            if (Array.isArray(value) && index !== undefined && index !== null) {
                return value[index];
            }
            
            return value; // Return the final value
        }
        
        return null; // Return null if object or key is not provided
    }

}

module.exports = TestDataUtil;
