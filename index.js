const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            args: ["--no-sandbox"],
            headless: true,
            ignoreHTTPSErrors: true
          });
        const page = await browser.newPage();

        // disable default timeout
        await page.setDefaultNavigationTimeout(0);

        await page.goto('https://pptr.dev/')
        await page.screenshot({ path: './download/puppeteer1.jpg' })

        await browser.close()
    } catch (error) {
        console.error(error);
    }

})();

