const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoute = require('./routes/user.route.js');
const gpRoute = require('./routes/gp.route.js');

//app.use(cors())




// Configuration des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connexion à MongoDB
connectDB();

app.use("/api/user", userRoute); 
app.use("/api/gp", gpRoute); 


// Route de test
app.get('/', (req, res) => {
  res.send('Hello World from Express with MongoDB!');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
