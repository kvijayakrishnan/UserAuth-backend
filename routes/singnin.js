const express = require("express");
const { CheckUser } = require("../controllers/login");
const {InsertVerifyUser, InsertSignUpUser} = require("../controllers/signin");

const router = express.Router();



router.get("/:token", async(req, res) =>{
    try {
        const response = await InsertSignUpUser(req.params.token)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send(
        `<html>
            <body>
                <h4>Hi User</h4>
                <h5>Welcome to the recipe book app</h5>
                <p>Registration successful</p>
                <p>Regards</p>
                <p>Team</p>
            </body>
        </html>`
        )
    }
})


router.post("/verify", async(req, res) =>{
    try {
        const {name, email, password} = await req.body;
        // console.log(name, email, password)
        const registerCredentials = await CheckUser(email)
        console.log(registerCredentials)
        if(registerCredentials===false){
            await InsertVerifyUser(name, email, password);
            res.status(200).send({msg:"Verification mail sent on your email, Pls verify"})
        } else if(registerCredentials===true){
            res.status(200).send({msg:"Already email exists pls login"})
        }else if(registerCredentials === "server is busy"){
           res.status(500).send({msg:"Internal server error"})
        }
    } catch (error) {
        console.log(error)
    }
})



module.exports = router




