import { getPedido, getPedidoPorCod, postPedido, putPedidoPorCod, deletePedidoPorCod } from '../controllers/pedido.controller.js'
import { validarPedido } from '../middlewares/pedido.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import express from 'express'

const routes = express.Router()

routes.get('/', getPedido)
routes.get('/:cod', getPedidoPorCod)
routes.post('/', validarPedido, validarCampos, postPedido)
routes.put('/:cod', validarPedido, validarCampos, putPedidoPorCod)
routes.delete('/:cod', deletePedidoPorCod)

export default routes