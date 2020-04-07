const mongoose = require('mongoose');

const connectDB = async () => {
 try {
  const connect = await mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false,
   useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.bold);
 } catch (error) {
  console.error(error.message);
  process.exit(1);
 }
};

module.exports = connectDB;
