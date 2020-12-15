import {autoinject, computedFrom } from 'aurelia-framework';
import {Resource} from 'common/resources/resource';
import {ResourceService} from 'common/services/resource-service';

@autoinject()
export class Glance {
  resource: Resource;
  rs: ResourceService;

  constructor(resource: Resource, resourceService: ResourceService){
    this.resource = resource;
    this.rs = resourceService;
  }

  attached() {
    console.log(this.resource);
    this.rs.getByCategory();
  }
//  viewRef: HTMLSelectElement;
//  data: any;
//
//  constructor(calculationService: CalculationService) {
//    this.cs = calculationService;
//  }
//
//  async attached() {
//    this.cs.init();
//    this.showView();
//  }
//
//  async showView() {
//    this.data = await this.cs.getGlance(this.viewRef.value, '2020');
//    // GLANCE SHOULD SHOW
//    //  - REV CATEGORIES + VALUES
//    //    REV TAXES
//    //  - EXP CATEGORIES + VALUES
//    //  - EXP TAXES
//    //  - LIQUIDITY
//  }
//
  // HERE THE USER INPUT TAKES PLACE, SELECTING WHICH VIEW (Yearly, Quarterly, Monthly, Weekly) AND WHICH CALCULATIONS IS TRIGGERED.
  // THIS SHOULD TRIGGER THE VISUALIZER, WHICH WILL THEN TRIGGER THE RIGHT CALCULATION AND RECEIVE THE RIGHT OBJECT.
}
