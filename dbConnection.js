const mongoose = require("mongoose");
const envConstants = require("./constants/envConstants");
console.log('envConstants ', envConstants.mongoDbConnectionUrl)

const connectDb = async () => {
    console.log('we are in side connect')
  await mongoose
    .connect('mongodb+srv://dharmculturex:4UlTHIuDt2W8UBfE@culturexbackend.47c1i.mongodb.net/test?retryWrites=true&w=majority&appName=culturexbackend', {
        autoIndex: true,
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log("Unable to connect to database ", error);
    });
};

module.exports = connectDb;
