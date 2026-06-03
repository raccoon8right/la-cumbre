import db from '../config/db.js';

export const ObtenerClientes = async () => {
    const [resultado] = await db.query('SELECT * FROM cliente');
    return resultado;
}

export const ObtenerClientePorCi = async (ci) => {
    const [resultado] = await db.query('SELECT * FROM cliente WHERE ci_fk = ?', [ci]);
    return resultado[0];
}

export const CrearCliente = async (cliente) => {
    const { ci_fk, direccion, telefono } = cliente;
    const [resultado] = await db.query('INSERT INTO cliente (ci_fk, direccion, telefono) VALUES (?, ?, ?)', [ci_fk, direccion, telefono]);
    return resultado.insertId;
}

export const ActualizarCliente = async (cliente) => {
    const { ci_fk, direccion, telefono } = cliente;
    await db.query('UPDATE cliente SET direccion = ?, telefono = ? WHERE ci_fk = ?', [direccion, telefono, ci_fk]);
}
export const EliminarCliente = async (cliente) => {
    const { ci_fk } = cliente;
    await db.query(
        'DELETE FROM cliente WHERE ci_fk = ?', [ci_fk]);
}