---
title: "RAG pour les sélecteurs Cypress avec Ollama"
excerpt: "Comment j'ai construit un processus RAG pour générer des sélecteurs Cypress via Ollama, rendant les tests E2E plus maintenables et résistants aux changements d'UI."
date: "2025-09-15"
readTime: "3 min"
author: "Adrian Pothuaud"
tags: ["RAG", "Cypress", "Ollama", "AI", "LLM"]
mediumUrl: "https://medium.com/@adrianpothuaud/creating-a-rag-process-for-selectors-using-cypress-and-ollama"
---

Cet article est une évolution de mon précédent article sur la stabilisation des tests via WebdriverIO et les LLMs. Cette fois, j'applique la même logique à **Cypress** avec **Ollama** pour exécuter les LLMs en local.

## Pourquoi Ollama ?

Ollama permet de faire tourner des LLMs open source en local, assurant la confidentialité de vos données et un feedback loop rapide. En combinant Cypress, Ollama et un peu de magie RAG, vous pouvez automatiser la génération de sélecteurs et rendre vos tests plus résilients.

## Comment fonctionne le processus RAG

1. **Décrire l'élément** : Dans votre test, utilisez `cy.getByAi("Champ username")`.
2. **Extraction du DOM** : Cypress capture le DOM courant.
3. **Construction du prompt** : Le DOM et votre description sont envoyés à Ollama via un prompt soigneusement rédigé.
4. **Génération du sélecteur** : Ollama renvoie le meilleur sélecteur en suivant vos priorités (data-testid, id, accessibility...).
5. **Utilisation et historique** : Le sélecteur est utilisé par Cypress et enregistré dans `history.json` pour une réutilisation future (RAG).

## Structure du projet

```
cypress-rag/
├── cypress/
│   ├── e2e/test.cy.ts
│   ├── support/commands.ts
│   └── prompts/prompt.md
├── history.json
└── cypress.config.ts
```

Une approche pratique pour toute équipe souhaitant tirer parti de l'IA sans dépendre d'un service cloud externe.
