import { inject } from 'aurelia-framework';
import { ResourceList } from '../model/resource-list';
import {TResourcable} from 'glancetypes';
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

  clearList() {
    this.rl.clear();
  }
}
