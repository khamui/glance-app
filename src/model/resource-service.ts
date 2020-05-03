import { inject } from 'aurelia-framework';
import { ResourceList } from '../model/resource-list';

export type IResourcable = {
  resourcetype: string;
  data?: any[][];
  glaId?: number;
  container?: HTMLElement;
  meta?: object;
};

@inject(ResourceList)
export class ResourceService {
  private rl : ResourceList;

  constructor(resourceList: ResourceList) {
    this.rl = resourceList;
  }

  getResourceItems() {
    return this.rl.getItems();
  }

  registerInList(resource: IResourcable) {
    this.rl.register(resource);
  }

  clearList() {
    this.rl.clear();
  }
}
