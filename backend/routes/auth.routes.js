import { register, logearse, deslogearse } from '../controllers/auth.controller.js'
import { verificarToken } from '../middlewares/auth.middleware.js'
import { verificarCaptcha } from '../middlewares/captcha.middleware.js'
import express from 'express'

const routes = express.Router()

routes.post('/register', register)
routes.post('/login', verificarCaptcha, logearse)
routes.post('/logout', verificarToken, deslogearse)

export default routes