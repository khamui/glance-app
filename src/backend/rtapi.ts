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

  async update(location: string, newItem: any, identifier: any) {	
		const entries = await this._getEntriesAt(location);
		const originalItemIndex = entries.findIndex(i => identifier && i[identifier]); 
		this._setEntryAt(location, originalItemIndex, newItem);
	}

  delete() {}

	private async _getEntriesAt(location: string) {
		const items = await this.fire.database().ref(location).once('value');
		return items.val();
	}

	private async _setEntryAt(location: string, position: number, newItem: any) {
		const item = await this.fire.database().ref(`${location}/${position}`);
		item.set(newItem);
	}

  async testdb() {
    const userNode = await this.fire.database().ref();
    userNode.on('value', snap => console.log(snap.val()));
  }
}
