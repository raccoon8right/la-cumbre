import db from '../config/db.js'

export const obtenerLlegan = async () => {
    const [result] = await db.query('SELECT * FROM llegan')
    return result
}

export const obtenerLleganPorClaves = async (ci_fk, cod_pedido_fk, id_transporte_fk) => {
    const [result] = await db.query('SELECT * FROM llegan WHERE ci_fk = ? AND cod_pedido_fk = ? AND id_transporte_fk = ?', [ci_fk, cod_pedido_fk, id_transporte_fk])
    return result[0]
}

export const crearLlegan = async (ci_fk, cod_pedido_fk, id_transporte_fk) => {
    const lleganExiste = await obtenerLleganPorClaves(ci_fk, cod_pedido_fk, id_transporte_fk)
    if (lleganExiste) {
        throw new Error('La relación ya existe')
    }
    await db.query('INSERT INTO llegan(ci_fk, cod_pedido_fk, id_transporte_fk) VALUES (?, ?, ?)', [ci_fk, cod_pedido_fk, id_transporte_fk]
    )
    return await obtenerLleganPorClaves(ci_fk, cod_pedido_fk, id_transporte_fk)
}

export const eliminarLlegan = async (ci_fk, cod_pedido_fk, id_transporte_fk) => {
    const lleganExistente = await obtenerLleganPorClaves(ci_fk, cod_pedido_fk, id_transporte_fk)
    if (!lleganExistente) {
        throw new Error('Relación no encontrada')
    }
    await db.query('DELETE FROM llegan WHERE ci_fk = ? AND cod_pedido_fk = ? AND id_transporte_fk = ?', [ci_fk, cod_pedido_fk, id_transporte_fk])
    return lleganExistente
}