import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../pages/verify_client.css";

const Verify_client = () => {
  const [code, setCode] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();

  const verifyCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/cli/verify/${email}`,
        { code },
        { withCredentials: true }
      );
      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        console.log("Token reçu:", response.data.token);
        navigate("/DashClient");
      } else {
        console.error("Erreur: Aucun token reçu.");
      }
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  return (
    <div className="corp">
      <h1 className="verf"> Entrer le code de Verification recu par mail</h1>
      <form onSubmit={verifyCode}>
        <input
          className="code"
          type="text"
          placeholder="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="submit1" type="submit">
          Verifier
        </button>
      </form>
    </div>
  );
};

export default Verify_client;
