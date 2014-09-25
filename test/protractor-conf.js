exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  multiCapabilities: [
    {
      'browserName': 'chrome'
    },
    {
      'browserName': 'firefox'
    },
    {
      'browserName': 'ie'
    }
  ]

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
