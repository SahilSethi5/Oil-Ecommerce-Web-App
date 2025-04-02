// data/products.js
const products = [
    {
      name: 'Premium Olive Oil',
      description: 'Cold-pressed extra virgin olive oil from Mediterranean olives. Rich in flavor and antioxidants.',
      price: 24.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Olive+Oil',
      category: 'cooking',
      volume: '500ml',
      inStock: true,
      featured: true,
      specifications: {
        origin: 'Mediterranean',
        purity: 'Extra Virgin',
        type: 'Cold-pressed',
        extraction: 'First cold press',
        benefits: ['Rich in antioxidants', 'Heart-healthy', 'Anti-inflammatory properties']
      }
    },
    {
      name: 'Organic Coconut Oil',
      description: '100% organic virgin coconut oil. Perfect for cooking, skincare, and haircare.',
      price: 18.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Coconut+Oil',
      category: 'multipurpose',
      volume: '450ml',
      inStock: true,
      featured: true,
      specifications: {
        origin: 'Sri Lanka',
        purity: 'Virgin',
        type: 'Cold-pressed',
        extraction: 'Expeller-pressed',
        benefits: ['Moisturizing', 'Medium-chain fatty acids', 'Natural antimicrobial properties']
      }
    },
    // Add more products as needed
  ];
  
  module.exports = products;