import express from "express";
import videoRoutes from "./videoRoutes.js";
import userRoutes from "./userRoutes.js";

const rootRoutes = express.Router()

rootRoutes.use("/video", videoRoutes)
rootRoutes.use("/user", userRoutes)

export default rootRoutes