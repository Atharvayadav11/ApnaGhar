const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeIkeaProducts(url) {
  let browser = null;
  try {
    console.log(`Launching browser...`);
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Enable request interception to speed up loading
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
        request.abort();
      } else {
        request.continue();
      }
    });

    console.log(`Navigating to ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    console.log('Waiting for 5 seconds...');
    await delay(5000);

    const productSelector = '.product-compact, .product-fragment, [data-ref-id="product"]';
    try {
      await page.waitForSelector(productSelector, { timeout: 20000 });
    } catch (error) {
      console.log('Product selector not found, trying alternative approach...');
    }

    const products = await page.evaluate((productSelector) => {
      const productElements = document.querySelectorAll(productSelector);
      if (productElements.length === 0) {
        console.log('No product elements found');
        return [];
      }

      return Array.from(productElements).map(element => {
        const name = element.querySelector('.product-compact__name')?.textContent || 'No Name';
        const price = element.querySelector('.product-compact__price__value')?.textContent || 'No Price';
        const productUrl = element.querySelector('a')?.href || '';
        const imageUrl = element.querySelector('img')?.src || '';

        return { name, price, productUrl, imageUrl };
      });
    }, productSelector);

    console.log(`Found ${products.length} products`);
    return products;

  } catch (error) {
    console.error('Error scraping IKEA products:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = { scrapeIkeaProducts };
