---
title: "Feature-Driven Development avec TypeScript, Express et Zod 🚀"
excerpt: "Une approche moderne du développement d'API backend en TypeScript : organisez votre code par fonctionnalité (feature), pas par rôle technique."
date: "2025-06-06"
readTime: "6 min"
author: "Adrian Pothuaud"
tags: ["TypeScript", "Express", "Zod", "Backend", "Architecture"]
mediumUrl: "https://medium.com/@adrianpothuaud/feature-driven-development-with-typescript-express-and-zod"
---

Vous êtes-vous déjà retrouvé noyé dans un code spaghetti ? Ou à chercher un bug à travers des dizaines de fichiers sans structure claire ? Le **Feature-Driven Development (FDD)** peut changer la donne.

## Qu'est-ce que le Feature-Driven Development ?

Le FDD consiste à organiser votre codebase autour des **fonctionnalités métier** plutôt que des rôles techniques. Au lieu de grouper par :

```
/controllers, /services, /models
```

On groupe par fonctionnalité :

```
/features/auth/auth.ts
/features/user/user.ts
```

## Pourquoi TypeScript + Express + Zod ?

- **TypeScript** : typage statique, moins de surprises à l'exécution
- **Express** : framework minimal et flexible
- **Zod** : validation du schéma des entrées dès le point d'entrée, avec inférence de types automatique

## Structure de projet

```
/src
  /features
    /sayHello
      sayHello.ts       # Implémentation
      sayHello.test.ts  # Tests
  /utils
    errors.ts
    schemaValidation.ts
  app.ts
  main.ts
```

Cette structure est **clean**, **intuitive** et **scalable**. Chaque fonctionnalité est autonome, avec son implémentation et ses tests au même endroit — ce qui simplifie grandement la navigation et la maintenance.
