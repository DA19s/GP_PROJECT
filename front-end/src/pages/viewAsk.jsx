import axios from "axios";
import { LogOut, Package, PlusCircle, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logoo.png";
import "../pages/viewAsk.css";

const ViewAsk = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/temp/tempo/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Erreur de connexion", error);
      });
  }, [id]);

  const Add = async (id, id1) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/client/${id}/${id1}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
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
              <p onClick={() => navigate("/viewAsk")}>
                <Package size={16} /> Voir mes demandes
              </p>
              <p onClick={() => navigate("/viewGp")}>
                <Package size={16} /> Mes colis créés
              </p>
              <p onClick={() => navigate("/create_gp")}>
                <PlusCircle size={16} /> Créer un colis
              </p>
              <p onClick={handleLogout} className="logout">
                <LogOut size={16} /> Déconnexion
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Table des demandes */}
      <h1 className="title">Demandes de Groupage</h1>
      <div className="content">
        <table className="colis-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Poids du colis (kg)</th>
              <th>Colis</th>
              <th>Numéro</th>
              <th>Prix (XOF)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.nom}</td>
                <td>{item.prenom}</td>
                <td>{item.poid_colis}</td>
                <td>{item.colis}</td>
                <td>{item.number}</td>
                <td>{item.prix}</td>
                <td>
                  <button onClick={() => Add(id, item._id)}>Accepter</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAsk;
