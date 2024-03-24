import express from 'express'
import { createVideoComment, getVideo, getVideoById, getVideoByName, getVideoByType, getVideoComments, getVideoPage, getVideoType } from '../controllers/videoController.js'
import { lockApi } from '../controllers/authController.js'

const videoRoutes = express()

videoRoutes.get("/get-video", getVideo)

videoRoutes.get("/get-video-by-id/:id", getVideoById) 

videoRoutes.get("/get-video-by-name/:searchTerm", getVideoByName) 

videoRoutes.get("/get-video-by-type/:id", getVideoByType)

videoRoutes.get("/get-video-type", getVideoType)

videoRoutes.get("/get-video-page/:page", getVideoPage)

videoRoutes.get("/get-video-comments/:id", lockApi, getVideoComments)

videoRoutes.post("/create-video-comment", lockApi, createVideoComment) 

export default videoRoutes  