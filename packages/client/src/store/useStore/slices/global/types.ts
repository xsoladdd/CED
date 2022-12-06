export interface ISection {
  id: string;
  title: string;
  year_level: string;
  status: boolean;
}

export interface IyearLevel {
  id: string;
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
    setYearLevelSection: (params: Array<IyearLevel>) => void;
    insertNewSection: (params: ISection) => void;
    editNewSection: (params: ISection) => void;
    deleteSection: (params: Array<ISection>, yearLevel: string) => void;
    setSchoolYear: (school_year: string) => void;
    setAuditTrailType: (audit_trail_type: Array<string>) => void;
  };
}
