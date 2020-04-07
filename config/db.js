const mongoose = require('mongoose');

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.bold);
  // Note that we need no try-catch block because all unhandled rejections are handled in the server.js
};

module.exports = connectDB;
