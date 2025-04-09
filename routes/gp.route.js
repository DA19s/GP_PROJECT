const express = require("express");
const router = express.Router();
const {getGps, getGp, getGpO, createGp, updateGp, deleteGp} = require('../controllers/gp.controller.js');


router.get('/', getGps);
router.get('/gpg/:gpId', getGp);
router.get("/gpo", getGpO);
router.post("/create", createGp);

router.put("/:id", updateGp);

router.delete("/:id", deleteGp);


module.exports = router;
 
