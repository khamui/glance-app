import {bindable} from 'aurelia-framework';
import {CategoryData} from 'glancetypes';

export class GlanceCard {
  @bindable data: CategoryData; 
  @bindable timeSpan: string;
  @bindable timePeriod: string[];
}
