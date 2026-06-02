import express from 'express'
import 'dotenv/config'
import rutasPago from './routes/pago.routes.js'

// importar rutas, errorhandler, token

const app = express()
app.use(express.json())

// poner rutas
app.use('api/pagos', rutasPago);
// poner errorhandler

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

// git add . Añade todos los archivos al staging area
// git commit -m ""
// git push origin nombre-de-la-rama

