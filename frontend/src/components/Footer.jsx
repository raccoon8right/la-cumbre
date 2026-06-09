import { Link } from 'react-router-dom'

function Footer() {
    const anio = new Date().getFullYear()

    return (
        <footer className='footer'>
            <div className='footer-contenido'>
                {/* Brand */}
                <div className='footer-brand'>
                    <h3>La Cumbre</h3>
                    <p className='footer-tagline'>Genuine Pewter</p>
                    <p className='footer-desc'>
                        Artesanía metalúrgica boliviana de alta calidad. Tradición y elegancia en cada pieza.
                    </p>
                </div>

                {/* Nav */}
                <div className='footer-col'>
                    <h4>Tienda</h4>
                    <ul>
                        <li><Link to='/productos'>Productos</Link></li>
                        <li><Link to='/carrito'>Carrito</Link></li>
                        <li><Link to='/mis-pedidos'>Mis pedidos</Link></li>
                    </ul>
                </div>

                <div className='footer-col'>
                    <h4>Empresa</h4>
                    <ul>
                        <li><Link to='/'>Inicio</Link></li>
                        <li><Link to='/contactanos'>Contáctanos</Link></li>
                    </ul>
                </div>

                {/* Contacto */}
                <div className='footer-col'>
                    <h4>Contacto</h4>
                    <ul className='footer-contacto'>
                        <li>📍 La Paz, Bolivia</li>
                        <li>📞 +591 2 123 4567</li>
                        <li>✉️ info@lacumbre.bo</li>
                        <li>🕐 Lun–Vie 8:00–18:00</li>
                    </ul>
                </div>
            </div>

            <div className='footer-bottom'>
                <p>© {anio} La Cumbre — Genuine Pewter. Todos los derechos reservados.</p>
                <p className='footer-hecho'>Hecho en Bolivia 🇧🇴</p>
            </div>
        </footer>
    )
}

export default Footer