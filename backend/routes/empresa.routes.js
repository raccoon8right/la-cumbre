import { getEmpresas, getEmpresaPorNIT, postEmpresa, putEmpresaPorNIT, deleteEmpresaPorNIT } from '../controllers/empresa.controller.js'
import { validarEmpresa } from '../middlewares/empresa.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import express from 'express'

const routes = express.Router()

routes.get('/', getEmpresas)
routes.get('/:nit', getEmpresaPorNIT)
routes.post('/', validarEmpresa, validarCampos, postEmpresa)
routes.put('/:nit', validarEmpresa, validarCampos, putEmpresaPorNIT)
routes.delete('/:nit', deleteEmpresaPorNIT)

export default routes