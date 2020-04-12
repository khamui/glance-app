import {PLATFORM} from 'aurelia-pal';

export default [
  { route: '', redirect: 'sheets' },
  {
    name: 'sheets',
    route: ['sheets'],
    moduleId: PLATFORM.moduleName('editor/sheets'),
    nav: true,
    title: 'sheets',
  },
  {
    name: 'glance',
    route: ['glance'],
    moduleId: PLATFORM.moduleName('glance/glance'),
    nav: true,
    title: 'glance',
  },
  {
    name: 'settings',
    route: ['settings'],
    moduleId: PLATFORM.moduleName('start/start'),
    nav: true,
    title: 'settings',
    settings: {
      pullright: true,
    }
  },
];