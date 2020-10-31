import { inject } from 'aurelia-framework';
import { ResourceService } from 'common/services/resource-service';
import {
  ICalculable,
  TResourcable, 
  CalculationData, 
  GlanceQuarter, 
  GlanceMonth, 
  GlanceYear
} from 'glancetypes';
import moment from 'moment';

@inject(ResourceService)
export class CalculationResource implements ICalculable {
  rs: ResourceService;
  resource: TResourcable[];
  calculationData: CalculationData[] = [];
  glancequarter: GlanceQuarter;
  glancemonth: GlanceMonth;
  glanceyear: GlanceYear;

  constructor(resourceService: ResourceService) {
    this.rs = resourceService;
    console.log('CALC RESOURCE');
  }

  convert() {
    this.calculationData = this.calculationData && [];
    this.resource = this.rs.getResourceItems();

    if (this.resource) {
      for (let resource of this.resource) {
        for (let category of resource.data) {
          this.calculationData.push(
            this._makeGlanceResource(category, resource.resourcetype),
          );
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

  // TODO: handle multiple years, issu #18
  private _makeGlanceYear(category) {
    const quartervalues = this._makeGlanceQuarter(category);
    const yearsum = quartervalues.map(i => i.quartersum && i.quartersum);
    return {
      name: '2020',
      yearsum: yearsum.reduce((total, value) =>
        value ? total + value : total,
      ),
      quarters: quartervalues,
    };
  }

  private _makeGlanceQuarter(category) {
    const quarters: GlanceQuarter[] = [];
    const quarternames: string[] = [
      'Quartal1',
      'Quartal2',
      'Quartal3',
      'Quartal4',
    ];
    const months: GlanceMonth[] = this._makeGlanceMonths(category);
    let start: number = 0;
    let end: number = 3;
    for (let quarter of quarternames) {
      const trimester = months.slice(start, end);
      const quartersum = trimester.map(
        month => month.monthsum && month.monthsum,
      );
      quarters.push({
        name: quarter,
        quartersum: quartersum.reduce((total, value) =>
          value ? total + value : total,
        ),
        months: trimester,
      });
      start = start + 3;
      end = end + 3;
    }
    return quarters;
  }

  private _makeGlanceMonths(category) {
    const months: GlanceMonth[] = [];
    const monthnames: string[] = moment.months();
    let factor: number = 0;
    for (let month of monthnames) {
      const weekvalues = this._makeGlanceWeeks(category, 1 * factor);
      months.push({
        name: month,
        monthsum: weekvalues.reduce((total, value) =>
          value ? total + value : total,
        ),
        weeks: weekvalues,
      });
      factor = factor + 4;
    }
    return months;
  }

  private _makeGlanceWeeks(category, monthNum) {
    let offset: number = 4;
    let startIndex: number = monthNum + offset;
    let endIndex: number = monthNum + offset + 4;
    return category.slice(startIndex, endIndex);
  }

  getYearSum(year: string, type: string) {
    const yearobj = this.calculationData.filter(
      i => i.year.name === year && i.type === type,
    );
    return yearobj.map(cobj => (cobj.year.yearsum ? cobj.year.yearsum : 0));
  }

  getQuarterSums(year: string, type: string) {
    const yearobj = this.calculationData.filter(
      i => i.year.name === year && i.type === type,
    );
    return yearobj.map(cobj =>
      cobj.year.quarters.map(quarter => quarter.quartersum),
    );
  }

  getMonthSums(year: string, type: string) {
    const yearobj = this.calculationData.filter(
      i => i.year.name === year && i.type === type,
    );
    return yearobj.map(cobj =>
      cobj.year.quarters.map(quarter =>
        quarter.months.map(month => month.monthsum),
      ),
    );
  }

  getWeekValues(year: string, type: string) {
    const yearobj = this.calculationData.filter(
      i => i.year.name === year && i.type === type,
    );
    const weeks = [];
    for (let category of yearobj) {
      const allweeks = [];
      const {
        year: { quarters },
      } = category;
      for (let quarter of quarters) {
        for (let month of quarter.months) {
          allweeks.push(...month.weeks);
        }
      }
      weeks.push(allweeks);
    }
    return weeks;
  }

  getTaxValues(year: string, type: string) {
    const yearobj = this.calculationData.filter(
      i => i.year.name === year && i.type === type,
    );
    const taxes = [];

    for (let category of yearobj) {
      taxes.push(category.tax);
    }
    return taxes;
  }
}
