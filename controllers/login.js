
const User = require('../models/User')
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
dotenv.config();
const jwt = require("jsonwebtoken");
const client = require('../redis');

async function CheckUser(email){
    try {
        const user = await User.findOne({email : email});
        console.log(user)
        if(user){
            return true
        }
        return false
    } catch (e) {
        return "server is busy"
    }
}


async function AuthenticateUser(email, password) {
    try {
        const userCheck = await User.findOne({email: email});
        const validPassword = await bcrypt.compare(password, userCheck.password)
        if(validPassword){
            const token = jwt.sign({email: email}, process.env.login_secret_token)
            const response = {
                id: userCheck._id,
                name: userCheck.name,
                email: userCheck.email,
                token: token,
                status: true,
            }
            console.log(email)
            await client.set(`key-${email}`, JSON.stringify(response))
            await User.findOneAndUpdate({email: userCheck.email},{$set:{token: token}}, {new:true})
            return response
        }
        return "Invalid Username or password"
    } catch (error) {
        console.log(error)
        return "server busy"
    }
}



async function AuthorizeUser(token){
    try {
        const decodedToken = jwt.verify(token, process.env.login_secret_token);
        if(decodedToken){
         const email = decodedToken.email;
         const auth = await client.get(`key${email}`)   
         if (auth) {
            const data = JSON.parse(auth);
            return data;
         } else {
            const data = await User.findOne({email: email})
            return data
         }
        }
        return false
    } catch (error) {
        console.log(error)
    }
}





module.exports = {CheckUser, AuthenticateUser, AuthorizeUser}

