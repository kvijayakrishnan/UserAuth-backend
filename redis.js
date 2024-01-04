const dotenv = require("dotenv")
dotenv.config();
const redis = require('redis')



const redisClient = () =>{
    
    return redis.createClient();
}

const client = redisClient();
client.on("error", (err) =>{
    console.log(err)
})

client.on("connect", () =>{
    console.log("connected to redis")
})


client.on("end", () =>{
    console.log("redis connection is ended")
})

client.on("SIGQUIT", ()=>{
    client.quit()
})



module.exports = client






