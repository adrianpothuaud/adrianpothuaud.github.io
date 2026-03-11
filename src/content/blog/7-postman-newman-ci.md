---
title: "Tests API continus avec Postman, Newman et GitHub Actions"
excerpt: "Comment débloquer le partage de collections Postman via Git et les intégrer dans un pipeline CI/CD avec Newman et GitHub Actions pour des tests d'API continus."
date: "2024-06-19"
readTime: "8 min"
author: "Adrian Pothuaud"
tags: ["Postman", "Newman", "GitHub Actions", "API Testing", "CI/CD", "ATDD"]
mediumUrl: "https://medium.com/@adrianpothuaud/unlock-file-system-and-git-sharing-with-postman"
---

Postman est un outil intuitif pour tester des APIs, mais son absence de synchronisation native avec le système de fichiers est frustrante. Voici comment contourner ce problème et intégrer vos collections Postman dans un workflow CI/CD.

## Le problème

Postman ne permet pas nativement de synchroniser ses collections avec votre dépôt Git — contrairement à des outils comme Bruno. Cela complique le partage entre développeurs et testeurs, et l'intégration dans des pipelines automatisés.

## La solution : Newman + GitHub Actions

**Newman** est le runner CLI de Postman. Il permet d'exécuter des collections Postman en ligne de commande, ce qui ouvre la voie à l'intégration CI/CD.

### Étapes clés

1. **Exporter** vos collections et environnements Postman en JSON
2. **Versionner** ces fichiers JSON dans votre dépôt Git
3. **Créer un workflow GitHub Actions** qui exécute Newman à chaque push

```yaml
- name: Run API Tests
  run: npx newman run ./postman/collection.json \
    --environment ./postman/env.json \
    --reporters cli,junit \
    --reporter-junit-export results.xml
```

## ATDD avec Postman

En organisant vos collections Postman selon des scénarios de test d'acceptation (ATDD), vous créez un langage commun entre les développeurs, les testeurs fonctionnels et le métier — tout en gardant les tests dans votre repo Git.

Cette approche est particulièrement adaptée aux équipes où les testeurs fonctionnels ne sont pas à l'aise avec des frameworks de code comme Jest ou Playwright.
