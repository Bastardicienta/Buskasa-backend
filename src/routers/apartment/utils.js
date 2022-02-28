const Apartment = require("../../models/apartments")

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

async function createapartment(name, description, location, price, address, userCreator) {
    const apartment = await Apartment.create({
        name,
        description,
        location,
        price,
        address,
        userCreator
    }).catch((error) => {
        console.log(error)
        throw new Error("Error al crear apartamento")
    })
    if(name == null){
        throw new Error(`Error: el campo "Nombre" no puede estar vacío`)
    }
    if(description == null){
        throw new Error(`Error: el campo "Descripción" no puede estar vacío`)
    }
    if(location == null){
        throw new Error(`Error: el campo "Ubicación" no puede estar vacío`)
    }
    if(price == null){
        throw new Error(`Error: el campo "precio" no puede estar vacío`)
    }
    if(address == null){
        throw new Error(`Error: el campo "dirección" no puede estar vacío`)
    }
    return {
        name: apartment.name,
        description: apartment.description,
        location: apartment.location,
        price: apartment.price,
        address: apartment.address,
        userCreator: apartment.userCreator
    }
}

async function deleteApartment(location, address, userCreator) {
    const apartment = await Apartment.findOne({ address }).catch((error) => {
        console.log(error)
        throw new Error(`Error encontrando el apartamento. ${error}`)
    })
    if(apartment == null){
        throw new Error("Error: el campo 'Apartamento' no puede estar vacío")
    }
    if (location == null) {
        throw new Error("Error: el campo 'Ubicación' no puede estar vacío")
    }
    if (address == null) {
        throw new Error("Error: el campo 'Ubicación' no puede estar vacío")
    }
    if (apartment.userCreator !== userCreator) {
        throw new Error("Error este usuario no es el creador del apartamento")
    }
    apartment.remove().catch((error) => {
        throw new Error(`Error eliminando el apartamento. ${error}`)
    })
    return
}

module.exports = {queryApartments, createapartment, deleteApartment}