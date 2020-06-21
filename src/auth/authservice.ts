import {Container, Aurelia, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UserService} from './user-service'
import {TUser} from 'glancetypes';

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
		this.addAuthStateChangeListener();;
    // this.testdb();
  }

  addAuthStateChangeListener() {
    this.fire.auth().onAuthStateChanged(user => {
      if (!user) {
				console.log('listener: No user logged in');
        this.goTo('login');
      }
			else {
				console.log('listener: User logged in');
				this.goTo('dashboard');
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
      const signedInUser = {
          uid: loginResult.user.uid,
          name: loginResult.user.displayName,
          email: loginResult.user.email,
          newUser: isNewUser,
        };
      this.handleLoggedInUser(signedInUser)
    };
  }

  async handleLoggedInUser(signedInUser: TUser) {
    if (signedInUser.newUser) {
			console.log('handle: create user');
      await this.us.createUser(signedInUser)
      //this.goTo('dashboard');
    }
    else {
			console.log('handle: load projects');
      await this.us.loadUser(signedInUser.uid)
      //this.goTo('dashboard');
    }
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
