import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "/Users/macretina/GP_PROJECT/front-end/src/pages/create_gp.css";

const Update = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gp_name: "",
    pays_depart: "",
    ville_depart: "",
    adresse_depart: "",
    pays_destination: "",
    ville_destination: "",
    adresse_destination: "",
    capacite: "",
    date_depart: "",
    date_arrive: "",
    prix_kilo: "",
  });

  // 🔹 Charger les données existantes du colis
  useEffect(() => {
    const fetchGp = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/gp/gpg/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (response.data.length > 0) {
          console.log("Données récupérées :", response.data[0]);

          const gpData = response.data[0];

          // Fonction pour formater les dates au format YYYY-MM-DD
          const formatDate = (date) => {
            const d = new Date(date);
            return d.toISOString().split("T")[0]; // Retourne la date au format YYYY-MM-DD
          };

          // Mettre à jour les données du formulaire avec les dates formatées
          setFormData({
            ...gpData,
            date_depart: formatDate(gpData.date_depart),
            date_arrive: formatDate(gpData.date_arrive),
          });
        } else {
          console.log("Aucun groupage trouvé.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchGp();
  }, [id]);

  // 🔹 Mise à jour des champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Envoi des modifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/gp/${id}`,
        formData, // Envoie des nouvelles valeurs
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("GP modifié avec succès !");
      navigate("/dashboard"); // Redirection après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
    }
  };

  return (
    <div className="corps">
      <div className="create">
        <h1 className="creat">Modifier le Groupage</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="gp_name">Nom du GP</label>
            <input
              id="gp_name"
              type="text"
              placeholder="Nom du GP"
              name="gp_name"
              value={formData.gp_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pays_depart">Pays de départ</label>
            <input
              id="pays_depart"
              type="text"
              placeholder="Pays de départ"
              name="pays_depart"
              value={formData.pays_depart}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ville_depart">Ville de départ</label>
            <input
              id="ville_depart"
              type="text"
              placeholder="Ville de départ"
              name="ville_depart"
              value={formData.ville_depart}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adresse_depart">Adresse de départ</label>
            <input
              id="adresse_depart"
              type="text"
              placeholder="Adresse de départ"
              name="adresse_depart"
              value={formData.adresse_depart}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pays_destination">Pays d'arrivée</label>
            <input
              id="pays_destination"
              type="text"
              placeholder="Pays d'arrivée"
              name="pays_destination"
              value={formData.pays_destination}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ville_destination">Ville d'arrivée</label>
            <input
              id="ville_destination"
              type="text"
              placeholder="Ville d'arrivée"
              name="ville_destination"
              value={formData.ville_destination}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adresse_destination">Adresse d'arrivée</label>
            <input
              id="adresse_destination"
              type="text"
              placeholder="Adresse d'arrivée"
              name="adresse_destination"
              value={formData.adresse_destination}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacite">Capacité</label>
            <input
              id="capacite"
              type="number"
              placeholder="Capacité"
              name="capacite"
              value={formData.capacite}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date_depart">Date de départ</label>
            <input
              id="date_depart"
              type="date"
              name="date_depart"
              value={formData.date_depart}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date_arrive">Date d'arrivée</label>
            <input
              id="date_arrive"
              type="date"
              name="date_arrive"
              value={formData.date_arrive}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="prix_kilo">Prix par kilo</label>
            <input
              id="prix_kilo"
              type="number"
              placeholder="Prix par kilo"
              name="prix_kilo"
              value={formData.prix_kilo}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
