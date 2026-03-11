---
title: "Feature-Driven Development avec TypeScript, Express et Zod 🚀"
excerpt: "Une approche moderne du développement d'API backend en TypeScript : organisez votre code par fonctionnalité (feature), pas par rôle technique."
date: "2025-06-06"
readTime: "6 min"
author: "Adrian Pothuaud"
tags: ["TypeScript", "Express", "Zod", "Backend", "Architecture"]
mediumUrl: "https://medium.com/@adrianpothuaud/feature-driven-development-with-typescript-express-and-zod"
---

## Introduction 👋

Bonjour à tous, chers développeurs backend ! 👨‍💻 👩‍💻

Vous vous êtes déjà retrouvé à vous noyer dans un océan de code spaghetti ? Ou peut-être avez-vous vécu la frustration de traquer un bug à travers de multiples fichiers sans structure claire ? On est tous passés par là ! 😩

Aujourd'hui, j'ai le plaisir de partager avec vous une approche qui a transformé ma façon de concevoir des APIs backend : le **Feature-Driven Development (FDD) avec TypeScript, Express et Zod**. 🎯

Dans cet article, je vais vous guider à travers une structure de projet minimaliste mais puissante qui rend le développement de vos APIs plus :

- 🧩 **Modulaire** — chaque fonctionnalité est autonome
- 🛡️ **Type-safe** — fini les surprises à l'exécution
- 📝 **Validé** — validation des entrées dès le départ
- 🧪 **Testable** — facile à tester et à maintenir

C'est parti ! 🏊‍♂️

## Qu'est-ce que le Feature-Driven Development ? 🤔

Le Feature-Driven Development (FDD) est une approche qui consiste à organiser sa base de code autour des fonctionnalités métier plutôt que des préoccupations techniques. Au lieu de regrouper les fichiers par rôle technique (contrôleurs, services, modèles), on les regroupe par fonctionnalité.

Par exemple, plutôt que d'avoir :

```
/controllers
  - authController.ts
  - userController.ts
/services
  - authService.ts
  - userService.ts
/models
  - user.ts
```

On organise par fonctionnalité :

```
/features
  /auth
    - auth.ts
    - auth.test.ts
  /user
    - user.ts
    - user.test.ts
```

Cette approche rend votre base de code plus intuitive, plus facile à naviguer et plus simple à maintenir ! 🧠

## Structure du projet 📁

Voici la structure de notre projet exemple :

```
/src
  /features       # All our API features live here
    /sayHello     # A simple hello world feature
      - sayHello.ts         # Feature implementation
      - sayHello.test.ts    # Feature tests
    - IFeature.ts           # Feature interface definition
    - IAPIFeature.ts        # API feature interface definition
  /utils          # Utility functions
    - errors.ts             # Error handling utilities
    - schemaValidation.ts   # Zod schema validation helpers
  - app.ts                  # Express app setup
  - main.ts                 # Entry point
  - IApiController.ts       # Controller type definition
  - testAgent.ts            # Testing utility
```

Cette structure est **propre**, **intuitive** et **scalable**. Chaque fonctionnalité dispose de son propre dossier contenant tout le code qui la concerne. 🧹

## Les interfaces clés 🏗️

L'essence de cette approche repose sur deux interfaces fondamentales :

### IFeature

Cette interface définit les métadonnées de base de notre endpoint API :

```typescript
export interface IFeature {
  endpoint: string;          // API route path
  method: "delete" | "get" | "patch" | "post";  // HTTP method
  name: string;              // Feature name for documentation
  requiresAuth?: boolean;    // Does it need authentication?
  successStatusCode: number; // Success status code (200, 201, etc.)
}
```

### IAPIFeature

Cette interface définit l'implémentation concrète de notre fonctionnalité :

```typescript
export interface IAPIFeature<Input, Output> {
  inputSchema: ZodSchema;              // Zod schema for input validation
  getInput: (req: Request) => Input;   // Extract input from request
  handler: (input: Input) => Output | Promise<Output>; // Business logic
}
```

En séparant les métadonnées de l'implémentation, on crée une séparation nette des responsabilités. 👌

## Construisons une fonctionnalité ! 🏗️

Voici un exemple simple de fonctionnalité "Hello World" pour voir comment tout s'articule :

```typescript
// src/features/sayHello.ts
import { z } from "zod";
import { IFeature } from "./IFeature";
import { IAPIFeature } from "./IAPIFeature";
import { parseBySchema } from "../utils/schemaValidation";

// Feature metadata
export const sayHelloFeature: IFeature = {
  endpoint: "/hello",
  method: "get",
  name: "Say Hello",
  successStatusCode: 200,
};

// Type definitions
export interface SayHelloInput {
  firstName?: string;
}

export interface SayHelloOutput {
  message: string;
}

// Input validation schema
export const sayHelloInputSchema = z.object({
  firstName: z.string().optional(),
}).optional();

// Feature implementation
export const sayHelloApiFeature: IAPIFeature<SayHelloInput, SayHelloOutput> = {
  inputSchema: sayHelloInputSchema,
  getInput: (req) => parseBySchema<SayHelloInput>(req.query, sayHelloInputSchema),
  handler: (input) => {
    let message: string = "";
    if (input && input.firstName) message = `Hello ${input.firstName}!`;
    else message = "Hello World!";
    return { message };
  },
};
```

Décortiquons ce qui se passe ici :

1. 📋 On définit les métadonnées de la fonctionnalité (endpoint, méthode, nom, etc.)
2. 📝 On définit les types d'entrée et de sortie pour la sûreté du typage
3. 🛡️ On crée un schéma Zod pour la validation des entrées
4. 🔧 On implémente la fonctionnalité avec les fonctions `getInput` et `handler`

La beauté de cette approche, c'est qu'elle est **autonome et focalisée**. Chaque fonctionnalité sait exactement ce qu'elle doit faire et comment le faire. 🎯

## Validation des entrées avec Zod 🛡️

Zod est une bibliothèque de validation de schémas orientée TypeScript qui permet de définir ses schémas une seule fois et d'obtenir à la fois la validation à l'exécution et l'inférence de types statiques.

Notre utilitaire `parseBySchema` simplifie la validation des requêtes entrantes :

```typescript
// src/utils/schemaValidation.ts
export function parseBySchema<T>(
  target: Request["body"] | Request["query"],
  schema: ZodSchema,
): T {
  try {
    return schema.parse(target) as T;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new AppError(400, formatZodErrorToString(error));
    }
  }
}
```

Cette fonction :
1. 🧪 Prend les données de la requête et un schéma Zod
2. 🔍 Tente de parser et valider les données
3. ❌ Lance une erreur formatée si la validation échoue
4. ✅ Retourne les données validées et typées en cas de succès

Fini la validation manuelle et les assertions de type ! 🎉

## Tout brancher dans Express 🔌

Notre fichier `app.ts` montre comment enregistrer toutes nos fonctionnalités dans Express :

```typescript
// src/app.ts
const features = [
  { base: sayHelloFeature, api: sayHelloApiFeature },
  // Add more features here
];

features.forEach(({ base, api }) => {
  const handlers = [];

  if (base.requiresAuth) {
    // Add auth middleware if required
  }

  const controller: TAPIController = async (req, res) => {
    const input = api.getInput(req);
    const result = await api.handler(input);
    res.status(base.successStatusCode).json(result);
  };

  handlers.push(controller);
  const method = base.method.toLowerCase() as keyof Express;
  app[method](base.endpoint, ...handlers);
});
```

Cette approche est :
1. 🔄 Elle parcourt toutes nos fonctionnalités
2. 🚪 Elle ajoute les middlewares nécessaires (comme l'authentification)
3. 🎮 Elle crée une fonction contrôleur qui gère la requête
4. 📝 Elle enregistre l'endpoint dans Express

C'est **déclaratif**, **cohérent** et **scalable** ! 📈

## Les tests simplifiés 🧪

L'un des grands avantages de cette approche, c'est la facilité avec laquelle on peut tester. Voici comment on teste notre fonctionnalité `sayHello` :

```typescript
// src/features/sayHello.test.ts
import { expect, test } from "vitest";
import { testAgent } from "../testAgent";
import { sayHelloFeature } from "./sayHello";

test("sayHelloWorld", async () => {
  await testAgent[sayHelloFeature.method](sayHelloFeature.endpoint)
    .expect(sayHelloFeature.successStatusCode)
    .expect("Content-Type", /json/)
    .expect((res: Response) => {
      expect(res.body).toHaveProperty("message", "Hello World!");
    });
});

test("sayHelloJohn", async () => {
  await testAgent[sayHelloFeature.method](sayHelloFeature.endpoint + "?firstName=John")
    .expect(sayHelloFeature.successStatusCode)
    .expect("Content-Type", /json/)
    .expect((res: Response) => {
      expect(res.body).toHaveProperty("message", "Hello John!");
    });
});
```

Vous remarquez comment on réutilise les métadonnées de la fonctionnalité dans nos tests ? Ainsi, si on change l'endpoint ou la méthode, il suffit de le modifier à un seul endroit et les tests fonctionnent toujours ! 🧠

## Les avantages de cette approche 🌟

### Scalabilité 📈

À mesure que votre projet grandit, vous n'avez qu'à ajouter de nouvelles fonctionnalités sans toucher au code existant. Chaque fonctionnalité étant isolée, vous pouvez travailler sur l'une sans impacter les autres.

### Sûreté du typage 🛡️

Avec TypeScript et Zod qui travaillent ensemble, vous bénéficiez d'une sûreté du typage de bout en bout. Votre IDE détecte les erreurs de type avant même que vous n'exécutiez votre code.

### Validation des entrées 🔍

Zod fournit une validation robuste des entrées clé en main. Fini les vérifications manuelles ou les fonctions de validation personnalisées.

### Testabilité 🧪

Chaque fonctionnalité étant autonome, il est facile de la tester de manière isolée. Et puisque la logique métier est séparée du gestionnaire Express, vous pouvez la tester sans démarrer un serveur HTTP.

### Expérience développeur 👨‍💻

Les nouveaux membres de l'équipe comprennent rapidement le fonctionnement de la base de code, car tout suit le même schéma. Il leur suffit de regarder une fonctionnalité existante pour savoir comment en construire une nouvelle.

## Ajouter de nouvelles fonctionnalités 🚀

Supposons que vous souhaitiez ajouter une fonctionnalité pour récupérer des informations utilisateur. Voici comment procéder :

1. Créez un nouveau fichier `src/features/getUser.ts`
2. Définissez les métadonnées, les types d'entrée/sortie et le schéma
3. Implémentez la logique de la fonctionnalité
4. Ajoutez la fonctionnalité au tableau `features` dans `app.ts`
5. Écrivez les tests correspondants

C'est tout ! Pas besoin de modifier le code existant ni de craindre de casser d'autres fonctionnalités. 🎉

## Conclusion 🎬

Le Feature-Driven Development avec TypeScript, Express et Zod est une approche puissante pour construire des APIs backend. Il offre une structure propre et cohérente qui s'adapte bien à la croissance de votre projet.

En organisant votre code autour des fonctionnalités métier et en tirant parti de la sûreté du typage de TypeScript et Zod, vous pouvez bâtir des APIs robustes et maintenables, vraiment agréables à travailler. 😊

## Ressources 📚

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)
- [Supertest](https://github.com/ladjs/supertest)

Quelle approche utilisez-vous pour structurer vos projets API ? Avez-vous déjà essayé le Feature-Driven Development ? Partagez votre avis dans les commentaires ! 👇
