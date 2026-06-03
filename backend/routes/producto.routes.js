import { getProductos, getProductoPorCod, postProducto, putProductoPorCod, deleteProductoPorCod } from '../controllers/producto.controller.js'
import { validarProducto } from '../middlewares/producto.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import express from 'express'

const routes = express.Router()

routes.get('/', verificarToken, getProductos)
routes.get('/:cod', verificarToken, getProductoPorCod)
routes.post('/', verificarToken, verificarRol('administrador'), validarProducto, validarCampos, postProducto)
routes.put('/:cod', verificarToken, verificarRol('administrador'), validarProducto, validarCampos, putProductoPorCod)
routes.delete('/:cod', verificarToken, verificarRol('administrador'), deleteProductoPorCod)

export default routes