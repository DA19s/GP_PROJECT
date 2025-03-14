const mongoose = require('mongoose');

const GPSchema = new mongoose.Schema(
    {
        gp_name: {
            type: String,
            required: true,
            unique: true
        },

        description: {
            type: String
        },

        owner: {
            type: String,
            required: true
        },

        owner_number: {
            type: String,
            required: true
        },

        pays_depart: {
            type: String,
            required: true
        },
        
        ville_depart: {
            type: String,
            required: true
        },
        
        pays_destination: {
            type: String,
            required: true
        },
        
        ville_destination: {
            type: String,
            required: true
        },

        capacite: {
            type: Number, 
            required: true
        },

        poid_utilise: {
            type: Number,
        },

        poid_restant: {
            type: Number,
        },

        date_depart: {
            type: Date,
            required: true
        },

        date_arrive: {
            type: Date,
            required: true
        },

        prix_kilo: {
            type: Number,
            required: true
        },

        client: {
            type: [ 
                {
                    prenom: String,
                    nom: String,
                    pays: String,
                    ville: String,
                    number: {type: String, unique: true},
                    poid_colis: Number,
                    timestamp: Number,
                }
            ],
        },
    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model('gp', GPSchema);
