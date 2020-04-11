import {PLATFORM} from 'aurelia-pal';

export default [
  {
    name: 'start',
    route: ['', 'start'],
    moduleId: PLATFORM.moduleName('start/start'),
    nav: true,
    title: 'start',
    settings: { iconClass: 'fa-home'}
  },
  {
    name: 'project',
    route: ['project/woodworking'],
    moduleId: PLATFORM.moduleName('project/project'),
    nav: true,
    title: 'Woodworking',
    settings: { iconClass: ''}
  }
];
