const GP = require("../models/gp.model");
const TEMP = require("../models/temp.model");
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const requireAuth = require('../middleware/requireAuth'); 
module.exports.createGp =[ requireAuth, async (req, res) => {
    try {
        
       const userId = req.userId 
        console.log(userId);
        const info = await User.findById(userId)

        const nom = info.nom;
        const prenom = info.prenom;
        const number = info.number;

        const owner = (prenom + " " + nom)
        console.log(owner);
        

        const newGP = await GP.create({
            owner: owner,
            owner_number: number,
            gp_name: req.body.gp_name,
            pays_depart: req.body.pays_depart,
            ville_depart: req.body.ville_depart,
            adresse_depart: req.body.adresse_depart,
            pays_destination: req.body.pays_destination,
            ville_destination: req.body.ville_destination,
            adresse_destination: req.body.adresse_destination,
            capacite: req.body.capacite,
            poid_restant: req.body.poid_restant,
            poid_utilise: req.body.poid_utilise,
            date_depart: req.body.date_depart,
            date_arrive: req.body.date_arrive,
            prix_kilo: req.body.prix_kilo
            
        });
        res.status(200).json({ gp: newGP });
        
        const rest_gp = await GP.findOneAndUpdate({gp_name: req.body.gp_name}, {poid_restant: req.body.capacite});

    } catch (err) {
        console.error(err); 
        res.status(400).json({ err });
    }
}];


module.exports.getGps = async (req, res) => {
    try {
        const gps = await GP.find().select();
        console.log(gps);
        
        res.status(200).json(gps);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.getGp = async (req, res) => {
    try {

        const gp = await GP.find({_id: req.params.gpId})
        res.status(200).json(gp);
    } catch (error) {
        throw error    }
}

module.exports.getGpO = [ requireAuth, async (req, res) => {
    try {
        const userId = req.userId  
        console.log(userId);

        const user = await User.findById(userId);

        console.log(user);
        
        const nom = user.nom
        const prenom = user.prenom 

        const owner = (prenom + " " + nom)

        console.log(owner);
        
        const gpo = await GP.find({owner: owner});
        console.log(gpo);
        res.status(200).json(gpo);
    } catch (error) {
        throw error    }
}]

module.exports.updateGp = async (req, res) => {
     try {
        
        const info = await GP.findById(req.params.id)
        const gp_name = info.gp_name

        console.log(gp_name);

        const updatedtemp = await TEMP.updateMany({gp_name: gp_name}, {gp_name: req.body.gp_name}, {new: true});
         const gp = await GP.findByIdAndUpdate(req.params.id, req.body)
 
         if (!gp) {
             return res.status(404).json({message: "gp not found"});
         }

         
         const updatedGP = await GP.findById(req.params.id)
         console.log(updatedGP);

         console.log(updatedtemp);
         res.status(200).json(updatedGP);

         
 
     } catch (error) {
          res.status(500).json({message: error.message});
     }
 }
 
 
module.exports.deleteGp = async (req, res) => {
     try {
 
        const info = await GP.findById(req.params.id)
        const gp_name = info.gp_name

        const temp = await TEMP.deleteMany({gp_name: gp_name});
         const gp = await GP.findByIdAndDelete(req.params.id);
 
         if (!gp) {
             return res.status(404).json({message: "gp not found"});
         }
 
         res.status(200).json({message: "gp deleted succesfully"});
 
 
     } catch (error) {
         res.status(500).json({message: error.message});
     }};
 
 