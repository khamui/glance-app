import {bindable} from 'aurelia-framework';

export class CardItem {
  @bindable icon: string;  
  @bindable text: string;  
  @bindable amount: number;  
}
