const mongoose = require('mongoose');

const tempSchema = mongoose.Schema(
    {
        gp_name: {
            type: String,
            required: [true],
            trim: true
        },
        
        nom: {
            type: String,
            required: [true],
            trim: true
        },
        
        prenom: {
            type: String,
            required: [true],
            trim: true
        },
        
        number: {
            type: String,
            required: [true],
            trim: true
        },
        
        email: {
            type: String,
            required: [true],
            unique: true,
            trim: true
        },

        poid_colis: {
            type: Number,
            required: [true],
            trim: true
        },

        prix: {
            type: Number,
            required: [true],
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

//play function before save



const temp = mongoose.model("temp", tempSchema);

module.exports = temp;