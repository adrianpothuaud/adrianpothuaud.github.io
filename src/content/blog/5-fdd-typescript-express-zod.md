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

Hey there, fellow backend developers! 👨‍💻 👩‍💻

Have you ever found yourself drowning in a sea of spaghetti code? Or perhaps you've experienced the frustration of hunting down a bug across multiple files with no clear structure? We've all been there! 😩

Today, I'm excited to share with you a game-changing approach that has transformed how I build backend APIs: **Feature-Driven Development (FDD) with TypeScript, Express, and Zod**. 🎯

In this article, I'll walk you through a minimalist yet powerful project structure that makes your API development more:

- 🧩 **Modular** — Each feature is self-contained
- 🛡️ **Type-safe** — No more runtime surprises
- 📝 **Validated** — Input validation from the get-go
- 🧪 **Testable** — Easy to write and maintain tests

Let's dive in! 🏊‍♂️

## What is Feature-Driven Development? 🤔

Feature-Driven Development (FDD) is an approach where we organize our codebase around business features rather than technical concerns. Instead of grouping files by their technical role (controllers, services, models), we group them by the feature they implement.

For example, rather than having:

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

We organize by feature:

```
/features
  /auth
    - auth.ts
    - auth.test.ts
  /user
    - user.ts
    - user.test.ts
```

This approach makes your codebase more intuitive, easier to navigate, and simpler to maintain! 🧠

## Project Structure 📁

Let's look at our sample project structure:

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

This structure is **clean**, **intuitive**, and **scalable**. Each feature has its own folder, containing all the code related to that feature. 🧹

## The Core Interfaces 🏗️

The heart of our approach lies in two key interfaces:

### IFeature

This interface defines the basic metadata about our API endpoint:

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

This interface defines the actual implementation of our feature:

```typescript
export interface IAPIFeature<Input, Output> {
  inputSchema: ZodSchema;              // Zod schema for input validation
  getInput: (req: Request) => Input;   // Extract input from request
  handler: (input: Input) => Output | Promise<Output>; // Business logic
}
```

By separating the metadata from the implementation, we create a clean separation of concerns. 👌

## Let's Build a Feature! 🏗️

Let's look at a simple "Hello World" feature to see how it all works together:

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

Let's break down what's happening here:

1. 📋 We define the feature metadata (endpoint, method, name, etc.)
2. 📝 We define the input and output types for type safety
3. 🛡️ We create a Zod schema for input validation
4. 🔧 We implement the feature with `getInput` and `handler` functions

The beauty of this approach is that it's **self-contained and focused**. Each feature knows exactly what it needs to do and how to do it. 🎯

## Input Validation with Zod 🛡️

Zod is a TypeScript-first schema validation library that allows us to define our schemas once and get both runtime validation and static type inference.

Our `parseBySchema` utility makes it easy to validate incoming requests:

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

This function:
1. 🧪 Takes the request data and a Zod schema
2. 🔍 Attempts to parse and validate the data
3. ❌ Throws a formatted error if validation fails
4. ✅ Returns the validated and typed data if successful

No more manual validation or type assertions! 🎉

## Wiring It All Together in Express 🔌

Our `app.ts` file shows how we register all our features with Express:

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

This approach:
1. 🔄 Loops through all our features
2. 🚪 Adds middleware (like authentication) if needed
3. 🎮 Creates a controller function that handles the request
4. 📝 Registers the endpoint with Express

It's **declarative**, **consistent**, and **scalable**! 📈

## Testing Made Easy 🧪

One of the biggest benefits of this approach is how easy it makes testing. Here's how we test our `sayHello` feature:

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

Notice how we're using the feature metadata in our tests? This way, if we change the endpoint or method, we only need to update it in one place, and the tests will still work! 🧠

## Benefits of This Approach 🌟

### Scalability 📈

As your project grows, you can simply add more features without touching existing code. Each feature is isolated, so you can work on one feature without affecting others.

### Type Safety 🛡️

With TypeScript and Zod working together, you get end-to-end type safety. Your IDE will catch type errors before you even run your code.

### Input Validation 🔍

Zod provides robust input validation out of the box. No more manual checks or custom validation functions.

### Testability 🧪

Each feature is self-contained, making it easy to test in isolation. And since the business logic is separate from the Express handler, you can test it without spinning up an HTTP server.

### Developer Experience 👨‍💻

New team members can quickly understand how the codebase works because everything follows the same pattern. They can look at an existing feature to understand how to build a new one.

## Adding New Features 🚀

Let's say you want to add a new feature to get user information. Here's how you'd do it:

1. Create a new file `src/features/getUser.ts`
2. Define your feature metadata, input/output types, and schema
3. Implement the feature logic
4. Add the feature to the `features` array in `app.ts`
5. Write tests for your feature

That's it! No need to modify existing code or worry about breaking other features. 🎉

## Conclusion 🎬

Feature-Driven Development with TypeScript, Express, and Zod is a powerful approach to building backend APIs. It provides a clean, consistent structure that scales well with your project.

By organizing your code around business features and leveraging the type safety of TypeScript and Zod, you can build robust, maintainable APIs that are a joy to work with. 😊

## Resources 📚

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)
- [Supertest](https://github.com/ladjs/supertest)

What approach do you use for structuring your API projects? Have you tried Feature-Driven Development before? Let me know in the comments below! 👇
