import { IResourcable } from '../model/resource-service';

export class ResourceList {
  private items: IResourcable[];
  
  constructor() {
    this.items = [];
    console.log('new resource list constructed.');
  }

  getItems() {
    return this.items;
  }

  register(resource: IResourcable) {
    if (this.items && this.containedInList(resource)) return;
    this.items.push(resource);
  }

  private containedInList(resource: IResourcable) {
    return this.items.find((item) => {
      if (item.resourcetype === resource.resourcetype) return true;
      return false;
    });
  }
}
