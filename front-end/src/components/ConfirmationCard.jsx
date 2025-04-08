import { motion } from "framer-motion"; // L'importation est correcte ici
import React from "react";
import "./ConfirmationCard.css";

const ConfirmationCard = ({ prenom, gpName, prix, ownerNumber, onClose }) => {
  return (
    <div className="confirmation-overlay">
      <motion.div
        className="confirmation-card"
        initial={{ y: -200, opacity: 0 }} // Animation : démarrer au-dessus et invisible
        animate={{ y: 0, opacity: 1 }} // Devenir visible et se placer à sa position finale
        transition={{ duration: 0.6, ease: "easeOut" }} // Durée de l'animation
      >
        <h2 className="confirmation-title">Merci {prenom} !</h2>
        <p className="confirmation-message">
          Votre demande pour le groupage <strong>{gpName}</strong> a été
          effectuée avec succès.
        </p>
        <p className="confirmation-message">
          Le prix à payer est de <strong>{prix} FCFA</strong>.
        </p>
        <p className="confirmation-message">
          Veuillez effectuer le paiement via <strong>Wave</strong> ou{" "}
          <strong>Orange Money</strong> au numéro suivant :{" "}
          <strong>{ownerNumber}</strong>.
        </p>
        <p className="confirmation-message">
          Une fois le paiement effectué, rendez-vous dans{" "}
          <strong>"Mes reçus"</strong> pour obtenir votre reçu.
        </p>
        <button className="confirmation-close" onClick={onClose}>
          Fermer
        </button>
      </motion.div>
    </div>
  );
};

export default ConfirmationCard;
