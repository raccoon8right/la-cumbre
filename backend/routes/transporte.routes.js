import { getTransportes, getTransportePorId, crearT, actualizarT, eliminarT } from '../controllers/transporte.controller.js'
import { validarTransporte } from '../middlewares/transporte.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const rutasTransporte = Router()

rutasTransporte.get('/', verificarToken, getTransportes)
rutasTransporte.get('/:id', verificarToken, getTransportePorId)
rutasTransporte.post('/', verificarToken, verificarRol('administrador'), validarTransporte, validarCampos, crearT)
rutasTransporte.put('/:id', verificarToken, verificarRol('administrador'), validarTransporte, validarCampos, actualizarT)
rutasTransporte.delete('/:id', verificarToken, verificarRol('administrador'), eliminarT)

export default rutasTransporte