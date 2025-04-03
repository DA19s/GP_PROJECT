import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/AuthForm.css";

export default function AuthForm2() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        { email, password },
        { withCredentials: true }
      );
      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        console.log("Token reçu:", response.data.token);
        navigate("/dashboard");
      } else {
        console.error("Erreur: Aucun token reçu.");
      }
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        { pseudo, nom, prenom, email, number, password },
        { withCredentials: true }
      );
      navigate(`/verify_user/${email}`);
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  return (
    <div className="conta">
      <div className={`cont ${isSignUp ? "s--signup" : ""}`}>
        {/* Form Login */}
        <div className="form sign-in">
          <h2>SE CONNECTER (Admin)</h2>
          <form onSubmit={handleLogin}>
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="forgot-pass">Forgot password?</p>
            <button type="submit" className="submit">
              Sign In
            </button>
          </form>
        </div>

        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h3>
                Vous n'avez pas de compte ? Inscrivez-vous s'il vous plaît !
              </h3>
            </div>
            <div className="img__text m--in">
              <h3> Si vous avez déjà un compte, connectez-vous simplement.</h3>
            </div>
            <div className="img__btn" onClick={() => setIsSignUp(!isSignUp)}>
              <span className="m--up">S'INSCRIRE</span>
              <span className="m--in">SE CONNECTER </span>
            </div>
          </div>

          {/* Form Signup */}
          <div className="form sign-up">
            <h2>Créer Votre Compte (Admin)</h2>
            <form onSubmit={handleSignup}>
              <label>
                <span>Pseudo</span>
                <input
                  type="text"
                  placeholder="Pseudo"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                />
              </label>
              <label>
                <span>Nom</span>
                <input
                  type="text"
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </label>
              <label>
                <span>Prénom</span>
                <input
                  type="text"
                  placeholder="Prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                <span>Numéro de téléphone</span>
                <input
                  type="text"
                  placeholder="Numéro"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button type="submit" className="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
