const User = require('../models/User');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const verifyUser = require('../models/verifyUser');
const {sendMail} = require("./SendMail")


dotenv.config();


async function InsertVerifyUser (name, email, password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const token = generateToken(email);
        const verifyUserisExists = await verifyUser.findOne({email: email})
        if (verifyUserisExists){
             verifyUserisExists.token = token
             await verifyUserisExists.save()
        }else{
            const newUser = new verifyUser({
                name: name,
                email: email,
                password: hashPassword,
                token:token
            })
        await newUser.save();

        }
       

        const activationLink = `https://userauth-tsuw.onrender.com/signin/${token}`;
        const content = `<h4>Hi User</h4>
        <h5>Welcome to the recipe book app</h5>
        <p>Thanks for signing, click below the link to activate your account</p>
        <a href="${activationLink}">Click here</a>
        <p>Regards</p>
        <p>Team</p>`

        sendMail(email, "VerifyUser", content)

    } catch (error) {
        console.log(error)
    }
}


function generateToken(email){
    const token = jwt.sign(email, process.env.signup_secret_token);
    return token;
}


async function InsertSignUpUser(token) {
    try {
        const userVerify = await verifyUser.findOne({token: token});
        if(userVerify){
            const newUser = new User({
                name: userVerify.name,
                email: userVerify.email,
                password: userVerify.password
            });
            console.log(newUser)

            await newUser.save(newUser);
            await userVerify.deleteOne({token: token})
            const content = `<h4>Hi User</h4>
            <h5>Welcome to the recipe book app</h5>
            <p>Registration successful</p>
            <p>Regards</p>
            <p>Team</p>`
            sendMail(newUser.email, 'User register successful', content);
            return `<h4>Hi User</h4>
            <h5>Welcome to the recipe book app</h5>
            <p>Registration successful</p>
            <p>Regards</p>
            <p>Team</p>`
        }
        return `<h4>Register fail</h4>
        <h5>Unable to register user</h5>
        <p>Link is expired</p>
        <p>Regards</p>
        <p>Team</p>`


    } catch (error) {
        console.log(error)
        return `<html>
                    <body>
                        <h4>Hi User</h4>
                        <h5>Welcome to the recipe book app</h5>
                        <p>Registration successful</p>
                        <p>Regards</p>
                        <p>Team</p>
                    </body>
                </html>`
    }
}


module.exports = {InsertVerifyUser, InsertSignUpUser};