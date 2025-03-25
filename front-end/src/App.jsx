import { Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Dashboard from "./pages/Dashboard";
import DashboardClient from "./pages/DashboardClient";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupClient from "./pages/SignupClient";
import Create from "./pages/create_gp";
import Login_client from "./pages/login_client";
import Signup_client from "./pages/register_client";
import Update from "./pages/update";
import Verify_client from "./pages/verify_client";
import Verify_user from "./pages/verify_user";
import ViewAsk from "./pages/viewAsk";
import ViewGp from "./pages/viewGp";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login_client" element={<Login_client />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create_gp" element={<Create />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/register_client" element={<Signup_client />} />
          <Route path="/verify_user/:email" element={<Verify_user />} />
          <Route path="/verify_client/:email" element={<Verify_client />} />
          <Route path="/dashClient" element={<DashboardClient />} />
          <Route path="/client/:id" element={<SignupClient />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/viewGp/:id" element={<ViewGp />} /> {/* Correction ici */}
          <Route path="/viewAsk/:id" element={<ViewAsk />} />
          <Route path="/" element={<Accueil />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
