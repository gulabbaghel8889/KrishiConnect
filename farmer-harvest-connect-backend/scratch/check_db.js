const mongoose = require('mongoose');
require('dotenv').config();

const checkIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/KrishiConnect');
    console.log('Connected to DB');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    if (collections.find(c => c.name === 'users')) {
      const indexes = await mongoose.connection.db.collection('users').indexes();
      console.log('Indexes on users collection:');
      console.log(JSON.stringify(indexes, null, 2));
    } else {
      console.log('Users collection does not exist yet');
    }
    
    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

checkIndex();
