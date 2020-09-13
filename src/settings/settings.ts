import {inject} from 'aurelia-framework';
import {ResourceService} from '../model/resource-service';
import {TResourcable} from 'glancetypes';
import {Rtapi} from '../backend/rtapi';

@inject(ResourceService, Rtapi)
export class Settings {

  rs: ResourceService;
  settingsResource: any;
  userResource: any;
	rtapi: Rtapi;

  constructor(resourceService: ResourceService, rtapi: Rtapi) {
    this.rs = resourceService;
    this.rtapi = rtapi;
  }

  attached() {
    this.settingsResource = this.rs.getResourceItems()[0].meta;
    this.userResource = this.rs.getResourceItems()[0].user;
  }

	saveSettings() {
		const {uid} = this.userResource;
		const {glaId} = this.settingsResource;
		this.rtapi.update(`users/${uid}/projects`, this.settingsResource, 'glaId');
	}
}
