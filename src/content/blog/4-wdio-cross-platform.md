---
title: "Supercharge Your E2E Tests : Sélecteurs Cross-Platform dans Webdriver.IO"
excerpt: "Écrivez la même logique de test pour Web, Android et iOS grâce à une stratégie de sélecteurs unifiée en TypeScript avec WebdriverIO."
date: "2025-05-12"
readTime: "6 min"
author: "Adrian Pothuaud"
tags: ["WebdriverIO", "Cross-Platform", "Mobile Testing", "TypeScript"]
mediumUrl: "https://medium.com/@adrianpothuaud/supercharge-your-e2e-tests-cross-platform-text-selectors-in-webdriver-io"
---

Hey Testers! Ever feel like you're writing the same test logic three times just to cover Web, Android, and iOS? Managing platform-specific selectors can be a major headache, bloating your codebase and slowing down test creation. What if there was a smoother way?

Today, let's dive into a practical approach using Webdriver.IO to streamline your end-to-end (E2E) automation with **cross-platform text-based selectors**. We'll look at real code examples that demonstrate how you can write cleaner, more maintainable tests that run seamlessly across different environments.

## The Challenge: Platform-Specific Selectors

Typically, finding an element requires different strategies:
- **Web**: CSS selectors or XPath
- **Android**: UIAutomator (resource IDs, text, etc.)
- **iOS**: Predicate Strings or Class Chains

Maintaining separate selectors for each element on each platform quickly becomes cumbersome.

## The Solution: A Unified Selector Strategy

The core idea is to abstract away the platform differences. We define a single `CrossSelector` object that holds the appropriate selector string for each platform (Web, Android, iOS). Then, a base utility determines the current platform and picks the correct selector automatically.

### 1. The Foundation: BaseObject and CrossSelector

Let's start with a base class that our Page Objects will inherit from. It introduces the `CrossSelector` type and the logic to resolve the correct selector at runtime.

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

**Benefit**: Your common actions (`click`, `fill`, `waitForDisplayed`) now work with a single `CrossSelector` object, regardless of the platform your test is running on.

### 2. Handling Text Variations: TranslatableObject

Text is tricky. "Log in" might be "Se connecter" in French. Even in the same language, button text could differ slightly between web and mobile. We can extend our `BaseObject` to handle this.

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

**Benefit**: Your selectors can automatically adapt to the language configured for the test run, making your tests more robust for internationalized applications.

### 3. Putting it Together: The SignIn Page/Screen Object

Now let's see how a Page Object utilizes these base classes.

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

**Benefit**: The Page Object clearly defines elements using the `CrossSelector` structure. High-level methods like `fillAndSubmit` encapsulate the interaction logic, hiding the platform-specific details from the actual test scripts.

### 4 & 5. The Payoff: Cleaner Test Scripts

Look how much cleaner the actual test becomes! It focuses on the **what** (the test steps and assertions) rather than the **how** (finding elements on each platform).

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

**Benefit**:

- **Readability**: Tests are much easier to read and understand.
- **Maintainability**: If a selector changes, you update it in one place (the Page Object's `CrossSelector`) instead of three.
- **Efficiency**: Writing new cross-platform tests becomes significantly faster.
- **Robustness**: Centralizing selector logic reduces the chance of errors.

## Wrapping Up

By abstracting platform differences using `CrossSelector` objects within a `BaseObject`, potentially adding a translation layer, and encapsulating interactions in Page Objects, you can create a powerful and maintainable E2E testing framework with Webdriver.IO. Your tests become cleaner, more resilient, and easier to manage across Web, Android, and iOS.

Give this approach a try and see how it can enhance your cross-platform testing efforts! Happy testing!
