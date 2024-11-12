import http from 'http'
import dotenv from 'dotenv'
import app from './app'

dotenv.config()

const server = http.createServer(app)
    server.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_NAME} listening on port ${process.env.APP_PORT}. ${process.pid}`);
})