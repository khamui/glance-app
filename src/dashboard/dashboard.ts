import {inject, computedFrom} from "aurelia-framework";
import { RouterConfiguration, Router} from "aurelia-router";
import {PLATFORM} from 'aurelia-pal';
import {TProject, TRoute, TRedirect} from 'glancetypes';
import {Authservice} from '../auth/authservice';
import {UserService} from '../auth/user-service';
import {ProjectService} from '../project/project-service';
import {deepComputedFrom} from 'aurelia-deep-computed';


@inject(Authservice, UserService, ProjectService)
export class Dashboard {
  refNewProjectName: HTMLInputElement;
  router: Router;
  routes: (TRoute|TRedirect)[];
  projectAdded = false;
  hasFocus: boolean = false;
  ps: ProjectService;
  as: Authservice;
	us: UserService;

//	@deepComputedFrom('us', 'us.user', 'us.loaded')
//	get routes() {
//		console.log(this.us);
//		if (!this.us.loaded) return routes;
//		console.log(this.us.user)
//		return this.us.user.projects.map((project) => {
//			return {
//     		name: project['gla_name'],
//     		route: [`project/${project}`],
//      	moduleId: PLATFORM.moduleName('project/project'),
//      	activationStrategy: 'replace',
//      	nav: true,
//      	title: project['gla_name'],
//      	project: project
//			}
//    })
//	}

  constructor(authservice: Authservice, userService: UserService, projectService: ProjectService) {
    this.as = authservice;
    this.us = userService;
    this.ps = projectService;
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = 'Dashboard';

    this.routes = this.us.user.projects.map((project: TProject) => {
      const slug = this._slugify(project['gla_name'])
			return {
     		name: slug,
     		route: ['project/:pid'],
      	moduleId: PLATFORM.moduleName('project/project'),
      	activationStrategy: 'replace',
        nav: true,
        href: `/dashboard/project/${project['glaId']}`,
        title: project['gla_name'],
			}
    })

    this.routes.push({
      route: '', 
      redirect: `project/${this.us.user.projects[0]['glaId']}`
    })

    config.map(this.routes);
  }

  private _slugify(phrase: string): string {
    return phrase.toLowerCase().replace(' ', '-');
  }
	
  showAddInput() {
    this.projectAdded = true;
    this.refNewProjectName = document.querySelector('#refNewProjectName') as HTMLInputElement;
    this.hasFocus = true;
  }

  async addProject() {
    const newProjectName = this.refNewProjectName.value;
    if (newProjectName) {
      const newProject: TProject = {
        id: this.us.user.uid,
        gla_name: newProjectName,
      };
      newProject.glaId = newProject && await this.ps.createProject(newProject);

      this.us.user.projects.push(newProject);
      await this.us.updateUser('projects', this.us.user.projects);
      this.addRoute(this.makeRoute(newProject));
    }
    this.refNewProjectName.value = '';
    this.projectAdded = false;
  }

  keydownCallback(e: KeyboardEvent) {
    if (e.keyCode === 13) this.addProject();
    return true;
  }

  makeRoute(newProject: TProject) {
    const slug = this._slugify(newProject['gla_name'])
    return {
      name: slug,
      route: ['project/:pid'],
      moduleId: PLATFORM.moduleName('project/project'),
      activationStrategy: 'replace',
      nav: true,
      href: `project/${newProject['glaId']}`,
      title: newProject['gla_name'],
    }
  }

  addRoute(projectRoute: TRoute) {
    this.router.addRoute(projectRoute);
    this.router.refreshNavigation();
  }

  logout() {
    this.as.logout();
  }
}
