import { Sequelize } from "sequelize"
import initModels from "../models/init-models.js"
import sequelize from "../models/connect.js"
import { responseData } from "../config/responseData.js"

const model = initModels(sequelize)
const Op = Sequelize.Op

const getVideo = async (req, res) => {
    
    let data = await model.video.findAll()

    responseData(res, "Success", 200, data)
}

const getVideoPage = async (req, res) => {
    let { page } = req.params

    let pageSize = 3

    let data = await model.video.findAll({
        limit: pageSize,
        offset: pageSize * (page - 1)
    })

    let dataCount = await model.video.count()

    responseData(res, "Success", 200, {content: data, pagination: Math.ceil(dataCount / pageSize)})
}

const getVideoType = async (req, res) => {
    
    let data = await model.video_type.findAll()

    responseData(res, "Success", 200, data)
}

const getVideoById = async (req, res) => {
    let { id } = req.params

    let data = await model.video.findOne({
        where: {
            video_id: id
        },
        include:["type", "user"]
        // include:[model.users, model.video_type]
        //! -> xoá tên nếu muốn xài cách này
    })

    // res.status(200).send(data)
    responseData(res, "Success", 200, data)
    
}

const getVideoByName = async (req, res) => {
    let { searchTerm } = req.params

    let data = await model.video.findAll({
        where: {
            video_name: {
                [Op.like]: `%${searchTerm}%`,
            }
        }
    })

    if (data) {
        responseData(res, "Success", 200, data)
    } else {
        res.status(404).send(`Cannot get data!`)
    }
}

const getVideoByType = async (req, res) => {
    let { id } = req.params

    let data = await model.video.findAll({
        where: {
            type_id: id
        }
    })

    if (data) {
        responseData(res, "Success", 200, data)
    } else {
        res.status(404).send(`Cannot get data!`)
    }

}

export {getVideo, getVideoType, getVideoById, getVideoByName, getVideoByType, getVideoPage}