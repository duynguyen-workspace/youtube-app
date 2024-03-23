import express from 'express'
import { getVideo, getVideoById, getVideoByName, getVideoByType, getVideoPage, getVideoType } from '../controllers/videoController.js'
import { checkToken } from '../config/jwt.js'

const videoRoutes = express()

videoRoutes.get("/get-video", getVideo)

videoRoutes.get("/get-video-by-id/:id",(req, res, next) => {
    let { token } = req.headers;

    if (checkToken(token) == null) {
        next()
        return
    }

    res.status(401).send("Access permission denied!")

}, getVideoById) 

videoRoutes.get("/get-video-by-name/:searchTerm", getVideoByName) 

videoRoutes.get("/get-video-by-type/:id", getVideoByType)

videoRoutes.get("/get-video-type", getVideoType)

videoRoutes.get("/get-video-page/:page", getVideoPage)

export default videoRoutes  