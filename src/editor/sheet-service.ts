import { inject, Factory } from 'aurelia-dependency-injection';
import { Api } from '../backend/api';
import { IResourcable } from '../model/resource-service';
import moment from 'moment';

// Chooses on arguments, which api methods to be used!

@inject(Api)
export class SheetService {
  api: Api;
  constructor(api: Api) {
    this.api = api;
    console.log('sheet-service constructed.');
  }

  // NEW API METHODS
  async load(glaId: number) {
    const result = await this.api.read('sheets/' + glaId);
    try {
      return result;
    }
    catch {
      console.log('failed')
    };
  }

  async loadValues(resource: IResourcable) {
    const values = 'sheets/' + resource['gla_id'] + '/' + resource['type'] + '/' + resource['sheet_id'];
    const result = await this.api.read(values);
    try {
      return result;
    }
    catch {
      console.log('failed')
    };
  } 

  save(resource: IResourcable) {
    this.api.update('sheets/' + resource['glaId'] + '/' + resource['type'], resource)
      .then((result) => {
        // LOGGER return
      });
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
