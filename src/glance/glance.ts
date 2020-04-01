import { inject, computedFrom } from 'aurelia-framework';
import { CalculationService } from '../calculator/calculation-service';

@inject(CalculationService)
export class Glance {
  cs: CalculationService;
  viewRef: HTMLSelectElement;
  data: any;

  constructor(calculationService: CalculationService) {
    this.cs = calculationService;
  }

  async attached() {
    this.cs.init();
    this.showView();
  }

  async showView() {
    this.data = await this.cs.getGlance(this.viewRef.value, '2020');
    // GLANCE SHOULD SHOW
    //  - REV CATEGORIES + VALUES
    //    REV TAXES
    //  - EXP CATEGORIES + VALUES
    //  - EXP TAXES
    //  - LIQUIDITY
  }

  // HERE THE USER INPUT TAKES PLACE, SELECTING WHICH VIEW (Yearly, Quarterly, Monthly, Weekly) AND WHICH CALCULATIONS IS TRIGGERED.
  // THIS SHOULD TRIGGER THE VISUALIZER, WHICH WILL THEN TRIGGER THE RIGHT CALCULATION AND RECEIVE THE RIGHT OBJECT.
}
