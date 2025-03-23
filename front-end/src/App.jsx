import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Login_client from './pages/login_client'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Signup_client from './pages/register_client'
import DashboardClient from './pages/DashboardClient'
import SignupClient from './pages/SignupClient'
import ViewGp from './pages/viewGp'
import ViewAsk from './pages/viewAsk'
import Verify_user from './pages/verify_user'
import Verify_client from './pages/verify_client'
import Create from './pages/create_gp'
import Update from './pages/update'
import getCookie from './pages/getCookie'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {



  return (
    <>
      <div>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login_client" element={<Login_client />} />
      <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create_gp" element={<Create />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/register_client' element={<Signup_client />} />
          <Route path='/verify_user/:email' element={<Verify_user />} />
          <Route path='/verify_client/:email' element={<Verify_client />} />
          <Route path='/dashClient' element={<DashboardClient />} />
          <Route path='/client/:id' element={<SignupClient />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/viewGp/:id' element={<ViewGp />} />
          <Route path='/viewAsk/:id' element={<ViewAsk />} />
      </Routes>
      </div>
    </> 
  )
}

export default App
