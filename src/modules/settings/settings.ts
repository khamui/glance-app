import {inject} from 'aurelia-framework';
import {ResourceService} from 'common/services/resource-service';
import {TResource} from 'glancetypes';

@inject(ResourceService)
export class Settings {

  rs: ResourceService;
  settingsResource: any;
  userResource: any;

  constructor(resourceService: ResourceService) {
    this.rs = resourceService;
  }

  attached() {
    this.settingsResource = this.rs.getResourceItem()['gla_settings'];
    this.userResource = this.rs.getResourceItem()['user'];
  }
}
