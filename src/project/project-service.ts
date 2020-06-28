import {inject} from 'aurelia-framework';
import {TProject, TUser, TPid} from 'glancetypes';
import {Rtapi} from '../backend/rtapi';

export const randomID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters   
 	// after the decimal.   
 	return Math.random().toString(36).substr(2, 9);   
};

@inject(Rtapi)
export class ProjectService {
  rtapi: Rtapi;

  constructor(rtapi: Rtapi) {
    this.rtapi = rtapi;
  }
	
	async loadProject(pid: TPid) {
		return await this.rtapi.read('projects', pid);
	}

  async loadProjects(user: TUser): Promise<TProject> {
		console.log(user);
    return await this.rtapi.read('users', `${user.uid}/projects`);
  }

  async createProject(newProject: TProject) {
		newProject.glaId = randomID();
    await this.rtapi.create(`projects/${newProject.glaId}`, this.buildEmptyProject());
		return newProject.glaId;
  }

  buildEmptyProject() {
    return {
      revenues: [
        ['Project revenues (Sample)', 0, 0, 1200, 6780, ...Array(48).fill(0)],
        ['Sale revenues (Sample)', 0, 0, 250, 400, ...Array(48).fill(120)],
      ],
      expenses: [
        ['Travel expenses (Sample)', 238, 128, 745, 0, ...Array(48).fill(0)],
        ['Food Allowance (Sample)', 35, 35, 40, 40, ...Array(48).fill(45)],
      ],
    }
  }
}
