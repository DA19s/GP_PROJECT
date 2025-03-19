const express = require("express");
const router = express.Router();
const {SignUpClient, deleteClient} = require('../controllers/client.controller.js');

router.put("/:id/:id2", SignUpClient);
router.delete("/delete/:id", deleteClient);

module.exports = router;
