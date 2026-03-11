---
title: "RAG pour les sélecteurs Cypress avec Ollama"
excerpt: "Comment j'ai construit un processus RAG pour générer des sélecteurs Cypress via Ollama, rendant les tests E2E plus maintenables et résistants aux changements d'UI."
date: "2025-09-15"
readTime: "3 min"
author: "Adrian Pothuaud"
tags: ["RAG", "Cypress", "Ollama", "AI", "LLM"]
mediumUrl: "https://medium.com/@adrianpothuaud/creating-a-rag-process-for-selectors-using-cypress-and-ollama"
---

This article is an evolution of my [previous article about stabilising test automation through WebdriverIO and LLMs](/blog/2-ai-rag-automation).

Automated testing is evolving fast, and with the rise of Large Language Models (LLMs), we can now make our test suites smarter and more robust. In this article, I'll show you how I built a Retrieval-Augmented Generation (RAG) process for generating Cypress selectors using Ollama, making end-to-end tests more maintainable and less brittle.

## Why Use LLMs and Ollama for Test Automation?

Selectors are the backbone of UI test automation. But as UIs change, selectors break, and maintaining them becomes a pain. What if you could describe the element you want, and an AI would generate the best selector for you — using your own DOM as context?

That's where LLMs and Ollama come in. Ollama lets you run powerful open-source LLMs locally, keeping your data private and your feedback loop fast. By combining Cypress, Ollama, and a bit of RAG magic, you can automate selector generation and make your tests more resilient.

## Project Structure Overview

Here's a quick look at the project structure:

```
cypress-rag/
├── app/
│   └── index.html
├── cypress/
│   ├── answers/
│   ├── e2e/
│   │   └── test.cy.ts
│   ├── prompts/
│   └── support/
│       ├── commands.ts
│       └── prompt.md
├── history.json
├── cypress.config.ts
├── package.json
└── tsconfig.json
```

- `commands.ts`: Custom Cypress commands, including the AI-powered selector generator.
- `prompt.md`: The base prompt for the LLM, with clear instructions and selector priorities.
- `history.json`: Stores previous selector generations for RAG.
- `test.cy.ts`: Example E2E tests using the new `getByAi` command.

## How the RAG Process Works

The workflow is simple and powerful:

1. **Describe the Element**: In your test, use `cy.getByAi("Username field")`.
2. **DOM Extraction**: Cypress grabs the current DOM.
3. **Prompt Construction**: The DOM and your description are sent to Ollama, using a carefully crafted prompt.
4. **LLM Selector Generation**: Ollama returns the best selector, following your priorities (e.g., `data-testid`, `id`, accessibility).
5. **Selector Usage**: Cypress uses the selector to interact with the element.
6. **History & RAG**: Each interaction is logged. If the same description is used again, the system can reuse or refine previous selectors.

This approach makes your tests more robust and easier to maintain, even as your UI evolves.

## Technical Deep Dive

### The Prompt

The prompt (`prompt.md`) guides the LLM to generate robust selectors:

- Prefer `data-testid` attributes
- Avoid fragile selectors
- Use accessibility attributes when possible

### The Custom Command

In `commands.ts`, the `getByAi` command orchestrates the process:

```typescript
cy.getByAi("Username field").type("admin")
```

It checks the history for previous selectors. If not found, it sends the DOM and description to Ollama. The LLM returns a selector, which is then used by Cypress.

## Example Test

```typescript
it('good creds', () => {
  cy.visitLoginPage()
  cy.getByAi("Username field").type("admin")
  cy.getByAi("Password field").type("admin")
  cy.getByAi("Login button").click()
  cy.contains("Profil utilisateur").should('be.visible')
})
```

## Ollama Integration

Ollama runs locally and exposes an API. The Cypress command sends a POST request with the prompt and receives a selector in response.

```typescript
cy.request("POST", "http://localhost:11434/api/generate", { /* ... */ })
```

## Benefits and Takeaways

- **Less Brittle Tests**: No more chasing broken selectors after every UI change.
- **Faster Test Writing**: Just describe the element, and let the AI do the rest.
- **Private and Fast**: Ollama runs locally, so your data stays safe and the feedback loop is quick.
- **History and RAG**: The system learns from previous runs, making selector generation smarter over time.

LLMs and tools like Ollama are game changers for test automation. They bring intelligence and adaptability to your test suites, letting you focus on what matters: delivering quality software.

## Conclusion

If you're tired of brittle selectors and want to supercharge your Cypress tests, give this RAG + Ollama approach a try! The future of test automation is here — and it's powered by AI.

Take a look at the public project on my GitHub: [adrianpothuaud/cypress-rag](https://github.com/adrianpothuaud/cypress-rag) 🤖 AI-powered element selection for Cypress using natural language descriptions.

Happy testing! If you have questions or want to see more, feel free to reach out!
