import dotenv from 'dotenv'

// import data từ file config
dotenv.config()

export default {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    pw: process.env.DB_PW,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
}

// console.log(process.env)