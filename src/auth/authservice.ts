import {Container, Aurelia} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router} from 'aurelia-router';
import {UserService} from './user-service'
import { TUser } from 'glancetypes';

declare var firebase;

export class Authservice {
  fire: any;
  au: Aurelia;
  us: UserService;

  constructor(aurelia: Aurelia) {
    this.fire = firebase;
    this.au = aurelia;
  }

  addAuthStateChangeListener() {
    this.fire.auth().onAuthStateChanged(user => {
      if (!user) {
        this.goTo('login');
      }
      else {
        this.goTo('dashboard');
      }
    });
  }

  init() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBtr6JWyQMOoCB53aT8SIj8QH60hxgjE4M",
      authDomain: "glance-liquidity.firebaseapp.com",
      databaseURL: "https://glance-liquidity.firebaseio.com",
      projectId: "glance-liquidity",
      storageBucket: "glance-liquidity.appspot.com",
      messagingSenderId: "54961018549",
      appId: "1:54961018549:web:ecacb270a7dfc57ca950fc"
    };
    // Initialize Firebase
    this.fire.initializeApp(firebaseConfig);
    this.addAuthStateChangeListener();
    // this.testdb();
  }

  async login(type) {
    let provider;

    if (type === 'google') {
        provider = new firebase.auth.GoogleAuthProvider();
    } else if (type === 'facebook') {
        provider = new firebase.auth.FacebookAuthProvider();
    } else if (type === 'twitter') {
        provider = new firebase.auth.TwitterAuthProvider();
    }
 
    const loginResult = await this.fire.auth().signInWithPopup(provider);
    const {additionalUserInfo} = loginResult;
    const {isNewUser} = additionalUserInfo;
    
    if (loginResult) this.goTo('dashboard', isNewUser)
    // if (!loginResult) console.warn(`WARNING: ${error.code}`, `REASON: ${error.message}`);
  }

  goTo(route:string, isNewUser?: boolean) {
    const router = Container.instance.get(Router);
    router.navigateToRoute(route);
    if (isNewUser) alert('Welcome New User');
  }

  logout() {
    this.fire.auth().signOut().then(() => {
        console.log('logged out');
    }).catch(error => {
        throw new Error(error);
    });               
  }

  async testdb() {
    const userNode = await this.fire.database().ref();
    userNode.on('value', snap => console.log(snap.val()));
  }
}