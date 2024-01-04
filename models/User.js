const mongoose = require("mongoose");


const userSchema =new mongoose.Schema(
    {
        name:{
            type:String,
        },
        email:{
            type:String,
            require:true,
            unique:true,
        },
        password:{
            type:String,
            require:true,
        },
        joinedOn:{
            type:Date,
            default:Date.now()
        },
        forgetPassword:{
            time: Date,
            otp: String,
        },
        token:{
            type:String,
        },
    },
    {
        collection:"User"
    }
)


// const User = mongoose.model('User', userSchema)
// module.exports  = User;


module.exports = mongoose.model("User", userSchema)
