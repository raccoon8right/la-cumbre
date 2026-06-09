import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import Carrito from './pages/Carrito.jsx'
import MisPedidos from './pages/MisPedidos.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminProductos from './pages/AdminProductos.jsx'
import AdminEmpresas from './pages/AdminEmpresas.jsx'
import AdminCategorias from './pages/AdminCategorias.jsx'
import AdminPedidos from './pages/AdminPedidos.jsx'
import AdminMinerales from './pages/AdminMinerales.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import AdminTransportes from './pages/AdminTransportes.jsx'
import Contactanos from './pages/Contactanos.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/productos' element={<PrivateRoute><Productos /></PrivateRoute>} />
        <Route path='/productos/:cod' element={<PrivateRoute><ProductoDetalle /></PrivateRoute>} />
        <Route path='/carrito' element={<PrivateRoute><Carrito /></PrivateRoute>} />
        <Route path='/mis-pedidos' element={<PrivateRoute><MisPedidos /></PrivateRoute>} />
        <Route path='/contactanos' element={<PrivateRoute><Contactanos /></PrivateRoute>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/admin' element={<PrivateRoute rol='administrador'><AdminDashboard /></PrivateRoute>} />
        <Route path='/admin/productos' element={<PrivateRoute rol='administrador'><AdminProductos /></PrivateRoute>} />
        <Route path='/admin/empresas' element={<PrivateRoute rol='administrador'><AdminEmpresas /></PrivateRoute>} />
        <Route path='/admin/categorias' element={<PrivateRoute rol='administrador'><AdminCategorias /></PrivateRoute>} />
        <Route path='/admin/pedidos' element={<PrivateRoute rol='administrador'><AdminPedidos /></PrivateRoute>} />
        <Route path='/admin/trasnportes' element={<PrivateRoute rol='administrador'><AdminTransportes /></PrivateRoute>} />
        <Route path='/admin/minerales' element={<PrivateRoute rol='administrador'><AdminMinerales /></PrivateRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App