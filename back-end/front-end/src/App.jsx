import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import DashboardClient from './pages/DashboardClient'
import SignupClient from './pages/SignupClient'
import ViewGp from './pages/viewGp'
import Verify_user from './pages/verify_user'
import Create from './pages/create_gp'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {



  return (
    <>
      <div>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create_gp" element={<Create />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/verify_user/:email' element={<Verify_user />} />
          <Route path='/dashClient' element={<DashboardClient />} />
          <Route path='/client/:id' element={<SignupClient />} />
          <Route path='/viewGp/:id' element={<ViewGp />} />
      </Routes>
      </div>
    </> 
  )
}

export default App
