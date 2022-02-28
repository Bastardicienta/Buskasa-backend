const mongoose = require("mongoose")

const apartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 100
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 9
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 100
    },
    userCreator:[
        {
            user:{
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 20,
                unique: true,
            },
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 10,
                maxlength: 50,
            },
            phone: {
                type: Number,
                required: true,
                length:10,
                trim: true
            },
        }
    ]
})

const Apartment = mongoose.model("Apartment", apartmentSchema)
module.exports = Apartment