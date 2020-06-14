import {inject} from 'aurelia-framework';
import {TUser, TProject} from 'glancetypes';
import {ProjectService} from 'project/project-service';
import {Rtapi} from '../backend/rtapi';

const randomID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 9);
};

@inject(ProjectService, Rtapi)
export class UserService {
  user: TUser;
  ps: ProjectService;
  rtapi: Rtapi;
  defaultProject: TProject = {
    id: 1,
    glaId: null, // glaId will be generated as unique id
    gla_name: 'Sample Glance',
    gla_settings: ["2020-01-01", 1, [0,7,19], 1],
  };

  constructor(projectService: ProjectService, rtapi: Rtapi) {
    this.ps = projectService;
    this.rtapi = rtapi;
  }

	async loadUser(uid: string) {
		return this.user = await this.rtapi.read('users', uid);
	}

  async loadUserAndProjects(uid: string) {
    const user = await this.loadUser(uid);
		await this.loadUserProjects();
		return user;
  }
	
	async loadUserProjects(user?: TUser) {
		if (user) this.user = user;
    this.user.projects = await this.ps.loadProjects(this.user);
	}

  async createUser(user: TUser) {
    this.user = user;
    this.defaultProject.uid = this.user.uid;
    this.defaultProject.glaId = randomID();
    this.user.projects = [this.defaultProject];
    this.ps.createProject(this.defaultProject.glaId);
    this.rtapi.create(`users/${this.user.uid}`, this.user);
  }
}
