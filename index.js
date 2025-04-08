const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoute = require("./routes/user.route.js");
const cliRoute = require("./routes/auth.client.route.js");
const gpRoute = require("./routes/gp.route.js");
const clientRoute = require("./routes/client.route.js");
const tempRoute = require("./routes/temp.route.js");
require("./index.js");

const requireAuth = require("./middleware/requireAuth"); // Import du middleware

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
//app.use(cors())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Configuration des variables d'environnement

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connexion à MongoDB
connectDB();

app.use("/api/user", userRoute);
app.use("/api/cli", cliRoute);
app.use("/api/gp", gpRoute);
app.use("/api/client", clientRoute);
app.use("/api/temp", tempRoute);

// Route de test
app.get("/", (req, res) => {
  res.send("Hello World from Express with MongoDB!");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
