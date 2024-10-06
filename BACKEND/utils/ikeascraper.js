const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeIkeaProducts(url) {
  try {
    console.log(`Attempting to scrape: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
      }
    });
    
    console.log('Response received. Status:', response.status);
    
    const $ = cheerio.load(response.data);
    const products = [];

    console.log('Parsing HTML...');
    
    // Try multiple possible selectors
    const productSelectors = [
      '.product-compact', // Common IKEA product class
      '[data-ref-id="product"]', // Alternative product identifier
      '.product-fragment', // Another possible product wrapper
      'div[class*="product"]' // Any div with 'product' in its class
    ];
    
    for (const selector of productSelectors) {
      $(selector).each((index, element) => {
        const $element = $(element);
        
        // Try multiple possible selectors for each product attribute
        const name = $element.find([
          '.product-compact__name',
          '.product__title',
          'h2',
          '[data-testid="product-title"]'
        ].join(', ')).first().text().trim();
        
        const price = $element.find([
          '.product-compact__price',
          '.product__price',
          '[data-testid="price"]',
          'span[class*="price"]'
        ].join(', ')).first().text().trim();
        
        const imageUrl = $element.find('img').first().attr('src') || 
                         $element.find('img').first().attr('data-src');
        
        const productUrl = $element.find('a').first().attr('href');

        if (name || price || imageUrl || productUrl) {
          products.push({
            name: name || 'Name not found',
            price: price || 'Price not found',
            imageUrl: imageUrl || '',
            productUrl: productUrl ? (productUrl.startsWith('http') ? productUrl : `https://www.ikea.com${productUrl}`) : '',
          });
        }
      });
      
      if (products.length > 0) break; // If we found products, no need to try other selectors
    }

    console.log(`Found ${products.length} products`);
    
    if (products.length === 0) {
      console.log('No products found. Attempting to identify page structure...');
      // Log some diagnostic information
      console.log('Page title:', $('title').text());
      console.log('Main content area classes:', $('#main-content').attr('class'));
      // Log all div elements with 'product' in their class names
      $('div[class*="product"]').each((i, el) => {
        console.log(`Potential product element ${i + 1}:`, $(el).attr('class'));
      });
    }

    return products;
  } catch (error) {
    console.error('Error scraping IKEA products:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', JSON.stringify(error.response.headers, null, 2));
    }
    throw error;
  }
}

module.exports = { scrapeIkeaProducts };