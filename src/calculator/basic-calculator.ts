import { CalculationResource } from './calculation-resource';

interface IBasicCalc {
  taxWeeks: (year: string, type: string) => Promise<any[]>;
  taxMonths: (year: string, type: string) => Promise<any[]>;
  taxQuarters: (year: string, type: string) => Promise<any[]>;
  taxYear: (year: string, type: string) => Promise<any[]>;
  sumWeeks: (year: string, type: string) => Promise<any[]>;
  sumMonths: (year: string, type: string) => Promise<any[]>;
  sumQuarters: (year: string, type: string) => Promise<any[]>;
  sumYear: (year: string, type: string) => Promise<number>;
}

export class BasicCalculator implements IBasicCalc {
  cResource: CalculationResource;
  constructor(cResource: CalculationResource) {
    this.cResource = cResource;
  }

  // ################### BASIC TAX CALCULATIONS - START ######################

  async taxWeeks(year, type) {
    const cattaxes = this.cResource.getTaxValues(year, type);
    const categoryweeks = this.cResource.getWeekValues(year, type);
    let taxsums = [];
    let j = 0;
    for (let cw of categoryweeks) {
      for (let i = 0; i < cw.length; i++) {
        const taxresult =
          taxsums[i] >= 0
            ? taxsums[i] + (cw[i] * cattaxes[j]) / (100 + cattaxes[j])
            : (cw[i] * cattaxes[j]) / (100 + cattaxes[j]);

        taxsums[i] = Math.round((taxresult * 100) / 100);
      }
      j++;
    }
    return taxsums;
  }

  async taxMonths(year, type) {
    const weektaxes = await this.taxWeeks(year, type);
    const monthtaxes = [];
    let start = 0;
    let end = 4;
    let offs = 4;
    for (let i = 0; i < 12; i++) {
      monthtaxes.push(
        weektaxes.slice(start, end).reduce((acc, curr) => acc + curr),
      );
      start = start + offs;
      end = end + offs;
    }
    return monthtaxes;
  }

  async taxQuarters(year, type) {
    const monthtaxes = await this.taxMonths(year, type);
    const quartertaxes = [];
    let start = 0;
    let end = 3;
    let offs = 3;
    for (let i = 0; i < 4; i++) {
      quartertaxes.push(
        monthtaxes
          .slice(start, end)
          .reduce((acc, curr) => (acc && acc + curr) || curr),
      );
      start = start + offs;
      end = end + offs;
    }
    return quartertaxes;
  }

  async taxYear(year, type) {
    const quartertaxes = await this.taxQuarters(year, type);
    return quartertaxes.reduce((acc, curr) => (acc && acc + curr) || curr);
  }
  // ################### BASIC TAXES - END ######################

  // ################### BASIC ADDITIONS - START ######################

  async sumWeeks(year: string, type: string) {
    const categoryweeks = this.cResource.getWeekValues(year, type);
    let weeksums = [];
    for (let cw of categoryweeks) {
      for (let i = 0; i < cw.length; i++) {
        weeksums[i] = (weeksums[i] && weeksums[i] + cw[i]) || cw[i];
      }
    }
    return weeksums;
  }

  async sumMonths(year, type) {
    const catmonths = this.cResource.getMonthSums(year, type);
    const monthsums = [];
    for (let cat of catmonths) {
      const cm = cat.reduce((acc, curr) => acc.concat(...curr));
      for (let i = 0; i < cm.length; i++) {
        monthsums[i] = (monthsums[i] && monthsums[i] + cm[i]) || cm[i];
      }
    }
    return monthsums;
  }

  async sumQuarters(year, type) {
    const catquarters = this.cResource.getQuarterSums(year, type);
    const quartersums = [];
    for (let cat of catquarters) {
      let i = 0;
      for (let qv of cat) {
        quartersums[i] = (quartersums[i] && quartersums[i] + qv) || qv;
        i++;
      }
    }
    return quartersums;
  }

  async sumYear(year, type) {
    const yearsum = this.cResource.getYearSum(year, type);
    return yearsum.reduce((acc, curr) => (acc && acc + curr) || curr);
  }

  // ################### BASIC ADDITION - END ######################

  // ################### BASIC LIQUIDITY - START ######################

  async calcLiquidity() {
    // calculate all taxes
  }
}
