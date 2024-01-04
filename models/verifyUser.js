const mongoose = require("mongoose");


const verifySchema =new mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
        },
        email:{
            type:String,
            require:true,
        },
        password:{
            type:String,
            require:true,
        },
        token:{
            type:String,
            require:true,
        },
    },
    {
        collection:"VerifyUser"
    }
)







// const VerifyUser = mongoose.model('VerifyUser', verifySchema)
// module.exports  = VerifyUser;


module.exports = mongoose.model("VerifyUser", verifySchema)
