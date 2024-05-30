import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './shared/services/YupTranslations'
import { router } from './routes'

const server = express()

server.use(cors({
  origin: process.env.ENABLED_CORS
}))
server.use(express.json())
server.use(router)

export { server }
