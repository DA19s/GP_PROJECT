import axios from "axios";
import { LogOut, Package, PlusCircle, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoo.png";

// Drapeaux importés
import beninFlag from "../assets/ben.png";
import coteIvoireFlag from "../assets/civ.jpg";
import senegalFlag from "../assets/sn.jpg";
import togoFlag from "../assets/togo.png";

import "../pages/Dashboard.css";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedGp, setSelectedGp] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [groupageToDelete, setGroupageToDelete] = useState(null);
  const token = sessionStorage.getItem("token");

  // Mapping pays => drapeau
  const flags = {
    Sénégal: senegalFlag,
    "Côte d'Ivoire": coteIvoireFlag,
    Togo: togoFlag,
    benin: beninFlag,
  };

  const getFlag = (countryName) => flags[countryName] || null;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/gp/gpo", {
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

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/auth2");
  };

  const creategp = () => {
    navigate("/create_gp");
  };

  const updateGp = (id) => {
    sessionStorage.setItem("selectedGpId", id);
    navigate(`/update/${id}`);
  };

  const viewAsk = (id) => {
    navigate(`/viewAsk/${id}`);
  };

  const handleDeleteClick = (id, gpName) => {
    setGroupageToDelete({ id, gpName });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (groupageToDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/gp/${groupageToDelete.id}`,
          { withCredentials: true }
        );
        setItems(items.filter((item) => item._id !== groupageToDelete.id));
        setShowDeleteConfirm(false);
      } catch (error) {
        console.error("Erreur de connexion", error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleGpClick = (gp) => {
    setSelectedGp(gp);
  };

  const closeModal = () => {
    setSelectedGp(null);
  };

  const handleMenuNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="corp">
      {/* Header */}
      <header className="dashboard-header">
        <img src={logo} alt="Logo" className="header-logo" />
        <div className="user-menu">
          <User size={30} onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && (
            <div className="user-dropdown">
              <p
                className="asq"
                onClick={() => handleMenuNavigation(`/viewAsk/${items._id}`)}
              >
                <Package size={16} /> Voir mes demandes
              </p>
              <p onClick={() => handleMenuNavigation("/Dashboard")}>
                <Package size={16} /> Mes colis créés
              </p>
              <p
                className="col"
                onClick={() => handleMenuNavigation("/create_gp")}
              >
                <PlusCircle size={16} /> Créer un colis
              </p>
              <p onClick={handleLogout} className="logout">
                <LogOut size={16} /> Déconnexion
              </p>
            </div>
          )}
        </div>
      </header>

      <div className="dashboard-container">
        <h1 className="gp-title2">
          {items.length > 0
            ? "MES GROUPAGES DISPONIBLES"
            : "PAS DE GROUPAGES DISPONIBLES"}
        </h1>
        <div className="gp-list">
          {items.map((item) => (
            <div key={item._id} className="gp-card">
              <div className="gp-icon">
                <FaEye
                  className="gp-icon gp-icon-voir"
                  onClick={() => viewAsk(item._id)}
                />
                <FaEdit
                  className="gp-icon gp-icon-edit"
                  onClick={() => updateGp(item._id)}
                />
                <FaTrash
                  className="gp-icon gp-icon-delete"
                  onClick={() => handleDeleteClick(item._id, item.gp_name)}
                />
              </div>
              <div className="gp2-header">{item.gp_name}</div>

              <div className="gp-body">
                <div className="gp-route">
                  <div className="gp-country">
                    <p className="gp-country-namess">{item.pays_depart}</p>
                    <img
                      src={getFlag(item.pays_depart)}
                      alt={`Drapeau ${item.pays_depart}`}
                      className="gp-flagss"
                    />
                    <p className="gp-city">
                      {item.pays_depart}, {item.ville_depart}
                    </p>
                  </div>
                  <span className="gp-arrow">✈️</span>
                  <div className="gp-country">
                    <p className="gp-country-namecc">{item.pays_destination}</p>
                    <img
                      src={getFlag(item.pays_destination)}
                      alt={`Drapeau ${item.pays_destination}`}
                      className="gp-flagcc"
                    />
                    <p className="gp-city">
                      {item.pays_destination}, {item.ville_destination}
                    </p>
                  </div>
                </div>

                <div className="gp-separator1"></div>
                <p className="gp-price">PRIX : {item.prix_kilo} FCFA / KG</p>
                <div className="gp-separator2"></div>
                <p className="gp-date2">Date de départ</p>
                <span>{new Date(item.date_depart).toLocaleDateString()}</span>
                <div className="dashboard-separator3"></div>
              </div>
              <button
                className="gp-button1"
                onClick={() => handleGpClick(item)}
              >
                VOIR...
              </button>
            </div>
          ))}
        </div>

        {/* Modal de suppression */}
        {showDeleteConfirm && (
          <div className="delete-confirmation-card">
            <div className="delete-confirmation-content">
              <p className="alert">
                Voulez-vous vraiment supprimer le groupage "
                {groupageToDelete.gpName}" ?
              </p>
              <div className="confirmation-buttons">
                <button onClick={confirmDelete} className="btn-yes">
                  Oui
                </button>
                <button onClick={cancelDelete} className="btn-no">
                  Non
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal GP */}
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
                  className={activeTab === "clients" ? "active" : ""}
                  onClick={() => setActiveTab("clients")}
                >
                  Clients Acceptés
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
                          {new Date(
                            selectedGp.date_depart
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <th>Date d'arrivée</th>
                        <td>
                          {new Date(
                            selectedGp.date_arrive
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <th>Prix par kilo</th>
                        <td>{selectedGp.prix_kilo} FCFA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "clients" && (
                <div className="modal-clients">
                  <h2>Clients Acceptés</h2>
                  {selectedGp.client && selectedGp.client.length > 0 ? (
                    <table className="gp-table">
                      <thead>
                        <tr>
                          <th>Nom</th>
                          <th>Prénom</th>
                          <th>Colis</th>
                          <th>Poids</th>
                          <th>Numéro</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedGp.client.map((client) => (
                          <tr key={client._id}>
                            <td>{client.nom}</td>
                            <td>{client.prenom}</td>
                            <td>{client.colis}</td>
                            <td>{client.poid_colis} kg</td>
                            <td>{client.number}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Aucun client accepté pour ce groupage.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
