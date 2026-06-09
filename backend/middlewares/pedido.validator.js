import { body } from 'express-validator'

export const validarPedido = [
    body('direccion_entrega').notEmpty().withMessage('El campo dirección de entrega es obligatorio'),
    body('estado').isIn(['pendiente', 'enviado', 'entregado', 'cancelado']).withMessage('Estado inválido'),
    body('total').notEmpty().withMessage('El campo total es obligatorio')
        .isFloat({ min: 0 }).withMessage('El campo total debe ser un número positivo')
]