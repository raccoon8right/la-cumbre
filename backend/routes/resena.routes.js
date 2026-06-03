import { getResenas, getResenaPorId, crearR, actualizarR, eliminarR } from '../controllers/resena.controller.js'
import { validarResena } from '../middlewares/resena.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const rutasResena = Router()

rutasResena.get('/', verificarToken, getResenas)
rutasResena.get('/:id', verificarToken, getResenaPorId)
rutasResena.post('/', verificarToken, crearR)
rutasResena.put('/:id', verificarToken, validarResena, validarCampos, actualizarR)
rutasResena.delete('/:id', verificarToken, verificarRol('administrador'), eliminarR)

export default rutasResena