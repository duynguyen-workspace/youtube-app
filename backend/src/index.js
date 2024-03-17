import express from 'express'
import cors from 'cors'
import rootRoutes from './routes/rootRoutes.js'

// khởi tạo app express
const app = express()

// middleware cấu hình lại body thành json
app.use(express.json())

// 
app.use(cors())

// 
app.use(rootRoutes)

// khởi tạo server với port quy định
app.listen(8080)

// import mysql from 'mysql2'

// const connect = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     port: "3307",
//     database: "db_youtube"
// })

