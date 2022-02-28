const Advisor = require("../../models/advisors")
const jwt = require("jsonwebtoken")

async function loginAdvisor(user, password){
    const advisor = await Advisor.findOne({user}).catch((error) => {
        console.log(error)
        throw new Error(`Error encontrando asesor. ${error}`)
    })
    if(user == null){
        throw new Error(`Error: No se ingresó usuario`)
    }
    if(password == null){
        throw new Error(`Error: No se ingresó contraseña`)
    }
    if(password != advisor.password){
        throw new Error(`Error: Contraseña incorrecta`)
    }
    const token = createToken(advisor.user, advisor.name, advisor.phone)
    advisor.token = token
    await advisor.save().catch ((error) => {
        console.log(error)
        throw new Error(`Error guardando nuevo token. ${error}`)
    }) 
    return {user, name: advisor.name, phone: advisor.phone, token}
}

function createToken(user, name, phone) {
    console.log(process.env.SIGN_PASSWORD)
    const token = jwt.sign({user, name, phone}, process.env.SIGN_PASSWORD)
    return token
}

module.exports = {loginAdvisor}