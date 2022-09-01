const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            args: ["--no-sandbox"],
            headless: true,
            timeout: 0,
            ignoreHTTPSErrors: true
          });
        const page = await browser.newPage();

        await page.goto('https://www.amazon.es/')
        await page.screenshot({ path: 'amazon1.jpg' })

        await browser.close()
    } catch (error) {
        console.error(error);
    }

})();

