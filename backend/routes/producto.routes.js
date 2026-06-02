import { getProductos, getProductoPorCod, postProducto, putProductoPorCod, deleteProductoPorCod } from '../controllers/producto.controller.js'
import { validarProducto } from '../middlewares/producto.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import express from 'express'

const routes = express.Router()

routes.get('/', getProductos)
routes.get('/:cod', getProductoPorCod)
routes.post('/', validarProducto, validarCampos, postProducto)
routes.put('/:cod', validarProducto, validarCampos, putProductoPorCod)
routes.delete('/:cod', deleteProductoPorCod)

export default routes