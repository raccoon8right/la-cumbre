import { getPedido, getPedidoPorCod, postPedido, putPedidoPorCod, deletePedidoPorCod } from '../controllers/pedido.controller.js'
import express from 'express'

const routes = express.Router()

routes.get('/', getPedido)
routes.get('/:cod', getPedidoPorCod)
routes.post('/', postPedido)
routes.put('/:cod', putPedidoPorCod)
routes.delete('/:cod', deletePedidoPorCod)

export default routes