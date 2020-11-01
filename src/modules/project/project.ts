import {autoinject} from "aurelia-framework";
import {RouterConfiguration, Router} from "aurelia-router";
import {PLATFORM} from 'aurelia-pal';
import {ResourceService} from 'common/services/resource-service';
import {UserService} from 'common/services/user-service';
import {SheetService} from 'common/services/sheet-service';

@autoinject()
export class Project {
  router: Router;
  routes: any[];
  rs: ResourceService;
  us: UserService;
  ss: SheetService;

  constructor(resourceService: ResourceService, userService: UserService, sheetService: SheetService) {
    this.rs = resourceService;
    this.us = userService;
    this.ss = sheetService;
  }

  async activate(urlParams, routeMap, navInstr) {
    const {settings: {pid}} = routeMap;
    const projectMeta = this.us.user.projects.find(p => p.glaId === pid && p);
    const userMeta = this.us.user;
    const projectSheets = await this.ss.loadProject(pid);

    this.rs.clearList();
    this.rs.makeResourceAndRegister(projectSheets, projectMeta, userMeta);
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
