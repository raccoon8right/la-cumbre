import db from '../config/db.js'

export const registrarLog = async (ci_fk, email, ip, evento, browser) => {
    await db.query(
        'INSERT INTO LogAcceso(ci_fk, email, ip, evento, browser) VALUES (?, ?, ?, ?, ?)',
        [ci_fk, email, ip, evento, browser]
    )
}

export const obtenerLogs = async () => {
    const [result] = await db.query('SELECT * FROM LogAcceso ORDER BY fecha DESC')
    return result
}

export const obtenerLogsPorCi = async (ci_fk) => {
    const [result] = await db.query('SELECT * FROM LogAcceso WHERE ci_fk = ? ORDER BY fecha DESC', [ci_fk])
    return result
}