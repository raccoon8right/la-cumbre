import db from '../config/db.js';

export const ObtenerPersonas = async () => {
    const [resultado] = await db.query('SELECT * FROM persona');
    return resultado;
}

export const ObtenerPersonaPorCi = async (ci) => {
    const [resultado] = await db.query('SELECT * FROM persona WHERE ci = ?', [ci]);
    return resultado[0];
}

export const CrearPersona = async (persona) => {
    const { ci, nombres, apellidos, email, telefono, password, rol } = persona;
    const [resultado] = await db.query('INSERT INTO persona (ci, nombres, apellidos, email, telefono, password, rol) VALUES (?, ?, ?, ?, ?, ?, ?)', [ci, nombres, apellidos, email, telefono, password, rol]);
    return resultado.insertId;
}

export const ActualizarPersona = async (persona) => {
    const { ci, nombres, apellidos, email, telefono, password, rol } = persona;
    await db.query('UPDATE persona SET nombres = ?, apellidos = ?, email = ?, telefono = ?, password = ?, rol = ? WHERE ci = ?', [nombres, apellidos, email, telefono, password, rol, ci]);
}

export const EliminarPersona = async (persona) => {
    const { ci } = persona;
    await db.query('DELETE FROM persona WHERE ci = ?', [ci]);
}