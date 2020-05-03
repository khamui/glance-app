import {PLATFORM} from 'aurelia-pal';

export default [
  { route: '', redirect: 'start' },
  {
    name: 'start',
    route: ['', 'start'],
    moduleId: PLATFORM.moduleName('start/start'),
    nav: true,
    title: 'start',
    settings: { iconClass: 'fa-home'}
  }
];
