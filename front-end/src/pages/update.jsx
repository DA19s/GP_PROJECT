import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import getCookie from './getCookie'

const Update = () => {
    const [gp_name, setGp_name] = useState('');
    const [pays_depart, setPays_depart] = useState('');
    const [ville_depart, setVille_depart] = useState('');
    const [adresse_depart, setAdresse_depart] = useState('');
    const [pays_destination, setPays_destination] = useState('');
    const [ville_destination, setVille_destination] = useState('');
    const [adresse_destination, setAdresse_destination] = useState('');
    const [capacite, setCapacite] = useState('');
    const [date_depart, setDate_depart] = useState('');
    const [date_arrive, setDate_arrive] = useState('');
    const [prix_kilo, setPrix_kilo] = useState('');

    const navigate = useNavigate();

    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token'); 
        try {
            const response = await axios.put(
                `http://localhost:3000/api/gp/${id}`,
                {
                    gp_name,
                    pays_depart,
                    ville_depart,
                    adresse_depart,
                    pays_destination,
                    ville_destination,
                    adresse_destination,
                    date_depart,
                    date_arrive,
                    prix_kilo,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
            console.log('GP créé avec succès :', response.data);
            navigate(`/Dashboard`); // Redirection après la création
        } catch (error) {
            console.error('Erreur de connexion', error);
        }
    };

    return (
        <div>
            <h1>Création du GP</h1>
            <form onSubmit={update}>
                <input
                    type="text"
                    placeholder="Nom du GP"
                    value={gp_name}
                    onChange={(e) => setGp_name(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Pays de départ"
                    value={pays_depart}
                    onChange={(e) => setPays_depart(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ville de départ"
                    value={ville_depart}
                    onChange={(e) => setVille_depart(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Adresse de départ"
                    value={adresse_depart}
                    onChange={(e) => setAdresse_depart(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Pays d'arrivée"
                    value={pays_destination}
                    onChange={(e) => setPays_destination(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ville d'arrivée"
                    value={ville_destination}
                    onChange={(e) => setVille_destination(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Adresse d'arrivée"
                    value={adresse_destination}
                    onChange={(e) => setAdresse_destination(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Date de départ"
                    value={date_depart}
                    onChange={(e) => setDate_depart(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Date d'arrivée"
                    value={date_arrive}
                    onChange={(e) => setDate_arrive(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Prix par kilo"
                    value={prix_kilo}
                    onChange={(e) => setPrix_kilo(e.target.value)}
                />
                <button type="submit">Valider</button>
            </form>
        </div>
    );
};

export default Update;