import {inject} from 'aurelia-framework';
import {TUser, TProject} from 'glancetypes';
import {ProjectService} from 'project/project-service';
import {Rtapi} from '../backend/rtapi';

@inject(ProjectService, Rtapi)
export class UserService {
  user: TUser;
  ps: ProjectService;
  rtapi: Rtapi;
  
  constructor(projectService: ProjectService, rtapi: Rtapi) {
    this.ps = projectService;
    this.rtapi = rtapi;
  }

	async loadUser(uid: string) {
		return this.user = await this.rtapi.read('users', uid);
	}

  async loadUserAndProjects(uid: string) {
		console.log(uid);
    const user = await this.loadUser(uid);
		await this.loadUserProjects(user);
		return user;
  }
	
	async loadUserProjects(user?: TUser) {
		if (user) this.user = user;
    this.user.projects = await this.ps.loadProjects(this.user);
	}

  async createUser(user: TUser) {
    this.user = user;
		const defaultProject: TProject = {
	    id: this.user.uid,
      glaId: null,// glaId will be generated as unique id
    	gla_name: 'Sample Glance',
    	gla_settings: ["2020-01-01", 1, [0,7,19], 1],
  	};
		defaultProject.glaId = await this.ps.createProject(defaultProject);
		console.log(defaultProject);
    this.user.projects = [defaultProject];
    this.rtapi.create(`users/${this.user.uid}`, this.user);
  }
}
