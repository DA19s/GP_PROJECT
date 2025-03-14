const express = require("express");
const router = express.Router();
const {SignUpClient, deleteClient} = require('../controllers/client.controller.js');

router.put("/:id", SignUpClient);
router.delete("/delete", deleteClient);

module.exports = router;
