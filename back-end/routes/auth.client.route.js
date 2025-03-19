const express = require("express");
const router = express.Router();
const {getUsers, getUser, updateUser, deleteUser, signUp, signIn, logout} = require('../controllers/auth.client.controller.js');


router.get('/', getUsers);
router.get('/:userId', getUser);

router.post("/register", signUp);
router.post('/login', signIn);

router.put("/:pseudo", updateUser);

router.delete("/:pseudo", deleteUser);

router.get("/logout", logout);

module.exports = router;
 
