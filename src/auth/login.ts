import { inject } from 'aurelia-framework';
import { Authservice } from '../auth/authservice';

@inject(Authservice)
export class Login {
  as: Authservice
  constructor(authservice: Authservice) {
    this.as = authservice
  }

  login(type: string): void {
    this.as.login(type);
  }
}