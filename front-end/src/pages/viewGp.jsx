import axios from "axios";
import React, { useEffect, useState } from "react";

import logo from "../assets/logoo.png";

import "../pages/viewGp.css";

import benFlag from "../assets/ben.png";
import coteIvoireFlag from "../assets/civ.jpg";
import senegalFlag from "../assets/sn.jpg";
import togoFlag from "../assets/togo.png";
const ViewGp = () => {
  const [items, setItems] = useState([]);
  const [selectedGp, setSelectedGp] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [colisType, setColisType] = useState("");
  const [colisPoids, setColisPoids] = useState("");
  const [gp_name, setGp_name] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const token = sessionStorage.getItem("token");
  const flags = {
    Sénégal: senegalFlag,
    "Côte d'Ivoire": coteIvoireFlag,
    Togo: togoFlag,
    ben: benFlag,
  };

  const getFlag = (countryName) => flags[countryName] || null;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/gp", {
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
  }, [token]);

  const handleGpClick = (gp) => {
    setSelectedGp(gp);
    setActiveTab("details");
    setFormSubmitted(false);
  };

  const closeModal = () => {
    setSelectedGp(null);
    setFormSubmitted(false);
  };

  const handleSignupClient = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:3000/api/temp/create`,
        { gp_name, poid_colis: colisPoids, colis: colisType },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setGp_name("");
      setColisPoids("");
      setColisType("");
      setFormSubmitted(true); // ✅ Affiche la carte de succès
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  return (
    <div className="gp-container">
      <img src={logo} alt="Logo" className="gp-logo" />
      <h1 className="gp-title">
        {items.length === 0
          ? "PAS DE GROUPAGES DISPONIBLES"
          : "LES GROUPAGES DISPONIBLES"}
      </h1>
      <div className="gp-list">
        {items.map((item) => (
          <div key={item._id} className="gp-cardd">
            <div className="gp-header">{item.gp_name}</div>
            <div className="gp-body">
              <div className="gp-route">
                <div className="gp-country">
                  <p className="gp-country-namev">{item.pays_depart}</p>
                  <img
                    src={getFlag(item.pays_depart)}
                    alt={`Drapeau ${item.pays_depart}`}
                    className="gp-flags"
                  />
                  <p className="gp-city">
                    {item.ville_depart}, {item.pays_depart}
                  </p>
                </div>
                <span className="gp-arrow">✈️</span>
                <div className="gp-country">
                  <p className="gp-country-namec">{item.pays_destination}</p>
                  <img
                    src={getFlag(item.pays_destination)}
                    alt={`Drapeau ${item.pays_destination}`}
                    className="gp-flagc"
                  />
                  <p className="gp-city">
                    {item.ville_destination}, {item.pays_destination}
                  </p>
                </div>
              </div>

              <div className="gp-separatorr1"></div>
              <p className="gp-price">PRIX : {item.prix_kilo} FCFA / KG</p>
              <div className="gp-separatorr2"></div>
              <p className="gp-date1">Date de départ </p>
              <span>{new Date(item.date_depart).toLocaleDateString()}</span>
              <div className="gp-separatorr3"></div>
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
                {formSubmitted ? (
                  <div className="success-card">
                    <h2>✅ Demande envoyée avec succès !</h2>
                    <p>Votre inscription a bien été enregistrée.</p>
                    <p className="payment-instructions">
                      Veuillez effectuer le paiement via{" "}
                      <strong className="str2">Wave</strong> ou{" "}
                      <strong className="str1">Orange Money</strong> au numéro
                      suivant :{" "}
                      <strong className="str3">
                        {selectedGp.owner_number}
                      </strong>
                      . Une fois votre paiement effectué nous vous enverrons
                      votre reçu confirmant la validation de votre commande par
                      e-mail.
                    </p>

                    <button className="gp-button" onClick={closeModal}>
                      Fermer
                    </button>
                  </div>
                ) : (
                  <>
                    <h2>Mettre les Informations de votre GP</h2>
                    <form>
                      <label className="LAB2">Nom du GP:</label>
                      <input
                        className="nput3"
                        type="text"
                        placeholder="Nom"
                        value={gp_name}
                        onChange={(e) => setGp_name(e.target.value)}
                        required
                      />
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

                      <button
                        onClick={handleSignupClient}
                        className="signupClient"
                        type="submit"
                      >
                        Soumettre
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewGp;
