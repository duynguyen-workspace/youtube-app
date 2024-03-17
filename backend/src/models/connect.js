import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const sequelize = new Sequelize(config.database, config.user, config.pw, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
})

export default sequelize

// const sequelize = new Sequelize('db_youtube', 'root', '1234', {
//     host: "localhost",
//     port: 3307,
//     dialect: "mysql"
// })

// try {
//     await sequelize.authenticate()
//     console.log("Connect successfully!")
// } catch(err) {
//     console.log(err)
// }

//! Không dùng chuỗi kết nối sequelize
//TODO: => kết nối bằng sequelize-auto
// yarn sequelize-auto -h localhost -d db_youtube -u root -x 1234 -p 3307 --dialect mysql -o "./src/models" -l esm