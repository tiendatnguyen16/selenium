const { Builder, By, until } = require('selenium-webdriver');

(async function example() {
    // A new instance of the WebDriver is created for the Chrome browser.
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the web page
        // The driver.get method is used to navigate to the desired web page.
        await driver.get('https://learning.postman.com/docs/tests-and-scripts/write-scripts/intro-to-scripts/');

        // Find the first <h1> element and get its text
        let h1Element = await driver.findElement(By.css('h1'));
        let h1Text = await h1Element.getText();

        // Wait for the page to load completely
        // Wait for the page to load: The driver.wait method is used to wait until at least one anchor element with the class anchor is located on the page.
        await driver.wait(until.elementLocated(By.css('a.anchor')), 10000);

        // Execute JavaScript to get the text of all anchor elements that are children of a specific path
        let anchorTexts = await driver.executeScript(function() {
            let path = '/docs/tests-and-scripts/write-scripts/intro-to-scripts/'; // Specify the path here
            let anchors = Array.from(document.querySelectorAll(`a.anchor[href^="${path}"]`));
            return anchors.map(anchor => anchor.textContent);
        });

        // Print all the anchor texts
        console.log("H1 and all anchors' text:");
        console.log(`"${h1Text}"`);
        anchorTexts.forEach(text => {
            console.log(`"${text}"`);
        });

        
    } finally {
        // Close the browser
        await driver.quit();
    }
})();


