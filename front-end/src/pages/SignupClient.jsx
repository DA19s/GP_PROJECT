import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import getCookie from './getCookie'
const SignupClient = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [gp_name, setGp_name] = useState('');
    const [poid_colis, setPoid_colis] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSignupClient = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token'); 
        console.log('Token récupéré depuis le cookie :', token);
        try {
            const response = await axios.post(`http://localhost:3000/api/temp/create`, {gp_name, poid_colis },{
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            navigate('/dashClient');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error === "Duplicate field value entered") {
                setErrorMessage("Le numéro est déjà utilisé. Veuillez en saisir un autre.");
            } else {
                setErrorMessage("Erreur de connexion. Veuillez réessayer.");
            }
            console.error('Erreur de connexion', error);
        }
    };

    return (
        <div>
            <h1>Inscription Client</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSignupClient}>
                <input
                    type="text"
                    placeholder="gp_name"
                    value={gp_name}
                    onChange={(e) => setGp_name(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Poid_colis"
                    value={poid_colis}
                    onChange={(e) => setPoid_colis(e.target.value)}
                />
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default SignupClient;