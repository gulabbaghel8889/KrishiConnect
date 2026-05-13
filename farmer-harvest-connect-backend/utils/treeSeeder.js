const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tree = require('../models/Tree');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();

const treesData = [
  {
    name: "Neem Tree",
    category: "Medicinal",
    price: "₹299",
    image: "https://i.pinimg.com/736x/9b/16/3e/9b163ec78751e7fc9cbbcc90e5cd904f.jpg",
    description: "Neem tree is known for medicinal properties and helps purify the environment.",
  },
  {
    name: "Mango Tree",
    category: "Fruit",
    price: "₹499",
    image: "https://i.pinimg.com/736x/b5/39/65/b539654a26b1d06a9f48a31c9aef7327.jpg",
    description: "Mango tree produces delicious fruits and grows well in tropical climates.",
  },
  {
    name: "Banyan Tree",
    category: "Shade",
    price: "₹699",
    image: "https://i.pinimg.com/736x/c2/25/e1/c225e1d1d385bcef1af1217579e1a331.jpg",
    description: "Banyan tree provides massive shade and has strong aerial roots.",
  },
  {
    name: "Peepal Tree",
    category: "Environmental",
    price: "₹399",
    image: "https://i.pinimg.com/1200x/5e/98/85/5e9885e312839f05967757cb1b1bbc96.jpg",
    description: "Peepal tree is environmentally important and improves air quality.",
  },
  {
    name: "Coconut Tree",
    category: "Fruit",
    price: "₹799",
    image: "https://i.pinimg.com/736x/6b/72/2b/6b722bf3b94ebefde0b5cbe084a2840a.jpg",
    description: "Coconut tree provides coconuts, oil, and many useful natural products.",
  },
  {
    name: "Guava Tree",
    category: "Fruit",
    price: "₹350",
    image: "https://i.pinimg.com/736x/ba/75/cc/ba75cc03f6805c21c3a9bf0c4482d7a3.jpg",
    description: "Guava tree gives nutrient-rich fruits packed with vitamin C.",
  },
  {
    name: "Teak Tree",
    category: "Timber",
    price: "₹999",
    image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1",
    description: "Teak tree is famous for premium quality wood and furniture use.",
  },
  {
    name: "Bamboo Plant",
    category: "Eco",
    price: "₹199",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    description: "Bamboo grows rapidly and is used for eco-friendly construction.",
  },
  {
    name: "Lemon Tree",
    category: "Fruit",
    price: "₹299",
    image: "https://i.pinimg.com/1200x/7e/83/d2/7e83d285aa66919640d6f9db1b28b3cf.jpg",
    description: "Lemon tree produces citrus fruits commonly used in Indian kitchens.",
  },
  {
    name: "Ashoka Tree",
    category: "Decorative",
    price: "₹450",
    image: "https://i.pinimg.com/1200x/ff/26/dc/ff26dce39fc5644fd181f79b498df85e.jpg",
    description: "Ashoka tree is planted for beauty and roadside greenery.",
  },
  {
    name: "Apple Tree",
    category: "Fruit",
    price: "₹899",
    image: "https://i.pinimg.com/1200x/b8/d4/48/b8d448a5b667a952a4bf56b9ec3c8b8f.jpg",
    description: "Apple trees thrive in cool climates and produce sweet fruits.",
  },
  {
    name: "Orange Tree",
    category: "Fruit",
    price: "₹550",
    image: "https://i.pinimg.com/736x/aa/9e/84/aa9e84f01d21b614cd3a62a88c190320.jpg",
    description: "Orange tree provides juicy citrus fruits rich in vitamin C.",
  },
  {
    name: "Papaya Tree",
    category: "Fruit",
    price: "₹250",
    image: "https://i.pinimg.com/736x/b7/bd/02/b7bd02f0fd57f087febc0bf2f46cf236.jpg",
    description: "Papaya tree grows quickly and produces healthy tropical fruits.",
  },
  {
    name: "Banana Tree",
    category: "Fruit",
    price: "₹399",
    image: "https://i.pinimg.com/736x/d6/ec/5f/d6ec5f11ef7b4818f44fa464bd71d26b.jpg",
    description: "Banana tree is widely cultivated for its nutritious fruits.",
  },
  {
    name: "Rosewood Tree",
    category: "Timber",
    price: "₹1200",
    image: "https://i.pinimg.com/736x/ac/e4/11/ace411ee9bf0184368e6f15ab6190e74.jpg",
    description: "Rosewood tree produces strong timber used in luxury furniture.",
  },
  {
    name: "Sandalwood Tree",
    category: "Medicinal",
    price: "₹1500",
    image: "https://i.pinimg.com/736x/c3/3b/7b/c33b7ba2470cc21771806b1f1eea558b.jpg",
    description: "Sandalwood tree is valuable for fragrance and medicinal uses.",
  },
  {
    name: "Jamun Tree",
    category: "Fruit",
    price: "₹420",
    image: "https://i.pinimg.com/736x/09/7d/dc/097ddc4adffc1ff8c1e9ed347d884493.jpg",
    description: "Jamun tree produces antioxidant-rich purple fruits.",
  },
  {
    name: "Cherry Blossom Tree",
    category: "Decorative",
    price: "₹1100",
    image: "https://i.pinimg.com/736x/f1/7d/0b/f17d0b39c1cae2f111f21db58ab84a7e.jpg",
    description: "Cherry blossom trees are famous for their beautiful pink flowers.",
  },
  {
    name: "Oak Tree",
    category: "Shade",
    price: "₹850",
    image: "https://i.pinimg.com/736x/a6/be/01/a6be01de08a55370af25bf29cf4da03e.jpg",
    description: "Oak tree is a strong hardwood tree with a long lifespan.",
  },
  {
    name: "Pine Tree",
    category: "Environmental",
    price: "₹650",
    image: "https://i.pinimg.com/1200x/56/85/96/568596f0dcfa6812c3274f0d2f398f10.jpg",
    description: "Pine trees remain green throughout the year and absorb carbon efficiently.",
  },
  {
    name: "Eucalyptus Tree",
    category: "Eco",
    price: "₹380",
    image: "https://i.pinimg.com/1200x/49/28/58/492858e869116861da13788f2868af55.jpg",
    description: "Eucalyptus grows rapidly and is used in paper industries.",
  },
];

const seedTrees = async () => {
  try {
    await connectDB();

    // Find an admin user to attribute these posts to
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.error('No admin user found to attribute tree posts to. Please run the server first to bootstrap admin.');
      process.exit(1);
    }

    // Clear existing trees if needed (optional)
    // await Tree.deleteMany();

    const mappedTrees = treesData.map(tree => ({
      name: tree.name,
      category: tree.category === 'Decorative' ? 'Ornamental' : tree.category,
      mrp: parseInt(tree.price.replace(/[^\d]/g, '')),
      image: tree.image,
      description: tree.description,
      postedBy: admin._id,
      benefits: ['Purification', 'Shade', 'Fruits'], // Default benefits for seed data
      scientificName: `${tree.name} Indica`, // Dummy scientific name
      plantationGuide: "Standard plantation guide for tropical climates."
    }));

    await Tree.insertMany(mappedTrees);
    console.log('✅ Tree data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding tree data:', error);
    process.exit(1);
  }
};

seedTrees();
