import {inject} from 'aurelia-framework';
import {ResourceService} from 'common/services/resource-service';
import {TResourcable} from 'glancetypes';

@inject(ResourceService)
export class Settings {

  rs: ResourceService;
  settingsResource: any;
  userResource: any;

  constructor(resourceService: ResourceService) {
    this.rs = resourceService;
  }

  attached() {
    this.settingsResource = this.rs.getResourceItems()[0].meta;
    this.userResource = this.rs.getResourceItems()[0].user;
  }
}
