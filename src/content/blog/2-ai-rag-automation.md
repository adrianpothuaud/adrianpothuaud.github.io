---
title: "Une vraie application IA pour l'automatisation — Stabilisez vos tests avec le RAG"
excerpt: "Comment j'ai utilisé les LLMs et le Retrieval-Augmented Generation (RAG) pour résoudre le problème des sélecteurs instables dans les tests E2E automatisés."
date: "2024-11-05"
readTime: "8 min"
author: "Adrian Pothuaud"
tags: ["AI", "LLM", "RAG", "Test Automation", "WebdriverIO"]
mediumUrl: "https://medium.com/javascript-in-plain-english/a-real-ai-application-for-automation-testing"
---

🖖 Hi! I am Adrian, Software Engineer in Software Quality, Test and Automation.

🤔 I've been looking around for concrete AI applications in automation testing for a while but always feels mystified by a bunch of articles claiming that AI is the future of automation testing; except they never provide concrete examples or applications!

🕵️‍♀️ I worked for many companies and solved QA challenges from scratch in 2 of them as a First QA Lead. I feel like one of the most common issues in test automation is the stability of selectors that may change due to software updates, or flaky selectors.

⏯️ I played around with ChatGPT as everyone in the world, then Gemini and Claude and others… But I was always looking to define good prompts and ask things to improve my testing processes and automation setup or strategies. Nothing really exceptional came out until I really worked on a sustainable solution to apply AI through LLM prompt and RAG this week as a Proof Of Concept for my current job.

👀 One day I found this very interesting project enabling Playwright users to define selectors neither by xpath, nor ids; but by just describing an element in your words. The project will then call a mysterious ChatGPT function and return a valid element! Magic isn't it? But it is not enough alone to stabilise your tests. https://github.com/zerostep-ai/zerostep

💡 The idea is to use and drive any LLM with a bit of context in order to:

- 📸 **Analyse a web page or mobile screen**: you need a model that is capable of analysing images like gemini flash versions or chat gpt vision
- 🏄‍♂️ **Scrap the web** with references to your automation framework (example: Webdriver.IO but it could work with anything else in any programming language)
- 🧠 **Develop smart functions** in your code that will, first try to find an earlier working selector, then if element not found, call the LLM for a new selector, then evaluate element existence, etc…
- 💿 **Implement a storage system** for all the selectors generated to be able to reuse them while they are working

🔮 Once we are able to achieve this, a world of stability and peace will open for all of us as automation testers and enable a lot of new possibilities having more time to focus on other quality and testing topics!

## Step 1: Storage system

Using any method, database, cache or file storage, implement something that stores data about your selectors as an example below:

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

## Step 2: Screenshots and content scanning

Implement your own methods so you are able to capture your screen as:

- images (screenshots)
- DOM-like architecture in text (example: XML iOS screen scan)

My examples with webdriver.io and TypeScript below but once again feel free to implement it the way you want:

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

## Step 3: Robust prompt(s)

Nothing is better than an example:

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

## Step 4: Plug everything together and call an LLM

Below is my example implemented with webdriver.io and TypeScript:

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

## Final: try and improve

Also if you tried this I invite you to consider the following steps yourself as improvements:

- Make it yours and adapt to your needs/framework/habits
- Fine-tune a model for this specific task
- Implement smart functions like "wait for condition" using RAG
- Discuss and enrich this topic all around in real life and on the web so AI becomes a real booster in test automation and not another obscure topic that promises stuff without real examples

As a next step in my very heavy backlog of side projects, I will try to develop and maintain a webdriver.io utility to make this work for any project for web or mobile automation — let me know in the comments if you could be interested and I will send you some updates!

Thank you very much for reaching the end of this article! If you like it, please send clap/comments 🙏.
