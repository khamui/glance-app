import { inject, Factory } from 'aurelia-framework';
import { SheetService } from './sheet-service';
import { IResourcable, ResourceService } from '../model/resource-service';

@inject(SheetService, ResourceService)
export class Sheets {
  ss: SheetService;
  rs: ResourceService;
  resourceListItems: any;
  glaId: number;
  constructor(sheetService: SheetService, resourceService: ResourceService) {
    this.ss = sheetService;
    this.rs = resourceService;
    this.glaId = 4001;
  }

  async attached() {
    const items = await this.ss.load(this.glaId);
    for (let item of items) {
      const values = await this.ss.loadValues(item)
      const sheetData = this.mapSheetData(values);
      this.rs.registerInList({
        resourcetype: item.type,
        data: sheetData,
        glaId: this.glaId,
      });
    }
    this.resourceListItems = this.rs.getResourceItems();
  }

  mapSheetData(values: object[]) {
    return [...values.map((row) => {
      let sheetData = [];
      sheetData.push(row['cat_id']);
      sheetData.push(row['sheet_id']);
      sheetData.push(...JSON.parse(row['cat_data']));
      return sheetData;
    })];
  }
}
