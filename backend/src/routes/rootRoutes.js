import express from "express";
import videoRoutes from "./videoRoutes.js";
import userRoutes from "./userRoutes.js";

const rootRoutes = express.Router()

rootRoutes.use("/videos", videoRoutes) 
rootRoutes.use("/users", userRoutes)

export default rootRoutes