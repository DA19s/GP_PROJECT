const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const codeSchema = mongoose.Schema(
    {
        code: {
            type: String,
            required: [true],
            trim: true,
            unique: true
        },
        
        email: {
            type: String,
            required: [true],
            trim: true,
            unique: true
        },

    },
    {
        timestamps: true,
    }
);

//play function before save

const user = mongoose.model("code", codeSchema);

module.exports = code;