import { inject, computedFrom } from "aurelia-framework";
import { RouterConfiguration, Router } from "aurelia-router";
import routes from './routes';
import {PLATFORM} from 'aurelia-pal';
import { TProject, TRoute } from 'glancetypes';
import { Authservice } from '../auth/authservice';
import { Api } from '../backend/api';
import { UserService } from '../auth/user-service';
import { deepComputedFrom } from 'aurelia-deep-computed';


@inject(Api, Authservice, UserService)
export class Dashboard {
  refNewProjectName: HTMLInputElement;
  router: Router;
	routes: TRoute[];
  projectAdded = false;
  hasFocus: boolean = false;
  api: Api;
  defaultSettings: {};
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

  constructor(api: Api, authservice: Authservice, userService: UserService) {
    this.api = api;
    this.as = authservice;
    this.us = userService;
  }

  attached() {
    console.log(this.us);
  }

  // configureRouter(config: RouterConfiguration, router: Router) {
  //   this.router = router;
  //   config.title = 'Glance App';
	// 	console.log(this.routes);
  //   config.map(this.routes);
  //   this.defaultSettings = ["2020-01-01", 1, [0,7,19], 1];
  // }

	// async attached() {
	// 	console.log(this.us);
  //  	//this._makeProjectRoutes();
	// 	this.routes = this.us.user.projects.map((project) => {
	// 		return {
  //    		name: project['gla_name'],
  //    		route: [`project/${project}`],
  //     	moduleId: PLATFORM.moduleName('project/project'),
  //     	activationStrategy: 'replace',
  //     	nav: true,
  //     	title: project['gla_name'],
  //     	project: project
	// 		}
  //   })
  // }
	
  // addProject() {
  //   this.projectAdded = true;
  //   this.refNewProjectName = document.querySelector('#refNewProjectName') as HTMLInputElement;
  //   this.hasFocus = true;
  // }

  // async createProject() {
  //   const newProjectName = this.refNewProjectName.value;
  //   if (newProjectName) {
  //     const projectItem = {
  //       user: 1,
  //       gla_name: newProjectName,
  //       gla_settings: JSON.stringify(this.defaultSettings),
  //     };
  //     await this.api.create('projects', projectItem);
  //     // this.addRoute(this.makeRoute(projectItem));
  //   }
  //   this.refNewProjectName.value = '';
  //   this.projectAdded = false;
  // }

  // keydownCallback(e: KeyboardEvent) {
  //   if (e.keyCode === 13) this.createProject();
  //   return true;
  // }

  // makeRoute(projectItem: TProject) {
  //   const projectName = projectItem['gla_name'].replace(' ', '').toLowerCase();
  //   return {
  //     name: projectItem['gla_name'],
  //     route: [`project/${projectName}`],
  //     moduleId: PLATFORM.moduleName('project/project'),
  //     activationStrategy: 'replace',
  //     nav: true,
  //     title: projectItem['gla_name'],
  //     project: projectItem
  //   }
  // }

  // addRoute(projectRoute: TRoute) {
  //   this.router.addRoute(projectRoute);
  //   this.router.refreshNavigation();
  // }

  logout() {
    this.as.logout();
  }
}
