---
title: "Supercharge Your E2E Tests : Sélecteurs Cross-Platform dans Webdriver.IO"
excerpt: "Écrivez la même logique de test pour Web, Android et iOS grâce à une stratégie de sélecteurs unifiée en TypeScript avec WebdriverIO."
date: "2025-05-12"
readTime: "6 min"
author: "Adrian Pothuaud"
tags: ["WebdriverIO", "Cross-Platform", "Mobile Testing", "TypeScript"]
mediumUrl: "https://medium.com/@adrianpothuaud/supercharge-your-e2e-tests-cross-platform-text-selectors-in-webdriver-io"
---

Vous sentez-vous contraint d'écrire la même logique de test trois fois pour couvrir Web, Android et iOS ? La gestion des sélecteurs spécifiques à chaque plateforme peut vite devenir un cauchemar. Voici une approche plus propre avec **WebdriverIO**.

## Le problème : des sélecteurs spécifiques à chaque plateforme

Pour trouver un élément, vous avez généralement besoin de stratégies différentes :
- **Web** : CSS selectors ou XPath
- **Android** : UIAutomator (resource IDs, text...)
- **iOS** : Predicate Strings ou Class Chains

Maintenir des sélecteurs séparés pour chaque élément sur chaque plateforme devient vite ingérable.

## La solution : une stratégie de sélecteur unifiée

L'idée centrale est d'abstraire les différences de plateforme en définissant un objet `CrossSelector` qui contient le sélecteur approprié pour chaque plateforme. Une classe de base détermine ensuite la plateforme courante et choisit automatiquement le bon sélecteur.

```typescript
type CrossSelector = {
  web: string;
  android: string;
  ios: string;
};

export default class BaseObject {
  private getSelector(selector: CrossSelector): string {
    if (browser.isAndroid) return selector.android;
    if (browser.isIOS) return selector.ios;
    return selector.web;
  }
}
```

## Avantages

- **Un seul test** pour toutes les plateformes
- **Maintenabilité** améliorée : un seul endroit pour mettre à jour les sélecteurs
- **Lisibilité** : les tests métier ne sont pas pollués par les détails techniques des sélecteurs

Cette approche a considérablement réduit la duplication de code dans nos suites de tests cross-platform.
