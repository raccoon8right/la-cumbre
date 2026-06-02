import db from '../config/db.js'

export const obtenerImagen = async () => {
    const [result] = await db.query('SELECT * FROM imagenproducto')
    return result
}

export const obtenerImagenPorID = async (id) => {
    const [result] = await db.query('SELECT * FROM imagenproducto WHERE id = ?', [id])
    return result[0]
}

export const obtenerImagenPorProducto = async (producto_cod_fk) => {
    const [result] = await db.query('SELECT * FROM imagenproducto WHERE producto_cod_fk = ?', [producto_cod_fk])
    return result
}

export const crearImagen = async (producto_cod_fk, url, es_principal) => {
    const [result] = await db.query('INSERT INTO imagenproducto(producto_cod_fk, url, es_principal) VALUES (?, ?, ?)',
        [producto_cod_fk, url, es_principal]
    )
    return await obtenerImagenPorID(result.insertId)
}

export const modificarImagenPorID = async (id, producto_cod_fk, url, es_principal) => {
    const imagenExistente = await obtenerImagenPorID(id)
    if (!imagenExistente) {
        throw new Error('Imagen no encontrada')
    }
    await db.query('UPDATE imagenproducto SET producto_cod_fk = ?, url = ?, es_principal = ? WHERE id = ?',
        [producto_cod_fk, url, es_principal, id]
    )
    return await obtenerImagenPorID(id)
}

export const eliminarImagenPorID = async (id) => {
    const imagenExistente = await obtenerImagenPorID(id)
    if (!imagenExistente) {
        throw new Error('Imagen no encontrada')
    }
    await db.query('DELETE FROM imagenproducto WHERE id = ?', [id])
    return imagenExistente
}