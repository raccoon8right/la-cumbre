import { getEmpresas, getEmpresaPorNIT, postEmpresa, putEmpresaPorNIT, deleteEmpresaPorNIT } from '../controllers/empresa.controller.js'
import { validarEmpresa } from '../middlewares/empresa.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { verificarToken, verificarRol } from '../middlewares/auth.middleware.js'
import express from 'express'

const routes = express.Router()

routes.get('/', verificarToken, getEmpresas)
routes.get('/:nit', verificarToken, getEmpresaPorNIT)
routes.post('/', verificarToken, verificarRol('administrador'), validarEmpresa, validarCampos, postEmpresa)
routes.put('/:nit', verificarToken, verificarRol('administrador'), validarEmpresa, validarCampos, putEmpresaPorNIT)
routes.delete('/:nit', verificarToken, verificarRol('administrador'), deleteEmpresaPorNIT)

export default routes