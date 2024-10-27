const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function scrapeIkea(category) {
    console.log(`Starting scraping for category: ${category}`);
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--window-size=1920,1080');

    let driver;

    try {
        console.log('Initializing Chrome WebDriver...');
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
            
        // const url = `https://www.ikea.com/in/en/cat/${category}-fu002/`;
        const url = `https://www.ikea.com/in/en/search/?q=${category}`;
        console.log(`Navigating to URL: ${url}`);
        await driver.get(url);

        // Wait for either the product list or error message
        try {
            await driver.wait(async () => {
                const elements = await Promise.all([
                    driver.findElements(By.className('plp-product-list__products')),
                    driver.findElements(By.className('error-page'))
                ]);
                return elements[0].length > 0 || elements[1].length > 0;
            }, 30000);
        } catch (error) {
            console.error('Timeout while waiting for page to load. Current URL:', await driver.getCurrentUrl());
            throw new Error('Page load timeout');
        }

        // Check if we're on an error page
        const errorPages = await driver.findElements(By.className('error-page'));
        if (errorPages.length > 0) {
            throw new Error('IKEA error page encountered');
        }

        console.log('Page loaded successfully, starting scroll operation');
        
        // Scroll with progress logging
        let lastHeight = await driver.executeScript('return document.body.scrollHeight');
        let scrollAttempts = 0;
        const maxScrollAttempts = 10;

        while (scrollAttempts < maxScrollAttempts) {
            await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
            await driver.sleep(2000);
            
            let newHeight = await driver.executeScript('return document.body.scrollHeight');
            console.log(`Scroll attempt ${scrollAttempts + 1}/${maxScrollAttempts}: Height ${newHeight}`);
            
            if (newHeight === lastHeight) {
                console.log('Reached bottom of page');
                break;
            }
            lastHeight = newHeight;
            scrollAttempts++;
        }

        return driver;
    } catch (error) {
        console.error('Error in scrapeIkea function:', error.message);
        if (error.stack) console.error('Stack trace:', error.stack);
        
        if (driver) {
            try {
                const url = await driver.getCurrentUrl();
                console.log('Failed URL:', url);
                const pageSource = await driver.getPageSource();
                console.log('Page source excerpt:', pageSource.substring(0, 500));
            } catch (screenshotError) {
                console.error('Error capturing debug info:', screenshotError.message);
            }
            await driver.quit();
        }
        return null;
    }
}

async function extractProducts(driver) {
    const products = [];
    try {
        console.log('Starting product extraction...');
        
        // Wait for products to be visible
        await driver.wait(until.elementsLocated(By.className('plp-fragment-wrapper')), 10000);
        
        const productElements = await driver.findElements(By.className('plp-fragment-wrapper'));
        console.log(`Found ${productElements.length} product elements`);

        for (let i = 0; i < productElements.length; i++) {
            try {
                const element = productElements[i];
                
                // Enhanced error handling for each field
                let name, price, productLink, imageUrl;
                
                try {
                    name = await element.findElement(By.className('plp-price-module__product-name')).getText();
                } catch (e) {
                    console.log(`Could not extract name for product ${i + 1}:`, e.message);
                    name = 'Name not available';
                }

                try {
                    price = await element.findElement(By.className('plp-price__integer')).getText();
                } catch (e) {
                    console.log(`Could not extract price for product ${i + 1}:`, e.message);
                    price = 'Price not available';
                }

                try {
                    const linkElement = await element.findElement(By.css('a.plp-product__image-link'));
                    productLink = await linkElement.getAttribute('href');
                } catch (e) {
                    console.log(`Could not extract link for product ${i + 1}:`, e.message);
                    productLink = 'Link not available';
                }

                try {
                    const imgElement = await element.findElement(By.css('img.plp-product__image'));
                    imageUrl = await imgElement.getAttribute('src');
                } catch (e) {
                    console.log(`Could not extract image URL for product ${i + 1}:`, e.message);
                    imageUrl = 'Image not available';
                }

                products.push({ name, price, src: imageUrl, link: productLink });
                console.log(`Successfully extracted product ${i + 1}/${productElements.length}`);
            } catch (error) {
                console.error(`Error processing product ${i + 1}:`, error.message);
            }
        }
    } catch (error) {
        console.error('Error in extractProducts function:', error.message);
        if (error.stack) console.error('Stack trace:', error.stack);
    }
    
    console.log(`Total products extracted: ${products.length}`);
    return products;
}

async function scrapeIkeaCategory(category) {
    console.log(`Starting scraping process for category: ${category}`);
    const driver = await scrapeIkea(category);
    
    if (driver) {
        try {
            const products = await extractProducts(driver);
            return products;
        } catch (error) {
            console.error('Error in main scraping process:', error.message);
            return [];
        } finally {
            await driver.quit();
            console.log('WebDriver closed');
        }
    }
    return [];
}

// Example usage
// (async function() {
//     try {
//         console.log('Starting IKEA scraper...');
//         const chairs = await scrapeIkeaCategory('chairs');
//         if (chairs.length > 0) {
//             console.log(`Successfully scraped ${chairs.length} products:`);
//             console.log(JSON.stringify(chairs, null, 2));
//         } else {
//             console.log('No products found or an error occurred');
//         }
//     } catch (error) {
//         console.error('Fatal error in main execution:', error);
//     }
// })();

module.exports = scrapeIkeaCategory;