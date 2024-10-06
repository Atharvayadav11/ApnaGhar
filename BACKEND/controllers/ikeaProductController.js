const IkeaProduct = require('../models/ikeaproducts');
const { scrapeIkeaProducts } = require('../utils/ikeascraper');

exports.scrapeAndSaveProducts = async (req, res) => {
  try {
    const url = 'https://www.ikea.com/in/en/cat/beds-bm003/';
    console.log('Starting scraping process...');

    let retries = 3;
    let scrapedProducts = [];

    while (retries > 0 && scrapedProducts.length === 0) {
      try {
        // Call the scraper function to scrape IKEA products
        scrapedProducts = await scrapeIkeaProducts(url);
        console.log(`Scraped ${scrapedProducts.length} products`);
      } catch (error) {
        console.error(`Scraping attempt failed. ${retries - 1} retries remaining.`);
        retries--;
        if (retries === 0) throw error;
        // Wait for 5 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    // If no products were scraped, return a 404 response
    if (scrapedProducts.length === 0) {
      return res.status(404).json({
        message: 'No products found',
        suggestion: 'The website might be blocking our requests, or the structure may have changed.',
      });
    }

    let savedCount = 0;
    const errors = [];

    // Iterate through each product and upsert (save or update) in the database
    for (const product of scrapedProducts) {
      try {
        if (product.productUrl) {
          // Save the product if it has a valid productUrl
          const result = await IkeaProduct.findOneAndUpdate(
            { productUrl: product.productUrl },
            {
              $set: {
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                lastUpdated: new Date(),
              },
            },
            { upsert: true, new: true }
          );
          if (result) savedCount++;
        }
      } catch (err) {
        // Push any errors during saving
        errors.push({ productUrl: product.productUrl, error: err.message });
      }
    }

    // Respond with the scraping summary
    res.status(200).json({
      message: 'Scraping process completed',
      productsScraped: scrapedProducts.length,
      productsSaved: savedCount,
      errors: errors.length > 0 ? errors : undefined,
    });

  } catch (error) {
    // Log any unexpected errors and send a 500 response
    console.error('Error in scrapeAndSaveProducts:', error);
    res.status(500).json({
      message: 'Error scraping and saving products',
      error: error.message,
    });
  }
};

// Controller for getting paginated products
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get the total number of products and fetch paginated products
    const totalProducts = await IkeaProduct.countDocuments();
    const products = await IkeaProduct.find()
      .sort({ lastUpdated: -1 }) // Sort by last updated time
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      productsPerPage: limit,
      products,
    });
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({
      message: 'Error fetching products',
      error: error.message,
    });
  }
};

// Controller for getting a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await IkeaProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({
      message: 'Error fetching product',
      error: error.message,
    });
  }
};

// Optional: Controller for deleting all products (useful for testing)
exports.deleteAllProducts = async (req, res) => {
  try {
    await IkeaProduct.deleteMany({});
    res.status(200).json({ message: 'All products deleted successfully' });
  } catch (error) {
    console.error('Error in deleteAllProducts:', error);
    res.status(500).json({
      message: 'Error deleting products',
      error: error.message,
    });
  }
};
