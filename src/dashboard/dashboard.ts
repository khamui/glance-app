import { RouterConfiguration, Router } from "aurelia-router";
import routes from './routes';

export class Dashboard {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = 'Glance App';
    config.map(routes);
  }
}
