import {Container} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router} from 'aurelia-router';

declare var firebase;

export class Authservice {
  fire: any;
  authToken: any;
  user: any;

  constructor() {
    this.fire = firebase;
  }

  addAuthStateChangeListener(aurelia) {
    this.fire.auth().onAuthStateChanged(user => {
      const router = Container.instance.get(Router);
      if (user) {
        router.navigate('/', { replace: true, trigger: false });
        aurelia.setRoot(PLATFORM.moduleName('dashboard/dashboard'));
      }
      else {
        router.navigate('/', { replace: true, trigger: false });
        aurelia.setRoot(PLATFORM.moduleName('app'));
      }
    });
  }

  login(type) {
    let provider;

    if (type === 'google') {
        provider = new firebase.auth.GoogleAuthProvider();
    } else if (type === 'facebook') {
        provider = new firebase.auth.FacebookAuthProvider();
    } else if (type === 'twitter') {
        provider = new firebase.auth.TwitterAuthProvider();
    }
 
    this.fire.auth().signInWithPopup(provider).then((result: any) => {
        this.authToken = result.credential.accessToken;
        this.user = result.user;
    }).catch(error => {
        console.error('Login cancelled!', error);
    });
}

  logout() {
    this.fire.auth().signOut().then(() => {
        console.log('logged out');
    }).catch(error => {
        throw new Error(error);
    });
  }
}