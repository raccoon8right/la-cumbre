import { body } from 'express-validator'

export const validarPedido = [
    body('cod').notEmpty().withMessage('El campo código es obligatorio'),
    body('direccion_entrega').notEmpty().withMessage('El campo dirección de entrega es obligatorio'),
    body('total').notEmpty().withMessage('El campo total es obligatorio')
        .isFloat({ min: 0 }).withMessage('El campo total debe ser un número positivo')
]