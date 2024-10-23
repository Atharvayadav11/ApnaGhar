import Header from "../../components/Header";

import React, { useState } from 'react';
import { Search, Loader, AlertCircle } from 'lucide-react';

const IkeaScraper = () => {
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!category.trim()) return;

    setLoading(true);
    setError('');
    setProducts([]);

    try {
      const response = await fetch(`http://localhost:3001/scrape/${category.toLowerCase()}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const data = await response.json();
      if (data.length === 0) {
        setError('No products found for this category');
      } else {
        setProducts(data);
      }
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">IKEA Product Scraper</h1>
        <p className="text-gray-400 mb-8">Enter a category to search for IKEA products</p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative max-w-xl">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category (e.g., chairs, tables, sofas)"
              className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-900 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <button
              type="submit"
              disabled={loading || !category.trim()}
              className="ml-4 px-6 py-3 mt-4 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
            >
              Search Products
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center space-x-2 text-blue-400">
            <Loader className="animate-spin" size={24} />
            <span>Searching for products...</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 text-red-400 mb-8">
            <AlertCircle size={24} />
            <span>{error}</span>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-200"
              >
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={product.src}
                      alt={product.name}
                      className="object-cover w-full h-64"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/400/320';
                        e.target.alt = 'Product image not available';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-blue-400">₹{product.price}</p>
                      <span className="text-blue-400 hover:text-blue-300">View Details →</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            <Search size={48} className="mx-auto mb-4 opacity-50" />
            <p>Enter a category above to start searching for IKEA products</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default IkeaScraper;
