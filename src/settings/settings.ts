import { inject, computedFrom, NewInstance } from 'aurelia-framework';
import { Project } from '../project/project';

@inject(Project)
export class Settings {
  dateVal: string;
  taxVals: number[];
  timeVals: number[];
  projectName: string;

  project: Project;
  projectSettings: any[];

  constructor(project: Project) {
    this.project = project;
    
  }

  attached() {
    this.projectName = this.project.item['gla_name'];
    console.log(this.project);
    this.projectSettings = JSON.parse(this.project.item['gla_settings'].toString());
    this.dateVal = this.projectSettings[0];
    this.timeVals = this.projectSettings[1];
    this.taxVals = this.projectSettings[2];
  }
}