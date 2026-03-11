---
title: "Une vraie application IA pour l'automatisation — Stabilisez vos tests avec le RAG"
excerpt: "Comment j'ai utilisé les LLMs et le Retrieval-Augmented Generation (RAG) pour résoudre le problème des sélecteurs instables dans les tests E2E automatisés."
date: "2024-11-05"
readTime: "8 min"
author: "Adrian Pothuaud"
tags: ["AI", "LLM", "RAG", "Test Automation", "WebdriverIO"]
mediumUrl: "https://medium.com/javascript-in-plain-english/a-real-ai-application-for-automation-testing"
---

🖖 Salut ! Je m'appelle Adrian, ingénieur logiciel spécialisé en qualité, test et automatisation.

🤔 Depuis un moment, je cherche des applications concrètes de l'IA dans l'automatisation des tests — mais je reste toujours sur ma faim face à une avalanche d'articles qui proclament que l'IA est l'avenir du testing, sans jamais fournir d'exemples ou d'applications concrets !

🕵️‍♀️ J'ai travaillé pour de nombreuses entreprises et j'ai résolu des défis QA de zéro dans deux d'entre elles en tant que premier QA Lead. L'un des problèmes les plus récurrents que j'ai rencontrés en automatisation de tests, c'est la stabilité des sélecteurs, qui peuvent changer suite à des mises à jour logicielles ou se révéler simplement peu fiables.

⏯️ Comme tout le monde, j'ai joué avec ChatGPT, puis Gemini, Claude et d'autres… Mais je cherchais toujours à définir de bonnes invites pour améliorer mes processus de test, mes configurations d'automatisation ou mes stratégies. Rien de vraiment exceptionnel n'en est sorti… jusqu'à ce que je travaille vraiment cette semaine sur une solution pérenne alliant LLM et RAG, en tant que Proof of Concept pour mon poste actuel.

👀 Un jour, j'ai découvert ce projet très intéressant permettant aux utilisateurs de Playwright de définir des sélecteurs, ni par xpath, ni par id, mais simplement en décrivant un élément avec ses propres mots. Le projet appelle alors mystérieusement une fonction ChatGPT et retourne un élément valide ! Magique, non ? Mais ce n'est pas suffisant à lui seul pour stabiliser vos tests. https://github.com/zerostep-ai/zerostep

💡 L'idée est d'utiliser et de piloter n'importe quel LLM avec un peu de contexte afin de :

- 📸 **Analyser une page web ou un écran mobile** : vous avez besoin d'un modèle capable d'analyser des images, comme les versions flash de Gemini ou ChatGPT Vision
- 🏄‍♂️ **Scraper le web** avec des références à votre framework d'automatisation (exemple : Webdriver.IO, mais ça pourrait fonctionner avec n'importe quoi, dans n'importe quel langage de programmation)
- 🧠 **Développer des fonctions intelligentes** dans votre code qui tenteront d'abord de trouver un sélecteur ayant fonctionné précédemment, puis, si l'élément n'est pas trouvé, appelleront le LLM pour en obtenir un nouveau, vérifieront l'existence de l'élément, etc.
- 💿 **Implémenter un système de stockage** pour tous les sélecteurs générés, afin de les réutiliser tant qu'ils fonctionnent

🔮 Une fois que nous parvenons à réaliser tout cela, un monde de stabilité et de sérénité s'ouvre à nous en tant que testeurs automaticiens, et de nombreuses nouvelles possibilités émergent pour se concentrer davantage sur d'autres sujets liés à la qualité et au testing !

## Étape 1 : Système de stockage

Quelle que soit la méthode choisie — base de données, cache ou stockage de fichiers — implémentez quelque chose qui stocke les données de vos sélecteurs, comme dans l'exemple ci-dessous :

```json
[
  {
    "id": "754dab3e-8eca-42ad-8e28-6c447b019eef",
    "screenName": "Welcome",
    "elementName": "taglineTitle",
    "elementDescription": "Heading containing text 'Like, Crush'",
    "platform": "ios",
    "generatedSelector": "~LoginViewController.titleLabel",
    "success": true
  },
  {
    "id": "0c349349-261c-4f3b-ba34-a3336ea5e3d7",
    "screenName": "LoginEmail",
    "elementName": "emailfield",
    "elementDescription": "Email input field",
    "platform": "ios",
    "generatedSelector": "~emailTextField",
    "success": true
  }
]
```

## Étape 2 : Captures d'écran et analyse de contenu

Implémentez vos propres méthodes pour capturer votre écran sous forme de :

- images (captures d'écran)
- architecture DOM en texte (exemple : scan d'écran iOS en XML)

Mes exemples avec webdriver.io et TypeScript ci-dessous, mais une fois encore, sentez-vous libre de l'implémenter à votre façon :

```typescript
export const captureCurrentScreen = async (
  input: { screenName: string }
): Promise<{ file: string; content: string }> => {
  try {
    const timestamp = format(new Date(), "yyyyMMdd_HHmmss");
    const filename = `${input.screenName}_${timestamp}.png`;
    const filepath = path.join(outputPath, "screen-shots", filename);
    const screenshot = await driver.saveScreenshot(filepath);
    return { file: filepath, content: screenshot.toString("base64") };
  } catch (error) {
    console.error("Error scanning the current screen:", error);
    throw error;
  }
};

export const scanCurrentScreen = async (
  input: { screenName: string }
): Promise<{ file: string; content: string }> => {
  try {
    const pageSource = await driver.getPageSource();
    const timestamp = format(new Date(), "yyyyMMdd_HHmmss");
    const filename = `${input.screenName}_${timestamp}.xml`;
    const filepath = path.join(outputPath, "screen-scans", filename);
    await fs.writeFile(filepath, pageSource);
    return { file: filepath, content: pageSource };
  } catch (error) {
    console.error("Error scanning the current screen:", error);
    throw error;
  }
};
```

## Étape 3 : Des prompts robustes

Rien de tel qu'un exemple concret :

```markdown
# Searching for the best Mobile selector for Webdriver.IO using RAG

Please read carefully below information and instructions to perform RAG of a good Webdriver.IO selector for the requested mobile element.

## Context
- You are a mobile end to end test automation expert
- You have a perfect knowledge of Webdriver.IO selector strategies and best practices
- You have a good knowledge of Appium, UIAutomator2 and XCUITest
- You are employed to help in developing, maintaining and stabilizing mobile end to end tests

## Request information
- You are provided with the current screen scan by Appium: {{SCAN}}
- You are provided with the current screenshot by Appium as a base64 encoded png image: {{SCREENSHOT}}
- You are provided with the previous selectors for this element: {{PREVIOUS_ATTEMPTS}}

## Preferred selector strategies:
- an accessibility id selector prefixed by '~'
- a valid ios predicate string selector prefixed by '-ios predicate string:'
- a valid android UIAutomator selector prefixed by 'android='

## Request
- The current platform name is: {{PLATFORM_NAME}}
- screen name: {{SCREEN_NAME}}
- element name: {{ELEMENT_NAME}}
- element description: {{ELEMENT_DESCRIPTION}}

## Output
- Give the output as a string without any extra formatting
```

## Étape 4 : Assembler les pièces et appeler un LLM

Voici mon exemple implémenté avec webdriver.io et TypeScript :

```typescript
export const findByRAG = async (input: {
  screenName: string;
  elementName: string;
  elementDescription: string;
  maxAttempts: number;
}): WDIOElementPromise => {
  const latestSelectorsForScreenAndElement =
    testJsonDb.ragSelectors.findSelectorsByScreenAndElement({
      screenName: input.screenName,
      elementName: input.elementName,
      maximum: 1,
    });

  let finalSelector: string;
  const isRecentSelectorSuccessful =
    latestSelectorsForScreenAndElement.length === 1 &&
    latestSelectorsForScreenAndElement[0].success;

  if (isRecentSelectorSuccessful) {
    finalSelector = latestSelectorsForScreenAndElement[0].generatedSelector;
  } else {
    const screenshot = await captureCurrentScreen({ screenName: input.screenName });
    const scan = await scanCurrentScreen({ screenName: input.screenName });
    finalSelector = await getSelectorFromGemini({
      screenName: input.screenName,
      screenScanFilePath: scan.file,
      screenshotFilePath: screenshot.file,
      elementName: input.elementName,
      elementDescription: input.elementDescription,
      previousAttempts: latestSelectorsForScreenAndElement,
    });
  }

  const elementExists = await $(finalSelector).isExisting();
  const isLastAttempt = input.maxAttempts <= 1;

  if (elementExists) {
    testJsonDb.ragSelectors.updateLatestSelector(
      { screenName: input.screenName, elementName: input.elementName },
      { success: true }
    );
    return $(finalSelector);
  } else {
    if (isLastAttempt) {
      testJsonDb.ragSelectors.updateLatestSelector(
        { screenName: input.screenName, elementName: input.elementName },
        { success: false }
      );
      throw new Error(`Element not found by AI: ${JSON.stringify(input, null, 2)}`);
    } else {
      return findByRAG({ ...input, maxAttempts: input.maxAttempts - 1 });
    }
  }
};
```

## Pour finir : essayez et améliorez

Si vous avez essayé cette approche, je vous invite à envisager les améliorations suivantes :

- Adaptez-la à vos besoins, votre framework et vos habitudes
- Affinez un modèle pour cette tâche spécifique
- Implémentez des fonctions intelligentes comme « attendre une condition » via le RAG
- Discutez et enrichissez ce sujet dans votre entourage et sur le web, pour que l'IA devienne un vrai booster en automatisation de tests et non un sujet obscur qui promet sans jamais délivrer

Comme prochaine étape dans mon backlog interminable de projets personnels, je vais tenter de développer et de maintenir un utilitaire webdriver.io pour rendre tout cela accessible à n'importe quel projet web ou mobile — faites-moi savoir dans les commentaires si cela vous intéresse et je vous tiendrai informé !

Merci infiniment d'avoir lu jusqu'au bout ! Si l'article vous a plu, n'hésitez pas à laisser des applaudissements et des commentaires 🙏.
