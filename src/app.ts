
import { inject } from 'aurelia-framework';
import { RouterConfiguration, Router } from "aurelia-router";
import {PLATFORM} from 'aurelia-pal';

@inject(Router)
export class App {
  router: Router;

  constructor(router: Router) {
    this.router = router;
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
