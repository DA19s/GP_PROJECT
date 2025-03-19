import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SignupClient = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ville, setVille] = useState('');
    const [pays, setPays] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [number, setNumber] = useState('');
    const [poid_colis, setPoid_colis] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignupClient = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/client/${id}`, { nom, prenom, ville, pays, number, poid_colis }, { withCredentials: true });
            localStorage.setItem('token', response.data.token);
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
                    placeholder="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ville"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Pays"
                    value={pays}
                    onChange={(e) => setPays(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
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