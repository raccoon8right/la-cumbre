import db from '../config/db.js';

export const ObtenerCategorias = async () => {
    const [resultado] = await db.query('SELECT * FROM categoria');
    return resultado;
}

export const ObtenerCategoriaPorId = async (id) => {
    const [resultado] = await db.query('SELECT * FROM categoria WHERE id = ?', [id]);
    return resultado[0];
}

export const CrearCategoria = async (categoria) => {
    const { nombre, descripcion } = categoria;
    const [resultado] = await db.query('INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
    return resultado.insertId;
}

export const ActualizarCategoria = async (categoria) => {
    const { id, nombre, descripcion } = categoria;
    await db.query('UPDATE categoria SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id]);
}

export const EliminarCategoria = async (categoria) => {
    const { id } = categoria;
    await db.query('DELETE FROM categoria WHERE id = ?', [id]);
}