const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token et récupérer l'ID
const requireAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Récupère le token

    if (!token) {
        return res.status(401).json({ message: 'Token manquant, veuillez vous connecter.' });
    }

    // Vérifier et décoder le token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide ou expiré.' });
        }

        // Ajoute l'ID de l'utilisateur extrait du token à la requête
        req.userId = decoded.id;  // L'ID est dans la payload du token
        next();  // Passe à la route suivante
    });
};

module.exports = requireAuth;
