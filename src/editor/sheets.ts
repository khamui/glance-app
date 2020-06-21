import { inject, computedFrom, NewInstance } from 'aurelia-framework';
import { SheetService } from './sheet-service';
import { ResourceService } from '../model/resource-service';
import { TNotification } from 'glancetypes';
import { Project } from '../project/project';

@inject(SheetService, ResourceService, Project)
export class Sheets {
  ss: SheetService;
  rs: ResourceService;
  project: Project;
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

  constructor(sheetService: SheetService, resourceService: ResourceService, project: Project) {
    this.ss = sheetService;
    this.rs = resourceService;
    this.project = project;
  }

  async activate() {
    this.rs.clearList();
    //this.glaId = this.project.item['gla_id'];
    const projects = await this.ss.load(this.glaId);
    for (let [key, value] of Object.entries(projects)){
			console.log(key, value);
    //const values = await this.ss.loadValues(item);
    //const sheetData = this.mapSheetData(values);
      this.rs.registerInList({
        resourcetype: key,
        data: projects[key],
        glaId: this.glaId,
      });
    }
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
