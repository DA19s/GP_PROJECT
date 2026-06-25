# GP_PROJECT — Plateforme de Groupage Partage

Application web full-stack permettant la gestion de services de **groupage de colis** (GP). La plateforme met en relation des transporteurs (GPs) qui créent des trajets et des clients qui réservent de l'espace dans ces trajets.

---

## Fonctionnement général

```
Client ──► Demande d'espace ──► GP reçoit un email
                                     │
                            GP accepte ou refuse
                                     │
                 Client reçoit un email + facture PDF
```

1. Un **GP (transporteur)** crée un trajet avec une origine, une destination, une capacité (kg), des dates et un prix au kilo.
2. Un **client** consulte les trajets disponibles et soumet une demande de réservation.
3. Le GP reçoit une notification par email et accepte ou refuse la demande.
4. En cas d'acceptation, une **facture PDF** est générée automatiquement et envoyée au client par email.

---

## Stack technique

| Couche          | Technologie                          |
|-----------------|--------------------------------------|
| Backend         | Node.js, Express.js 4.x              |
| Base de données | MongoDB, Mongoose 8.x                |
| Authentification| JWT (jsonwebtoken), bcrypt           |
| Email           | Nodemailer + SMTP Brevo              |
| PDF             | pdfkit                               |
| Upload          | multer                               |
| Frontend        | Vue.js + Vite (dossier `/front-end`) |

---

## Structure du projet

```
GP_PROJECT/
├── index.js                    # Point d'entrée — serveur Express
├── .env                        # Variables d'environnement (non versionné)
├── config/
│   └── db.js                   # Connexion MongoDB
├── models/
│   ├── user.model.js           # GP (transporteur)
│   ├── client.model.js         # Client (expéditeur)
│   ├── gp.model.js             # Trajet de groupage
│   └── temp.model.js           # Demandes en attente
├── controllers/
│   ├── user.controller.js      # Auth & gestion des GPs
│   ├── auth.client.controller.js # Auth & gestion des clients
│   ├── gp.controller.js        # Gestion des trajets
│   ├── temp.controller.js      # Demandes de réservation
│   └── client.controller.js    # Acceptation & facturation
├── routes/
│   ├── user.route.js           # /api/user
│   ├── auth.client.route.js    # /api/cli
│   ├── gp.route.js             # /api/gp
│   ├── temp.route.js           # /api/temp
│   └── client.route.js         # /api/client
├── middleware/
│   └── requireAuth.js          # Vérification du token JWT
├── utils/
│   ├── mailer.js               # Envoi d'emails
│   └── errors.utils.js         # Gestion des erreurs
├── factures/                   # Factures PDF générées
└── front-end/                  # Application Vue.js
```

---

## Installation

### Prérequis

- Node.js >= 18
- npm >= 9
- Une instance MongoDB (locale ou MongoDB Atlas)

### 1. Cloner le dépôt

```bash
git clone https://github.com/DA19s/GP_PROJECT.git
cd GP_PROJECT
```

### 2. Installer les dépendances

```bash
# Backend
npm install

# Frontend
cd front-end && npm install && cd ..
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
TOKEN_SECRET=<une_chaine_aleatoire_longue_et_securisee>
```

> Ne jamais versionner le fichier `.env` ni stocker des secrets en clair en production.

---

## Lancement

### Développement

```bash
# Backend (port 3000)
npm run dev

# Frontend (port 5173) — dans un autre terminal
cd front-end && npm run dev
```

### Production

```bash
node index.js
```

---

## API — Endpoints

### Authentification GP — `/api/user`

| Méthode | Route              | Description                         | Auth |
|---------|--------------------|-------------------------------------|------|
| POST    | `/register`        | Créer un compte GP                  | —    |
| POST    | `/verify/:email`   | Vérifier l'email (code 6 chiffres)  | —    |
| POST    | `/login`           | Connexion GP                        | —    |
| GET     | `/logout`          | Déconnexion                         | —    |
| GET     | `/:userId`         | Récupérer un GP par ID              | —    |
| PUT     | `/:pseudo`         | Modifier le profil GP               | —    |
| DELETE  | `/:pseudo`         | Supprimer le compte GP              | —    |

### Authentification Client — `/api/cli`

Mêmes endpoints que `/api/user`, pour les clients.

### Trajets — `/api/gp`

| Méthode | Route           | Description                              | Auth |
|---------|-----------------|------------------------------------------|------|
| GET     | `/`             | Lister tous les trajets                  | —    |
| GET     | `/gpg/:gpId`    | Détail d'un trajet                       | —    |
| GET     | `/gpo`          | Trajets du GP connecté                   | Oui  |
| POST    | `/create`       | Créer un trajet                          | Oui  |
| PUT     | `/:id`          | Modifier un trajet                       | —    |
| DELETE  | `/:id`          | Supprimer un trajet                      | —    |

### Demandes de réservation — `/api/temp`

| Méthode | Route             | Description                          | Auth |
|---------|-------------------|--------------------------------------|------|
| POST    | `/create`         | Soumettre une demande de réservation | Oui  |
| GET     | `/`               | Lister toutes les demandes           | —    |
| GET     | `/tempg/:TempId`  | Détail d'une demande                 | —    |
| GET     | `/tempo/:id`      | Demandes liées à un trajet           | —    |
| DELETE  | `/delete/:id`     | Supprimer une demande                | —    |

### Gestion des réservations — `/api/client`

| Méthode | Route              | Description                                        | Auth |
|---------|--------------------|----------------------------------------------------|------|
| PUT     | `/:gpId/:tempId`   | Accepter une demande → génère et envoie la facture | —    |
| DELETE  | `/delete/:id`      | Refuser / supprimer une demande                    | —    |

---

## Modèles de données

### User / Client

```
pseudo, nom, prenom, number, email, password (bcrypt), code (vérification email), image
```

### GP (Trajet)

```
gp_name, owner, owner_number, owner_email
pays_depart, ville_depart, adresse_depart
pays_destination, ville_destination, adresse_destination
capacite (kg total), poid_utilise, poid_restant
date_depart, date_arrive, prix_kilo
client[] → { prenom, nom, colis, number, email, poid_colis, prix, timestamp }
```

### Temp (Demande en attente)

```
gp_name, nom, prenom, colis, number, email, poid_colis, prix
```

---

## Flux d'authentification

1. Inscription → envoi d'un code de vérification à 6 chiffres par email
2. Vérification du code → compte activé
3. Connexion → réception d'un token JWT (valide 3 jours)
4. Requêtes protégées → header `Authorization: Bearer <token>`

> Si le code de vérification est invalide, le compte est supprimé automatiquement.

---

## Notes

- Le dossier `factures/` est servi en statique par Express sur `/factures`.
- Le CORS est configuré pour `http://localhost:5173` en développement.
- Aucune suite de tests n'est implémentée pour l'instant.

---

## Licence

Usage privé — tous droits réservés.
