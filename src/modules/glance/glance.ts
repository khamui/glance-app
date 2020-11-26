/**
 * @prettier
 */

import { inject, computedFrom } from 'aurelia-framework';
import { CalculationService } from 'common/services/calculation-service';

@inject(CalculationService)
export class Glance {
  cs: CalculationService;
  viewRef: HTMLSelectElement;
  data: any;
  period: {};

  @computedFrom('viewRef', 'viewRef.value')
  get timeSpan() {
    return this.viewRef.value;    
  }
  constructor(calculationService: CalculationService) {
    this.cs = calculationService;
  }

  async attached() {
    //this.cs.init();
    this.showView();
  }

  async showView() {
    this.data = await this.cs.getDataByPeriod('year');
    if(this.timeSpan === 'year') this.period = await this.getYearsMap();
    if(this.timeSpan === 'quarters') this.period = await this.getQuartersMap();
    if(this.timeSpan === 'months') this.period = await this.getMonthsMap();
    // depending on which view was selected here, the calculation-service should return the right object:
    // months:
    console.log(this.cs.cr);
    console.log(this.data);
    // GLANCE SHOULD SHOW
    //  - REV CATEGORIES + VALUES
    //    REV TAXES
    //  - EXP CATEGORIES + VALUES
    //  - EXP TAXES
    //  - LIQUIDITY
  }

  getYearsMap() {
    return [{name: this.data[0].year.name, sum: this.data[0].year.sum}];  
  }

  getQuartersMap() {
    const qmap = {};
    this.data.map(c => {
      return c.year.quarters.map(q => {
        if (!qmap[q.name]) qmap[q.name] = [];
        return qmap[q.name].push({categoryname: c.name, categorysum: q.sum});
      })
    })
    console.log(qmap); 
    return qmap;
  }

  getMonthsMap() {
    const monthslist = [];
    this.data[0].year.quarters.map(q => {
      q.months.map(m => monthslist.push(m.name));  
    });
    return monthslist;
  }
  // HERE THE USER INPUT TAKES PLACE, SELECTING WHICH VIEW (Yearly, Quarterly, Monthly, Weekly) AND WHICH CALCULATIONS IS TRIGGERED.
  // THIS SHOULD TRIGGER THE VISUALIZER, WHICH WILL THEN TRIGGER THE RIGHT CALCULATION AND RECEIVE THE RIGHT OBJECT.
}

export class ObjectToArrayValueConverter {
  toView(value) {
    console.log(value);
    const keys = Object.keys(value);
    const values = Object.values(value);
    const temp = [];
    for (let i = 0; i < keys.length; i++){
      const record = [];
      record[keys[i]] = values[i];
      temp.push(record)
    }
    return temp;
  }
}

export class KeysValueConverter {
  toView(value) {
    console.log(value);
    return Object.keys(value);
  }
}

export class ValuesValueConverter {
  toView(value) {
    console.log(value);
    return Object.values(value);
  }
}
