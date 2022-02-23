const Apartment = require("../../models/apartments")
const jwt = require("jsonwebtoken")

async function queryApartments() {
    const apartmentsList = await Apartment.find({}).catch((error) => {
        console.log(error)
        throw new Error(`Error encontrando los apartamentos. ${error}`)
    })
    console.log("Apartamentos", apartmentsList)
    if (apartmentsList == null || apartmentsList.length <= 0) {
        throw new Error("Error: no se encontro ningún apartamento")
    }
    return apartmentsList
}

module.exports = {queryApartments}