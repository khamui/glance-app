import { TResourcable } from 'glancetypes';

export class ResourceList {
  private items: TResourcable[];

  constructor() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  register(resource: TResourcable) {
    if (this.items && this.containedInList(resource)) return;
    this.items.push(resource);
  }

  clear() {
    this.items = [];
  }

  private containedInList(resource: TResourcable) {
    return this.items.find((item) => {
      if (item.resourcetype === resource.resourcetype) return true;
      return false;
    });
  }
}
