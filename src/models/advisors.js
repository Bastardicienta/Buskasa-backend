const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const advisorSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 50,
    }
})

const Advisor = mongoose.model("Advisor", advisorSchema)
module.exports = Advisor