const express = require("express")
const { connection } = require("./db")
require('dotenv').config()

const { userRouter } = require("./routes/user.routes")
const { productRouter } = require("./routes/product.routes")
const {addtocartRouter}=require("./routes/addtocart.routes")
const { authenticate } = require("./middlewares/authenticate.middlewares")
const cors=require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("home page")
})

app.use("/users", userRouter)
// app.use(authenticate)
app.use("/products", productRouter)
app.use("/addtocarts",addtocartRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("conneccted with DB")
    } catch (err) {
        console.log(err.message)
    }
    console.log(`server is running ${process.env.port}`)
})