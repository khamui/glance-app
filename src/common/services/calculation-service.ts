/**
 * @prettier
 */

import { inject, Factory } from 'aurelia-framework';
import { CalculationResource } from 'common/resources/calculation-resource';
import { BasicCalculator } from 'modules/calculator/basic-calculator';
import { BasicProvider } from 'modules/calculator/basic-provider';

@inject(CalculationResource, BasicCalculator, BasicProvider)
export class CalculationService {
  cr: CalculationResource;
  bc: BasicCalculator;
  bp: BasicProvider;

  constructor(
    calculationResource: CalculationResource,
    basicCalculator: BasicCalculator,
    basicProvider: BasicProvider,
  ) {
    this.cr = calculationResource;
    this.bc = basicCalculator;
    this.bp = basicProvider;
    this.bc.cResource = this.cr;
    this.bp.cResource = this.cr;
    console.log(
      'CALC SERVICE, resource assigned to basic calculator and basic provider.',
    );
  }

  async init() {
    this.cr.convert();
    // console.log(this.cr);
    // console.log(this.cr.getWeekValues('2020', 'expenses'));
    // console.log(await this.sumWeeks('2020', 'expenses'));
    // console.log(await this.sumMonths('2020', 'expenses'));
    // console.log(await this.taxMonths('2020', 'expenses'));
    // console.log(await this.sumYear('2020', 'expenses'));
    // console.log(await this.taxYear('2020', 'expenses'));
  }

  async getGlance(view: string, year: string) {
    switch (view) {
      case 'year':
        return {
          period: [year],
          expVal: await this.bp.valYear(year, 'expenses'),
          revSum: await this.bc.sumYear(year, 'revenues'),
          revTax: await this.bc.taxYear(year, 'revenues'),
          expSum: await this.bc.sumYear(year, 'expenses'),
          expTax: await this.bc.taxYear(year, 'expenses'),
        };
      case 'quarter':
        return {
          period: await this.bp.getPeriod(view),
          expVal: await this.bp.valQuarters(year, 'expenses'),
          revSum: await this.bc.sumQuarters(year, 'revenues'),
          revTax: await this.bc.taxQuarters(year, 'revenues'),
          expSum: await this.bc.sumQuarters(year, 'expenses'),
          expTax: await this.bc.taxQuarters(year, 'expenses'),
        };
      case 'month':
        return {
          period: await this.bp.getPeriod(view),
          expVal: await this.bp.valMonths(year, 'expenses'),
          revSum: await this.bc.sumMonths(year, 'revenues'),
          revTax: await this.bc.taxMonths(year, 'revenues'),
          expSum: await this.bc.sumMonths(year, 'expenses'),
          expTax: await this.bc.taxMonths(year, 'expenses'),
        };
      case 'week':
        return {
          period: await this.bp.getPeriod(view),
          expVal: await this.bp.valWeeks(year, 'expenses'),
          revSum: await this.bc.sumWeeks(year, 'revenues'),
          revTax: await this.bc.taxWeeks(year, 'revenues'),
          expSum: await this.bc.sumWeeks(year, 'expenses'),
          expTax: await this.bc.taxWeeks(year, 'expenses'),
        };
      default:
        break;
    }
  }

  // THIS CLASS PROVIDES OBJECTS IN THE RIGHT STRUCTURE FOR THE VIEW.
  // DEPENDING FOR WHICH VIEW AND WHICH CALCULATION
  // BASIC CALCULATIONS ARE SHOWN ALWAYS
  // COMPLEX CALCULATIONS DEPENDING ON WHAT USER TRIGGERED.
  // SHOULD IMPLEMENT CONTROL STRUCTURES, DECIDING WHICH MODEL TO PICK
}
