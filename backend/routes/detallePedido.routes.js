import { getDetallePedidos, getDetallePedidoPorId, crearD, actualizarD, eliminarD } from '../controllers/detallePedido.controller.js'
import { validarDetallePedido } from '../middlewares/detallePedido.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const rutasDetallePedido = Router()

rutasDetallePedido.get('/', verificarToken, getDetallePedidos)
rutasDetallePedido.get('/:id', verificarToken, getDetallePedidoPorId)
rutasDetallePedido.post('/', verificarToken, validarDetallePedido, validarCampos, crearD)
rutasDetallePedido.put('/:id', verificarToken, verificarRol('administrador'), validarDetallePedido, validarCampos, actualizarD)
rutasDetallePedido.delete('/:id', verificarToken, verificarRol('administrador'), eliminarD)

export default rutasDetallePedido