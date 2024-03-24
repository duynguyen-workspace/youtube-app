import { Sequelize } from "sequelize"
import initModels from "../models/init-models.js"
import sequelize from "../models/connect.js"
import { checkRefToken, checkToken, createToken, decodeToken } from "../config/jwt.js";
import { responseData } from "../config/responseData.js";

const model = initModels(sequelize)
const Op = Sequelize.Op

const lockApi = (req, res, next) => {
    try {
        //* Validate token
        let { token } = req.headers;
        checkToken(token)
        next()   
    } catch(err) {

        if (err.name === "TokenExpiredError") {
            responseData(res, "Token expired!", 401, "TokenExpiredError")
        } else {
            responseData(res, "Access permission denied!", 401, "")
        }

    }
}

const resetToken = async (req, res) => {
    // Check token
    let { token } = req.headers
    let errToken = checkToken(token)

    if (errToken && errToken.name !== "TokenExpiredError") {
        responseData(res, "Access permission denied!", 401, "")
        return
    }

    // Get user data from token
    let { userId } = decodeToken(token) 
    let checkedToken = decodeToken(token)
    
    let checkedUser = await model.users.findOne({
        where: {
            user_id: userId
        }
    })

    // Check refresh token (if expired)
    let refreshToken = checkedUser.dataValues.refresh_token
    let errRefToken = checkRefToken(refreshToken)

    if (errRefToken && errToken.name !== "TokenExpiredError") {
        responseData(res, "Access permission denied!", 401, "")
        return
    }

    // Compare login token and refresh token "key"
    let checkedRefToken = decodeToken(refreshToken)

    if (checkedToken.key !== checkedRefToken.key) {
        responseData(res, "Access permission denied!", 401, "")
        return
    }
    
    // Create token
    let newToken = createToken({ user_id: checkedUser.dataValues.user_id })

    if (newToken) {
        responseData(res, "Reset token successfully!", 200, newToken)
    } else {
        responseData(res, "Error in reseting token!", 404, "")
    }
}

export { lockApi, resetToken }