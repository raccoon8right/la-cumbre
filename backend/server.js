import express from 'express'
import 'dotenv/config'
import empresaRoutes from './routes/empresa.routes.js'
import productoRoutes from './routes/producto.routes.js'
import pedidoRoutes from './routes/pedido.routes.js'
import lleganRoutes from './routes/llegan.routes.js'
import imagenProductoRoutes from './routes/imagenProducto.routes.js'

const app = express()
app.use(express.json())

app.use('/api/empresas', empresaRoutes)
app.use('/api/productos', productoRoutes)
app.use('/api/pedidos', pedidoRoutes)
app.use('/api/llegan', lleganRoutes)
app.use('/api/imagenProductos', imagenProductoRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})