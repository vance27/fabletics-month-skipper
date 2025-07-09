const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            on('before:browser:launch', (browser, launchOptions) => {
                if (browser.name === 'chrome') {
                    launchOptions.args.push(
                        '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    );
                    launchOptions.args.push(
                        '--disable-blink-features=AutomationControlled'
                    );
                    launchOptions.args.push('--disable-web-security');
                }
            });
        },
    },
});
