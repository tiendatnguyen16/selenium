const { Builder, By, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the web page
        // The driver.get method is used to navigate to the desired web page.
        await driver.get('https://learning.postman.com/docs/tests-and-scripts/tests-and-scripts/#test-apis-at-every-stage-of-development');

        // Wait for the page to load completely
        // Wait for the page to load: The driver.wait method is used to wait until at least one anchor element with the class anchor is located on the page.
        await driver.wait(until.elementLocated(By.css('a.anchor')), 10000);

        // Execute JavaScript to get the text of all anchor elements that are children of a specific path
        let anchorTexts = await driver.executeScript(function() {
            let path = '/docs/tests-and-scripts/tests-and-scripts/'; // Specify the path here
            let anchors = Array.from(document.querySelectorAll(`a.anchor[href^="${path}"]`));
            return anchors.map(anchor => anchor.textContent);
        });

        // Print all the anchor texts
        console.log(anchorTexts);
    } finally {
        // Close the browser
        await driver.quit();
    }
})();


