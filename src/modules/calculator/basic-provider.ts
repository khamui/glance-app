/**
 * @prettier
 */
import { CalculationResource } from 'common/resources/calculation-resource';

export class BasicProvider {
  cResource: CalculationResource;
  constructor(cResource: CalculationResource) {
    this.cResource = cResource;
    console.log('BASIC PROVIDER');
  }

  async valWeeks(resyear: string, restype: string) {
    const extracted = [];
    for (let cat of this.cResource.calculationData) {
      const category = [];
      const { name, type, year } = cat;
      if (type !== restype || year.name !== resyear) continue;
      category.push(name);
      for (let quarter of year.quarters) {
        const { months } = quarter;
        for (let month of months) {
          const { weeks } = month;
          category.push(...weeks);
        }
      }
      extracted.push(category);
    }
    return extracted;
  }

  async valMonths(resyear: string, restype: string) {
    const extracted = [];
    for (let cat of this.cResource.calculationData) {
      const category = [];
      const { name, type, year } = cat;
      if (type !== restype || year.name !== resyear) continue;
      category.push(name);
      for (let quarter of year.quarters) {
        const { months } = quarter;
        for (let month of months) {
          category.push(month.monthsum);
        }
      }
      extracted.push(category);
    }
    return extracted;
  }

  async valQuarters(resyear: string, restype: string) {
    const extracted = [];
    for (let cat of this.cResource.calculationData) {
      const category = [];
      const { name, type, year } = cat;
      if (type !== restype || year.name !== resyear) continue;
      category.push(name);
      for (let quarter of year.quarters) {
        category.push(quarter.quartersum);
      }
      extracted.push(category);
    }
    return extracted;
  }

  async valYear(resyear: string, restype: string) {
    const extracted = [];
    for (let cat of this.cResource.calculationData) {
      const category = [];
      const { name, type, year } = cat;
      if (type !== restype || year.name !== resyear) continue;
      category.push(name, year.yearsum);
      extracted.push(category);
    }
    return extracted;
  }

  async getPeriod(view: string) {
    if (view === 'quarter') {
      return this.getQuarterPeriod();
    } else if (view === 'month') {
      return this.getMonthPeriod();
    } else if (view === 'week') {
      return this.getWeekPeriod();
    }
  }

  async getQuarterPeriod() {
    const quarters = this.cResource.calculationData[0].year.quarters.map(
      i => i.name,
    );
    return quarters;
  }

  async getMonthPeriod() {
    const months = [];

    for (let quarter of this.cResource.calculationData[0].year.quarters) {
      months.push(...quarter.months.map(i => i.name));
    }

    return months;
  }

  async getWeekPeriod() {
    const weeks = [];
    let i = 1;
    for (let quarter of this.cResource.calculationData[0].year.quarters) {
      for (let month of quarter.months) {
        for (let week of month.weeks) {
          weeks.push(`Week ${i}`);
          i++;
        }
      }
    }

    return weeks;
  }
}
