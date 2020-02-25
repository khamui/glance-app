import {PLATFORM} from 'aurelia-pal';

export default [
  {
    name: 'start',
    route: ['', 'home'],
    moduleId: PLATFORM.moduleName('home/home'),
    nav: true,
    title: 'start',
    settings: { iconClass: 'fa-home'}
  },
  {
    name: 'settings',
    route: ['settings'],
    moduleId: PLATFORM.moduleName('home/home'),
    nav: true,
    title: 'settings',
    settings: { iconClass: 'fa-home'}
  },
  {
    name: 'sheets',
    route: ['sheets'],
    moduleId: PLATFORM.moduleName('editor/sheets'),
    nav: true,
    title: 'sheets',
    settings: { iconClass: ''}
  },
  {
    name: 'glance',
    route: ['glance'],
    moduleId: PLATFORM.moduleName('glance/glance'),
    nav: true,
    title: 'glance',
    settings: { iconClass: ''}
  }
];
