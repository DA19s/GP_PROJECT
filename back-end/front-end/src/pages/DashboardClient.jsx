import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardClient = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/gp', { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setItems(response.data);
            })
            .catch((error) => {
                console.error('Erreur de connexion', error);
            });
    }, []);


    const handleClient = async (id) => {
        navigate(`/viewGp/${id}`);
    }


    return (
        <div>
            <h1>DashboardClient</h1>

            <ul>
                {items.map(item => (
                    <div key={item._id}>
                            <button onClick={() => handleClient(item._id)} className="signupClient">Nom: {item.gp_name}</button>
                            <p>Départ: {item.ville_depart}, {item.pays_depart}</p>
                            <p>Destination: {item.ville_destination}, {item.pays_destination}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default DashboardClient;