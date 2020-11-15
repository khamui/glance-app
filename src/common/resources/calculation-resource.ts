import { inject } from 'aurelia-framework';
import { ResourceService } from 'common/services/resource-service';
import {
  ICalculable,
  TResourcable, 
  CategoryData, 
  GlanceQuarter, 
  GlanceMonth, 
  GlanceYear
} from 'glancetypes';
import moment from 'moment';

@inject(ResourceService)
export class CalculationResource implements ICalculable {
  rs: ResourceService;
  resource: TResourcable[];
  categoryData: CategoryData[] = [];
  glancequarter: GlanceQuarter;
  glancemonth: GlanceMonth;
  glanceyear: GlanceYear;

  constructor(resourceService: ResourceService) {
    this.rs = resourceService;
    console.log('CALC RESOURCE');
  }

  toCategoryDict() {
    this.categoryData = [];
    this.resource = this.rs.getResourceItems();

    if (this.resource) {
      for (let resource of this.resource) {
        for (let category of resource.data) {
          this.categoryData.push(
            this._makeGlanceResource(category, resource.resourcetype),
          );
        }
      }
    }
    return this.categoryData;
  }

  private _makeGlanceResource(category: any[], resourcetype: string) {
    return {
      type: resourcetype,
      name: category[0],
      tax: category[2],
      year: this._makeGlanceYear(category),
    };
  }

  // TODO: handle multiple years, issu #18
  private _makeGlanceYear(category) {
    const quartervalues = this._makeGlanceQuarter(category);
    const yearsum = quartervalues.map(i => i.sum && i.sum);
    return {
      name: '2020',
      sum: yearsum.reduce((total, value) =>
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
        month => month.sum && month.sum,
      );
      quarters.push({
        name: quarter,
        sum: quartersum.reduce((total, value) =>
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
      const monthsum = weekvalues.reduce((total, value) => value ? total + value : total, 0);
      months.push({
        name: month,
        sum: monthsum,
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
    const yearobj = this.categoryData.filter(
      i => i.year.name === year && i.type === type,
    );
    return yearobj.map(cobj => (cobj.year.sum ? cobj.year.sum : 0));
  }

  getQuarterSums(year: string, type: string) {
    const yearobj = this.categoryData.filter(
      i => i.year.name === year && i.type === type,
    );
    return yearobj.map(cobj =>
      cobj.year.quarters.map(quarter => quarter.sum),
    );
  }

  getMonthSums(year: string, type: string) {
    const yearobj = this.categoryData.filter(
      i => i.year.name === year && i.type === type,
    );
    return yearobj.map(cobj =>
      cobj.year.quarters.map(quarter =>
        quarter.months.map(month => month.sum),
      ),
    );
  }

  getWeekValues(year: string, type: string) {
    const yearobj = this.categoryData.filter(
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
    const yearobj = this.categoryData.filter(
      i => i.year.name === year && i.type === type,
    );
    const taxes = [];

    for (let category of yearobj) {
      taxes.push(category.tax);
    }
    return taxes;
  }
}
