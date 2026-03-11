---
title: "Comment stabiliser vos tests E2E ?"
excerpt: "Les anti-patterns classiques : pourquoi vos tests sont lents et « flaky », et comment y remédier radicalement."
date: "2026-02-28"
readTime: "8 min"
author: "Adrian Pothuaud"
tags: ["Flakiness", "E2E", "Best Practices"]
---

Si vos développeurs ignorent les résultats de vos pipelines CI parce que "les tests échouent de façon aléatoire", vous avez un problème de *Flakiness*. 

L'instabilité coûte plus cher à votre entreprise que de ne pas avoir de tests du tout (car elle engendre un faux sentiment de frustration et de la charge mentale).

## Les causes communes

1. **Les `wait()` statiques** : Si vous écrivez `cy.wait(3000)`, vous vous trompez.
2. **Dépendance réseau non mockée** : Un backend externe qui ne répond plus ne doit pas faire échouer votre test front-end.
3. **Mouton à 5 pattes** : Trop d'assertions dans un seul test empêche la parallélisation.

Dans les prochains articles, nous verrons comment mettre fin à ces mauvaises habitudes avec des exemples sur Cypress et Playwright.
