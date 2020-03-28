import { inject } from 'aurelia-framework';
import { CalculationService } from '../calculator/calculation-service';

@inject(CalculationService)
export class Glance {
  cs: CalculationService;
  data: any;
  expSums: any[];
  expTaxSums: any[];
  revSums: any[];
  revTaxSums: any[];

  constructor(calculationService: CalculationService) {
    this.cs = calculationService;
  }

  async attached() {
    this.cs.init();
    this.expSums = await this.cs.sumWeeks('2020', 'expenses');
    this.expTaxSums = await this.cs.taxWeeks('2020', 'expenses');
    this.revSums = await this.cs.sumWeeks('2020', 'revenues');
    this.revTaxSums = await this.cs.taxWeeks('2020', 'revenues');
  }

  // HERE THE USER INPUT TAKES PLACE, SELECTING WHICH VIEW (Yearly, Quarterly, Monthly, Weekly) AND WHICH CALCULATIONS IS TRIGGERED.
  // THIS SHOULD TRIGGER THE VISUALIZER, WHICH WILL THEN TRIGGER THE RIGHT CALCULATION AND RECEIVE THE RIGHT OBJECT.
}
