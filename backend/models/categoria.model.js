import db from '../config/db.js'

export const ObtenerCategorias = async () => {
    const [resultado] = await db.query('SELECT * FROM categoria')
    return resultado
}

export const ObtenerCategoriaPorId = async (id) => {
    const [resultado] = await db.query('SELECT * FROM categoria WHERE id = ?', [id])
    return resultado[0]
}

export const CrearCategoria = async (nombre, descripcion) => {
    const [resultado] = await db.query(
        'INSERT INTO categoria(nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion]
    )
    return await ObtenerCategoriaPorId(resultado.insertId)
}

export const ActualizarCategoria = async (id, nombre, descripcion) => {
    const categoriaExistente = await ObtenerCategoriaPorId(id)
    if (!categoriaExistente) throw new Error('Categoría no encontrada')
    await db.query(
        'UPDATE categoria SET nombre = ?, descripcion = ? WHERE id = ?',
        [nombre, descripcion, id]
    )
    return await ObtenerCategoriaPorId(id)
}

export const EliminarCategoria = async (id) => {
    const categoriaExistente = await ObtenerCategoriaPorId(id)
    if (!categoriaExistente) throw new Error('Categoría no encontrada')
    await db.query('DELETE FROM categoria WHERE id = ?', [id])
    return categoriaExistente
}