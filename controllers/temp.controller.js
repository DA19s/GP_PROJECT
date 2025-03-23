const e = require("express");
const TEMP = require("../models/temp.model");
const GP = require("../models/gp.model");
const client = require("../models/client.model");
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const mail = require('../utils/mailer.js')
const requireAuth = require('../middleware/requireAuth'); 


module.exports.AskClient = [ requireAuth, async (req, res) => {
    try {
        console.log('ok');
        const userId = req.userId
        console.log(userId);
        const info = await client.findById(userId)

        const nom = info.nom;
        const prenom = info.prenom;
        const number = info.number;
        const email = info.email;

        console.log(nom);

        const existingClient = await TEMP.findOne({gp_name: req.body.gp_name, number: number});
        if (existingClient) {
            return res.status(400).send({ error: "Duplicate field value entered" });
        }


        

        console.log(req.body);


        const gp = await GP.findOne({gp_name: req.body.gp_name})
        const prix_kilo = gp.prix_kilo

        console.log(prix_kilo);
        
        const prix = prix_kilo * req.body.poid_colis

        console.log(prix);
        


        
        const temp = await TEMP.create({gp_name: req.body.gp_name, nom: nom, prenom: prenom, number: number, poid_colis: req.body.poid_colis, email: email, prix: prix});
        console.log('ok');
        await mail(
            'ibhdaz@gmail.com', // Adresse e-mail du destinataire
            'Nouveau client', // Sujet de l'e-mail
            `Vous avez un nouveau client ${nom} ${prenom} `,// Texte brut
            `<p>Vous avez un nouveau client ${nom} ${prenom} </p>` // Contenu HTML
        );        
        return res.status(200).send(temp);
    } catch (err) {
        console.error("Erreur complète lors de la création :", err);

        return res.status(400).send(err);
    }
    
}]

module.exports.deleteAskClient = async (req, res) => {
    try {

        const TEMPO = await TEMP.findByIdAndDelete(req.params.id);
        if (!TEMPO) return res.status(404).send({ error: "TEMP not found" });
        return res.status(200).send(TEMPO);
    } catch (err) {
        return res.status(400).send(err);
    }
};


module.exports.getTemps = async (req, res) => {
    try {
        const Temps = await TEMP.find().select();
        console.log(Temps);
        
        res.status(200).json(Temps);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.getTemp = async (req, res) => {
    try {

        const Temp = await TEMP.find({_id: req.params.TempId})
        res.status(200).json(Temp);
    } catch (error) {
        throw error    }
}

module.exports.getTempO = async (req, res) => {
    try {
      /*  const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Token not provided, please log in.' });
        }
    
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id;  
        console.log(userId);

        const user = await User.findById(userId);
        const pseudo = user.pseudo;
        console.log(pseudo);


**/
        const gp = await GP.findById(req.params.id);

        
        const gp_name = gp.gp_name

        console.log(gp_name);
        

        const Tempo = await TEMP.find({gp_name: gp_name})
        res.status(200).json(Tempo);
    } catch (error) {
        throw error    }
}