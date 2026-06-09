import db from '../config/db.js'

export const obtenerProductos = async () => {
    const [result] = await db.query(`
        SELECT p.*, ip.url as imagen_url 
        FROM producto p
        LEFT JOIN imagenproducto ip ON p.cod = ip.producto_cod_fk AND ip.es_principal = 1
        WHERE p.activo = 1
    `)
    return result
}

export const obtenerProductoPorCod = async (cod) => {
    const [result] = await db.query('SELECT * FROM producto WHERE cod = ?', [cod])
    return result[0]
}

export const crearProducto = async (cod, nombre, tipo, material, descripcion, precio, stock, activo, categoria_id_fk, empresa_nit_fk, admin_ci_fk) => {
    const productoExiste = await obtenerProductoPorCod(cod)
    if (productoExiste) {
        throw new Error('El código del producto ya existe')
    }
    await db.query(
        'INSERT INTO producto(cod, nombre, tipo, material, descripcion, precio, stock, activo, categoria_id_fk, empresa_nit_fk, admin_ci_fk) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [cod, nombre, tipo, material, descripcion, precio, stock, activo, categoria_id_fk, empresa_nit_fk, admin_ci_fk]
    )
    return await obtenerProductoPorCod(cod)
}

export const modificarProductoPorCod = async (cod, nombre, tipo, material, descripcion, precio, stock, activo, categoria_id_fk, empresa_nit_fk, admin_ci_fk) => {
    const productoExistente = await obtenerProductoPorCod(cod)
    if (!productoExistente) {
        throw new Error('Producto no encontrado')
    }
    await db.query('UPDATE producto SET nombre = ?, tipo = ?, material = ?, descripcion = ?, precio = ?, stock = ?, activo = ?, categoria_id_fk = ?, empresa_nit_fk = ?, admin_ci_fk = ? WHERE cod = ?',
        [nombre, tipo, material, descripcion, precio, stock, activo, categoria_id_fk, empresa_nit_fk, admin_ci_fk, cod]
    )
    return await obtenerProductoPorCod(cod)
}

export const eliminarProductoPorCod = async (cod) => {
    const productoExistente = await obtenerProductoPorCod(cod)
    if (!productoExistente) {
        throw new Error('Producto no encontrado')
    }
    await db.query('UPDATE producto SET activo = 0 WHERE cod = ?', [cod])
    return productoExistente
}

/**
 * Descuenta stock de múltiples productos en una sola transacción.
 * items: [{ cod, cantidad }]
 * Lanza error si algún producto no tiene stock suficiente.
 */
export const descontarStock = async (items) => {
    const connection = await db.getConnection()
    try {
        await connection.beginTransaction()

        for (const { cod, cantidad } of items) {
            // Lock de fila para evitar condiciones de carrera
            const [rows] = await connection.query(
                'SELECT stock FROM producto WHERE cod = ? FOR UPDATE',
                [cod]
            )
            if (!rows[0]) throw new Error(`Producto ${cod} no encontrado`)
            if (rows[0].stock < cantidad) {
                throw new Error(`Stock insuficiente para el producto ${cod} (disponible: ${rows[0].stock})`)
            }
            await connection.query(
                'UPDATE producto SET stock = stock - ? WHERE cod = ?',
                [cantidad, cod]
            )
        }

        await connection.commit()
    } catch (err) {
        await connection.rollback()
        throw err
    } finally {
        connection.release()
    }
}