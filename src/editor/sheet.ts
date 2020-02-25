import 'handsontable/dist/handsontable.full.css';
import { bindable, inject, Factory } from 'aurelia-framework';
import Handsontable from 'handsontable';
import { CONFIG } from './sheet-config';
import { SheetService } from './sheet-service';
import { IResourcable } from '../model/resource-service';
import moment from 'moment';

// NOTE: This class is not repsonsible for when and whether to create a model resource object or not.
// This responsiblity is shifted to sheet-service.
// Through Dependency Injection of sheet-service (container), Aurelia handles creation and lifetime.
// Data interaction: Save, Load
@inject(SheetService)
export class Sheet {
  @bindable resource: IResourcable;

  hot: Handsontable;
  ss: SheetService;
  sheetelement: HTMLDivElement;
  sheetconfig: any;

  constructor(sheetService: SheetService) {
    this.hot = null;
    this.ss = sheetService;
    this.sheetconfig = {...CONFIG};
    console.log('table constructed.');
  }

  async attached() {
    this.sheetconfig.rowHeaders = this.getRowHeaders(this.resource.data.length);
    this.sheetconfig.nestedHeaders = this.getNestedHeaders();
    this.sheetconfig.columns = this.getColHeaders();
    this.sheetconfig.colWidths = this.getColWidths();

    this.hot = new Handsontable(this.sheetelement, {...this.resource, ...this.sheetconfig});
    this.init();
  }

  init() {
    this.hot.selectCell(0, 0);
    this.hot.addHook('afterRowMove', () => this.save());
    this.hot.addHook('afterChange', () => this.save());
    this.hot.addHook('afterCreateRow', () => this.save());
    this.hot.addHook('afterRemoveRow', () => this.save());
  }


  getRowHeaders(rowcount: number) {
    return Array(rowcount).fill('☰');
  }

  getColHeaders() {
    const columns1 = Array(3).fill({type: 'text'});
    const columns2 = [{type: 'dropdown', source: [0, 7, 19]}];
    const columns3 = Array(52).fill({type: 'numeric', numericFormat: { pattern: '0,0.00' }});
    return columns1.concat(columns2.concat(columns3));
  }

  getColWidths() {
    const colWidth1 = [30,30,220,50];
    const colWidth2 = Array(52).fill(120);
    return colWidth1.concat(colWidth2);
  }

  getNestedHeaders() {
    let weeks: string[] = ['cat_id', 'sheet_id', 'Title', 'Tax'];
    let weeksHeaders: string[] = [];
    for (let i=0; i <= 156; i++) {
      let j = i+1;
      const d1 = moment().add(i, 'week').add(1, 'day');
      const d2 = moment().add(j, 'week');
      weeksHeaders.push([moment(d1).format('DD/MM'),moment(d2).format('DD/MM')].join(' - '));
    }
    weeks.push(...weeksHeaders);
    const months: any[] = ['','','',''];
    for (let i=0; i <= 12; i++) {
      const d3 = moment().add(i, 'month');
      const monthObj = {label: null, colspan: 4};
      monthObj.label = moment(d3).format('MMMM YYYY');
      months.push(monthObj);
    }

    let nestedHeaders = [];
    nestedHeaders.push(months);
    nestedHeaders.push(weeks);
    return nestedHeaders;
  }

  valueFieldTypeCheck() {
    let cellProperties : {invalidCellClassName};
    cellProperties.invalidCellClassName = 'hilight__error-anim';
    return cellProperties;
  }

  save() {
    this.ss.save({
      data: this.hot.getData(),
      glaId: this.resource.glaId, 
      resourcetype: this.resource.resourcetype,
    });
  }
}
