import {computedFrom} from 'aurelia-framework';

export class Welcome {

  heading = 'Welcome to the Aurelia Navigation App!';
  firstName = 'John';
  lastName = 'Doe';

  @computedFrom('firstName', 'lastName') get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  welcome() {
    alert(`Welcome, ${this.fullName}!`);
  }

}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
