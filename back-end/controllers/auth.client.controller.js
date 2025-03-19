const User = require("../models/client.model");
const jwt = require('jsonwebtoken');
const {signUpErrors, signInErrors} = require('../utils/errors.utils.js');
const mail = require('../utils/mailer.js')

maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};
   
module.exports.signUp = async (req, res) => {
    try{
        const user = await User.create(req.body);
     
        const generateNumericCode = (length) => {
            let code = '';
            for (let i = 0; i < length; i++) {
                code += Math.floor(Math.random() * 10); // Génère un chiffre entre 0 et 9
            }
            return code;
        };
        

        const code = generateNumericCode(6)

        console.log(code);
        
        console.log('ok');
        
        await User.findOneAndUpdate({email: req.body.email}, {code: code}, {new: true})

        console.log('ok');
        
        const email = req.body.email;
        await mail(
            email, // Adresse e-mail du destinataire
            'Confirmation', // Sujet de l'e-mail
            `Votre code est ${code}`,// Texte brut
            `<p>Votre code est ${code}</p>` // Contenu HTML
        );       
        
        res.status(200).json({user})

     } catch (err) {  
        const errors = signUpErrors(err);
         res.status(400).send( {errors} );
     }

}

module.exports.verifyCode = async (req, res) => {
    try{

        console.log(req.params.email);
        
    const user = await User.findOne({email: req.params.email})

    console.log(user);
    
    if (!user){
        return res.status(401).json({message: 'Pas de user'})
    }
    console.log(user.code);
    

    if (user.code === req.body.code)
    {

        code = await User.findOneAndUpdate({email: req.params.email}, {code: null})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, secure: false, sameSite: 'lax', maxAge:maxAge})
        res.status(200).json({user: code._id, token: token })
    }
    else {
        code = await User.findOneAndDelete({email: req.params.email})
    }
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
        console.log(Users);
        
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
 
 