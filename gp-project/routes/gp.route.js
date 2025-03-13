const express = require("express");
const router = express.Router();
const {getGps, getGp, createGp, updateGp, deleteGp} = require('../controllers/gp.controller.js');


router.get('/', getGps);
router.get('/:gpId', getGp);

router.post("/create", createGp);

router.put("/:gpId", updateGp);

router.delete("/:gpName", deleteGp);


module.exports = router;
 
