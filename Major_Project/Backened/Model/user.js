/*
  Passport-Local-Mongoose:Passport-Local-Mongoose is a Mongoose plugin that simplifies 
        username-password authentication by automatically adding fields and methods for 
        password hashing, salting, and authentication, and integrates seamlessly with Passport’s 
        local strategy.
*/
const mongoose = require("mongoose")
const { default: passportLocalMongoose } = require("passport-local-mongoose")
const userSchema = mongoose.Schema({
    FristName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
})

userSchema.plugin(passportLocalMongoose) // 
const User = mongoose.model("User", userSchema);
module.exports = User;