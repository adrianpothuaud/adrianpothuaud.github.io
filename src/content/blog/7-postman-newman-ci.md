---
title: "Tests API continus avec Postman, Newman et GitHub Actions"
excerpt: "Comment débloquer le partage de collections Postman via Git et les intégrer dans un pipeline CI/CD avec Newman et GitHub Actions pour des tests d'API continus."
date: "2024-06-19"
readTime: "8 min"
author: "Adrian Pothuaud"
tags: ["Postman", "Newman", "GitHub Actions", "API Testing", "CI/CD", "ATDD"]
mediumUrl: "https://medium.com/@adrianpothuaud/unlock-file-system-and-git-sharing-with-postman"
---

> **Disclaimer**: This article is more intended for not-so-technical testers, functional QA testers or simply people wanting to test their API with an intuitive tool like Postman. It could be a solution to share testing stuff between developers and functional testers. However, if you keep reading because this topic is interesting for you, enjoy!

I don't know why Postman still doesn't have unlocked a file system synchronization system but it's really annoying in a lot of projects — especially when we see other tools like [Bruno](https://www.usebruno.com/) with this feature.

In this article I'll show you how I use to unlock file system and `.git` sharing of my Postman Collections and Environments as well as how I use them in GitHub Actions for continuous integration testing and Acceptance Tests Driven Development.

## Starter Project

Let's start all together! We'll create a very simple API server using Node.js and Express.

- First, open a Terminal and create a new Folder.
- Then use `npm init`:

```bash
npm init
```

- Then install Express:

```bash
npm install express
```

- Then create `app.js` file as follow:

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;
```

- Then create a `server.js` file:

```javascript
const http = require('http');
const app = require('./app');
const server = http.createServer(app);

module.exports = server;
```

- And a `start.js`:

```javascript
const server = require("./server");
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

- Update the NPM start script in `package.json` to use `node start.js`:

```json
"scripts": {
  "start": "node start.js",
  "test": "TODO"
}
```

Then test the app by running `npm start` and open your web browser at `http://localhost:3000`.

## Setting things up

### Git

- Initialize Git in your project then add it to GitHub.
- Add a `.gitignore` file with `node_modules` and `.env*`:

```
node_modules
.env*
```

### Postman Collection and Environment

- Start Postman and create 1 new Collection and 1 new Environment (called `local`)
- Set `baseUrl` to `http://localhost:3000` in local Environment
- Add a Request `GET {{baseUrl}}/` and test that status code is 200
- Verify you can Run the collection and All tests PASS

### Setup for file system sync

Now we'll need your Postman API Token, the Collection ID and the Environment ID to continue and setup our Continuous API Testing Flow…

- Create a file `.env.local` in your project
- Open Collection details and click the Info section
- Then copy the collection ID and paste it to `.env.local` as `POSTMAN_COLLECTION_ID`
- Open Environment details and click the Info section, copy the ID and paste it to `.env.local` file as `POSTMAN_ENVIRONMENT_ID`

Then we need a Postman API Token that we can generate using the [official guide](https://learning.postman.com/docs/developer/postman-api/authentication/#generate-a-postman-api-key).

Copy and paste your token in your `.env.local` file as `POSTMAN_API_TOKEN`.

Now we'll create a node.js script called `synchronizePostmanFiles.js` in charge of downloading our Collection and Environment files from Postman servers.

We need axios that we can install with `npm i axios`:

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

In order to test our script in local env we'll need the `dotenv-cli`:

```bash
npm i -g dotenv-cli
npx dotenv -e .env.local -- node synchronizePostmanFiles.js
```

Then we'll have `collection.json` and `environment.json` files added to the project.

### Enabling synchronization

Add a `sync` npm script that we'll use later for synchronization in the CI:

```json
"scripts": {
  "newman": "newman run collection.json -e environment.json -r cli",
  "start": "node start.js",
  "sync": "node synchronizePostmanFiles.js",
  "test": "NA"
}
```

We could use multiple solutions to handle synchronization, but the one I prefer is using **husky** and a pre-commit hook, so anytime you will commit, the Collection and Environment files will be synchronized with Postman servers.

### Setting Newman and GitHub Actions

Now, the interesting part — we'll setup Newman in GitHub Actions:

```bash
npm i -D newman
```

And in order to "run & test" our server we'll use [start-server-and-test](https://www.npmjs.com/package/start-server-and-test):

```bash
npm install --save-dev start-server-and-test
```

Then we can refine the test script:

```json
"scripts": {
  "newman": "newman run collection.json -e environment.json -r cli",
  "start": "node start.js",
  "sync": "node synchronizePostmanFiles.js",
  "test": "start-server-and-test start http://localhost:3000 newman"
}
```

And test in local with:

```bash
npx dotenv -e .env.local -- npm test
```

### GitHub Actions

Now simply add a `.github/workflows/ci.yml` file:

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

In GitHub repository, add the corresponding secrets (`POSTMAN_API_TOKEN`, `POSTMAN_COLLECTION_ID`, `POSTMAN_ENVIRONMENT_ID`) and commit/push your changes.

Then you can see CI in actions — Congratulations! 🎉

## Adding a new Feature using ATDD with Postman

With this setup, you can now practice **Acceptance Test-Driven Development (ATDD)** with Postman:

1. Write your Postman tests first (before the feature is implemented)
2. Run the CI pipeline — tests will fail (red)
3. Implement the feature
4. Run the CI pipeline again — tests should pass (green)
5. Synchronize your Postman collection to keep everything up to date

This workflow creates a common language between developers, functional testers and business stakeholders — while keeping all tests versioned in your Git repository.

---

This approach is particularly well-suited for teams where functional testers aren't comfortable with code-based testing frameworks like Jest or Playwright. Postman's intuitive UI makes it accessible to everyone, while Newman and GitHub Actions bring the automation and CI/CD integration needed for continuous quality assurance.
