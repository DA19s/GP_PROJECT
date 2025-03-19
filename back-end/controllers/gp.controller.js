const GP = require("../models/gp.model");
const TEMP = require("../models/temp.model");
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');

module.exports.createGp = async (req, res) => {
    try {
        const newGP = await GP.create(req.body);
        res.status(200).json({ gp: newGP });
        
        const rest_gp = await GP.findOneAndUpdate({gp_name: req.body.gp_name}, {poid_restant: req.body.capacite});

    } catch (err) {
        console.error(err); 
        res.status(400).json({ err });
    }
};


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

module.exports.getGpO = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Token not provided, please log in.' });
        }
    
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id;  
        console.log(userId);

        const user = await User.findById(userId);
        console.log(user.pseudo);

        const gpo = await GP.find({owner: user.pseudo});
        console.log(gpo);
        res.status(200).json(gpo);
    } catch (error) {
        throw error    }
}

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
 
 