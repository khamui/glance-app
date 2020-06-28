/**
 * @prettier
 */

import 'handsontable/dist/handsontable.full.css';
import { bindable, inject } from 'aurelia-framework';
import Handsontable from 'handsontable';
import { CONFIG } from './sheet-config';
import { SheetService } from './sheet-service';
import { TResourcable } from 'glancetypes';
import moment from 'moment';

// NOTE: This class is not repsonsible for when and whether to create a model resource object or not.
// This responsiblity is shifted to sheet-service.
// Through Dependency Injection of sheet-service (container), Aurelia handles creation and lifetime.
// Data interaction: Save, Load
@inject(SheetService)
export class Sheet {
  @bindable resource: TResourcable;

  hot: Handsontable;
  ss: SheetService;
  sheetelement: HTMLDivElement;
  sheetconfig: any;

  constructor(sheetService: SheetService) {
    this.hot = null;
    this.ss = sheetService;
    this.sheetconfig = { ...CONFIG };
  }

  async attached() {
    const rowcount = this.resource.data.length;
    const colcount = this.resource.data[0].length;
    this.sheetconfig.rowHeaders = this.makeRowHeaders(rowcount, '☰');
    this.sheetconfig.nestedHeaders = this.makeNestedHeaders(colcount);
    this.sheetconfig.columns = this.makeColHeaders(colcount, [0, 7, 19]);
    // prettier-ignore
    this.sheetconfig.colWidths = this.makeColWidths(colcount, [30, 30, 200, 50, 120]);

    this.hot = new Handsontable(this.sheetelement, {
      ...this.resource,
      ...this.sheetconfig,
    });
    this.makeHooks();
    this.hot.selectCell(0, 0);
  }

  makeHooks() {
    this.hot.addHook('afterRowMove', () => this.save());
    this.hot.addHook('afterChange', () => this.save());
    this.hot.addHook('afterCreateRow', () => this.rowNumberChanged());
    this.hot.addHook('afterRemoveRow', () => this.rowNumberChanged());
  }

  makeRowHeaders(rowcount: number, symbol: string) {
    return Array(rowcount).fill(symbol);
  }

  makeColHeaders(colcount: number, taxvalues: number[]) {
    const columns1 = Array(3).fill({
      type: 'text',
    });
    const columns2 = [
      {
        type: 'dropdown',
        source: taxvalues,
      },
    ];
    const columns3 = Array(colcount - 4).fill({
      type: 'numeric',
      numericFormat: {
        pattern: '0,0.00',
      },
    });
    return columns1.concat(columns2.concat(columns3));
  }

  makeColWidths(colcount: number, colwidths: number[]) {
    const colWidth1 = colwidths.slice(0, -1);
    const colWidth2 = Array(colcount - 4).fill(colwidths.slice(-1));
    return colWidth1.concat(...colWidth2);
  }

  makeNestedHeaders(colcount: number) {
    let weeks: string[] = ['cat_id', 'sheet_id', 'Title', 'Tax'];
    let weeksHeaders: string[] = [];
    for (let i = 0; i <= colcount; i++) {
      let j = i + 1;
      const d1 = moment().add(i, 'week').add(1, 'day');
      const d2 = moment().add(j, 'week');
      weeksHeaders.push(
        [moment(d1).format('DD/MM'), moment(d2).format('DD/MM')].join(' - '),
      );
    }
    weeks.push(...weeksHeaders);
    const months: any[] = ['', '', '', ''];
    for (let i = 0; i <= 12; i++) {
      const d3 = moment().add(i, 'month');
      const monthObj = { label: null, colspan: 4 };
      monthObj.label = moment(d3).format('MMMM YYYY');
      months.push(monthObj);
    }

    let nestedHeaders = [];
    nestedHeaders.push(months);
    nestedHeaders.push(weeks);
    return nestedHeaders;
  }

  valueFieldTypeCheck() {
    let cellProperties: { invalidCellClassName };
    cellProperties.invalidCellClassName = 'hilight__error-anim';
    return cellProperties;
  }

  rowNumberChanged() {
    const rowcount = this.resource.data.length;
    this.hot.updateSettings({
      rowHeaders: this.makeRowHeaders(rowcount, '☰'),
    });
    this.save();
  }

  save() {
    this.ss.save({
      data: this.hot.getData(),
      glaId: this.resource.glaId,
      resourcetype: this.resource.resourcetype,
    });
  }
}
