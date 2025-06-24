# 📌 IMPORTANT – Configuration requise

- **Composer** : version **2.4.1** 
- **Node.js** : version **v22.13.1**
- **PHP** : version **8.1**
- **Laravel Serveur** : http://localhost:8000
- **React Serveur (Vite)** : http://localhost:5173
- 
🎬 **Vidéo de démonstration privée** :  
[Regarder la démo sur YouTube](https://youtu.be/HHRV-RZGcQ0)

> Merci de s'assurer que ces versions installées pour que le projet fonctionne correctement.

---

# 📝 Notes App – Plateforme de Prise de Notes Multi-Entreprise

Ce projet est une application web **fullstack** développée dans le cadre d’un test technique.  
Il permet aux utilisateurs de **créer, modifier et supprimer des notes**, avec une séparation par entreprise via une architecture **multi-tenant**.

---

## 🛠️ Stack Technique

- **Backend** : Laravel 10 (API RESTful), multi-tenancy avec `stancl/tenancy`
- **Frontend** : React + TypeScript (Vite)
- **Base de données** : MySQL
- **Authentification** : Sanctum (token-based)
- **Architecture** : API-first, gestion des sous-domaines

---

## 📁 Structure du projet

.
├── backend/ # Laravel API
├── frontend/ # React (Vite)
└── README.md

---

## 🚀 Instructions d’installation

1. clone project

git clone https://github.com/hCoding69/illizero.git
cd illizero

2. 🔧 Backend Laravel (API)

cd backend

# Installer les dépendances PHP
composer install

# Copier le fichier .env
cp .env.example .env

# Générer la clé d’application
php artisan key:generate

# Configurer la base de données dans le fichier .env

# Exécuter les migrations principales
php artisan migrate

# Lancer le serveur Laravel
php artisan serve --host=localhost --port=8000

3. ⚛️ Frontend React
cd ../frontend

# Installer les dépendances Node
npm install

# Lancer le serveur React
npm run dev
➡️ Interface disponible sur : http://localhost:5173
