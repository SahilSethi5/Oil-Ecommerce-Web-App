const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Sample products data
const products = [
  {
    name: "Premium Olive Oil",
    description: "Cold-pressed extra virgin olive oil from Mediterranean olives. Rich in flavor and antioxidants.",
    price: 24.99,
    imageUrl: "https://via.placeholder.com/300x300?text=Olive+Oil",
    category: "cooking",
    volume: "500ml",
    inStock: true,
    featured: true,
    specifications: {
      origin: "Mediterranean",
      purity: "Extra Virgin",
      type: "Cold-pressed",
      extraction: "First cold press",
      benefits: ["Rich in antioxidants", "Heart-healthy", "Anti-inflammatory properties"]
    }
  },
  {
    name: "Organic Coconut Oil",
    description: "100% organic virgin coconut oil. Perfect for cooking, skincare, and haircare.",
    price: 18.99,
    imageUrl: "https://via.placeholder.com/300x300?text=Coconut+Oil",
    category: "multipurpose",
    volume: "450ml",
    inStock: true,
    featured: true,
    specifications: {
      origin: "Sri Lanka",
      purity: "Virgin",
      type: "Cold-pressed",
      extraction: "Expeller-pressed",
      benefits: ["Moisturizing", "Medium-chain fatty acids", "Natural antimicrobial properties"]
    }
  },
  {
    name: "Argan Oil",
    description: "Pure argan oil for hair and skin. Rich in vitamin E and essential fatty acids.",
    price: 29.99,
    imageUrl: "https://via.placeholder.com/300x300?text=Argan+Oil",
    category: "cosmetic",
    volume: "100ml",
    inStock: true,
    featured: true,
    specifications: {
      origin: "Morocco",
      purity: "100% Pure",
      type: "Cold-pressed",
      extraction: "Traditional pressing",
      benefits: ["Rich in vitamin E", "Moisturizing", "Nourishing for hair and skin"]
    }
  },
  {
    name: "Avocado Oil",
    description: "Pure avocado oil with high smoke point. Ideal for high-heat cooking and grilling.",
    price: 19.99,
    imageUrl: "https://via.placeholder.com/300x300?text=Avocado+Oil",
    category: "cooking",
    volume: "500ml",
    inStock: true,
    featured: false,
    specifications: {
      origin: "Mexico",
      purity: "100% Pure",
      type: "Expeller-pressed",
      extraction: "Cold-pressed",
      benefits: ["High smoke point", "Rich in oleic acid", "Good source of lutein"]
    }
  },
  {
    name: "Jojoba Oil",
    description: "Pure jojoba oil that closely resembles human sebum. Excellent for all skin types.",
    price: 15.99,
    imageUrl: "https://via.placeholder.com/300x300?text=Jojoba+Oil",
    category: "cosmetic",
    volume: "120ml",
    inStock: true,
    featured: false,
    specifications: {
      origin: "Arizona",
      purity: "100% Pure",
      type: "Cold-pressed",
      extraction: "Expeller-pressed",
      benefits: ["Balances oil production", "Non-comedogenic", "Long shelf life"]
    }
  },
  {
    name: "Black Seed Oil",
    description: "Cold-pressed black seed oil with immune-boosting properties.",
    price: 22.99,
    imageUrl: "https://via.placeholder.com/300x300?text=Black+Seed+Oil",
    category: "health",
    volume: "250ml",
    inStock: true,
    featured: false,
    specifications: {
      origin: "Egypt",
      purity: "100% Pure",
      type: "Cold-pressed",
      extraction: "First press",
      benefits: ["Boosts immune system", "Anti-inflammatory", "Supports digestion"]
    }
  },
  {
    name: "Hemp Seed Oil",
    description: "Nutrient-rich hemp seed oil packed with Omega-3 and Omega-6 fatty acids.",
    price: 20.99,
    imageUrl: "https://via.placeholder.com/300x300?text=Hemp+Seed+Oil",
    category: "health",
    volume: "250ml",
    inStock: true,
    featured: false,
    specifications: {
      origin: "Canada",
      purity: "100% Pure",
      type: "Cold-pressed",
      extraction: "Expeller-pressed",
      benefits: ["Supports heart health", "Anti-inflammatory", "Rich in essential fatty acids"]
    }
  },
  {
    name: "Sesame Oil",
    description: "Cold-pressed sesame oil perfect for Asian cuisine and skin massage.",
    price: 16.99,
    imageUrl: "https://via.placeholder.com/300x300?text=Sesame+Oil",
    category: "cooking",
    volume: "500ml",
    inStock: true,
    featured: true,
    specifications: {
      origin: "India",
      purity: "100% Pure",
      type: "Cold-pressed",
      extraction: "First press",
      benefits: ["High in antioxidants", "Supports heart health", "Great for massage therapy"]
    }
  },
  {
    name: "Almond Oil",
    description: "Sweet almond oil ideal for skincare, haircare, and massage therapy.",
    price: 17.99,
    imageUrl: "https://via.placeholder.com/300x300?text=Almond+Oil",
    category: "cosmetic",
    volume: "200ml",
    inStock: true,
    featured: false,
    specifications: {
      origin: "USA",
      purity: "100% Pure",
      type: "Cold-pressed",
      extraction: "Expeller-pressed",
      benefits: ["Moisturizing", "Rich in Vitamin E", "Supports hair strength"]
    }
  }
];

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: bcrypt.hashSync('admin123', 10),
  role: 'admin'
};

// Function to import data
const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    
    // Create admin user
    await User.create(adminUser);
    console.log('Admin user created');
    
    // Insert products
    await Product.insertMany(products);
    console.log('Products imported successfully');
    
    console.log('Data import complete!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Function to delete all data
const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data deleted successfully');
    process.exit();
  } catch (error) {
    console.error('Error deleting data:', error);
    process.exit(1);
  }
};

// Execute based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
