import {TUser} from 'glancetypes';

export class UserService {
  public user: TUser;

  constructor(user: TUser) {
    this.user = user;
  }

  getProjects() {}
  getSettings() {}
}