import { body } from 'express-validator'

export const validarLlegan = [
    body('ci_fk').notEmpty().withMessage('El campo ci_fk es obligatorio'),
    body('cod_pedido_fk').notEmpty().withMessage('El campo cod_pedido_fk es obligatorio'),
    body('id_transporte_fk').notEmpty().withMessage('El campo id_transporte_fk es obligatorio')
]