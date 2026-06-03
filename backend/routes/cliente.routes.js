import { getClientes, getClientePorCi, crearC, actualizarC, eliminarC } from '../controllers/cliente.controller.js';
import { validarCliente } from '../middlewares/cliente.validator.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { Router } from 'express';

const rutasCliente = Router();

rutasCliente.get('/', getClientes);
rutasCliente.get('/:ci', getClientePorCi);
rutasCliente.post('/', validarCliente, validarCampos, crearC);
rutasCliente.put('/:ci', validarCliente, validarCampos, actualizarC);
rutasCliente.delete('/:ci', eliminarC);

export default rutasCliente;