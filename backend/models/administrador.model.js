import db from '../config/db.js';

export const ObtenerAdministradores = async () => {
    const [resultado] = await db.query('SELECT * FROM administrador');
    return resultado;
}

export const ObtenerAdministradorPorCi = async (ci) => {
    const [resultado] = await db.query('SELECT * FROM administrador WHERE ci_fk = ?', [ci]);
    return resultado[0];
}

export const CrearAdministrador = async (administrador) => {
    const { ci_fk } = administrador;
    const [resultado] = await db.query('INSERT INTO administrador (ci_fk) VALUES (?)', [ci_fk]);
    return resultado.insertId;
}

export const ActualizarAdministrador = async (administrador) => {
    const { ci_fk } = administrador;
    await db.query('UPDATE administrador SET ci_fk = ? WHERE ci_fk = ?', [ci_fk, ci_fk]);
}

export const EliminarAdministrador = async (administrador) => {
    const { ci_fk } = administrador;
    await db.query('DELETE FROM administrador WHERE ci_fk = ?', [ci_fk]);
}