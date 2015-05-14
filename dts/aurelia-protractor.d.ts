// Type definitions for Aurelia Protractor extensions
// Project: https://github.com/aurelia/skeleton-navigation
// Definitions by: Enrapt <https://github.com/Enrapt>, Kirill Grishin <https://github.com/KirillGrishin>

/// <reference path="./protractor.d.ts" />
/// <reference path="./selenium-webdriver.d.ts" />

// Extend existing interfaces with additional functionality from Aurelia Protractor Extender (aurelia.protractor.js)

declare module protractor {

  interface IBrowser extends protractor.Protractor {
    loadAndWaitForAureliaPage(url: string): protractor.Protractor;
    waitForHttpDone<T>(): Promise<T>;
  }

}

declare module webdriver {

  interface ILocatorStrategy {
    valueBind(bindTarget: string): webdriver.Locator;
  }

}
