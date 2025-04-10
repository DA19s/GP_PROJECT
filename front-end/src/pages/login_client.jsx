import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login_client = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/cli/login",
        { email, password },
        { withCredentials: true }
      );

      // Vérifie si le token est bien reçu
      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        console.log("Token reçu:", response.data.token);
        navigate("/dashClient");
      } else {
        console.error("Erreur: Aucun token reçu.");
      }
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login_client;
