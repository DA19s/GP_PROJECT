import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate
import logo from "../assets/Capture d’écran 2025-03-23 à 15.05.00.png"; // Assurez-vous que le logo est dans src/assets/logo.png
import circleImage from "../assets/gppro.png"; // Remplacez avec votre image
import "../pages/Accueil.css";

const Accueil = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate(); // Initialisation de useNavigate

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 300); // Petit délai avant l'apparition
  }, []);

  // Fonction pour gérer la redirection vers ViewGp
  const handleButtonClick = () => {
    navigate("/login_client"); // Redirige vers la page ViewGp
  };
    const handleRegClick = () => {
    navigate("/register_client"); // Redirige vers la page ViewGp
  };
  return (
    <div className={`container ${fadeIn ? "fade-in" : ""}`}>
      <header className="header">
        <img src={logo} alt="GP Connect Logo" className="logo" />
      </header>

      <div className="content">
        <div className="text-section">
          <h1>Expédiez Vos Colis Rapidement et en Toute Sécurité</h1>
          <p>
            Trouvez un GP disponible et envoyez vos colis vers Abidjan, Lomé ou
            Cotonou en toute simplicité. Profitez d’un service fiable et rapide
            pour vos envois.
          </p>
          <ul className="features">
            <li>🛡📦 GP sécurisés</li>
            <li>⚖️💵 Tarification transparente</li>
            <li>📱💸 Paiement en ligne</li>
          </ul>
          <button className="cta-button" onClick={handleButtonClick}>
            Connexion <br></br>
          </button>
          <button className="cta-button" onClick={handleRegClick}>
            Inscription
          </button>
        </div>

        <div className="image-section">
          <div className="circle">
            <img
              src={circleImage}
              alt="Illustration"
              className="circle-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
