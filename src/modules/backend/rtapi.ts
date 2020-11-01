import {TUser, TProject, THOT, TProjectSheets} from 'glancetypes';
declare var firebase;

export class Rtapi {
  fire: any;

  constructor() {
    this.fire = firebase;
  }

  async create(location: string, item: TUser | TProject | THOT) {
    await this.fire.database().ref(location).set(item);
  }

  async add(location: string, item: TUser | TProject | THOT) {
    await this.fire.database().ref(location).push(item);
  }

  async read(location: string, identifier?: string, callback?: (snap) => any) {
    const reference = `${location}${identifier && '/' + identifier || ''}`
    let result = firebase.database().ref(reference);

    if (callback) {
      return await result.on('value', callback);
    }

    const resolvedResult = await result.once('value');
    return resolvedResult.val();
  }

  async update(location: string, identifier: string, item?: TUser | TProject | THOT) {
    await this.fire.database().ref(`${location}/${identifier}`).set(item);
  }

  async delete(location: string, identifier: string) {
    await this.fire.database().ref(`${location}/${identifier}`).remove();
  }

  async testdb() {
    const userNode = await this.fire.database().ref();
    userNode.on('value', snap => console.log(snap.val()));
  }
}