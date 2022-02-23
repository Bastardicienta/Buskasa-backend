const express = require("express")
const router = new express.Router()
const { loginAdvisor } = require("./utils")

router.post("/advisor/login", async (req, res)=>{
    try {
        const request = req.body
        console.log("/advisor/login", request)
        const loggedAdvisor = await loginAdvisor(
            request.user,
            request.password
        )
        res.status(200).send({
            status: true,
            message: "Asesor logueado con éxito",
            data: {
                advisor: loggedAdvisor
            }
        })
    } catch (error) {
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: "Ingreso fallido",
            data: {error: error.toString()}
        })
    }
})

module.exports = router