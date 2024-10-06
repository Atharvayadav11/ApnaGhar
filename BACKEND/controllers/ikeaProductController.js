const IkeaProduct = require('../models/ikeaproducts');
const { scrapeIkeaProducts } = require('../utils/ikeascraper');

exports.scrapeAndSaveProducts = async (req, res) => {
  try {
    const url = 'https://www.ikea.com/in/en/cat/beds-bm003/';
    console.log('Starting scraping process...');
    
    const scrapedProducts = await scrapeIkeaProducts(url);
    console.log(`Scraped ${scrapedProducts.length} products`);

    if (scrapedProducts.length === 0) {
      return res.status(404).json({ 
        message: 'No products found', 
        suggestion: 'You may need to update the scraper selectors or check if the website structure has changed.'
      });
    }

    let savedCount = 0;
    const errors = [];

    for (const product of scrapedProducts) {
      try {
        const result = await IkeaProduct.findOneAndUpdate(
          { productUrl: product.productUrl },
          product,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        if (result) savedCount++;
      } catch (err) {
        errors.push({ product: product.name, error: err.message });
        console.error(`Error saving product: ${product.name}`, err);
      }
    }

    console.log(`Saved ${savedCount} products`);
    res.status(200).json({ 
      message: 'Scraping process completed',
      productsScraped: scrapedProducts.length,
      productsSaved: savedCount,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('Error in scrapeAndSaveProducts:', error);
    res.status(500).json({ 
      message: 'Error scraping and saving products', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await IkeaProduct.find().sort({ createdAt: -1 });
    res.status(200).json({
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};