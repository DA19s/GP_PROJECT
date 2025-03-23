const express = require("express");
const router = express.Router();
const {AskClient, deleteAskClient, getTemps, getTemp, getTempO} = require('../controllers/temp.controller.js');

router.post("/create", AskClient);
router.delete("/delete/:id", deleteAskClient);

router.get('/', getTemps);
router.get('/tempg/:TempId', getTemp);
router.get("/tempo/:id", getTempO);

module.exports = router;
