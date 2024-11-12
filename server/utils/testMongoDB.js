const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sensor_db';

async function testMongoConnection() {
  try {
    console.log('🔄 Testing MongoDB Connection...');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully!');
    
    await mongoose.connection.db.admin().ping();
    console.log('🟢 MongoDB Responding to Ping');
    
    const stats = await mongoose.connection.db.stats();
    console.log('\n📊 Database Stats:');
    console.log(`Database: ${mongoose.connection.name}`);
    console.log(`Collections: ${stats.collections}`);
    console.log(`Documents: ${stats.objects}`);
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Connection Closed');
    process.exit(0);
  }
}

testMongoConnection();