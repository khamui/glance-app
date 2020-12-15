import {autoinject} from "aurelia-framework";
import {RouterConfiguration, Router} from "aurelia-router";
import {PLATFORM} from 'aurelia-pal';
import {Resource} from 'common/resources/resource';

@autoinject()
export class Project {
  router: Router;
  routes: any[];
  resource: Resource;

  constructor(resource: Resource) {
    this.resource = resource;
  }

  async activate(urlParams, routeMap, navInstr) {
    const {settings: {pid}} = routeMap;
    await this.resource.initialize(pid);
  }

  configureRouter(config: RouterConfiguration, router: Router, params: any) {
    this.router = router;
    config.title = 'Project';
    config.map([
      { route: '', redirect: 'sheets' },
      {
        name: 'sheets',
        route: ['sheets'],
        moduleId: PLATFORM.moduleName('modules/sheets/sheets'),
        nav: true,
        title: 'sheets',
      },
      {
        name: 'glance',
        route: ['glance'],
        moduleId: PLATFORM.moduleName('modules/glance/glance'),
        nav: true,
        title: 'glance',
      },
      {
        name: 'settings',
        route: ['settings'],
        moduleId: PLATFORM.moduleName('modules/settings/settings'),
        nav: true,
        title: 'settings',
        settings: {
          pullright: true,
        },
      },
    ]);
  }
}
