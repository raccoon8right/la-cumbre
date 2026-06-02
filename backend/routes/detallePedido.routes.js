import {getDetallePedidos, getDetallePedidoPorId, crearD, actualizarD, eliminarD} from '../controllers/detallePedido.controller.js';
import {Router} from 'express';

const rutasDetallePedido = Router();

rutasDetallePedido.get('/', getDetallePedidos);
rutasDetallePedido.get('/:id', getDetallePedidoPorId);
rutasDetallePedido.post('/', crearD);
rutasDetallePedido.put('/:id', actualizarD);
rutasDetallePedido.delete('/:id', eliminarD);

export default rutasDetallePedido;