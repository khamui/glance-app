import {inject, computedFrom} from 'aurelia-framework';
import {SheetService} from 'common/services/sheet-service';
import {ResourceService} from 'common/services/resource-service';
import {TNotification, TResource} from 'glancetypes';

@inject(SheetService, ResourceService)
export class Sheets {
  ss: SheetService;
  rs: ResourceService;
  resourceItem: TResource;
  notifications: TNotification[] = [];

  @computedFrom(
    'resourceItem',
    'resourceItem.expenses',
    'resourceItem.expenses.data',
    'resourceItem.expenses.data.length',
  )
  get expdivheight() {
    const rowitemscount =
      this.resourceItem &&
      this.resourceItem.expenses &&
      this.resourceItem.expenses.data.length;
    return rowitemscount * 23 + 120;
  }

  @computedFrom(
    'resourceItem',
    'resourceItem.revenues',
    'resourceItem.revenues.data',
    'resourceItem.revenues.data.length',
  )
  get revdivheight() {
    const rowitemscount =
      this.resourceItem &&
      this.resourceItem.revenues &&
      this.resourceItem.revenues.data.length;
    return rowitemscount * 23 + 120;
  }

  constructor(sheetService: SheetService, resourceService: ResourceService) {
    this.ss = sheetService;
    this.rs = resourceService;
  }

  async activate() {
    this.resourceItem = this.rs.getResourceItem();
    console.log(this.resourceItem);
    // this.resourceListItems = this.rs.getResourceItems();

    this.notifications.push(
      {
        dismissed: false,
        dismissable: true,
        text: 'This is a componentized notification',
      },
      {
        dismissed: false,
        dismissable: true,
        text: 'Another one yay cool',
      },
    );
  }
}
