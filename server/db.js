const mongoose = require('mongoose');
const config = require('./config.js');
const db = config.MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};


module.exports = connectDB;