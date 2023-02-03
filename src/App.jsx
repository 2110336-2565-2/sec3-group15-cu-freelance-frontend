import tw from 'twin.macro'
import { Routes,Route,Navigate } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ProfilePage from './pages/Profile'

function App() {

  return (
    <Routes>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="*" element={<Navigate to="/home"/>}/>
    </Routes>
  )
}

export default App
