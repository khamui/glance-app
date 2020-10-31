import {inject} from 'aurelia-framework';
import {TProject, TProjectSheets, TPid} from 'glancetypes';
import {Rtapi} from 'modules/backend/rtapi';

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
	
	async loadProjectSheets(pid: TPid) {
		return await this.rtapi.read('projects', pid);
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
        ['Travel expenses (Sample)', 0, 128, 745, 0, ...Array(48).fill(0)],
        ['Food Allowance (Sample)', 0, 35, 40, 40, ...Array(48).fill(45)],
      ],
    }
  }
}
