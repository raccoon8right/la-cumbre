import { getDetallePedidos, getDetallePedidoPorId, crearD, actualizarD, eliminarD } from '../controllers/detallePedido.controller.js';
import { validarDetallePedido } from '../middlewares/detallePedido.validator.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { Router } from 'express';

const rutasDetallePedido = Router();

rutasDetallePedido.get('/', getDetallePedidos);
rutasDetallePedido.get('/:id', getDetallePedidoPorId);
rutasDetallePedido.post('/', validarDetallePedido, validarCampos, crearD);
rutasDetallePedido.put('/:id', validarDetallePedido, validarCampos, actualizarD);
rutasDetallePedido.delete('/:id', eliminarD);

export default rutasDetallePedido;