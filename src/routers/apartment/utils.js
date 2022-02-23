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

async function createapartment(name, description, location, price, address, user) {
    const apartment = await Apartment.create({
        name,
        description,
        location,
        price,
        address,
        userCreator : user
    }).catch((error) => {
        console.log(error)
        throw new Error("Error al crear apartamento")
    })
    return {
        name: apartment.name,
        description: apartment.description,
        location: apartment.location,
        price: apartment.price,
        address: apartment.address,
        userCreator: apartment.userCreator
    }
}
module.exports = {queryApartments, createapartment}