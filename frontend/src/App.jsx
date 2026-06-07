import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashborad from './pages/Dashboard.jsx'
import Navbar from './components/Navbar.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashborad />
          </PrivateRoute>
        } />
        <Route path='admin' element={
          <PrivateRoute rol='administrador'>
            <Dashborad />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App