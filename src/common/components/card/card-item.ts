import {bindable} from 'aurelia-framework';
import numeral from 'numeral';

export class CardItem {
  @bindable icon: string;  
  @bindable text: string;  
  @bindable sum: number;  

  attached() {
    console.log(this.sum);
  }
}

export class CurrencyValueConverter {
  toView(value: number) {
   return `${numeral(value).format('0,0.00')} €`;
  }
}
