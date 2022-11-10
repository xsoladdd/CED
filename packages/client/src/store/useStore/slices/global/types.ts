import { GlobalVarsReturn } from "../../../../graphQL/generated/graphql";

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
    active_school_year: string;
    year_level: Array<IyearLevel>;
    roles: Array<Iroles>;
    audit_trail_type: Array<IauditTrailType>;
    setGlobalVars: (globalVars: GlobalVarsReturn) => void;
  };
}
