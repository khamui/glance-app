import { RouterConfiguration, Router } from "aurelia-router";
import {PLATFORM} from 'aurelia-pal';
import { TProject } from 'glancetypes';

export class Project {
  router: Router;
  routes: any[];
  item: TProject;

  constructor(router) {
    this.router = router
  }

  async activate(urlParams, routeMap, navInstr) {
    this.item = await routeMap.project;
  }
  
  async configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: '', redirect: 'sheets' },
      {
        name: 'sheets',
        route: ['sheets'],
        moduleId: PLATFORM.moduleName('editor/sheets'),
        nav: true,
        title: 'sheets',
      },
      {
        name: 'glance',
        route: ['glance'],
        moduleId: PLATFORM.moduleName('glance/glance'),
        nav: true,
        title: 'glance',
      },
      {
        name: 'settings',
        route: ['settings'],
        moduleId: PLATFORM.moduleName('settings/settings'),
        nav: true,
        title: 'settings',
        settings: {
          pullright: true,
        },
      },
    ]);
    this.router = router;
  }
}