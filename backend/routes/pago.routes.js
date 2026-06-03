import { getPagos, getPagoPorId, crearP, actualizarP, eliminarP } from '../controllers/pago.controller.js'
import { validarPago } from '../middlewares/pago.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const rutasPago = Router()

rutasPago.get('/', verificarToken, getPagos)
rutasPago.get('/:id', verificarToken, getPagoPorId)
rutasPago.post('/', verificarToken, verificarRol('administrador'), validarPago, validarCampos, crearP)
rutasPago.put('/:id', verificarToken, verificarRol('administrador'), validarPago, validarCampos, actualizarP)
rutasPago.delete('/:id', verificarToken, verificarRol('administrador'), eliminarP)

export default rutasPago