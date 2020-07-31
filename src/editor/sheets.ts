import {inject, computedFrom} from 'aurelia-framework';
import {SheetService} from './sheet-service';
import {ResourceService} from '../model/resource-service';
import {TNotification} from 'glancetypes';

@inject(SheetService, ResourceService)
export class Sheets {
  ss: SheetService;
  rs: ResourceService;
  resourceListItems: any;
  glaId: string | number;
  sheetEls: NodeListOf<Element>;
  notifications: TNotification[] = [];

  @computedFrom(
    'resourceListItems',
    'resourceListItems[0].data.length',
    'resourceListItems[1].data.length',
  )
  get expdivheight() {
    const rowitemscount =
      this.resourceListItems && this.resourceListItems[0].data.length;
    return rowitemscount * 23 + 120;
  }

  @computedFrom(
    'resourceListItems',
    'resourceListItems[0].data.length',
    'resourceListItems[1].data.length',
  )
  get revdivheight() {
    const rowitemscount =
      this.resourceListItems && this.resourceListItems[1].data.length;
    return rowitemscount * 23 + 100;
  }

  constructor(sheetService: SheetService, resourceService: ResourceService) {
    this.ss = sheetService;
    this.rs = resourceService;
  }

  async activate() {
    this.resourceListItems = this.rs.getResourceItems();
    console.log(this.resourceListItems);

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
