// cypress/plugins/index.js

// multiple tasks are being used
const cyExtendsTask = require('@bahmutov/cypress-extends');
const cyCodeCoverageTask = require('@cypress/code-coverage/task');

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits. `config` is the resolved Cypress config

  // there may be multiple events that increase complexity. We have to return from each. What do we do with multiple returns?

  on('before:browser:launch', (browser = {}, launchOptions) => {
    // some complex before:browser:launch configuration. There can be multiples of this, but at the end launchOptions need to be returned.
    return launchOptions;
  });

  // let's say we have multiple tasks are being used. This is a pattern to combine the tasks into an object and return them collectively
  const allTasks = Object.assign({},
    cyCodeCoverageTask(on, config),
    cyExtendsTask(config.configFile)
  );

  return allTasks;
}
