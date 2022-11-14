export interface ISection {
  value: string;
  title: string;
}

export interface IyearLevel {
  title: string;
  value: string;
  sections?: Array<ISection>;
}

export interface Iroles {
  title: string;
  value: string;
}
export interface IauditTrailType {
  title: string;
  value: string;
}

export interface IglobalSlice {
  globalVars: {
    school_year: string;
    year_level: Array<IyearLevel>;
    roles: Array<Iroles>;
    audit_trail_type: Array<string>;
    setSchoolYear: (school_year: string) => void;
    setAuditTrailType: (audit_trail_type: Array<string>) => void;
  };
}
