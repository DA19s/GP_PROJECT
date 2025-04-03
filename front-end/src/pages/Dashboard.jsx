import axios from "axios";
import { LogOut, Package, PlusCircle, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import coteIvoireFlag from "../assets/civ.jpg";
import logo from "../assets/logoo.png"; // Remplace par ton vrai chemin d'image
import senegalFlag from "../assets/sn.jpg";
import "../pages/Dashboard.css";
const Dashboard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedGp, setSelectedGp] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const token = sessionStorage.getItem("token");
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
    navigate("/login");
  };

  const creategp = () => {
    navigate("/create_gp");
  };

  //const updateGp = (id) => {
  // navigate(`/update/${id}`)
  //};

  const viewAsk = (id) => {
    console.log(id);

    navigate(`/viewAsk/${id}`);
  };

  const deleteGp = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/gp/${id}`,
        { withCredentials: true }
      );
      console.log(response);
      setItems(items.filter((item) => item._id !== id));
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  const handleGpClick = (gp) => {
    setSelectedGp(gp);
    console.log(gp); // Affiche immédiatement le GP cliqué
  };

  useEffect(() => {
    if (selectedGp) {
      console.log(selectedGp); // Affiche le GP après la mise à jour de l'état
    }
  }, [selectedGp]);

  const closeModal = () => {
    setSelectedGp(null);
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
              <p onClick={() => viewAsk(items._id)}>
                {" "}
                <Package size={16} /> Voir mes demandes
              </p>
              <p onClick={() => navigate("/my_packages")}>
                {" "}
                <Package size={16} /> Mes colis créés
              </p>
              <p onClick={() => creategp()}>
                {" "}
                <PlusCircle size={16} /> Créer un colis
              </p>
              <p onClick={handleLogout} className="logout">
                {" "}
                <LogOut size={16} /> Déconnexion
              </p>
            </div>
          )}
        </div>
      </header>

      <div className="dashboard-container">
        <h1 className="gp-title2">MES GROUPAGES DISPONIBLES</h1>
        <div className="gp-list">
          {items.map((item) => (
            <div key={item._id} className="gp-card">
              <div className="gp-icons">
                <FaEye
                  title="Voir"
                  className="gp-icon gp-icon-voir"
                  onClick={() => viewAsk(item._id)}
                />
                <FaEdit
                  title="Modifier"
                  className=" gp-icon gp-icon-edit"
                  onClick={() => navigate(`/gp/edit/${item._id}`)}
                />
                <FaTrash
                  title="Supprimer"
                  className="gp-icon gp-icon-delete"
                  onClick={() => deleteGp(items._id)}
                />
              </div>
              <div className="gp2-header">{item.gp_name}</div>

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
                <div className="gp-separator2"></div>
                <p className="gp-date">Date de départ</p>
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
        {selectedGp && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={closeModal}>
                ✖
              </button>

              {/* Onglets de navigation */}
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

              {/* Affichage du contenu en fonction de l'onglet actif */}
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
                  {selectedGp.client && selectedGp.client.length > 0 ? ( // Correction ici
                    <table className="gp-table">
                      <thead>
                        <tr>
                          <th>Nom</th>
                          <th>Prénom</th>
                          <th>Pays</th>
                          <th>Ville</th>
                          <th>Poids du colis</th>
                          <th>Numéro</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedGp.client.map((client) => (
                          <tr key={client._id}>
                            <td>{client.nom}</td>
                            <td>{client.prenom}</td>
                            <td>{client.pays}</td>
                            <td>{client.ville}</td>
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
