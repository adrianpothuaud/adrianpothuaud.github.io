---
title: "RAG pour les sélecteurs Cypress avec Ollama"
excerpt: "Comment j'ai construit un processus RAG pour générer des sélecteurs Cypress via Ollama, rendant les tests E2E plus maintenables et résistants aux changements d'UI."
date: "2025-09-15"
readTime: "3 min"
author: "Adrian Pothuaud"
tags: ["RAG", "Cypress", "Ollama", "AI", "LLM"]
mediumUrl: "https://medium.com/@adrianpothuaud/creating-a-rag-process-for-selectors-using-cypress-and-ollama"
---

Cet article fait suite à mon [précédent article sur la stabilisation de l'automatisation des tests avec WebdriverIO et les LLMs](/blog/2-ai-rag-automation).

Les tests automatisés évoluent rapidement, et avec l'essor des Grands Modèles de Langage (LLMs), nous pouvons désormais rendre nos suites de tests plus intelligentes et plus robustes. Dans cet article, je vais vous montrer comment j'ai construit un processus de Retrieval-Augmented Generation (RAG) pour générer des sélecteurs Cypress à l'aide d'Ollama, afin de rendre les tests end-to-end plus maintenables et moins fragiles.

## Pourquoi utiliser les LLMs et Ollama pour l'automatisation des tests ?

Les sélecteurs sont la colonne vertébrale des tests d'automatisation d'interface. Mais à mesure que les interfaces évoluent, les sélecteurs se cassent, et leur maintenance devient un calvaire. Et si vous pouviez simplement décrire l'élément que vous cherchez, et qu'une IA génère le meilleur sélecteur pour vous — en utilisant votre propre DOM comme contexte ?

C'est là qu'interviennent les LLMs et Ollama. Ollama vous permet d'exécuter de puissants LLMs open-source en local, ce qui protège la confidentialité de vos données et accélère la boucle de retour. En combinant Cypress, Ollama et un peu de magie RAG, vous pouvez automatiser la génération de sélecteurs et rendre vos tests bien plus résilients.

## Vue d'ensemble de la structure du projet

Voici un aperçu de la structure du projet :

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

- `commands.ts` : Commandes Cypress personnalisées, dont le générateur de sélecteurs piloté par l'IA.
- `prompt.md` : Le prompt de base pour le LLM, avec des instructions claires et des priorités de sélecteurs.
- `history.json` : Stocke les générations de sélecteurs précédentes pour le RAG.
- `test.cy.ts` : Exemples de tests E2E utilisant la nouvelle commande `getByAi`.

## Comment fonctionne le processus RAG

Le flux est simple et puissant :

1. **Décrivez l'élément** : Dans votre test, utilisez `cy.getByAi("Champ nom d'utilisateur")`.
2. **Extraction du DOM** : Cypress capture le DOM courant.
3. **Construction du prompt** : Le DOM et votre description sont envoyés à Ollama via un prompt soigneusement rédigé.
4. **Génération du sélecteur par le LLM** : Ollama retourne le meilleur sélecteur selon vos priorités (par exemple : `data-testid`, `id`, accessibilité).
5. **Utilisation du sélecteur** : Cypress utilise le sélecteur pour interagir avec l'élément.
6. **Historique et RAG** : Chaque interaction est enregistrée. Si la même description est réutilisée, le système peut réemployer ou affiner les sélecteurs précédents.

Cette approche rend vos tests plus robustes et plus faciles à maintenir, même lorsque votre interface évolue.

## Plongée technique

### Le Prompt

Le prompt (`prompt.md`) guide le LLM pour générer des sélecteurs robustes :

- Préférer les attributs `data-testid`
- Éviter les sélecteurs fragiles
- Utiliser les attributs d'accessibilité lorsque c'est possible

### La Commande Personnalisée

Dans `commands.ts`, la commande `getByAi` orchestre le processus :

```typescript
cy.getByAi("Username field").type("admin")
```

Elle vérifie l'historique pour d'éventuels sélecteurs précédents. Si aucun n'est trouvé, elle envoie le DOM et la description à Ollama. Le LLM retourne un sélecteur, qui est ensuite utilisé par Cypress.

## Exemple de Test

```typescript
it('good creds', () => {
  cy.visitLoginPage()
  cy.getByAi("Username field").type("admin")
  cy.getByAi("Password field").type("admin")
  cy.getByAi("Login button").click()
  cy.contains("Profil utilisateur").should('be.visible')
})
```

## Intégration avec Ollama

Ollama tourne en local et expose une API. La commande Cypress envoie une requête POST avec le prompt et reçoit un sélecteur en réponse.

```typescript
cy.request("POST", "http://localhost:11434/api/generate", { /* ... */ })
```

## Avantages et enseignements

- **Des tests moins fragiles** : Fini de courir après les sélecteurs cassés à chaque changement d'UI.
- **Rédaction de tests plus rapide** : Décrivez simplement l'élément et laissez l'IA faire le reste.
- **Confidentialité et rapidité** : Ollama tourne en local, vos données restent protégées et la boucle de retour est immédiate.
- **Historique et RAG** : Le système apprend des exécutions précédentes, rendant la génération de sélecteurs de plus en plus intelligente.

Les LLMs et des outils comme Ollama changent la donne pour l'automatisation des tests. Ils apportent intelligence et adaptabilité à vos suites de tests, vous permettant de vous concentrer sur l'essentiel : livrer des logiciels de qualité.

## Conclusion

Si vous en avez assez des sélecteurs fragiles et que vous souhaitez booster vos tests Cypress, essayez cette approche RAG + Ollama ! Le futur de l'automatisation des tests est là — et il est propulsé par l'IA.

Découvrez le projet public sur mon GitHub : [adrianpothuaud/cypress-rag](https://github.com/adrianpothuaud/cypress-rag) 🤖 Sélection d'éléments par IA pour Cypress, en langage naturel.

Bon testing ! Si vous avez des questions ou souhaitez en savoir plus, n'hésitez pas à me contacter !
