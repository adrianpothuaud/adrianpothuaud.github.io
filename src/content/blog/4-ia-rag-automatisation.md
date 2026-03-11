---
title: "L'IA au service de l'automatisation : Playwright et le RAG"
excerpt: "Et si votre framework de tests pouvait sélectionner les éléments HTML tout seul grâce à une description en langage naturel ? Exploration de l'intégration du RAG dans les outils de QA."
date: "2025-09-18"
readTime: "6 min"
author: "Adrian Pothuaud"
tags: ["IA", "Playwright", "Cypress", "WebdriverIO", "Innovation"]
---

L'automatisation de tests a toujours souffert d'un problème de maintenance : les sélecteurs. Un `data-testid` qui change, un `id` dynamique, une structure HTML refactorisée... et toute une suite de tests tombe.

Et si on pouvait dire à notre framework : **"Clique sur le bouton qui permet de valider la commande"** plutôt que `cy.get('[data-testid="checkout-btn"]')` ?

## Le RAG : une approche inattendue pour la QA

Le **Retrieval-Augmented Generation** (RAG) est une technique d'IA qui consiste à fournir un contexte dynamique à un modèle de langage pour enrichir ses réponses. Dans le contexte de l'automatisation de tests, l'idée est la suivante :

1. On donne une **description en langage naturel** de l'élément à interagir
2. L'IA analyse le DOM actuel de la page
3. Elle retourne le sélecteur le plus pertinent

```typescript
// Avec une approche RAG, imaginons ceci :
await page.click('le bouton de validation du panier')
// au lieu de :
await page.click('[data-testid="cart-validate-btn"]')
```

## Cypress-RAG et WDIO-RAG : mes expérimentations

J'ai développé deux librairies open source pour explorer ce concept :

- **[cypress-rag](https://github.com/adrianpothuaud/cypress-rag)** : Sélection d'éléments avec une description en langage naturel pour Cypress
- **[wdio-rag](https://github.com/adrianpothuaud/wdio-rag)** : La même approche pour WebdriverIO

L'idée n'est pas de remplacer les sélecteurs classiques — qui restent la solution la plus performante — mais d'explorer comment l'IA peut **réduire la friction** lors de l'écriture de tests, notamment pour des testeurs moins techniques.

## Les limites actuelles

### Coût et latence

Chaque appel à un LLM coûte du temps et de l'argent. Pour une suite de 500 tests, cela peut devenir prohibitif. La solution est de mettre en cache les résolutions de sélecteurs.

### Fiabilité

Un LLM peut halluciner et retourner un sélecteur incorrect. Il faut donc toujours ajouter une **validation de fallback** et ne pas aveuglément faire confiance au modèle.

### Déterminisme

Les tests automatisés doivent être déterministes. Un LLM peut donner des résultats différents pour la même requête — ce qui est antinomique avec la nature des tests.

## La vraie valeur : l'aide à la rédaction

Là où l'IA brille vraiment dans la QA, c'est dans l'**aide à la rédaction** des tests, pas dans leur exécution. Des outils comme GitHub Copilot ou les assistants IA intégrés aux IDEs permettent de générer des tests boilerplate rapidement.

La combinaison idéale : **IA pour générer le squelette du test, humain pour le valider et l'affiner**.

## Conclusion

L'IA ne va pas remplacer les QA Engineers, mais elle va significativement **changer leur façon de travailler**. L'automatisation de la sélection d'éléments reste un défi, mais les approches RAG ouvrent des pistes intéressantes pour réduire la maintenance des tests à long terme.

> Ces expérimentations sont disponibles en open source sur mon GitHub. N'hésitez pas à contribuer !
