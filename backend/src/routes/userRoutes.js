import express from "express";
import { getUsers, login, loginFacebook, register } from "../controllers/userController.js";

const userRoutes = express()

userRoutes.get("/get-user", getUsers)

userRoutes.post("/login", login) 
userRoutes.post("/login-facebook", loginFacebook) 
userRoutes.post("/register", register)

export default userRoutes