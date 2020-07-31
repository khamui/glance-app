import { inject } from 'aurelia-framework';
import { ResourceList } from '../model/resource-list';
import {TResourcable, TProjectSheets, TPid} from 'glancetypes';
@inject(ResourceList)
export class ResourceService {
  private rl : ResourceList;

  constructor(resourceList: ResourceList) {
    this.rl = resourceList;
  }

  getResourceItems() {
    return this.rl.getItems();
  }

  registerInList(resource: TResourcable) {
    this.rl.register(resource);
  }

  makeResourceAndRegister(sheets: TProjectSheets, glaId: TPid, settings) {
    for (let [key, value] of Object.entries(sheets)){
      this.registerInList({
        resourcetype: key,
        data: sheets[key],
        glaId: glaId,
        settings: settings
      });
    }
  }

  clearList() {
    this.rl.clear();
  }
}
