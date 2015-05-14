# aurelia-skeleton-navigation

[![ZenHub](https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png)](https://zenhub.io)
[![Join the chat at https://gitter.im/aurelia/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aurelia/discuss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is a TypeScript implementation of navigation skeleton of the [Aurelia](http://www.aurelia.io/) platform. It sets up a standard navigation-style app using gulp to compile your TypeScript code with [gulp-typescript plugin](https://www.npmjs.com/package/gulp-typescript). Karma/Jasmine testing is also configured.
Additional features include [electron](https://github.com/atom/electron) support and using [materialize](https://github.com/Dogfalo/materialize) instead of bootstrap.

This repository does not require Visual Studio to run.

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.durandal.io/). If you have questions, we invite you to [join us on Gitter](https://gitter.im/aurelia/discuss). If you would like to have deeper insight into our development process, please install the [ZenHub](https://zenhub.io) Chrome Extension and visit any of our repository's boards. You can get an overview of all Aurelia work by visiting [the framework board](https://github.com/aurelia/framework#boards).

## Notes regarding conversion of original skeleton application from ES6 to TypeScript

1. Structure of folders was changed in order to let TypeScript compiler, System.js and Karma runner to reference all files correctly.
2. All dependencies to Babel were removed, instead [gulp-typescript plugin](https://www.npmjs.com/package/gulp-typescript) is used.
3. Original skeleton navigation [extends](https://github.com/aurelia/skeleton-navigation/blob/master/aurelia.protractor.js) Protractor / WebDriver, so we have added appropriate d.ts file to cover this extended functionality (dts/aurelia-protractor.d.ts).
4. `gulp tdd` task was updated to enable watching and recompiling of both main and test sources and re-running karma when a change occurs. Note: you will need to use `gulp tdd` command instead of `karma start` if you want your TypeScript files to be watched.
5. `gulp e2e` command was also updated to include TypeScript compilation step (of only e2e test sources).

Copyrights on the definition files are respective of each contributor listed at the beginning of each definition file. Special thanks to [Mike Graham](https://github.com/cmichaelgraham) for his [Aurelia typings](https://github.com/cmichaelgraham/aurelia-typescript-atom/tree/master/skel-nav-ts/typings/aurelia).

## Running The App

To run the app, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g jspm
  ```
  > **Note:** jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing `jspm registry config github` and following the prompts.
5. Install the client-side dependencies with jspm:

  ```shell
  jspm install -y
  ```
  >**Note:** Windows users, if you experience an error of "unknown command unzip" you can solve this problem by doing `npm install -g unzip` and then re-running `jspm install`.
6. To run the app, execute the following command:

  ```shell
  gulp watch
  ```
7. Browse to [http://localhost:9000](http://localhost:9000) to see the app. You can make changes in the code found under `src` and the browser should auto-refresh itself as you save files.

8. To run electron execute:

  ```shell
  gulp electron
  ```
9. To create an electron distribution execute:

  ```shell
  gulp electron:release
  ```
> Note: configuration options for paths is found under build/paths.js and electron configuration is found under build/config.js

> Note: At present there is a bug in the HTMLImports polyfill which only occurs on IE. We have submitted a pull request to the team with the fix. In the mean time, if you want to test on IE, you can work around the issue by explicitly adding a script tag before you load system.js. The script tag should look something like this (be sure to confirm the version number):

```html
<script src="jspm_packages/github/webcomponents/webcomponentsjs@0.5.2/HTMLImports.js"></script>
```

## Running The Unit Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. Install Aurelia libs for test visibility:

```shell
jspm install aurelia-framework
jspm install aurelia-http-client
jspm install aurelia-router
```
2. You can now run the tests once with this command. This command does TypeScript sources compilation (both main and test) and executes tests. The test commands are set up with Gulp in mind, so it is not required to have global installation of Karma:

  ```shell
  gulp test
  ```
  Or if you want to do it TDD style use the following command. This command watches both main and test sources for change and when it detects one it automatically recompiles sources and runs tests again.

  ```shell
  gulp tdd
  ```

## Running The E2E Tests

Integration tests are performed with [Protractor](http://angular.github.io/protractor/#/).

1. Place your E2E-Tests into the folder ```src/test/e2e```
2. Install the necessary webdriver

  ```shell
  gulp webdriver_update
  ```

3. Configure the path to the webdriver by opening the file ```protractor.conf.js``` and adjusting the ```seleniumServerJar``` property. Typically its only needed to adjust the version number.

4. Make sure your app runs and is accessible

  ```shell
  gulp watch
  ```

5. In another console run the E2E-Tests

  ```shell
  gulp e2e
  ```
