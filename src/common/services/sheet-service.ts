import { inject, Factory } from 'aurelia-dependency-injection';
import { Api } from 'modules/backend/api';
import { TResourcable } from 'glancetypes';
import moment from 'moment';
import { ProjectService } from './project-service';
import { UserService } from './user-service';

@inject(Api, ProjectService, UserService)
export class SheetService {
  api: Api;
	ps: ProjectService;
	us: UserService;
  constructor(api: Api, projectService: ProjectService, userService: UserService) {
    this.api = api;
    this.ps = projectService;
    this.us = userService;
  }

  // NEW API METHODS
  async load(glaId: number | string) {
    // const result = await this.api.read('sheets/' + glaId);
		// const result = await this.ps.loadProject(this.us.user.projects[0].glaId) 
		// console.log('Project loaded (hardcoded): ');
		// console.log(result);
    // try {
    //   return result;
    // }
    // catch {
    //   console.log('failed')
    // };
  }

  async loadValues(resource: TResourcable) {
    const values = 'sheets/' + resource['gla_id'] + '/' + resource['type'] + '/' + resource['sheet_id'];
    const result = await this.api.read(values);
    try {
      return result;
    }
    catch {
      console.log('failed')
    };
  } 

  async save(resource: TResourcable) {
    await this.api.create('sheets/' + resource['glaId'] + '/' + resource['resourcetype'], resource);
  }

  configTimePeriod() {
    const timePeriod = [];
    const months : any[] = [];
    const weeks = ['Title', 'Tax'];
    for (let month of moment.months()) {
      // console.log(month);
      months.push({label: month, colspan: 4});
      for (let i = 1; i < 5; i++) {
        weeks.push(`${month.substring(0, 3)} // Week ${i}`);
      }
    }
    timePeriod.push(months);
    timePeriod.push(weeks);
    return timePeriod;
  }
}
