const mongoose = require ('mongoose')
//const Schema = mongoose.Schema
const {Schema} = mongoose;
// creating a new schema using mongoose.schema
const UserSchema = new Schema (
    {
        googleID: String
        
    }
);

//Telling mongoose we want to create a new collection called Users
mongoose.model('users', UserSchema)