const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost:27017/iNotes';

const connectToMongoose = async () =>{
    await mongoose.connect(mongooseURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
}

module.exports = connectToMongoose;