import express from 'express'
import 'dotenv/config'

// importar rutas, errorhandler, token

const app = express()
app.use(express.json())

// poner rutas

// poner errorhandler

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})