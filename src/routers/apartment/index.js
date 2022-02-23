const express = require("express")
const router = new express.Router()
const { queryApartments } = require("./utils")

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

module.exports = router