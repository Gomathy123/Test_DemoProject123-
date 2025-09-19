const axios = require('axios');
class KageMetric{
async updateReport(scenarioName, execStatus) {
    const Log = {
        Error: function(message) {
            console.error(message);
        },
        Message: function(message) {
            console.log(message);
        }
    };
     Log.Message("Send Req method : POST Action Started...");
     var url = "https://kage-metrics.com/publish_report";
     // System Name(Module Name/Suite Name)
     var jsonData = {
     system: "bustle-qa",
     env: "QA",
    //Project ID
     project_id: "6d6a68fa-7ffb-48ab-a3ad-eee57111eaf6",
     name: scenarioName,
     status: execStatus,
     scenario_id: "0000",
     scenario_type: "SCENARIO",
     config: "NULL"
     };
     
     var params = {
     headers: {
     "Content-Type": "application/json"
     },
     body: JSON.stringify(jsonData)
    };
    
    //  // Create the HTTP request object
    //  var http = Sys.OleObject("MSXML2.ServerXMLHTTP");
    //  http.open("POST", url, false);
    //  http.setRequestHeader("Content-Type", "application/json");
    
    //  // Send the JSON data as the request body
    //  http.send(JSON.stringify(jsonData));
    
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
    
     // Check the status and handle the response
     if (response.status === 201) {
    Log.Message("Report sent successfully");
    Log.Message("Response: " + response.responseText);
    
    } else {
     Log.Error("Failed to send report. Status code: " + response.status);
     Log.Error("Response: " + response.responseText);
    }
    }
}
module.exports=KageMetric;