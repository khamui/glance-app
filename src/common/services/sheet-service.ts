import { inject, Factory } from 'aurelia-dependency-injection';
import { Rtapi } from 'modules/backend/rtapi';
import { TPid, TGlaId, TProjectSheets} from 'glancetypes';
import moment from 'moment';

export const randomID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
   // after the decimal.
   return Math.random().toString(36).substr(2, 9);
};

@inject(Rtapi)
export class SheetService {
  rtapi: Rtapi;
  constructor(rtapi: Rtapi) {
    this.rtapi = rtapi;
  }

  async loadProject(pid: TPid) {
		return await this.rtapi.read('projects', pid);
  }

  async createProject(sheets?: TProjectSheets) {
    const newGlaId = randomID();
    sheets
      ? await this.rtapi.create(`projects/${newGlaId}`, sheets)
      : await this.rtapi.create(`projects/${newGlaId}`, this.emptySheets());
    return newGlaId;
  }

  async updateProject(glaId, identifier, data) {
    await this.rtapi.update(`projects/${glaId}`,identifier, data);
  }

  // configTimePeriod() {
  //   const timePeriod = [];
  //   const months : any[] = [];
  //   const weeks = ['Title', 'Tax'];
  //   for (let month of moment.months()) {
  //     // console.log(month);
  //     months.push({label: month, colspan: 4});
  //     for (let i = 1; i < 5; i++) {
  //       weeks.push(`${month.substring(0, 3)} // Week ${i}`);
  //     }
  //   }
  //   timePeriod.push(months);
  //   timePeriod.push(weeks);
  //   return timePeriod;
  // }

  emptySheets(): TProjectSheets {
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
