import {autoinject} from "aurelia-framework";
import {TResource} from 'glancetypes';
import {UserService} from 'common/services/user-service';
import {SheetService} from 'common/services/sheet-service';
import {TProjectSheets, TPid} from 'glancetypes';

@autoinject()
export class Resource {
  private item: TResource;
  us: UserService;
  ss: SheetService;

  constructor(userService: UserService, sheetService: SheetService) {
    this.us = userService;
    this.ss = sheetService;
  }

  getItem() {
    return this.item;
  }
  
  setItem(data: TResource) {
    this.item = data; 
  }

  async initialize(pid: TPid) {
    const {glaId, gla_name, gla_settings} 
      = this.us.user.projects.find(p => p.glaId === pid && p);
    const user = this.us.user;
    const sheets: TProjectSheets = await this.ss.loadProject(pid);

    this.setItem({
      glaId: glaId,
      gla_name: gla_name,
      gla_settings: gla_settings,
      user: user,
      expenses: {
        type: 'expenses',
        data: sheets['expenses']
      },
      revenues: {
        type: 'revenues',
        data: sheets['revenues']
      }
    });
    console.log(sheets);
  }
}
