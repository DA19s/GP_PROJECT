import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import getCookie from './getCookie'

const viewAsk = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const {id} = useParams();

    console.log(id);
    

    useEffect(() => {
        const token = sessionStorage.getItem('token'); 
        axios.get(`http://localhost:3000/api/temp/tempo/${id}`,{
           withCredentials: true
        })
            .then((response) => {
                console.log(response.data);
                setItems(response.data);
            })
            .catch((error) => {
                console.error('Erreur de connexion', error);
            });
    }, []);



    const Add = async (id,id1) => {
        try {
            console.log(id);

            console.log(id1);
            const token = sessionStorage.getItem('token'); 

          const response = await axios.put(`http://localhost:3000/api/client/${id}/${id1}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
    navigate('/dashboard');
          console.log(response.data.token);
          
        } catch (error) {
          console.error('Erreur de connexion', error);
          
          
        }
      }


    return (
        <div>
            <h1>Client</h1>

            {items.map(item => (
                <div key={item._id}>
                    <h2>Nom: {item.nom}</h2>
                    <p>Prenom: {item.prenom}</p>
                    <p>Poid du colis: {item.poid_colis}</p>
                    <p>Numero: {item.number} kg</p>
                    <p>Prix : {item.prix} XOF</p>
                    <button onClick={() => Add(id,item._id)}>Accepter</button>
                </div>
                
            ))}
        </div>
    );
};

export default viewAsk;