import { CalculationResource } from './calculation-resource';

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
}
