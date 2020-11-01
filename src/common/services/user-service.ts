import {autoinject} from 'aurelia-framework';
import {TUser, TProject} from 'glancetypes';
import {SheetService} from 'common/services/sheet-service';
import {Rtapi} from 'modules/backend/rtapi';

@autoinject()
export class UserService {
  user: TUser = null;
  ss: SheetService;
  rtapi: Rtapi;

  constructor(sheetService: SheetService, rtapi: Rtapi) {
    this.ss = sheetService;
    this.rtapi = rtapi;
	}

	async loadUser(uid: string) {
		this.user = await this.rtapi.read('users', uid);
	}

  async createUser(user: TUser) {
    this.user = user;
		const defaultProject: TProject = {
	    id: this.user.uid,
      glaId: null,// glaId will be generated as unique id
    	gla_name: 'Sample Glance',
    	gla_settings: ["2020-01-01", 1, [0,7,19], 1],
  	};
		defaultProject.glaId = await this.ss.createProject();
    this.user.projects = [defaultProject];
    await this.rtapi.create(`users/${this.user.uid}`, this.user);
  }

  async updateUser(property, payload, push = false) {
    if (push) {
      await this.rtapi.add(`users/${this.user.uid}/${property}`, payload);
    }
    else {
      await this.rtapi.create(`users/${this.user.uid}/${property}`, payload);
    }
  }
}
