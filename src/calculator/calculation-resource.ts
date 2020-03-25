import { inject } from 'aurelia-framework';
import { ResourceService, IResourcable } from '../model/resource-service';
import moment from 'moment';

export interface ICalculable {
  resource: IResourcable[];
  convert: () => CalculationData | {};
  calculationData: CalculationData[];
};

export type CalculationData = {
  catId: number;
  sheetId: number;
  type: string;
  name: string;
  tax: number;
  year: GlanceYear;
};

export type GlanceYear = {
  name: string;
  yearsum: number;
  months: GlanceMonth[];
};

export type GlanceQuarter = {
  name: string;
  quartersum: number;
  quarter: GlanceMonth[];
}

export type GlanceMonth = {
  name: string;
  monthsum: number;
  weeks: [];
};

@inject(ResourceService)
export class CalculationResource implements ICalculable {
  rs: ResourceService;
  resource: IResourcable[];
  calculationData: CalculationData[] = [];
  glancemonth: GlanceMonth;
  glanceyear: GlanceYear;

  constructor(resourceService: ResourceService) {
    this.rs = resourceService;
  }

  convert() {
    this.calculationData = this.calculationData && [];
    this.resource = this.rs.getResourceItems();

    if (this.resource) {
      for (let resource of this.resource) {
        for (let category of resource.data) {
          this.calculationData.push(this._makeGlanceResource(category, resource.resourcetype));
        }
      }
    }
    return this.calculationData;
  }

  private _makeGlanceResource(category: any[], resourcetype: string) {
     return {
      catId: category[0],
      sheetId: category[1],
      type: resourcetype,
      name: category[2],
      tax: category[3],
      year: this._makeGlanceYear(category),
    };
  }

  private _makeGlanceYear(category) {
    const monthvalues = this._makeGlanceMonths(category);
    let monthsum = 0;
    const yearsum = monthvalues.map((i) => i.monthsum && i.monthsum + monthsum)
    return {
      name: '2020',
      yearsum: yearsum.reduce((total, value) => value ? total + value : total),
      months: monthvalues,
    }
  }

  private _makeGlanceMonths(category) {
    const months: GlanceMonth[] = [];
    const monthnames: string[] = moment.months();
    let monthNum: number = 1;
    let factor: number = 0;
    for (let month of monthnames) {
      const weekvalues =  this._makeGlanceWeeks(category, 1 * factor)
      months.push({
        name: month,
        monthsum: weekvalues.reduce((total, value) => value ? total + value : total),
        weeks: weekvalues
      });
      monthNum++;
      factor = factor + 4;
    }
    return months;
  }

  private _makeGlanceWeeks(category, monthNum) {
    let offset: number = 4;
    let startIndex: number = monthNum + offset;
    let endIndex: number = monthNum + offset + 4 ;
    return category.slice(startIndex, endIndex) 
  }

  getYear(year: string) {
    return this.calculationData.filter((cobj) => cobj.year.name === year)
  }

  getTaxes(year: string, type: string) {
    const yearobj = this.calculationData.filter((i) => i.year.name === year && i.type === type);
    const taxes = [];

    for(let category of yearobj) {
      taxes.push(category.tax);
    }
    return taxes;
  }

  getWeeks(year: string, type: string) {
    const yearobj = this.calculationData.filter((i) => i.year.name === year && i.type === type);
    const weeks = []
    for (let category of yearobj) {
      const monthweek = [];
      for (let monthweeks of category.year.months) {
        monthweek.push(...monthweeks.weeks);
      }
      weeks.push(monthweek);
    }
    return weeks;
  }
}