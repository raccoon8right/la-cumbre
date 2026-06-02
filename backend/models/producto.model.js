import db from '../config/db.js'

export const obtenerProductos = async () => {
    const [result] = await db.query('SELECT * FROM producto')
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
    const result = await obtenerProductoPorCod(cod)
    return result
}

export const eliminarProductoPorCod = async (cod) => {
    const productoExistente = await obtenerProductoPorCod(cod)
    if (!productoExistente) {
        throw new Error('Producto no encontrado')
    }
    await db.query('DELETE FROM producto WHERE cod = ?', [cod])
    return productoExistente
}