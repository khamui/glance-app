import {inject} from "aurelia-framework";
import {RouterConfiguration, Router} from "aurelia-router";
import {PLATFORM} from 'aurelia-pal';
import {ProjectService} from 'project/project-service';
import {ResourceService} from '../model/resource-service';
import {UserService} from '../auth/user-service';

@inject(ProjectService, ResourceService, UserService)
export class Project {
  router: Router;
  routes: any[];
  ps: ProjectService;
  rs: ResourceService;
  us: UserService;

  constructor(projectService: ProjectService, resourceService: ResourceService, userService: UserService) {
    this.ps = projectService;
    this.rs = resourceService;
    this.us = userService;
  }

  async activate(urlParams, routeMap, navInstr) {
    const {pid} = urlParams;
    const projectMeta = this.us.user.projects.map(p => p.glaId === pid && p)[0];
    const userMeta = this.us.user;
    const projectSheets = await this.ps.loadProjectSheets(pid);

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
  }
}