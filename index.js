const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            args: ["--no-sandbox"],
            // headless - abrir o cerrar el navegador
            headless: true,
            ignoreHTTPSErrors: true
          });
        const page = await browser.newPage();

        // disable default timeout
        await page.setDefaultNavigationTimeout(0);

        await page.goto('https://www.amazon.es/')

        await page.waitForSelector('[id=sp-cc-accept]')
        await page.click('#sp-cc-accept')
        
        await page.screenshot({ path: './download/puppeteer1.jpg' })  

        await page.waitForSelector('[id=twotabsearchtextbox]')
        await page.type('#twotabsearchtextbox', 'core i7')
        await page.screenshot({ path: './download/puppeteer2.jpg' })        
        
        await page.click('#nav-search-submit-button')
        await page.waitForSelector('[data-component-type=s-search-result]')
        await page.screenshot({ path: './download/puppeteer3.jpg' })

        const linksArray = await page.evaluate(() => {
            const elements = document.querySelectorAll('[data-component-type=s-search-result] h2 a')
            const links = []
            elements.forEach(element => {
                links.push(element.href)
            });
            return links;
        })
        console.log(linksArray);
        const ranks = []
        for (const link of linksArray) {
            await page.goto(link)
            await page.waitForSelector('#productTitle')
            const rank = await page.evaluate(() => {
                const element = document.querySelector('#productTitle')
                return element.textContent;
            })
            ranks.push({rank})
        }
        console.log(ranks);

        await browser.close()
    } catch (error) {
        console.error(error);
    }

})();

