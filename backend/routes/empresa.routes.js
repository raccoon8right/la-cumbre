import { getEmpresas, getEmpresaPorNIT, postEmpresa, putEmpresaPorNIT, deleteEmpresaPorNIT } from '../controllers/empresa.controller.js'
import express from 'express'

const routes = express.Router()

routes.get('/', getEmpresas)
routes.get('/:nit', getEmpresaPorNIT)
routes.post('/', postEmpresa)
routes.put('/:nit', putEmpresaPorNIT)
routes.delete('/:nit', deleteEmpresaPorNIT)

export default routes