import { getPedido, getPedidoPorCod, postPedido, putPedidoPorCod, deletePedidoPorCod } from '../controllers/pedido.controller.js'
import { validarPedido } from '../middlewares/pedido.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import express from 'express'

const routes = express.Router()

routes.get('/', verificarToken, getPedido)
routes.get('/:cod', verificarToken, getPedidoPorCod)
routes.post('/', verificarToken, validarPedido, validarCampos, postPedido)
routes.put('/:cod', verificarToken, verificarRol('administrador'), validarPedido, validarCampos, putPedidoPorCod)
routes.delete('/:cod', verificarToken, verificarRol('administrador'), deletePedidoPorCod)

export default routes