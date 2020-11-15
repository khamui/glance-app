import {Aurelia} from 'aurelia-framework'
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('common/components/index'))
    .feature(PLATFORM.moduleName('common/styles/modules.scss'))
		.plugin(PLATFORM.moduleName('aurelia-deep-computed'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  await aurelia.start()
  aurelia.setRoot(PLATFORM.moduleName('app'));
}
