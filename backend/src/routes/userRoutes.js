import express from "express";
import { checkCode, checkEmail, changePassword, getUsers, login, loginFacebook, recoverEmail, register, uploadAvatar } from "../controllers/userController.js";
import { resetToken } from "../controllers/authController.js";
import { upload } from "../controllers/uploadController.js";

const userRoutes = express()

userRoutes.get("/get-users", getUsers)

userRoutes.post("/login", login) 
userRoutes.post("/login-facebook", loginFacebook) 
userRoutes.post("/register", register)
userRoutes.post("/reset-token", resetToken)

userRoutes.get("/recover-email", recoverEmail)

userRoutes.post("/check-email", checkEmail)
userRoutes.post("/check-code", checkCode)
userRoutes.post("/change-password", changePassword)

userRoutes.put("/upload-avatar", upload.single("avatar"), uploadAvatar)
//! upload many images -> upload.array("avatar")

export default userRoutes