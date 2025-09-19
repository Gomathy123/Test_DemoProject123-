const fetch = require('node-fetch');

class XrayUtil {
  constructor(clientId, clientSecret, projectKey) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.projectKey = projectKey;
    this.baseUrl = 'https://xray.cloud.xpand-it.com/api/v2';
  }

  async getAuthToken(baseUrl) {
    const response = await fetch(baseUrl +"/authenticate", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: this.clientId, client_secret: this.clientSecret })
    });
    const token = await response.text();
    this.authToken = token;
    return token;
  }

  async createTestExecution(summary) {
    const response = await fetch(`${this.baseUrl}/testexecutions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      },
      body: JSON.stringify({
        fields: {
          project: { key: this.projectKey },
          summary: summary,
          issuetype: { name: "Test Execution" }
        }
      })
    });
    const data = await response.json();
    return data.key;
  }

  async updateTestResult(testExecutionKey, testCaseKey, status) {
    await fetch(`${this.baseUrl}/import/execution/${testExecutionKey}/test/${testCaseKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      },
      body: JSON.stringify({
        testExecutionKey: testExecutionKey,
        info: {
          summary: "Automated Test Execution"
        },
        tests: [
          {
            testKey: testCaseKey,
            status: status
          }
        ]
      })
    });
  }
}

module.exports = XrayUtil;
