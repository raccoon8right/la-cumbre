import express from 'express'
import 'dotenv/config'
import cors from 'cors'
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
import axios from 'axios'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173', // puerto de Vite
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
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
app.get('/api/minerales', async (req, res) => {
    try {
        const response = await axios.get('https://api.metals.live/v1/spot/commodities', { timeout: 5000 });
        const MINERALES = { tin: 'Estaño', copper: 'Cobre' };
        const lista = response.data
            .filter(item => MINERALES[item.metal])
            .map(item => ({
                metal: MINERALES[item.metal],
                price: item.price,
                unidad: 'USD/lb'
            }));
        lista.push({
            metal: 'Antimonio',
            price: null,
            unidad: 'No disponible',
            nota: 'Precio referencial: ~$38,000/t (2024)'
        });
        res.json(lista);
    } catch (error) {
        console.error('Error al obtener precios de minerales:', error.message);
        // Fallback: devolver datos estáticos para que el frontend no rompa
        res.status(200).json([
            { metal: 'Cobre', price: 4.20, unidad: 'USD/lb', nota: 'Precio estimado (fallback)' },
            { metal: 'Estaño', price: 28.50, unidad: 'USD/lb', nota: 'Precio estimado (fallback)' },
            { metal: 'Antimonio', price: null, unidad: 'No disponible', nota: 'Precio referencial: ~$38,000/t (2024)' }
        ]);
    }
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})