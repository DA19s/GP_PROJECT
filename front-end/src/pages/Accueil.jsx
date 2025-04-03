import React, { useEffect, useState } from "react";
import {
  FaFileInvoice,
  FaSignInAlt,
  FaUserCircle,
  FaUserPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import circleImage from "../assets/ChatGPT Image 30 mars 2025 à 14_42_50.png";
import logo from "../assets/logoo.png";
import "../pages/Accueil.css";

const Accueil = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 300);
  }, []);

  const handleAuthClick = () => {
    navigate("/Auth");
  };

  const handleReceiptClick = () => {
    // Naviguer vers la page de réception
    navigate("/Recu");
  };

  return (
    <div className={`container ${fadeIn ? "fade-in" : ""}`}>
      <header className="header">
        <img src={logo} alt="GP Connect Logo" className="logo" />
        <div className="header-icons">
          <FaFileInvoice
            className="receipt-icon"
            title="Voir le reçu"
            onClick={handleReceiptClick}
          />
          <div className="user-menu">
            <FaUserCircle
              className="user-icon"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="dropdown-menu">
                <p onClick={handleAuthClick} className="menu-item">
                  <FaSignInAlt className="menu-icon" /> Connexion
                </p>
                <hr className="menu-separator" />
                <p onClick={handleAuthClick} className="menu-item">
                  <FaUserPlus className="menu-icon" /> Inscription
                </p>
              </div>
            )}
          </div>
        </div>
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
          <button className="cta-button" onClick={handleAuthClick}>
            VOIR LES GP DISPONIBLES
          </button>
        </div>

        <div className="image-section">
          <div className="circle bounce-animation">
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
