import { inject } from "aurelia-framework";
import { RouterConfiguration, Router } from "aurelia-router";
import {PLATFORM} from 'aurelia-pal';
import { Api } from '../backend/api';
import routes from './routes';

export type TRoute = {
  name: string,
  route: string[],
  moduleId: string,
  nav?: boolean,
  title: string,
};

export type  TProject = {
  id?: number
  user: number,
  gla_id?: number,
  gla_name: string,
  gla_settings?: object | string,
};

@inject(Api)
export class Dashboard {
  refNewProjectName: HTMLInputElement;
  router: Router;
  projectAdded = false;
  hasFocus: boolean = false;
  api: Api;
  defaultSettings: {};
  projects: any[];

  constructor(api: Api) {
    this.api = api;
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = 'Glance App';
    config.map(routes);
    this.defaultSettings = ["2020-01-01", 1, [0,7,19], 1];
  }

  attached() {
    this._loadProjects(1);
  }

  private async _loadProjects(userId: number) {
    this.projects = await this.api.read('projects/' + userId);
    for (let project of this.projects) {
      this.addRoute(this.makeRoute(project));
    }
  }

  addProject() {
    this.projectAdded = true;
    this.refNewProjectName = document.querySelector('#refNewProjectName') as HTMLInputElement;
    this.hasFocus = true;
  }

  async createProject() {
    const newProjectName = this.refNewProjectName.value;
    if (newProjectName) {
      const projectItem = {
        user: 1,
        gla_name: newProjectName,
        gla_settings: JSON.stringify(this.defaultSettings),
      };
      await this.api.create('projects', projectItem);
      this.addRoute(this.makeRoute(projectItem));
    }
    this.refNewProjectName.value = '';
    this.projectAdded = false;
  }

  keydownCallback(e: KeyboardEvent) {
    if (e.keyCode === 13) this.createProject();
    return true;
  }

  makeRoute(projectItem: TProject) {
    const projectName = projectItem['gla_name'].replace(' ', '').toLowerCase();
    return {
      name: projectItem['gla_name'],
      route: [`project/${projectName}`],
      moduleId: PLATFORM.moduleName('project/project'),
      activationStrategy: 'replace',
      nav: true,
      title: projectItem['gla_name'],
      project: projectItem
    }
  }

  addRoute(projectRoute: TRoute) {
    this.router.addRoute(projectRoute);
    this.router.refreshNavigation();
  }
}
