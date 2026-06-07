import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const check = async () => {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env');
    return;
  }
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected!');

    if (!mongoose.connection.db) {
      throw new Error('Database connection is not fully established.');
    }

    const collection = mongoose.connection.db.collection('admin_dashboard');
    const count = await collection.countDocuments({});
    console.log(`\nTotal reports in 'admin_dashboard' collection: ${count}`);

    const docs = await collection.find({}).toArray();
    console.log('\n--- Documents Found ---');
    console.log(JSON.stringify(docs, null, 2));

    await mongoose.disconnect();
    console.log('\nDisconnected.');
  } catch (err) {
    console.error('Error connecting or querying:', err);
  }
};

check();
