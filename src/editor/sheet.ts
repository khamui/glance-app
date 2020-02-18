import 'handsontable/dist/handsontable.full.css';
import { bindable, inject } from 'aurelia-framework';
import Handsontable from 'handsontable';
import { CONFIG } from './sheet-config';
import { SheetService, Mode } from './sheet-service';
import { IResourcable } from '../model/resource-service';

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

  constructor(sheetService: SheetService) {
    this.hot = null;
    this.ss = sheetService;
    console.log('table constructed.');
  }

  async attached() {
    this.hot = new Handsontable(this.sheetelement, {...this.resource, ...CONFIG});
    this.init();
  }

  init() {
    this.hot.selectCell(0, 0);
    this.hot.addHook('afterRowMove', () => this.save());
    this.hot.addHook('afterChange', (changes) => this.save());
    this.hot.addHook('afterCreateRow', () => this.save());
    this.hot.addHook('afterRemoveRow', () => this.save());
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
    }, Mode.Create);
  }
}
