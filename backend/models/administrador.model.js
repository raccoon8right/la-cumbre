import db from '../config/db.js'

export const ObtenerAdministradores = async () => {
    const [resultado] = await db.query(
        'SELECT p.* FROM persona p JOIN administrador a ON p.ci = a.ci_fk'
    )
    return resultado
}

export const ObtenerAdministradorPorCi = async (ci) => {
    const [resultado] = await db.query(
        'SELECT p.* FROM persona p JOIN administrador a ON p.ci = a.ci_fk WHERE a.ci_fk = ?',
        [ci]
    )
    return resultado[0]
}

export const CrearAdministrador = async (ci_fk) => {
    const adminExiste = await ObtenerAdministradorPorCi(ci_fk)
    if (adminExiste) throw new Error('El administrador ya existe')
    await db.query('INSERT INTO administrador(ci_fk) VALUES (?)', [ci_fk])
    return await ObtenerAdministradorPorCi(ci_fk)
}

export const EliminarAdministrador = async (ci_fk) => {
    const adminExistente = await ObtenerAdministradorPorCi(ci_fk)
    if (!adminExistente) throw new Error('Administrador no encontrado')
    await db.query('DELETE FROM administrador WHERE ci_fk = ?', [ci_fk])
    return adminExistente
}