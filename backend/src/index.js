import express from 'express'
import cors from 'cors'
import rootRoutes from './routes/rootRoutes.js'

// Initialise Express App
const app = express()

//TODO: MIDDLEWARE
// Configuring app to use json
app.use(express.json())

// Positioning original directory path
app.use(express.static("."))

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

