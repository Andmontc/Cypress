const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'xx1xzr',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      this.watchForFileChanges = false
      this.experimentalRunAllSpecs = true
    },
  },
});
