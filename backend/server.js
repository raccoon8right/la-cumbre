import express from 'express'
import 'dotenv/config'
import empresaRoutes from './routes/empresa.routes.js'
import productoRoutes from './routes/producto.routes.js'
import pedidoRoutes from './routes/pedido.routes.js'
import lleganRoutes from './routes/llegan.routes.js'
import imagenProductoRoutes from './routes/imagenProducto.routes.js'
import rutasPago from './routes/pago.routes.js'
import rutasResena from './routes/resena.routes.js'
import rutasTransporte from './routes/transporte.routes.js'
import rutasDetallePedido from './routes/detallePedido.routes.js'
import rutasPersona from './routes/persona.routes.js'
import rutasCliente from './routes/cliente.routes.js'
import rutasCategoria from './routes/categoria.routes.js'
import rutasAdministrador from './routes/administrador.routes.js'
import authroutes from './routes/auth.routes.js'

const app = express()
app.use(express.json())

app.use('/api/empresas', empresaRoutes)
app.use('/api/productos', productoRoutes)
app.use('/api/pedidos', pedidoRoutes)
app.use('/api/llegan', lleganRoutes)
app.use('/api/imagenProductos', imagenProductoRoutes)
app.use('/api/pagos', rutasPago)
app.use('/api/resenas', rutasResena)
app.use('/api/transportes', rutasTransporte)
app.use('/api/detallePedidos', rutasDetallePedido)
app.use('/api/personas', rutasPersona)
app.use('/api/clientes', rutasCliente)
app.use('/api/categorias', rutasCategoria)
app.use('/api/administradores', rutasAdministrador)
app.use('/api/auth', authroutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})