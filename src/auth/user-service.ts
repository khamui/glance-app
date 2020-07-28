import {autoinject} from 'aurelia-framework';
import {TUser, TProject} from 'glancetypes';
import {ProjectService} from 'project/project-service';
import {Rtapi} from '../backend/rtapi';

@autoinject()
export class UserService {
  user: TUser = null;
  ps: ProjectService;
  rtapi: Rtapi;
	loaded: boolean = false;
  
  constructor(projectService: ProjectService, rtapi: Rtapi) {
    this.ps = projectService;
    this.rtapi = rtapi;
	}

	async loadUser(uid: string) {
		this.user = await this.rtapi.read('users', uid);
		this.user.projects = await this.ps.loadProjects(this.user);
		return this.user;
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
    this.user.projects = [defaultProject];
    await this.rtapi.create(`users/${this.user.uid}`, this.user);
  }
}
