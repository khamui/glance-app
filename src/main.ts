import {Aurelia} from 'aurelia-framework'
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import {Authservice} from './auth/authservice';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .feature(PLATFORM.moduleName('styles/mystyles.scss'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  await aurelia.start()

  const authservice = new Authservice(aurelia);
  authservice.init();

  aurelia.setRoot(PLATFORM.moduleName('app'));
}
