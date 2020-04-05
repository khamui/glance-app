import { inject, computedFrom } from 'aurelia-framework';
import { SheetService } from './sheet-service';
import { ResourceService } from '../model/resource-service';
import { TNotification } from '../components/notification/notification';

@inject(SheetService, ResourceService)
export class Sheets {
  ss: SheetService;
  rs: ResourceService;
  resourceListItems: any;
  glaId: number;
  sheetEls: NodeListOf<Element>;
  notifications: TNotification[] = [];

  @computedFrom(
    'resourceListItems',
    'resourceListItems[0].data.length',
    'resourceListItems[1].data.length',
  )
  get divheight() {
    const rowitemscount1 =
      this.resourceListItems && this.resourceListItems[0].data.length;
    const rowitemscount2 =
      this.resourceListItems && this.resourceListItems[1].data.length;
    return (rowitemscount1 + rowitemscount2) * 30 + 280;
  }

  constructor(sheetService: SheetService, resourceService: ResourceService) {
    this.ss = sheetService;
    this.rs = resourceService;
    this.glaId = 4001;
  }

  async attached() {
    const items = await this.ss.load(this.glaId);
    for (let item of items) {
      const values = await this.ss.loadValues(item);
      const sheetData = this.mapSheetData(values);
      this.rs.registerInList({
        resourcetype: item.type,
        data: sheetData,
        glaId: this.glaId,
      });
    }
    this.resourceListItems = this.rs.getResourceItems();
    this.notifications.push(
      {
        dismissed: false,
        dismissable: false,
        text: 'This is a componentized notification',
      },
      {
        dismissed: false,
        dismissable: true,
        text: 'Another one yay cool',
      },
    );
  }

  mapSheetData(values: object[]) {
    return [
      ...values.map((row) => {
        let sheetData = [];
        sheetData.push(row['cat_id']);
        sheetData.push(row['sheet_id']);
        sheetData.push(...JSON.parse(row['cat_data']));
        return sheetData;
      }),
    ];
  }
}
