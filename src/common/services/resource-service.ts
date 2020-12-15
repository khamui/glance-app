import {autoinject} from 'aurelia-framework';
import {Resource} from 'common/resources/resource';
import {TProjectSheets, TPid, TResourceCategory} from 'glancetypes';

@autoinject
export class ResourceService {
  resource: Resource;

  constructor(resource: Resource) {
    this.resource = resource;
  }

  // Helper
  chop(array,each) {
    const choppedArray = [];
    const arrayCopy = [...array];
    while(arrayCopy.length) {
      choppedArray.push(arrayCopy.splice(0, each));
    }
    return choppedArray;
  }

  getResourceItem() {
    return this.resource.getItem();
  }

  getByCategory(): TResourceCategory[] | any {
    const {expenses, revenues} = this.resource.getItem();
    const result: any = [];
    
    const mappedExpenses = expenses.data.map(cat => {
      const weeks = cat.slice(2, cat.length);
      const quarters = this.chop(weeks, 14);
      const months = this.chop(weeks, 4); 
      return {
        catName:cat[0],
        type: 'expenses',
        periods: {
          years: {
            name: 'yname',
            sum: weeks.reduce((pv,cv) => pv + cv, 0)
          },
          quarters: {
            name: ['qname1', 'qname2', 'qname3', 'qname4'],
            sum: quarters.map(q => q.reduce((pv,cv) => pv + cv, 0))
          },
          months: {
            name: new Array(12).fill('m'),
            sum: months.map(m => m.reduce((pv,cv) => pv + cv, 0))
          }
        }
      }
    });
    console.log(mappedExpenses);
    return;
  }
}
//catName: string; // Travel Costs
//    type: 'expenses' | 'revenues';
//    periods: {
//      years: [{
//        name: string | number;
//        sum: number;
//      }]; 
//      quarters: [{
//        name: string;
//        sum: number;
//      }];
//      months: [{
//        name: string;
//        sum: number;
//      }];
//    };
