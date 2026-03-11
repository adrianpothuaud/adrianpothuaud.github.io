---
title: "Une vraie application IA pour l'automatisation — Stabilisez vos tests avec le RAG"
excerpt: "Comment j'ai utilisé les LLMs et le Retrieval-Augmented Generation (RAG) pour résoudre le problème des sélecteurs instables dans les tests E2E automatisés."
date: "2024-11-05"
readTime: "8 min"
author: "Adrian Pothuaud"
tags: ["AI", "LLM", "RAG", "Test Automation", "WebdriverIO"]
mediumUrl: "https://medium.com/javascript-in-plain-english/a-real-ai-application-for-automation-testing"
---

Je cherchais depuis longtemps des applications concrètes de l'IA dans l'automatisation des tests. Les articles promettant que "l'IA est l'avenir des tests" sont légion, mais peu proposent des exemples concrets.

## Le problème : l'instabilité des sélecteurs

L'un des défis les plus fréquents en test automation est la stabilité des sélecteurs. Dès qu'un développeur modifie l'UI, les tests cassent. Ce cycle de maintenance épuise les équipes QA et détruit la confiance dans les pipelines CI.

## La solution : LLM + RAG

L'idée est d'utiliser un LLM (Large Language Model) avec un peu de contexte pour :
- **Analyser** la page Web ou l'écran mobile
- **Scraper** des références de votre framework d'automatisation
- **Développer** des fonctions intelligentes qui cherchent d'abord un sélecteur précédemment validé, puis appellent le LLM si l'élément n'est pas trouvé
- **Implémenter** un système de stockage pour tous les sélecteurs générés, afin de les réutiliser tant qu'ils fonctionnent

## Architecture en 4 étapes

1. **Système de stockage** : Enregistrez vos sélecteurs avec leurs métadonnées (écran, description, sélecteur trouvé).
2. **Prompt Engineering** : Rédigez un prompt précis qui indique au LLM comment prioriser les types de sélecteurs (data-testid > id > accessibility > XPath).
3. **Logique RAG** : Avant d'appeler le LLM, vérifiez si un sélecteur fonctionnel existe déjà dans votre historique.
4. **Fallback intelligent** : Si un sélecteur stocké ne fonctionne plus, relancez la génération via le LLM.

Cette approche a transformé la stabilité de nos suites de tests et ouvert de nouvelles perspectives pour les équipes QA.
