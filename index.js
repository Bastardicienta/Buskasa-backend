const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

const advisorRouter = require("./src/routers/advisor")
const apartmentRouter = require("./src/routers/apartment")

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URL)

const port = process.env.PORT | 4020
app.use(express.json())
app.use(cors())

app.use(advisorRouter)
app.use(apartmentRouter)

app.listen(port, () => {
    console.log(`server running on ${port}`)
})