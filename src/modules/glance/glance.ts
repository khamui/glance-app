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
  period: string[];

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
    if(this.timeSpan === 'year') this.period = this.getYearsMap();
    if(this.timeSpan === 'quarter') this.period = this.getQuartersMap();
    if(this.timeSpan === 'month') this.period = this.getMonthsMap();
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
    return [this.data[0].year.name];  
  }

  getQuartersMap() {
    return this.data[0].year.quarters.map(q => q.name);
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
