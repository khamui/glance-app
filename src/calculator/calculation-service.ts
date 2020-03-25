import { inject } from 'aurelia-framework';
import { CalculationResource } from '../calculator/calculation-resource';

@inject(CalculationResource)
export class CalculationService {
  calculationResource: CalculationResource;
  data: any;

  constructor(calculationResource: CalculationResource) {
    this.calculationResource = calculationResource;
  }

  async init() {
    const calculationResource = await this.calculationResource.convert();
  }

  async bTaxes(range: string, year: string, type: string) {
    const cattaxes = this.calculationResource.getTaxes(year, type);
      // switch (range) {
      //   case 'weekly':
      //     this.calcTaxesWeekly(year);
      //     break;
      //   default:
      //     break;
      // }
  }

  async bTaxesWeeks(year, type) {
    const cattaxes = this.calculationResource.getTaxes(year, type);
    const categoryweeks = this.calculationResource.getWeeks(year, type);
    let taxsums = [];
    let j = 0;
    for (let cw of categoryweeks) {
      for (let i = 0; i < cw.length; i++) {
        const taxresult = taxsums[i] >= 0 
          ? taxsums[i] + (cw[i] * cattaxes[j] / (100 + cattaxes[j]))
          : cw[i] * cattaxes[j] / (100 + cattaxes[j]);

        taxsums[i] = Math.round((taxresult * 100) / 100);
      }
      j++;
    }
    return taxsums
  }

  async bSumsWeeks(year: string, type: string) {
    const categoryweeks = this.calculationResource.getWeeks(year, type);
    let weeksums = [];
    for (let cw of categoryweeks) {
      for (let i = 0; i < cw.length; i++) {
        weeksums[i] = weeksums[i] && weeksums[i] + cw[i] || cw[i];
      }
    }
    return weeksums
  }

  async calcLiquidity() {
    // calculate all taxes
  }



  // THIS CLASS PROVIDES OBJECTS IN THE RIGHT STRUCTURE FOR THE VIEW.
  // DEPENDING FOR WHICH VIEW AND WHICH CALCULATION
  // BASIC CALCULATIONS ARE SHOWN ALWAYS
  // COMPLEX CALCULATIONS DEPENDING ON WHAT USER TRIGGERED.
}