import express from 'express'
import cors from 'cors'
import rootRoutes from './routes/rootRoutes.js'
import { createServer } from "http";
import { Server } from "socket.io";
import initModels from './models/init-models.js';
import sequelize from './models/connect.js';

const model = initModels(sequelize)

// Initialise Express App
const app = express()

// Initialise Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition: {
        info: {
            title: "api",
            version: "1.0.0"
        }
    },
    apis: ["src/swagger/index.js"]
}

const specs = swaggerJsDoc(options);

//TODO: MIDDLEWARE
// Configuring app to use json
app.use(express.json())

// Positioning original directory path
app.use(express.static("."))

// 
app.use(cors({
    origin: "*",
}))

// 
app.use(rootRoutes)

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//TODO: INITIALISE BACKEND SERVER
app.listen(8080)

//TODO: SETUP SOCKETIO
const httpServer = createServer(app);

const io = new Server(httpServer, { 
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    // console.log(socket.id)

    socket.on("join-room", async (roomId) => {

        socket.join(roomId)

        let data = await model.chat.findAll({
            where: {
                room_id: roomId
            }
        })

        //! For leaving the server
        // socket.rooms.forEach(item => {
        //     socket.leave(item)
        // })
        
        io.to(roomId).emit("data-chat", data)
        
    })

    socket.on("send-message", async (data) => {
        // Save chat data to database
        let newData = {
            user_id: data.user_id,
            content: data.content,
            room_id: data.roomId,
            date: new Date()
        }

        await model.chat.create(newData)

        io.to(data.roomId).emit("sv-send-message", newData)
    })
});

httpServer.listen(8081);



