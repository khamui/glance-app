
import { inject } from 'aurelia-framework';
import { RouterConfiguration, Router } from "aurelia-router";
import {PLATFORM} from 'aurelia-pal';
import {Authservice} from './auth/authservice';

@inject(Router, Authservice)
export class App {
  router: Router;
	as: Authservice;

  constructor(router: Router, authservice: Authservice) {
    this.router = router;
		this.as = authservice;
		this.as.init();
  }

  async configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: '', redirect: 'login' },
      {
        name: 'login',
        route: ['login'],
        moduleId: PLATFORM.moduleName('auth/login'),
        title: 'login',
      },
      {
        name: 'dashboard',
        route: ['dashboard'],
        moduleId: PLATFORM.moduleName('dashboard/dashboard'),
        title: 'dashboard',
      },
    ]);
    this.router = router;
  }
}
