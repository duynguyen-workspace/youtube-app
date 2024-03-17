import { Sequelize } from "sequelize"
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"
import { responseData } from "../config/responseData.js"
import bcrypt from 'bcrypt'

const model = initModels(sequelize)
const Op = Sequelize.Op

const getUsers = async (req, res) => {
    let data = await model.users.findAll()

    responseData(res, "Success", 200, data)
}


const login = async (req, res) => {
    let { email, password } = req.body

    let checkedUser = await model.users.findOne({
        where: {
            email: email 
        }
    })

    // Check email
    if (!checkedUser) {
        responseData(res, "Email not existed!", 404, null)
        return
    } 

    // Check password
    if (!bcrypt.compareSync(password, checkedUser.pass_word)) { // (checkedUser.pass_word !== password) 
        responseData(res, "Incorrect password", 404, null)
        return
    }

    responseData(res, "Login successfully!", 200, "")
}

const register = async (req, res) => {
    let { fullName, email, password } = req.body

    let checkedUser = await model.users.findOne({
        where: {
            email: email 
        }
    })

    // Check if email existed
    if (checkedUser) {
        responseData(res, "Email already taken!", 404, null)
        return
    } 
    
    // Create new user
    let new_user = {
        full_name: fullName,
        email,
        pass_word: bcrypt.hashSync(password, 10),
        role: "USER"
    }

    await model.users.create(new_user)

    responseData(res, "Register successfully!", 201, new_user)
}

export {getUsers, login, register}