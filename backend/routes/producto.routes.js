import { getProductos, getProductoPorCod, postProducto, putProductoPorCod, deleteProductoPorCod } from '../controllers/producto.controller.js'
import express from 'express'

const routes = express.Router()

routes.get('/', getProductos)
routes.get('/:cod', getProductoPorCod)
routes.post('/', postProducto)
routes.put('/:cod', putProductoPorCod)
routes.delete('/:cod', deleteProductoPorCod)

export default routes