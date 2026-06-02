import db from '../config/db.js'

export const obtenerEmpresas = async () => {
    const [result] = await db.query('SELECT * FROM empresa')
    return result
}

export const obtenerEmpresaPorNIT = async (nit) => {
    const [result] = await db.query('SELECT * FROM empresa WHERE nit = ?', [nit])
    return result[0]
}

export const crearEmpresa = async (nit, nombre, direccion, telefono, facebook, ciudad) => {
    await db.query(
        'INSERT INTO empresa(nit, nombre, direccion, telefono, facebook, ciudad) VALUES (?, ?, ?, ?, ?, ?)',
        [nit, nombre, direccion, telefono, facebook, ciudad]
    )
    const [result] = await db.query('SELECT * FROM empresa WHERE nit = ?', [nit])
    return result[0]
}

export const modificarEmpresaPorNIT = async (nit, nombre, direccion, telefono, facebook, ciudad) => {
    const empresaExistente = await obtenerEmpresaPorNIT(nit)
    if (!empresaExistente) {
        throw new Error('Empresa no encontrada')
    }
    await db.query(
        'UPDATE empresa SET nombre = ?, direccion = ?,  telefono = ?, facebook = ?, ciudad = ? WHERE nit = ?',
        [nombre, direccion, telefono, facebook, ciudad, nit]
    )
    return empresaExistente
}

export const eliminarEmpresaPorNIT = async (nit) => {
    const empresaExistente = await obtenerEmpresaPorNIT(nit)
    if (!empresaExistente) {
        throw new Error('Empresa no encontrada')
    }
    await db.query('DELETE FROM empresa WHERE nit = ?', [nit])
    return empresaExistente
}