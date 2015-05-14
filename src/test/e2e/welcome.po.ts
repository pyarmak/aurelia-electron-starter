/// <reference path="../../../dts/protractor.d.ts" />

export class PageObject_Welcome {

  constructor() {

  }

  getGreeting() {
    return element(by.tagName('h2')).getText();
  }

  setFirstname(value) {
    var el = element(by.valueBind('firstName'));
    el.clear();
    return el.sendKeys(value);
  }

  setLastname(value) {
    var el = element(by.valueBind('lastName'));
    el.clear();
    return el.sendKeys(value);
  }

  getFullname() {
    return element(by.css('.help-block')).getText();
  }

  pressSubmitButton() {
    return element(by.css('button[type="submit"]')).click();
  }

  openAlertDialog() {
    return browser.wait(() => {
      this.pressSubmitButton();

      return browser.switchTo().alert().then(
        // use alert.accept instead of alert.dismiss which results in a browser crash
        function(alert) { alert.accept(); return true; },
        function() { return false; }
      );
    }, 2000);
  }
}
