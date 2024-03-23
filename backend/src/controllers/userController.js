import { Sequelize } from "sequelize"
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"
import { responseData } from "../config/responseData.js"
import bcrypt from 'bcrypt'
import { checkToken, createToken } from "../config/jwt.js"

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

    let token = createToken({ userId: checkedUser.dataValues.user_id })
    responseData(res, "Login successfully!", 200, token)
}

const loginFacebook = async (req, res) => {
    let { fullName, id } = req.body

    let checkedUser = await model.users.findOne({
        where: {
            face_app_id: id 
        }
    })

    // Check user
    if (checkedUser) {
        //
        let token = createToken({ userId: checkedUser.dataValues.user_id })

        responseData(res, "Login successfully!", 200, token)
        return
    } 

    // Create new user
    let new_user = {
        full_name: fullName,
        email: "",
        pass_word: "",
        face_app_id: id,
        role: "USER"
    }

    try {
        //
        await model.users.create(new_user)

        //
        let token = createToken({ userId: new_user.dataValues.user_id })

        responseData(res, "Login successfully!", 201, token)

    } catch(err) {
        responseData(res, "Login error", 200, err)
    }
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
    let encrypted_pw = bcrypt.hashSync(password, 10)

    let new_user = {
        full_name: fullName,
        email,
        pass_word: encrypted_pw,
        role: "USER"
    }

    await model.users.create(new_user)

    responseData(res, "Register successfully!", 201, new_user)
}

export {getUsers, login, loginFacebook, register}