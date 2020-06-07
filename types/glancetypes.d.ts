declare module 'glancetypes' {
  export type TRoute = {
    name: string,
    route: string[],
    moduleId: string,
    nav?: boolean,
    title: string,
  };
  
  export type TProject = {
    id?: number;
    user: number;
    gla_id?: number;
    gla_name: string;
    gla_settings?: object | string;
  };

  export type TUser = {
    uid: string,
    firstname: string,
    lastname: string,
    email: string,
    projects: TProjectId[];
  }
  
  export type TProjectId = number;
  
  export type CalculationData = {
    catId: number;
    sheetId: number;
    type: string;
    name: string;
    tax: number;
    year: GlanceYear;
  };
  
  export type GlanceYear = {
    name: string;
    yearsum: number;
    quarters: GlanceQuarter[];
  };
  
  export type GlanceQuarter = {
    name: string;
    quartersum: number;
    months: GlanceMonth[];
  };
  
  export type GlanceMonth = {
    name: string;
    monthsum: number;
    weeks: [];
  };

  export type TNotification = {
    dismissed: boolean;
    dismissable: boolean;
    text: string;
  };

  export type TResourcable = {
    resourcetype: string;
    data?: any[][];
    glaId?: number;
    container?: HTMLElement;
    meta?: object;
  };

  export interface ICalculable {
    resource: IResourcable[];
    convert: () => CalculationData | {};
    calculationData: CalculationData[];
  }
}
