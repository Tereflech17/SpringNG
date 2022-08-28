const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({ 
    firstName: String, 
    lastName: String,
    username: {type: String, require: true, index:true, unique: true, sparse: true},
    password: {type: String, require: true},
    googleUser: {
        id: String,
        token: String, 
        email: { type: String, require: true, index: true, unique: true, sparse: true},
        fullName: String, 
        firstName: String,
        lastName: String
    },
    yahooUser: {
        
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);