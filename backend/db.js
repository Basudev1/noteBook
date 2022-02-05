const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.mongoURI;
const connectMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("MongoDB connected");
  });
};
module.exports = connectMongo;
