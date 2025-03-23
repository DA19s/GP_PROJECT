import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardClient = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const token = sessionStorage.getItem('token'); 

    useEffect(() => {
        if (!token) {
         
            navigate('/login_client');
            return;
        }

        axios.get('http://localhost:3000/api/gp', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.data);
                setItems(response.data);
            })
            .catch((error) => {
                console.error('Erreur de connexion', error);

                if (error.response && error.response.status === 401) {
                    navigate('/login_client');
                }
            });
    }, [token, navigate]); // On dépend de `token` et `navigate` pour la gestion d'effets

    const handleClient = async (id) => {
        navigate(`/viewGp/${id}`);
    };

    return (
        <div>
            <h1>DashboardClient</h1>
            <ul>
                {items.map(item => (
                    <div key={item._id}>
                        <button onClick={() => handleClient(item._id)} className="signupClient">
                            Nom: {item.gp_name}
                        </button>
                        <p>Départ: {item.ville_depart}, {item.pays_depart}</p>
                        <p>Destination: {item.ville_destination}, {item.pays_destination}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default DashboardClient;
