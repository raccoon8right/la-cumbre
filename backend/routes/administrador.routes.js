import { getAdministradores, getAdministradorPorCi, crearA, eliminarA } from '../controllers/administrador.controller.js'
import { validarAdministrador } from '../middlewares/administrador.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const rutasAdministrador = Router()

rutasAdministrador.get('/', verificarToken, getAdministradores)
rutasAdministrador.get('/:ci', verificarToken, getAdministradorPorCi)
rutasAdministrador.post('/', verificarToken, verificarRol('administrador'), validarAdministrador, validarCampos, crearA)
rutasAdministrador.delete('/:ci', verificarToken, verificarRol('administrador'), eliminarA)

export default rutasAdministrador;