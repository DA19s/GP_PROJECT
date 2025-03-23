import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Verify_user = () => {
    const [code, setCode] = useState('');
    const { email } = useParams(); 
    const navigate = useNavigate();

    const verifyCode = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3000/api/user/verify/${email}`, { code }, {withCredentials: true});
            console.log(response.data.token);
            if (response.data.token) {
                sessionStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                console.log('Token reçu:', response.data.token);
            navigate('/Dashboard');
        } else {
            console.error("Erreur: Aucun token reçu.");
        }
        } catch (error) {
            console.error('Erreur de connexion', error);
        }
    };

    return (
        <div>
            <h1>Verification</h1>
            <form onSubmit={verifyCode}>
                <input
                    type="text"
                    placeholder="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button type="submit">Verifier</button>
            </form>
        </div>
    );
};

export default Verify_user;