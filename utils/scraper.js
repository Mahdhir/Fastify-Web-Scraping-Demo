const puppeteer = require('puppeteer');

const pageUrl = 'https://webscraper.io/test-sites/e-commerce/allinone';
const sideBarComputerSelector = '#side-menu > li:nth-child(2)';
const sideBarComputerLaptopSelector = '#side-menu > li.active > ul > li:nth-child(1)';
const productTitlesSelector = 'body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div > div.thumbnail > div.caption';

const scrapeSite = async (productName) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768
    });
    await page.goto(pageUrl);
    await page.waitForSelector(sideBarComputerSelector);
    await page.click(sideBarComputerSelector);
    await page.waitForSelector(sideBarComputerLaptopSelector);
    await page.click(sideBarComputerLaptopSelector);
    await page.waitForSelector(productTitlesSelector);
    const products = await page.evaluate(productTitlesSelector => {
        const productCaptions = Array.from(document.querySelectorAll(productTitlesSelector));
        return productCaptions.map(caption => {
            const price = caption.children[0].textContent;
            const title = caption.children[1].children[0].title;
            return {
                title,
                price
            };
        });
    }, productTitlesSelector);
    await browser.close();
    return products.filter(product => product.title.toLowerCase().includes(productName.toLowerCase()));
}

module.exports = { scrapeSite };

