import {inject} from 'aurelia-framework';
import {TProject, TUser} from 'glancetypes';
import {Rtapi} from '../backend/rtapi';

@inject(Rtapi)
export class ProjectService {
  rtapi: Rtapi;

  constructor(rtapi: Rtapi) {
    this.rtapi = rtapi;
  }

  async loadProjects(user: TUser): Promise<TProject> {
    return await this.rtapi.read('users', `${user.uid}/projects`);
  }

  async createProject(glaId: string | number) {
    await this.rtapi.create(`projects/${glaId}`, this.buildEmptyProject());
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