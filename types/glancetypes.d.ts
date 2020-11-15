declare module 'glancetypes' {
  export type TGlaId = string | number;

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
    glaId?: TGlaId;
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

  export type CategoryData = {
    name: string;
    type: string;
    tax: number;
    year: GlanceYear;
  };

  export type GlanceYear = {
    name: string;
    sum: number;
    quarters: GlanceQuarter[];
  };

  export type GlanceQuarter = {
    name: string;
    sum: number;
    months: GlanceMonth[];
  };

  export type GlanceMonth = {
    name: string;
    sum: number;
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
    meta?: any;
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
    toCategoryDict: () => CategoryData | {};
    categoryData: CategoryData[];
  }
}
