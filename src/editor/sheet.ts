import 'handsontable/dist/handsontable.full.css';
import { bindable, inject } from 'aurelia-framework';
import Handsontable from 'handsontable';
import { CONFIG } from './sheet-config';
import { SheetService } from './sheet-service';
import { IResourcable } from '../model/resource-service';

// NOTE: This class is not repsonsible for when and whether to create a model resource object or not.
// This responsiblity is shifted to sheet-service.
// Through Dependency Injection of sheet-service (container), Aurelia handles creation and lifetime.
// Data interaction: Save, Load
@inject(SheetService)
export class Sheet {
  @bindable resource: IResourcable;

  hot: Handsontable;
  data: object;
  ss: SheetService;
  sheetelement: HTMLDivElement;

  constructor(sheetService: SheetService) {
    this.hot = null;
    this.data = {};
    this.ss = sheetService;
    console.log('table constructed.');
  }

  async attached() {
    this.hot = new Handsontable(this.sheetelement, {...this.resource, ...CONFIG});
    this.init();
  }

  init() {
    this.hot.selectCell(0, 0);
    this.hot.addHook('afterRowMove', (rows, target) => this.rowMoveCallback(rows, target));
    this.hot.addHook('afterChange', (changes) => this.rowChanged(changes));
    this.hot.addHook('afterCreateRow', (index, amount) => this.rowAdded(index, amount));
    this.hot.addHook('afterRemoveRow', (index, amount) => this.rowRemoved(index, amount));
  }

  valueFieldTypeCheck() {
    let cellProperties : {invalidCellClassName};
    cellProperties.invalidCellClassName = 'hilight__error-anim';
    return cellProperties;
  }

  rowMoveCallback(rows, target) {
    // TODO: Saving entire HOT to Database
    const data = this.hot.getData();
    console.log(data);
  }

  rowChanged(changes) {
    let changedRows = [];
    for (let change of changes) {
      if (change[2] === change[3]) continue;
      changedRows.push(this.resource.data[change[0]]);
    }

    if (!changedRows.length) return;
    let reducedRows = Array.from(new Set(changedRows));
    
    this.ss.save({ 
      data: reducedRows, 
      glaId: this.resource.glaId, 
      resourcetype: this.resource.resourcetype
    });
  }

  rowAdded(index, amount) {
    console.log(index, amount);
    console.log(this.resource);
  }

  rowRemoved(index, amount) {
    console.log(index, amount);
  }
}
