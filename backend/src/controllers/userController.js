import { Sequelize } from "sequelize"
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"
import { responseData } from "../config/responseData.js"
import bcrypt from 'bcrypt'
import { checkToken, createRefToken, createToken } from "../config/jwt.js"
import nodemailer from 'nodemailer'
import { generateRandomCode } from "../utils/index.js"
import sendMail from "../config/sendMail.js"

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

    let token = createToken({ 
        userId: checkedUser.dataValues.user_id,
        key: new Date().getTime()
    })

    // Create refresh token
    let refreshToken = createRefToken({ 
        userId: checkedUser.dataValues.user_id,
        key: new Date().getTime()
    });
    checkedUser.dataValues.refresh_token = refreshToken;

    // Update refresh token
    await model.users.update(checkedUser.dataValues, {
        where: {
            user_id: checkedUser.dataValues.user_id
        }
    })

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
        let token = createToken({ userId: checkedUser.dataValues.user_id, key: new Date().getTime() })

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


const recoverEmail = (req, res) => {
    // nodemailer
    let configMail = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "duynguyen.workspace@gmail.com",
            pass: "hejsngjenhdnladj"
        }
    })

    configMail.sendMail({
        from: "duynguyen.workspace@gmail.com",
        to: "duynguyen.workspace@gmail.com",
        subject: "[IMPORTANT] Youtube App Verification ",
        text: "Forget password? Recover password for your youtube app here",
    }, (err, info) => {
        console.log("error: ", err)
        console.log("info: ", info)
    })
}

const checkEmail = async (req, res) => {

    let { email } = req.body

    let checkedUser = await model.users.findOne({
        where: {
            email
        }
    })

    if (!checkedUser) {
        responseData(res, "Email not existed!", 404, null)
        return
    }

    // Generate random code with 12 characters
    let code = generateRandomCode(12)

    // Add code to database
    let newCode = {
        code,
        expired: new Date()
    }

    try {
        await model.code.create(newCode)

        sendMail("duynguyen.workspace@gmail.com", "[IMPORTANT] VERIFY CODE FOR YOUTUBE APP", `Verification Code: ${code}`)
        responseData(res, "Verification code sent successfully!", 200, newCode)
    } catch(err) {
        responseData(res, "Server error!", 404, err)
    }

}

const checkCode = async (req, res) => {
    let { code } = req.body

    let checkedCode = await model.code.findOne({
        where: {
            code
        }
    })

    // Check code existed
    if (!checkedCode) {
        responseData(res, "Incorrect verification code!", 404, null)
        return
    }

    // Check code expiration
    //! => remove if expired (after 1 minute)
    let currentTime = new Date().getTime()

    if (checkedCode.dataValues.expired.getTime() + 1000000 < currentTime) {
        try {
            await model.code.destroy({
                where: {
                    id: checkedCode.dataValues.id
                }
            })
            responseData(res, "Verification Code Expired!", 200, null)
        } catch(err) {
            responseData(res, "Cannot remove expired code", 404, null)
        }

        return
    } 

    responseData(res, "Verify successfully!", 200, null)
    

}

const changePassword = (req, res) => {
    
}


export {getUsers, login, loginFacebook, register, recoverEmail, checkEmail, checkCode, changePassword}