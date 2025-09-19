 const { setWorldConstructor, World } = require('@cucumber/cucumber');

class CustomWorld extends World {
    constructor(options) {
        super(options); // Call parent constructor to retain Cucumber properties like `attach`
        this.env = process.env.ENV || 'stage'; // Default to 'stage' if ENV is not set
        this.environment=this.env.trim()
    }
}

setWorldConstructor(CustomWorld);
// class CustomWorld extends World {
//     async initialize() {
//         this.environment = process.env.ENV || 'stage';
//         this.urls = {
//             "stage": "https://staging-meteor-server-mw6eoasgka-ts.a.run.app/",
//             "prod": "https://app.bustle.tech/",
//             "beta": "https://beta.bustle.tech/"
//         };
//         this.url = this.urls[this.environment];
//     }
// }
// await setWorldConstructor.initialize();

