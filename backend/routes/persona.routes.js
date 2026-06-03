import { getPersonas, getPersonaPorCi, crearPe, actualizarPe, eliminarPe } from '../controllers/persona.controller.js'
import { validarPersona } from '../middlewares/persona.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const rutasPersona = Router()

rutasPersona.get('/', verificarToken, getPersonas)
rutasPersona.get('/:ci', verificarToken, getPersonaPorCi)
rutasPersona.post('/', verificarToken, verificarRol('administrador'), validarPersona, validarCampos, crearPe)
rutasPersona.put('/:ci', verificarToken,verificarRol('administrador'),  validarPersona, validarCampos, actualizarPe)
rutasPersona.delete('/:ci', verificarToken, verificarRol('administrador'), eliminarPe);

export default rutasPersona