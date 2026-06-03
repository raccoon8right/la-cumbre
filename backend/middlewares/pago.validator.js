import { body } from 'express-validator'

export const validarPago = [
    body('pedido_cod_fk').notEmpty().withMessage('El campo pedido_cod_fk es obligatorio'),
    body('metodo').notEmpty().withMessage('El campo metodo es obligatorio'),
    body('monto').notEmpty().withMessage('El campo monto es obligatorio')
        .isFloat({ min: 0 }).withMessage('El monto debe ser un número positivo')
]