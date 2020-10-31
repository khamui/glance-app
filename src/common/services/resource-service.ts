import { inject } from 'aurelia-framework';
import { ResourceList } from 'common/resources/resource-list';
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

  makeResourceAndRegister(sheets: TProjectSheets, projectMeta, userMeta) {
    for (let [key, value] of Object.entries(sheets)){
      this.registerInList({
        resourcetype: key,
        data: sheets[key],
        meta: projectMeta,
        user: userMeta,
      });
    }
  }

  clearList() {
    this.rl.clear();
  }
}
