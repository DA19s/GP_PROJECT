import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import logo from "../assets/Capture d’écran 2025-03-23 à 15.05.00.png";
import coteIvoireFlag from "../assets/image copy.png";
import senegalFlag from "../assets/image.png";
import "../pages/Accueil.css";

const ViewGp = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selectedGp, setSelectedGp] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [colisType, setColisType] = useState("");
  const [colisPoids, setColisPoids] = useState("");
  const { id } = useParams();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/gp/gpg/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Erreur de connexion", error);
      });
  }, []);
  const handleGpClick = (gp) => {
    setSelectedGp(gp);
    setActiveTab("details");
  };

  const closeModal = () => {
    setSelectedGp(null);
  };
  const handlegp = () => {
    navigate(`/client/${id}`);
  };

  return (
    <div className="gp-container">
      <img src={logo} alt="Logo" className="gp-logo" />
      <h1 className="gp-title">LES GROUPAGES DISPONIBLES</h1>
      <div className="gp-list">
        {items.map((item) => (
          <div key={item._id} className="gp-card">
            <div className="gp-header">{item.gp_name}</div>
            <div className="gp-body">
              <div className="gp-route">
                <div className="gp-country">
                  <p className="gp-country-name">{item.pays_depart}</p>
                  <img
                    src={senegalFlag}
                    alt="Drapeau Sénégal"
                    className="gp-flag"
                  />
                  <p className="gp-city">
                    {item.ville_depart}, {item.pays_depart}
                  </p>
                </div>
                <span className="gp-arrow">✈️</span>
                <div className="gp-country">
                  <p className="gp-country-name">{item.pays_destination}</p>
                  <img
                    src={coteIvoireFlag}
                    alt="Drapeau Côte d'Ivoire"
                    className="gp-flag"
                  />
                  <p className="gp-city">
                    {item.ville_destination}, {item.pays_destination}
                  </p>
                </div>
              </div>

              <div className="gp-separator1"></div>
              <p className="gp-price">PRIX : {item.prix_kilo} FCFA / KG</p>
              <div className="gp-separator1"></div>
              <p className="gp-date">
                Date de départ:{" "}
                <p className="datee">
                  {new Date(item.date_depart).toLocaleDateString()}
                </p>
              </p>
              <div className="gp-separator2"></div>
            </div>
            <button className="gp-button1" onClick={() => handleGpClick(item)}>
              INSCRIRE SON GP
            </button>
          </div>
        ))}
      </div>

      {selectedGp && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ✖
            </button>
            <div className="modal-nav">
              <button
                className={activeTab === "details" ? "active" : ""}
                onClick={() => setActiveTab("details")}
              >
                Détails du GP
              </button>
              <button
                className={activeTab === "form" ? "active" : ""}
                onClick={() => setActiveTab("form")}
              >
                Formulaire
              </button>
            </div>

            {activeTab === "details" && (
              <div className="modal-details">
                <h2>Les informations du GP</h2>

                {/* Nom du groupage en titre */}

                {/* Tableau des informations */}
                <table className="gp-table">
                  <tbody>
                    <tr>
                      <th>Nom</th>
                      <td>{selectedGp.gp_name}</td>
                    </tr>
                    <tr>
                      <th>Propriétaire</th>
                      <td>{selectedGp.owner}</td>
                    </tr>
                    <tr>
                      <th>Numéro</th>
                      <td>{selectedGp.owner_number}</td>
                    </tr>
                    <tr>
                      <th>Départ</th>
                      <td>
                        {selectedGp.ville_depart}, {selectedGp.pays_depart}
                      </td>
                    </tr>
                    <tr>
                      <th>Destination</th>
                      <td>
                        {selectedGp.ville_destination},{" "}
                        {selectedGp.pays_destination}
                      </td>
                    </tr>
                    <tr>
                      <th>Capacité</th>
                      <td>{selectedGp.capacite} kg</td>
                    </tr>
                    <tr>
                      <th>Poids restant</th>
                      <td>{selectedGp.poid_restant} kg</td>
                    </tr>
                    <tr>
                      <th>Date de départ</th>
                      <td>
                        {new Date(selectedGp.date_depart).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <th>Date d'arrivée</th>
                      <td>
                        {new Date(selectedGp.date_arrive).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <th>Prix par kilo</th>
                      <td>{selectedGp.prix_kilo} XOF</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  onClick={() => setActiveTab("form")}
                  className="gp-button"
                >
                  Remplir le formulaire
                </button>
              </div>
            )}

            {activeTab === "form" && (
              <div className="modal-form">
                <h2>Mettre les Informations de votre GP</h2>
                <form>
                  <label className="LAB">Quelle est votre colis? :</label>
                  <input
                    className="nput1"
                    type="text"
                    placeholder="Ex: Vêtements, Électronique, Nourriture..."
                    value={colisType}
                    onChange={(e) => setColisType(e.target.value)}
                    required
                  />

                  <label className="LAB2">Poids du colis (kg) :</label>
                  <input
                    className="nput2"
                    type="number"
                    placeholder="Poids en kg"
                    value={colisPoids}
                    onChange={(e) => setColisPoids(e.target.value)}
                    required
                  />

                  <button type="submit" className="gp-button">
                    Soumettre
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewGp;
