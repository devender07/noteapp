const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            isAdmin: this.isAdmin,
        },
        process.env.SECRET_KEY,
        {
            expiresIn:'30d'
        })
    } catch (error) {
        console.log("error");
    }
};



const User = mongoose.model('User' , userSchema);

module.exports = User;

