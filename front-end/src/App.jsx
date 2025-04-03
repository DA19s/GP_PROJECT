import { Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil";
import AuthForm from "./pages/AuthForm"; // Importation de AuthForm
import AuthForm2 from "./pages/AuthForm2";
import Create from "./pages/create_gp";
import Dashboard from "./pages/Dashboard";
import DashboardClient from "./pages/DashboardClient";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupClient from "./pages/SignupClient";
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
          {/* Route unique pour AuthForm, elle s'adapte à l'état (connexion ou inscription) */}
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/auth2" element={<AuthForm2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          {/* Routes pour les autres pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create_gp" element={<Create />} />
          <Route path="/register" element={<AuthForm />} />{" "}
          {/* AuthForm pour l'inscription */}
          <Route path="/register_client" element={<AuthForm />} />{" "}
          {/* AuthForm pour client aussi */}
          <Route path="/verify_user/:email" element={<Verify_user />} />
          <Route path="/verify_client/:email" element={<Verify_client />} />
          <Route path="/dashClient" element={<DashboardClient />} />
          <Route path="/client/:id" element={<SignupClient />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/viewGp" element={<ViewGp />} />
          <Route path="/viewAsk/:id" element={<ViewAsk />} />
          <Route path="/" element={<Accueil />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
