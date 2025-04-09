const GP = require("../models/gp.model");
const temp = require("../models/temp.model");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { finished } = require("stream/promises");
const mail = require('../utils/mailer.js')
const requireAuth = require('../middleware/requireAuth'); 


module.exports.SignUpClient = async (req, res) => {

    try {
        console.log('ok');

        const capacite = await GP.findById(req.params.id).select("poid_restant client");
        const gp_cap = capacite.poid_restant;

        console.log(gp_cap);
        
        const info = await temp.findById(req.params.id2)

        console.log('okk');
        
        const nom = info.nom;
        const prenom = info.prenom;
        const colis = info.colis;
        const number = info.number;
        const email = info.email;
        const poid_colis = info.poid_colis;
        const prix = info.prix;

        console.log('ok' + poid_colis);
        
        
        const poid_restant = gp_cap - poid_colis;

        console.log(poid_restant);
        
        console.log(number);
        
        const existingClient = capacite.client.find(client => client.number === number);
        if (existingClient) {
            return res.status(400).send({ error: "Duplicate field value entered" });
        }

       // console.log(existingClient);
        



        const updatedGP = await GP.findByIdAndUpdate(req.params.id, {poid_restant: poid_restant});
        console.log(updatedGP);
        

        console.log("okkk");
        

        const client = await GP.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    client: {
                        nom: nom,
                        prenom: prenom,
                        colis: colis,
                        number: number,
                        email: email,
                        poid_colis: poid_colis,
                        prix: prix,
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true,}
        );
        console.log("okkk");

        if (!client) return res.status(404).send({ error: "GP not found" });
        console.log("okkk");

        const TEMPO = await temp.findByIdAndDelete(req.params.id2);
        if (!TEMPO) return res.status(404).send({ error: "TEMP not found" });


        console.log('ok0');


        const factureDir = path.join(__dirname, "../factures");
        if (!fs.existsSync(factureDir)) {
            fs.mkdirSync(factureDir);
        }

        // Création du PDF
        const doc = new PDFDocument();
        const pdfPath = path.join(__dirname, `../factures/facture_${info._id}.pdf`);
        const stream = fs.createWriteStream(pdfPath);
        doc.pipe(stream);

        console.log('ok1');
        

        doc.fontSize(25).text("Facture", { align: "center" }).moveDown();
        doc.fontSize(14)
            .text(`Facture ID : ${info._id}`)
            .text(`Nom du client : ${info.nom}`)
            .text(`Date : ${new Date().toLocaleDateString()}`)
            .text(`Montant : ${info.prix} €`);
        doc.end();
        await finished(stream);

        console.log('ok2');


        // Envoi d'email avec le PDF en pièce jointe
        await mail(
            email,
            'Demande acceptee',
            `Votre demande est acceptée. Vous trouverez votre facture en pièce jointe.`,
            '<p>Votre demande est acceptée. Vous trouverez votre facture en pièce jointe.</p>',
            [{
                filename: `facture_${info._id}.pdf`,
                path: pdfPath, // Path du fichier PDF
                contentType: 'application/pdf' // Indique que c’est un fichier PDF
            }]
        );

        console.log('ok3');

         
        return res.status(200).send(client);
    } catch (err) {
        if (err.code === 11000) { 
            return res.status(400).send({ error: "Duplicate field value entered" });
        }
        return res.status(400).send(err);
    }
};

module.exports.deleteClient = async (req, res) => {
    try {

        const capacite = await GP.findById(req.params.id).select("poid_restant client");
        const gp_cap = capacite.poid_restant;

        console.log(gp_cap);
        

        const ajout = capacite.client.find(client => client.number === req.body.number);
        const poids = ajout.poid_colis;

        
        console.log(poids);

        const new_poid = gp_cap + poids;

        console.log(new_poid);
        

        const updatedGP = await GP.findByIdAndUpdate
        (
            req.params.id, 
            {poid_restant: new_poid}
        );


        const number = req.body.number;
        const id = req.params.id
        const gp = await GP.findByIdAndUpdate(
            id,
            {
                $pull: {
                    client: {number: number}
                }
            },
            { new: true,}
        );
        if (!gp) return res.status(404).send({ error: "GP not found" });
        return res.status(200).send(gp);
    } catch (err) {
        return res.status(400).send(err);
    }
};