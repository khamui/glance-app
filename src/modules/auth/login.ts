import { inject } from 'aurelia-framework';
import { AuthService } from 'common/services/auth-service';

@inject(AuthService)
export class Login {
  as: AuthService

  constructor(authService: AuthService) {
    this.as = authService;
  }

  login(type: string): void {
    this.as.login(type);
  }
}
