---
title: "Tests API continus avec Postman, Newman et GitHub Actions"
excerpt: "Comment débloquer le partage de collections Postman via Git et les intégrer dans un pipeline CI/CD avec Newman et GitHub Actions pour des tests d'API continus."
date: "2024-06-19"
readTime: "8 min"
author: "Adrian Pothuaud"
tags: ["Postman", "Newman", "GitHub Actions", "API Testing", "CI/CD", "ATDD"]
mediumUrl: "https://medium.com/@adrianpothuaud/unlock-file-system-and-git-sharing-with-postman"
---

> **Note** : Cet article s'adresse plutôt aux testeurs peu techniques, aux testeurs fonctionnels QA, ou simplement aux personnes souhaitant tester leur API avec un outil intuitif comme Postman. Il peut être une solution pour partager les ressources de test entre développeurs et testeurs fonctionnels. Si vous continuez à lire parce que le sujet vous intéresse, bonne lecture !

Je ne comprends pas pourquoi Postman n'a toujours pas activé un système de synchronisation avec le système de fichiers — c'est vraiment gênant dans de nombreux projets, surtout quand on voit d'autres outils comme [Bruno](https://www.usebruno.com/) qui proposent déjà cette fonctionnalité.

Dans cet article, je vous montrerai comment j'utilise pour débloquer la synchronisation des Collections et Environnements Postman via le système de fichiers et `.git`, ainsi que comment je les intègre dans GitHub Actions pour les tests d'intégration continue et l'Acceptance Test-Driven Development.

## Projet de départ

Commençons tous ensemble ! Nous allons créer un serveur API très simple avec Node.js et Express.

- Ouvrez d'abord un Terminal et créez un nouveau dossier.
- Ensuite, utilisez `npm init` :

```bash
npm init
```

- Puis installez Express :

```bash
npm install express
```

- Créez ensuite le fichier `app.js` comme suit :

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;
```

- Créez ensuite un fichier `server.js` :

```javascript
const http = require('http');
const app = require('./app');
const server = http.createServer(app);

module.exports = server;
```

- Et un `start.js` :

```javascript
const server = require("./server");
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

- Mettez à jour le script de démarrage NPM dans `package.json` pour utiliser `node start.js` :

```json
"scripts": {
  "start": "node start.js",
  "test": "TODO"
}
```

Testez ensuite l'application en exécutant `npm start` et ouvrez votre navigateur à `http://localhost:3000`.

## Mise en place

### Git

- Initialisez Git dans votre projet puis ajoutez-le sur GitHub.
- Ajoutez un fichier `.gitignore` avec `node_modules` et `.env*` :

```
node_modules
.env*
```

### Collection et Environnement Postman

- Démarrez Postman et créez 1 nouvelle Collection et 1 nouvel Environnement (appelé `local`)
- Définissez `baseUrl` à `http://localhost:3000` dans l'environnement local
- Ajoutez une requête `GET {{baseUrl}}/` et vérifiez que le code de statut est 200
- Vérifiez que vous pouvez exécuter la collection et que tous les tests passent

### Configuration pour la synchronisation avec le système de fichiers

Nous aurons besoin de votre Token API Postman, de l'ID de la Collection et de l'ID de l'Environnement pour configurer notre flux de Tests API Continus.

- Créez un fichier `.env.local` dans votre projet
- Ouvrez les détails de la Collection et cliquez sur la section Info
- Copiez l'ID de la collection et collez-le dans `.env.local` sous le nom `POSTMAN_COLLECTION_ID`
- Ouvrez les détails de l'Environnement et cliquez sur la section Info, copiez l'ID et collez-le dans `.env.local` sous le nom `POSTMAN_ENVIRONMENT_ID`

Il vous faudra ensuite un Token API Postman que vous pouvez générer en suivant le [guide officiel](https://learning.postman.com/docs/developer/postman-api/authentication/#generate-a-postman-api-key).

Copiez et collez votre token dans votre fichier `.env.local` sous le nom `POSTMAN_API_TOKEN`.

Nous allons maintenant créer un script node.js appelé `synchronizePostmanFiles.js` chargé de télécharger nos fichiers Collection et Environnement depuis les serveurs Postman.

Nous avons besoin d'axios que vous pouvez installer avec `npm i axios` :

```javascript
const axios = require('axios');
const fs = require("fs");

const fetchCollection = () => {
  const options = {
    method: 'GET',
    url: `https://api.getpostman.com/collections/${process.env.POSTMAN_COLLECTION_ID}`,
    headers: { 'X-Api-Key': process.env.POSTMAN_API_TOKEN }
  };
  axios.request(options)
    .then(response => {
      const { collection } = response.data;
      fs.writeFileSync("collection.json", JSON.stringify(collection, null, 2));
    })
    .catch(error => { console.error(error); });
};

const fetchEnvironment = () => {
  const options = {
    method: 'GET',
    url: `https://api.getpostman.com/environments/${process.env.POSTMAN_ENVIRONMENT_ID}`,
    headers: { 'X-Api-Key': process.env.POSTMAN_API_TOKEN }
  };
  axios.request(options)
    .then(response => {
      const { environment } = response.data;
      fs.writeFileSync("environment.json", JSON.stringify(environment, null, 2));
    })
    .catch(error => { console.error(error); });
};

fetchCollection();
fetchEnvironment();
```

Pour tester notre script en local, nous aurons besoin du `dotenv-cli` :

```bash
npm i -g dotenv-cli
npx dotenv -e .env.local -- node synchronizePostmanFiles.js
```

Les fichiers `collection.json` et `environment.json` seront alors ajoutés au projet.

### Activation de la synchronisation

Ajoutez un script npm `sync` que nous utiliserons plus tard pour la synchronisation en CI :

```json
"scripts": {
  "newman": "newman run collection.json -e environment.json -r cli",
  "start": "node start.js",
  "sync": "node synchronizePostmanFiles.js",
  "test": "NA"
}
```

Plusieurs solutions peuvent gérer la synchronisation, mais celle que je préfère est d'utiliser **husky** et un hook pre-commit : ainsi, à chaque commit, les fichiers Collection et Environnement seront automatiquement synchronisés avec les serveurs Postman.

### Configuration de Newman et GitHub Actions

Passons maintenant à la partie intéressante — la configuration de Newman dans GitHub Actions :

```bash
npm i -D newman
```

Et pour "démarrer et tester" notre serveur, nous utiliserons [start-server-and-test](https://www.npmjs.com/package/start-server-and-test) :

```bash
npm install --save-dev start-server-and-test
```

On peut ensuite affiner le script de test :

```json
"scripts": {
  "newman": "newman run collection.json -e environment.json -r cli",
  "start": "node start.js",
  "sync": "node synchronizePostmanFiles.js",
  "test": "start-server-and-test start http://localhost:3000 newman"
}
```

Et tester en local avec :

```bash
npx dotenv -e .env.local -- npm test
```

### GitHub Actions

Il suffit maintenant d'ajouter un fichier `.github/workflows/ci.yml` :

```yaml
name: Validate (Continuous Integration)

on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master

jobs:
  test:
    runs-on: ubuntu-latest
    env:
      PORT: 3000
      POSTMAN_API_TOKEN: ${{ secrets.POSTMAN_API_TOKEN }}
      POSTMAN_COLLECTION_ID: ${{ secrets.POSTMAN_COLLECTION_ID }}
      POSTMAN_ENVIRONMENT_ID: ${{ secrets.POSTMAN_ENVIRONMENT_ID }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install Dependencies
        run: npm install
      - name: Synch Postman files
        run: npm run sync
      - name: Run server and Postman tests
        run: npm run test
```

Dans le dépôt GitHub, ajoutez les secrets correspondants (`POSTMAN_API_TOKEN`, `POSTMAN_COLLECTION_ID`, `POSTMAN_ENVIRONMENT_ID`) et commitez/poussez vos modifications.

Vous pouvez alors voir la CI tourner dans les Actions — Félicitations ! 🎉

## Ajouter une nouvelle fonctionnalité avec l'ATDD et Postman

Grâce à cette configuration, vous pouvez désormais pratiquer l'**Acceptance Test-Driven Development (ATDD)** avec Postman :

1. Rédigez d'abord vos tests Postman (avant que la fonctionnalité soit implémentée)
2. Lancez le pipeline CI — les tests vont échouer (rouge)
3. Implémentez la fonctionnalité
4. Relancez le pipeline CI — les tests devraient passer (vert)
5. Synchronisez votre collection Postman pour tout garder à jour

Ce flux de travail crée un langage commun entre les développeurs, les testeurs fonctionnels et les parties prenantes métier — tout en maintenant tous les tests versionnés dans votre dépôt Git.

---

Cette approche convient particulièrement bien aux équipes dont les testeurs fonctionnels ne sont pas à l'aise avec des frameworks de test basés sur le code comme Jest ou Playwright. L'interface intuitive de Postman la rend accessible à tous, tandis que Newman et GitHub Actions apportent l'automatisation et l'intégration CI/CD nécessaires à une assurance qualité continue.
