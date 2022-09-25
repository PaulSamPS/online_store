require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const {createServer} = require("http");
const connectDb = require("./db");

const PORT = process.env.PORT || 5000

const app = express()
const httpServer = createServer(app)
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await connectDb()
        httpServer.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

