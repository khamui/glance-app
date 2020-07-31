import {Container, Aurelia, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UserService} from './user-service'
import {TUser} from 'glancetypes';
import {PARAMETERS} from '../PARAMETERS';

declare var firebase;

@inject(Aurelia, UserService)
export class Authservice {
  fire;
  au: Aurelia;
  us: UserService;

  constructor(aurelia: Aurelia, userService: UserService) {
    this.fire = firebase;
    this.au = aurelia;
    this.us = userService;
		this.init();
  }
	
  init() {
    const firebaseConfig = PARAMETERS;
    this.fire.initializeApp(firebaseConfig);
		this.addAuthStateChangeListener();
  }

  addAuthStateChangeListener() {
    this.fire.auth().onAuthStateChanged( async (user) => {
      if (user && this.us.user) {
        // CASE 1 CREATE USER
        // CASE 2 LOAD USER
        // !user && !this.user - not loggedin and not existing - log in and create user
        // !user && this.user - not loggedin but existing - login and load user
        // user && this.user - loggedin and existing - dashboard
        // user && !this.user- loggedin but not existing - login and create user
        this.goTo('dashboard');
        console.log('LISTENER: goto dashboard');
      }
      else {
        this.goTo('login');
        console.log('LISTENER: stay login');
      }
    });
  }
 
  async login(type: string) {
    let provider;

    if (type === 'google') {
        provider = new firebase.auth.GoogleAuthProvider();
    } else if (type === 'facebook') {
        provider = new firebase.auth.FacebookAuthProvider();
    } else if (type === 'twitter') {
        provider = new firebase.auth.TwitterAuthProvider();
    }
 
    const loginResult = await this.fire.auth().signInWithPopup(provider);
    
    if (loginResult) {
    	const {additionalUserInfo} = loginResult;
      const {isNewUser} = additionalUserInfo;
      
      if (isNewUser) {
        await this.us.createUser(
          {
            uid: loginResult.user.uid,
            name: loginResult.user.displayName,
            email: loginResult.user.email,
            newUser: isNewUser,
          });
        this.goTo('dashboard');
      }
      else {
        await this.us.loadUser(loginResult.user.uid);
        this.goTo('dashboard');
      }
    };
  }

  goTo(route:string) {
    const router = Container.instance.get(Router);
    router.navigateToRoute(route);
  }

  logout() {
    this.fire.auth().signOut().then(() => {
        console.log('logged out');
    }).catch(error  => {
        throw new Error(error);
    });               
  }
}
