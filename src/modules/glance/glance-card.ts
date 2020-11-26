import {bindable} from 'aurelia-framework';
import {CategoryData} from 'glancetypes';

export class GlanceCard {
  @bindable title: string;
  @bindable data: CategoryData; 
}
