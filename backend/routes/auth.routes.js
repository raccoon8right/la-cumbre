import { register, logearse } from '../controllers/auth.controller.js'
import express from 'express'

const routes = express.Router()

routes.post('/register', register)
routes.get('/login', logearse)

export default routes