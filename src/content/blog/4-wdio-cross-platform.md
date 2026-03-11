---
title: "Supercharge Your E2E Tests : Sélecteurs Cross-Platform dans Webdriver.IO"
excerpt: "Écrivez la même logique de test pour Web, Android et iOS grâce à une stratégie de sélecteurs unifiée en TypeScript avec WebdriverIO."
date: "2025-05-12"
readTime: "6 min"
author: "Adrian Pothuaud"
tags: ["WebdriverIO", "Cross-Platform", "Mobile Testing", "TypeScript"]
mediumUrl: "https://medium.com/@adrianpothuaud/supercharge-your-e2e-tests-cross-platform-text-selectors-in-webdriver-io"
---

Salut les testeurs ! Vous avez déjà eu l'impression d'écrire la même logique de test trois fois, juste pour couvrir le Web, Android et iOS ? Gérer des sélecteurs spécifiques à chaque plateforme peut être un vrai casse-tête : ça alourdit votre base de code et ralentit la création de tests. Et s'il existait une approche plus fluide ?

Plongeons aujourd'hui dans une méthode concrète avec Webdriver.IO pour rationaliser votre automatisation end-to-end grâce aux **sélecteurs cross-platform basés sur le texte**. Nous examinerons des exemples de code réels qui montrent comment écrire des tests plus propres et plus maintenables, s'exécutant sans accroc sur différents environnements.

## Le défi : les sélecteurs spécifiques à chaque plateforme

Généralement, trouver un élément requiert des stratégies différentes selon la plateforme :
- **Web** : sélecteurs CSS ou XPath
- **Android** : UIAutomator (resource IDs, texte, etc.)
- **iOS** : Predicate Strings ou Class Chains

Maintenir des sélecteurs séparés pour chaque élément sur chaque plateforme devient vite fastidieux.

## La solution : une stratégie de sélecteurs unifiée

L'idée centrale est d'abstraire les différences entre plateformes. On définit un objet `CrossSelector` unique qui contient la chaîne de sélecteur appropriée pour chaque plateforme (Web, Android, iOS). Ensuite, une classe utilitaire de base détermine la plateforme courante et choisit automatiquement le bon sélecteur.

### 1. Les fondations : BaseObject et CrossSelector

Commençons par une classe de base dont hériteront nos Page Objects. Elle introduit le type `CrossSelector` et la logique pour résoudre le bon sélecteur à l'exécution.

```typescript
// Define the structure for our cross-platform selectors
type CrossSelector = {
  web: string;
  android: string;
  ios: string;
};

// Base class to handle selector resolution and common actions
export default class BaseObject {
  // Determines the correct selector based on the current platform
  private getSelector(selector: CrossSelector): string {
    if (browser.isAndroid) {
      return selector.android;
    } else if (browser.isIOS) {
      return selector.ios;
    } else {
      return selector.web;
    }
  }

  // Gets the WebdriverIO element using the resolved selector
  private select(selector: CrossSelector): ChainablePromiseElement {
    return browser.$(this.getSelector(selector));
  }

  // Example common action using the cross-platform selector
  public async click(selector: CrossSelector) {
    await this.select(selector).click({ force: true });
  }

  // Example wait action
  public async waitForDisplayed(selector: CrossSelector, timeout: number = 10000) {
    await this.select(selector).waitForDisplayed({ timeout });
  }
}
```

**Avantage** : vos actions communes (`click`, `fill`, `waitForDisplayed`) fonctionnent désormais avec un seul objet `CrossSelector`, quelle que soit la plateforme sur laquelle votre test s'exécute.

### 2. Gérer les variations de texte : TranslatableObject

Le texte, c'est une autre affaire. "Log in" peut devenir "Se connecter" en français. Même dans la même langue, le libellé d'un bouton peut légèrement différer entre le web et le mobile. On peut étendre notre `BaseObject` pour gérer cela.

```typescript
// Structure to hold translations for different languages
export type Translations = Record<string, Record<"en" | "fr", string>>;

// Extends BaseObject to add translation capabilities
export class TranslatableObject extends BaseObject {
  _translations: Translations;

  constructor(translations: Translations) {
    super();
    this._translations = translations;
  }

  // Gets the translated text for a given key and the current test language
  getTranslationItem(item: keyof typeof this._translations): string {
    const testLanguage = envConfig.testLanguage;
    const targetItem = this._translations[item];
    if (!targetItem) throw new Error(`Translation item not found: ${item}`);
    const targetTrad: string = targetItem[testLanguage];
    if (!targetTrad) throw new Error(`Translation not found: ${item}.${testLanguage}`);
    return targetTrad;
  }
}
```

**Avantage** : vos sélecteurs peuvent s'adapter automatiquement à la langue configurée pour la session de test, rendant vos tests plus robustes pour les applications internationalisées.

### 3. Tout assembler : le Page Object de la page SignIn

Voyons maintenant comment un Page Object exploite ces classes de base.

```typescript
import { crossTxtSel, androidResourceIdSel, iosClassChainSel, iosNameSel } from "../utils/selectors.ts";
import { TranslatableObject } from "@/framework/_/TranslatableObject.ts";

const translations = {
  signIn: { en: "Log in", fr: "Se connecter" },
  title: { en: "Connect to MyApp", fr: "Se connecter à MyApp" },
};

class SignIn extends TranslatableObject {
  constructor() {
    super(translations);
  }

  get title() {
    return crossTxtSel(this.getTranslationItem("title"));
  }

  get emailField() {
    return {
      android: androidResourceIdSel("login.email"),
      ios: iosClassChainSel('**/XCUIElementTypeTextField[`name == "login.email"`]'),
      web: "input#email",
    };
  }

  get passwordField() {
    return {
      android: androidResourceIdSel("login.password"),
      ios: iosClassChainSel('**/XCUIElementTypeSecureTextField[`name == "login.password"`]'),
      web: "input#password",
    };
  }

  get signInButton() {
    return {
      android: androidResourceIdSel("login.signinbutton"),
      ios: iosNameSel("login.signinbutton"),
      web: "//button[@type='submit']",
    };
  }

  public async fillAndSubmit(email: string, password: string) {
    await this.fillCharByChar(this.emailField, email, this.title);
    await this.fillCharByChar(this.passwordField, password, this.title);
    await this.waitForButtonToBe(this.signInButton, true);
    await this.click(this.signInButton);
  }
}

const signIn = new SignIn();
export default signIn;
```

**Avantage** : le Page Object définit clairement les éléments à l'aide de la structure `CrossSelector`. Les méthodes de haut niveau comme `fillAndSubmit` encapsulent la logique d'interaction, masquant les détails spécifiques à la plateforme des scripts de test eux-mêmes.

### 4 & 5. La récompense : des scripts de test bien plus lisibles

Regardez comme le test lui-même devient propre ! Il se concentre sur le **quoi** (les étapes et assertions du test) plutôt que sur le **comment** (trouver les éléments sur chaque plateforme).

```typescript
import signIn from "@/framework/signIn.ts";
import dashboard from "@/framework/dashboard";
import testAccounts from "@/data/testAccounts.ts";

describe("signIn", () => {
  it("should fail with bad password", async () => {
    const email = testAccounts.default.email;
    const password = "wrongPassword123";

    await openAppOrPageAndWaitForSignIn();
    await signIn.fillAndSubmit(email, password);

    const expectedError = envConfig.testLanguage === "fr"
      ? "Identifiant et/ou mot de passe invalides"
      : "Invalid";
    await signIn.waitForErrorMessageContaining(expectedError);
  });

  it("should succeed and keep session", async () => {
    const email = testAccounts.adrian_default.email;
    const password = testAccounts.adrian_default.password;

    await openAppOrPageAndWaitForSignIn();
    await signIn.fillAndSubmit(email, password);
    await dashboard.wait();

    await relaunchAppOrRefreshPage();
    await dashboard.wait();
  });
});
```

**Avantage** :

- **Lisibilité** : les tests sont beaucoup plus faciles à lire et à comprendre.
- **Maintenabilité** : si un sélecteur change, vous le mettez à jour en un seul endroit (le `CrossSelector` du Page Object) plutôt que trois.
- **Efficacité** : la rédaction de nouveaux tests cross-platform devient nettement plus rapide.
- **Robustesse** : centraliser la logique des sélecteurs réduit les risques d'erreurs.

## En résumé

En abstrayant les différences entre plateformes grâce aux objets `CrossSelector` au sein d'un `BaseObject`, en ajoutant éventuellement une couche de traduction, et en encapsulant les interactions dans des Page Objects, vous pouvez créer un framework de tests E2E puissant et maintenable avec Webdriver.IO. Vos tests deviennent plus lisibles, plus résilients et plus simples à gérer sur Web, Android et iOS.

Essayez cette approche et observez comment elle peut transformer vos efforts de tests cross-platform ! Bon testing !
