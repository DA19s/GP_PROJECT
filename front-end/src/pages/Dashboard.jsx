import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
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

  const updateGp = (id) => {
    navigate(`/update/${id}`);
  };

  const viewAsk = (id) => {
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

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Se déconnecter</button>
      <button onClick={creategp}>Creer un gp</button>

      {items.map((item) => (
        <div key={item._id}>
          <h2>Nom: {item.gp_name}</h2>
          <p>Propriétaire: {item.owner}</p>
          <p>Numéro: {item.owner_number}</p>
          <p>
            Départ: {item.ville_depart}, {item.pays_depart}
          </p>
          <p>
            Destination: {item.ville_destination}, {item.pays_destination}
          </p>
          <p>Capacité: {item.capacite} kg</p>
          <p>Poids restant: {item.poid_restant} kg</p>
          <p>
            Date de départ: {new Date(item.date_depart).toLocaleDateString()}
          </p>
          <p>
            Date d'arrivée: {new Date(item.date_arrive).toLocaleDateString()}
          </p>
          <p>Prix par kilo: {item.prix_kilo} XOF</p>
          <h3>Clients:</h3>
          <ul>
            {item.client &&
              item.client.map((client) => (
                <li key={client._id}>
                  <p>Nom:{client.nom}</p>
                  <p>Prenom: {client.prenom}</p>
                  <p>Pays: {client.pays}</p>
                  <p>Ville: {client.ville}</p>
                  <p>Poids du colis: {client.poid_colis}</p>
                  <p>Numero: {client.number}</p>
                </li>
              ))}
          </ul>
          <button onClick={() => viewAsk(item._id)}>Demandes</button>
          <button onClick={() => updateGp(item._id)}>Modifier</button>
          <button onClick={() => deleteGp(item._id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
