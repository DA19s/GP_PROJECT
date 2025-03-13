const GP = require("../models/gp.model");

module.exports.createGp = async (req, res) => {
    try {
        const newGP = await GP.create(req.body);
        res.status(200).json({ gp: newGP });
    } catch (err) {
        console.error(err); // Affiche l'erreur dans la console pour le débogage
        res.status(400).json({ err });
    }
};


module.exports.getGps = async (req, res) => {
    try {
        const gps = await GP.find().select();
        res.status(200).json(gps);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.getGp = async (req, res) => {
    try {

        const gp = await GP.findById({_id: req.params.gpId})
        res.status(200).json(gp);
    } catch (error) {
        throw error    }
}


module.exports.updateGp = async (req, res) => {
     try {
         const {id} = req.params;
 
         const gp = await GP.findOneAndUpdate({id: id}, req.body)
 
         if (!gp) {
             return res.status(404).json({message: "gp not found"});
         }
 
         const updatedgp = await GP.findOneAndUpdate({id: req.body.id});
         res.status(200).json(updatedgp);
 
     } catch (error) {
          res.status(500).json({message: error.message});
     }
 }
 
 
module.exports.deleteGp = async (req, res) => {
     try {
         const {pseudo} = req.params;
 
         const gp = await GP.findOneAndDelete({pseudo: pseudo});
 
         if (!gp) {
             return res.status(404).json({message: "gp not found"});
         }
 
         res.status(200).json({message: "gp deleted succesfully"});
 
 
     } catch (error) {
         res.status(500).json({message: error.message});
     }};
 
 