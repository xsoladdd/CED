export interface ISection {
  value: string;
  title: string;
}

export interface IyearLevel {
  title: string;
  value: string;
  sections?: Array<ISection>;
}

export interface IglobalSlice {
  globalVars: {
    active_school_year: string;
    year_level: Array<IyearLevel>;
  };
}
