import db from '../config/db.js'

export const obtenerTransportes = async () => {
    const [result] = await db.query('SELECT * FROM transporte ORDER BY nombre')
    return result
}

export const obtenerTransportePorId = async (id) => {
    const [result] = await db.query('SELECT * FROM transporte WHERE id = ?', [id])
    return result[0]
}
export const crearTransporte = async ({ nombre, NIT, tipo, confiabilidad, peso, precio_envio }) => {
    const [result] = await db.query(
        'INSERT INTO transporte (nombre, NIT, tipo, confiabilidad, peso, precio_envio) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, NIT, tipo, confiabilidad, peso, precio_envio]
    );
    return await obtenerTransportePorId(result.insertId);
};

export const modificarTransporte = async (id, { nombre, NIT, tipo, confiabilidad, peso, precio_envio }) => {
    const existente = await obtenerTransportePorId(id);
    if (!existente) throw new Error('Transporte no encontrado');
    await db.query(
        'UPDATE transporte SET nombre = ?, NIT = ?, tipo = ?, confiabilidad = ?, peso = ?, precio_envio = ? WHERE id = ?',
        [nombre, NIT, tipo, confiabilidad, peso, precio_envio, id]
    );
    return await obtenerTransportePorId(id);
};

export const eliminarTransporte = async (id) => {
    const existente = await obtenerTransportePorId(id)
    if (!existente) throw new Error('Transporte no encontrado')
    await db.query('DELETE FROM transporte WHERE id = ?', [id])
    return existente
}