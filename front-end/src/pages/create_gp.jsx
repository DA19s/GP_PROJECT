import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/create_gp.css";

// Importation des drapeaux
import beninFlag from "../assets/ben.png";
import ciFlag from "../assets/civ.jpg";
import senegalFlag from "../assets/sn.jpg";
import togoFlag from "../assets/togo.png";

const countryOptions = [
  { name: "Sénégal", flag: senegalFlag },
  { name: "Côte d'Ivoire", flag: ciFlag },
  { name: "Togo", flag: togoFlag },
  { name: "Bénin", flag: beninFlag },
];

const Create = () => {
  const [gp_name, setGp_name] = useState("");
  const [pays_depart, setPays_depart] = useState("");
  const [ville_depart, setVille_depart] = useState("");
  const [adresse_depart, setAdresse_depart] = useState("");
  const [pays_destination, setPays_destination] = useState("");
  const [ville_destination, setVille_destination] = useState("");
  const [adresse_destination, setAdresse_destination] = useState("");
  const [capacite, setCapacite] = useState("");
  const [date_depart, setDate_depart] = useState("");
  const [date_arrive, setDate_arrive] = useState("");
  const [prix_kilo, setPrix_kilo] = useState("");

  const navigate = useNavigate();

  const create = async (e) => {
    e.preventDefault();

    if (!gp_name || !pays_depart || !ville_depart || !capacite) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:3000/api/gp/create`,
        {
          gp_name,
          pays_depart,
          ville_depart,
          adresse_depart,
          pays_destination,
          ville_destination,
          adresse_destination,
          capacite,
          date_depart,
          date_arrive,
          prix_kilo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("GP créé avec succès :", response.data);
      navigate(`/Dashboard`);
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  return (
    <div className="corps">
      <div className="create">
        <h1 className="creat">Création du GP</h1>
        <form onSubmit={create}>
          <div className="form-group">
            <label htmlFor="gp_name">Nom du GP</label>
            <input
              id="gp_name"
              type="text"
              placeholder="Nom du GP"
              value={gp_name}
              onChange={(e) => setGp_name(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pays_depart">Pays de départ</label>
            <div className="flag-select">
              <select
                id="pays_depart"
                value={pays_depart}
                onChange={(e) => setPays_depart(e.target.value)}
              >
                <option value="">-- Sélectionner un pays --</option>
                {countryOptions.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {pays_depart && (
                <img
                  src={countryOptions.find((c) => c.name === pays_depart)?.flag}
                  alt={pays_depart}
                  className="flag-icon"
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ville_depart">Ville de départ</label>
            <input
              id="ville_depart"
              type="text"
              placeholder="Ville de départ"
              value={ville_depart}
              onChange={(e) => setVille_depart(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="adresse_depart">Adresse de départ</label>
            <input
              id="adresse_depart"
              type="text"
              placeholder="Adresse de départ"
              value={adresse_depart}
              onChange={(e) => setAdresse_depart(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pays_destination">Pays d'arrivée</label>
            <div className="flag-select">
              <select
                id="pays_destination"
                value={pays_destination}
                onChange={(e) => setPays_destination(e.target.value)}
              >
                <option value="">-- Sélectionner un pays --</option>
                {countryOptions.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {pays_destination && (
                <img
                  src={
                    countryOptions.find((c) => c.name === pays_destination)
                      ?.flag
                  }
                  alt={pays_destination}
                  className="flag-icon"
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ville_destination">Ville d'arrivée</label>
            <input
              id="ville_destination"
              type="text"
              placeholder="Ville d'arrivée"
              value={ville_destination}
              onChange={(e) => setVille_destination(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="adresse_destination">Adresse d'arrivée</label>
            <input
              id="adresse_destination"
              type="text"
              placeholder="Adresse d'arrivée"
              value={adresse_destination}
              onChange={(e) => setAdresse_destination(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="capacite">Capacité</label>
            <input
              id="capacite"
              type="number"
              placeholder="Capacité"
              value={capacite}
              onChange={(e) => setCapacite(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date_depart">Date de départ</label>
            <input
              id="date_depart"
              type="date"
              placeholder="Date de départ"
              value={date_depart}
              onChange={(e) => setDate_depart(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date_arrive">Date d'arrivée</label>
            <input
              id="date_arrive"
              type="date"
              placeholder="Date d'arrivée"
              value={date_arrive}
              onChange={(e) => setDate_arrive(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="prix_kilo">Prix par kilo</label>
            <input
              id="prix_kilo"
              type="number"
              placeholder="Prix par kilo"
              value={prix_kilo}
              onChange={(e) => setPrix_kilo(e.target.value)}
            />
          </div>

          <button type="submit">Créer</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
