import { body } from 'express-validator'

export const validarDetallePedido = [
    body('pedido_cod_fk').notEmpty().withMessage('El campo pedido_cod_fk es obligatorio'),
    body('producto_cod_fk').notEmpty().withMessage('El campo producto_cod_fk es obligatorio'),
    body('cantidad').notEmpty().withMessage('El campo cantidad es obligatorio')
        .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),
    body('precio_unitario').notEmpty().withMessage('El campo precio_unitario es obligatorio')
        .isFloat({ min: 0 }).withMessage('El precio unitario debe ser un número positivo')
]