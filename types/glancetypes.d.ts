declare module 'glancetypes' {
  export type TRoute = {
    name: string,
    route: string[] | string,
    moduleId: string,
    nav?: boolean,
    title: string,
  };

  export type TRedirect = {
    route: string,
    redirect: string,
  }
  
  export type TProject = {
    id: string;
    uid?: string;
    glaId?: string | number;
    gla_name: string;
    gla_settings?: object | string;
  };

  export type TProjectSheets = {
    expenses: any[],
    revenues: any[],
  }

  export type TUser = {
    uid: string,
    name: string,
    email: string,
    newUser?: boolean,
    projects?: TProject[] | Promise<TProject>[] | Promise<TProject> | TProject | any;
  }
  
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
    glaId?: string | number;
    container?: HTMLElement;
    meta?: object;
    settings?: any;
    user?: object;
  };

  export type THOT = {
    expenses: any[][];
    revenues: any[][];
  };

	export type TPid = string;

  export interface ICalculable {
    resource: IResourcable[];
    convert: () => CalculationData | {};
    calculationData: CalculationData[];
  }
}
