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
    gla_settings?: any[];
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

  export type TResource = {
    glaId?: TGlaId;
    gla_name: string;
    gla_settings: any[];
    user: TUser;
    expenses: {
      type: 'expenses';
      data: any[][];
    }
    revenues: {
      type: 'revenues';
      data: any[][];
    }
  };

  export type THOT = {
    expenses: any[][];
    revenues: any[][];
  };

	export type TPid = string;

  export type TResourceFull = {
    glaId: number;
    data: [
      {
        type: 'expenses';
        name: string;
        tax: number;
        year: GlanceYear;
      },
      {
        type: 'revenues';
        name: string;
        tax: number;
        year: GlanceYear;
      },
    ]
  };

  export type TResourceCategory = {
    catName: string; // Travel Costs
    type: 'expenses' | 'revenues';
    periods: {
      years: [{
        name: string | number;
        sum: number;
      }]; 
      quarters: [{
        name: string;
        sum: number;
      }];
      months: [{
        name: string;
        sum: number;
      }];
    };
  };

  export type TResourcePeriod = {
    glaId: number;
    periods: {
      years: [{
        name: string | number; // 2021, 2022...
        subperiods: [{
          name: string; //Quarter1, Quarter2...
          sum: number;
        }];
      }]; 
      quarters: [{
        name: string; // Quarter1, Quarter2...
        subperiods: [{
          name: string; //January, February...
          sum: number;
        }];
      }];
      months: [{
        name: string; // January
        subperiods: [{
          name: string; //week1, week2...
          sum: number;
        }];
      }];
    }
  }

  export type TResourceLiquidity = {
    glaId: number;
    periods: {
      years: [{
        name: string; // 2021
        expenses: number;
        revenues: number;
        tax: number;
        liquidity: number;
      }];
      quarters: [{
        name: string; // Quarter 1
        expenses: number;
        revenues: number;
        tax: number;
        liquidity: number;
      }];
      months: [{
        name: string; // January
        expenses: number;
        revenues: number;
        tax: number;
        liquidity: number;
      }];
    };
  }

  export interface IGlancable {
    resource: TResource;
    convert: () => TResourceFull[] | TResourceCategory[] | TResourcePeriod | TResourceLiquidity; 
    item: TResourceFull[] | TResourceCategory[] | TResourcePeriod | TResourceLiquidity;
  }
}
