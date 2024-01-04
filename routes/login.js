const express = require("express");
const router = express.Router();
const { AuthenticateUser } = require('../controllers/login')
const client = require("../redis")


client.connect()/*.then(() =>console.log("connected to redis"))*/

router.post("/", async (req, res) =>{
    const {email, password} = await req.body;
    let loginCredentials = await AuthenticateUser(email, password);
    console.log(loginCredentials)
    if(loginCredentials ==="Invalid Username or password" ){
        res.status(200).send({msg:"Invalid Username or password"})
    }else if(loginCredentials === "server busy"){
        res.status(200).send({msg:"server busy"})
    }else{
        res.status(200).json({token:loginCredentials.token})
    }
    
})




module.exports = router











