import {TUser, TProject, THOT} from 'glancetypes';
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

  update() {}
  delete() {}


  async testdb() {
    const userNode = await this.fire.database().ref();
    userNode.on('value', snap => console.log(snap.val()));
  }
}