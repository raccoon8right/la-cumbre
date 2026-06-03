import db from '../config/db.js'

export const ObtenerClientes = async () => {
    const [resultado] = await db.query(
        'SELECT p.*, c.direccion, c.telefono FROM persona p JOIN cliente c ON p.ci = c.ci_fk'
    )
    return resultado
}

export const ObtenerClientePorCi = async (ci) => {
    const [resultado] = await db.query(
        'SELECT p.*, c.direccion, c.telefono FROM persona p JOIN cliente c ON p.ci = c.ci_fk WHERE c.ci_fk = ?',
        [ci]
    )
    return resultado[0]
}

export const CrearCliente = async (ci_fk, direccion, telefono) => {
    const clienteExiste = await ObtenerClientePorCi(ci_fk)
    if (clienteExiste) throw new Error('El cliente ya existe')
    await db.query(
        'INSERT INTO cliente(ci_fk, direccion, telefono) VALUES (?, ?, ?)',
        [ci_fk, direccion, telefono]
    )
    return await ObtenerClientePorCi(ci_fk)
}

export const ActualizarCliente = async (ci_fk, direccion, telefono) => {
    const clienteExistente = await ObtenerClientePorCi(ci_fk)
    if (!clienteExistente) throw new Error('Cliente no encontrado')
    await db.query(
        'UPDATE cliente SET direccion = ?, telefono = ? WHERE ci_fk = ?',
        [direccion, telefono, ci_fk]
    )
    return await ObtenerClientePorCi(ci_fk)
}

export const EliminarCliente = async (ci_fk) => {
    const clienteExistente = await ObtenerClientePorCi(ci_fk)
    if (!clienteExistente) throw new Error('Cliente no encontrado')
    await db.query('DELETE FROM cliente WHERE ci_fk = ?', [ci_fk])
    return clienteExistente
}