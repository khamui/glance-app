import { RouterConfiguration, Router } from "aurelia-router";
import {PLATFORM} from 'aurelia-pal';
import routes from './routes';

export class Project {
  router: Router;
  routes: any[];

  constructor(router) {
    this.router = router
  }
  configureRouter(config: RouterConfiguration, router: Router) {
    this.routes = routes;
    config.map(this.routes);
    this.router = router;
  }
}