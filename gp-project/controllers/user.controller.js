const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const {signUpErrors, signInErrors} = require('../utils/errors.utils.js');

maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signUp = async (req, res) => {
    try{
        const user = await User.create(req.body);
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, secure: false, sameSite: 'lax', maxAge:maxAge})
        res.status(200).json({user: user._id, token: token })
     } catch (err) {  
        const errors = signUpErrors(err);
         res.status(400).send( {errors} );
     }

}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, secure: false, sameSite: 'lax', maxAge:maxAge})
        res.status(200).json({user: user._id, token: token })
        console.log(token);

    } catch (err) { 
        const errors = signInErrors(err);
         res.status(400).send( {errors} );
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
}

module.exports.getUsers = async (req, res) => {
    try {
        const Users = await User.find().select();
        res.status(200).json(Users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const Users = await User.findById({_id: req.params.userId}).select("pseudo");
        res.status(200).json(Users);
    } catch (error) {
        throw error    }
}


module.exports.updateUser = async (req, res) => {
    /* console.log(req.params);
     if (!ObjectID.isValid(req.params.id))
         return res.status(400).send("ID Unknown : " + req.params.id); */
     try {
         const {id} = req.params;
 
         const user = await User.findOneAndUpdate({id: id}, req.body)
 
         if (!user) {
             return res.status(404).json({message: "User not found"});
         }
 
         const updatedUser = await User.findOneAndUpdate({id: req.body.id});
         res.status(200).json(updatedUser);
 
     } catch (error) {
          res.status(500).json({message: error.message});
     }
 }
 
 
module.exports.deleteUser = async (req, res) => {
     try {
         const {pseudo} = req.params;
 
         const user = await User.findOneAndDelete({pseudo: pseudo});
 
         if (!user) {
             return res.status(404).json({message: "User not found"});
         }
 
         res.status(200).json({message: "User deleted succesfully"});
 
 
     } catch (error) {
         res.status(500).json({message: error.message});
     }};
 
 