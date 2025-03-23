import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import getCookie from './getCookie'

const ViewGp = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    const {id} = useParams();
    const token = sessionStorage.getItem('token'); 

    useEffect(() => {
        axios.get(`http://localhost:3000/api/gp/gpg/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.data);
                setItems(response.data);
            })
            .catch((error) => {
                console.error('Erreur de connexion', error);
            });
    }, []);

    const handlegp = () => {
        navigate(`/client/${id}`);
    };

    return (
        <div>
            <h1>ViewGp</h1>
            <button onClick={handlegp}>S'inscrire sur ce gp</button>

            {items.map(item => (
                <div key={item._id}>
                    <h2>Nom: {item.gp_name}</h2>
                    <p>Propriétaire: {item.owner}</p>
                    <p>Numéro: {item.owner_number}</p>
                    <p>Départ: {item.ville_depart}, {item.pays_depart}</p>
                    <p>Destination: {item.ville_destination}, {item.pays_destination}</p>
                    <p>Capacité: {item.capacite} kg</p>
                    <p>Poids restant: {item.poid_restant} kg</p>
                    <p>Date de départ: {new Date(item.date_depart).toLocaleDateString()}</p>
                    <p>Date d'arrivée: {new Date(item.date_arrive).toLocaleDateString()}</p>
                    <p>Prix par kilo: {item.prix_kilo} XOF</p>
                    <h3>Clients:</h3>
                    <ul>
                        {item.client && item.client.map(client => (
                            <li key={client._id}><p>Nom:{client.nom}</p>
                            <p>Prenom: {client.prenom}</p>
                            <p>Pays: {client.pays}</p>
                            <p>Ville: {client.ville}</p>
                            <p>Poids du colis: {client.poid_colis}</p>
                            <p>Numero: {client.number}</p>
                        </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ViewGp;