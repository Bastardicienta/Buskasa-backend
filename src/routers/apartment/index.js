const express = require("express")
const {authenticate} = require("../../middleware/auth")
const router = new express.Router()
const { queryApartments, createapartment, deleteApartment } = require("./utils")

router.get("/apartments", async (req, res)=>{
    try {
        const request = req.body
        console.log("apartments", request)
        const queriedApartments = await queryApartments()
        res.status(200).send({
            status: true,
            message: "Apartamentos consultados con éxito",
            data: {apartments: queriedApartments}
        })
    } catch (error) {
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: "Falla al consultar apartamentos",
            data: {error: error.toString()}
        })
    }
})

router.post("/apartments/new-apartment", authenticate, async (req, res)=>{
    try{
        const request = req.body
        console.log("/apartments/new-apartment", request)
        console.log(req.dataUser)
        const createdApartment = await createapartment(
            request.name,
            request.description,
            request.location,
            request.price,
            request.address,
            req.dataUser
        )
        res.status(200).send({
            status: true,
            message: "Apartamento registrado con éxito",
            data: {apartments: createdApartment}
        })
    }catch (error){
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: "Creación de apartamento fallido",
            data: {error: error.toString()}
        })
    }
})

router.delete("/apartments/delete-apartment", authenticate, async (req, res)=>{
    try{
        const request = req.body
        console.log("/apartments/delete-apartment", request)
        await deleteApartment(
            request.location,
            request.address,
            req.dataUser
        )
        res.status(200).send({
            status: true,
            message: "Apartamento eliminado con éxito",
            data: {}
        })
    }catch (error){
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: "Falla al eliminar apartamento",
            data: {error: error.toString()}
        })
    }
})

module.exports = router