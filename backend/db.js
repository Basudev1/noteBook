const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const connectMongo = () => {
    mongoose.connect(mongoURI, () =>{
        console.log('MongoDB connected');
    })
}
module.exports = connectMongo;