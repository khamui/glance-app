import { inject } from 'aurelia-framework';
import { CalculationResource } from './calculation-resource';
import { BasicCalculator } from './basic-calculator';

@inject(CalculationResource)
export class CalculationService extends BasicCalculator {
  calculationResource: CalculationResource;

  constructor(calculationResource: CalculationResource) {
    super(calculationResource);
    this.calculationResource = calculationResource;
  }

  async init() {
    this.calculationResource.convert();
    // console.log(await this.sumWeeks('2020', 'expenses'));
    console.log(await this.sumMonths('2020', 'expenses'));
    console.log(await this.taxMonths('2020', 'expenses'));
    // console.log(await this.sumYear('2020', 'expenses'));
    // console.log(await this.taxYear('2020', 'expenses'));
  }

  async getTaxesFor(view: string) {
    // switch (range) {
    //   case 'weekly':
    //     this.calcTaxesWeekly(year);
    //     break;
    //   default:
    //     break;
    // }
  }

  // THIS CLASS PROVIDES OBJECTS IN THE RIGHT STRUCTURE FOR THE VIEW.
  // DEPENDING FOR WHICH VIEW AND WHICH CALCULATION
  // BASIC CALCULATIONS ARE SHOWN ALWAYS
  // COMPLEX CALCULATIONS DEPENDING ON WHAT USER TRIGGERED.
  // SHOULD IMPLEMENT CONTROL STRUCTURES, DECIDING WHICH MODEL TO PICK
}
