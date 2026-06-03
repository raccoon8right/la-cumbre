import db from '../config/db.js'

export const ObtenerPersonas = async () => {
    const [resultado] = await db.query('SELECT * FROM persona')
    return resultado
}

export const ObtenerPersonaPorCi = async (ci) => {
    const [resultado] = await db.query('SELECT * FROM persona WHERE ci = ?', [ci])
    return resultado[0]
}

export const ObtenerPersonaPorEmail = async (email) => {
    const [resultado] = await db.query('SELECT * FROM persona WHERE email = ?', [email])
    return resultado[0]
}

export const CrearPersona = async (ci, nombres, apellidos, email, password, rol) => {
    const personaExiste = await ObtenerPersonaPorCi(ci)
    if (personaExiste) throw new Error('La cédula ya está registrada')
    const emailExiste = await ObtenerPersonaPorEmail(email)
    if (emailExiste) throw new Error('El email ya está registrado')
    await db.query(
        'INSERT INTO persona(ci, nombres, apellidos, email, password, rol) VALUES (?, ?, ?, ?, ?, ?)',
        [ci, nombres, apellidos, email, password, rol]
    )
    return await ObtenerPersonaPorCi(ci)
}

export const ActualizarPersona = async (ci, nombres, apellidos, email) => {
    const personaExistente = await ObtenerPersonaPorCi(ci)
    if (!personaExistente) throw new Error('Persona no encontrada')
    await db.query(
        'UPDATE persona SET nombres = ?, apellidos = ?, email = ? WHERE ci = ?',
        [nombres, apellidos, email, ci]
    )
    return await ObtenerPersonaPorCi(ci)
}

export const EliminarPersona = async (ci) => {
    const personaExistente = await ObtenerPersonaPorCi(ci)
    if (!personaExistente) throw new Error('Persona no encontrada')
    await db.query('DELETE FROM persona WHERE ci = ?', [ci])
    return personaExistente
}