import { getClientes, getClientePorCi, crearC, actualizarC, eliminarC } from '../controllers/cliente.controller.js'
import { validarCliente } from '../middlewares/cliente.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const rutasCliente = Router()

rutasCliente.get('/',verificarToken,  getClientes)
rutasCliente.get('/:ci', verificarToken, getClientePorCi)
rutasCliente.post('/', verificarToken, verificarRol('administrador'), validarCliente, validarCampos, crearC)
rutasCliente.put('/:ci', verificarToken, verificarRol('administrador'), validarCliente, validarCampos, actualizarC)
rutasCliente.delete('/:ci', verificarToken, verificarRol('administrador'), eliminarC)

export default rutasCliente