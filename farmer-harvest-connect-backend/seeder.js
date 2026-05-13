const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const CropListing = require('./models/CropListing');

const farmerNames = [
  'Ramesh Patel',
  'Suresh Yadav',
  'Amit Verma',
  'Rajesh Singh',
  'Mohan Gupta',
  'Anil Sharma',
  'Vikram Chauhan',
  'Deepak Tiwari',
  'Kailash Meena',
  'Prakash Joshi',
  'Sunil Rathore',
  'Ravi Mishra',
  'Mukesh Jain',
  'Arvind Thakur',
  'Mahesh Solanki',
  'Nitin Dubey',
  'Ajay Sengar',
  'Pawan Kushwaha',
  'Dinesh Lodhi',
  'Harish Chouhan',
];

const crops = [
  { name: 'Wheat', category: 'Cereals' },
  { name: 'Rice', category: 'Cereals' },
  { name: 'Soybean', category: 'Oilseeds' },
  { name: 'Corn', category: 'Cereals' },
  { name: 'Cotton', category: 'Cash Crops' },
  { name: 'Sugarcane', category: 'Cash Crops' },
  { name: 'Onion', category: 'Vegetables' },
  { name: 'Potato', category: 'Vegetables' },
  { name: 'Pulses', category: 'Pulses' },
];

const locations = [
  {
    address: 'Village Sanwer',
    district: 'Indore',
    state: 'Madhya Pradesh',
    pincode: '453551',
  },
  {
    address: 'Village Sehore',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    pincode: '466001',
  },
  {
    address: 'Village Dewas',
    district: 'Dewas',
    state: 'Madhya Pradesh',
    pincode: '455001',
  },
  {
    address: 'Village Ujjain',
    district: 'Ujjain',
    state: 'Madhya Pradesh',
    pincode: '456001',
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');

    await User.deleteMany({ role: 'farmer' });
    await CropListing.deleteMany({});

    const farmerUsers = [];

    for (let i = 0; i < 20; i++) {
      const farmer = await User.create({
        name: farmerNames[i],
        email: `farmer${i + 1}@test.com`,
        password: '123456',
        role: 'farmer',
        phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
        profile: {
          location: 'Madhya Pradesh',
          bio: 'Experienced farmer',
        },
      });

      farmerUsers.push(farmer);
    }

    const listings = [];

    for (const farmer of farmerUsers) {
      for (let i = 0; i < 3; i++) {
        const crop =
          crops[Math.floor(Math.random() * crops.length)];

        const location =
          locations[Math.floor(Math.random() * locations.length)];

        listings.push({
          farmerId: farmer._id,

          cropName: crop.name,
          category: crop.category,

          quantity: {
            amount: Math.floor(Math.random() * 200) + 50,
            unit: 'Quintal',
          },

          price: {
            amount: Math.floor(Math.random() * 4000) + 1500,
            unit: 'per Quintal',
            negotiable: true,
          },

          location,

          harvest: {
            season: 'Rabi',
            grade: 'A',
          },

          description: 'Fresh crop directly from farmer',
          status: 'active',
        });
      }
    }

    await CropListing.insertMany(listings);

    console.log('20 farmers + 60 listings created');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();