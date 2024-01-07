const express = require("express");
const connectDb = require('./db/db')
const dotenv = require('dotenv');
dotenv.config()
const singninRouter = require("./routes/singnin")
const homeRouter = require("./routes/home.js")
const loginRouter = require("./routes/login")
const cors = require("cors")
const client = require('./redis');


const app = express();
const PORT = 4500 || process.env.PORT;
connectDb();
// client();
app.use(express.json())
app.use(cors({origin:"*"}))

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use("/signin", singninRouter)
app.use("/login", loginRouter);
app.use("/home", homeRouter);



app.listen(PORT, () =>{
     console.log(`App listening on ${process.env.PORT}`)
})















