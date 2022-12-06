import { IglobalSlice, ISection } from "./types";
import produce from "immer";
import { WritableDraft } from "immer/dist/internal";

export const globalSlice: StoreSlice<IglobalSlice> = (set) => ({
  globalVars: {
    school_year: "",
    year_level: [],
    roles: [
      { title: "System Administrator", value: "SA" },
      { title: "Registrar Account", value: "RT" },
      // { title: "BA", value: "Backdoor Account" },
    ],
    audit_trail_type: [],

    setYearLevelSection: (params) =>
      set(({ globalVars }: IglobalSlice): IglobalSlice => {
        return {
          globalVars: {
            ...globalVars,
            year_level: [...params],
          },
        };
      }),
    editNewSection: (params) =>
      set(({ globalVars }: IglobalSlice): IglobalSlice => {
        const selectedYearLevel = globalVars.year_level.findIndex(
          (val) => val.value === params.year_level
        );

        const selectedSection = globalVars.year_level[
          selectedYearLevel
        ].sections?.findIndex((val) => val.id === params.id);
        if (!selectedSection) {
          return {
            globalVars: {
              ...globalVars,
            },
          };
        }
        const year_levels = produce(globalVars.year_level, (draft) => {
          (
            (
              draft[selectedYearLevel]
                .sections as unknown as WritableDraft<ISection>[]
            )[selectedSection] as unknown as ISection
          ).title = params.title;
        });
        // console.log(`should be new value`, year_levels);
        return {
          globalVars: {
            ...globalVars,
            year_level: [...year_levels],
          },
        };
      }),
    insertNewSection: (params) =>
      set(({ globalVars }: IglobalSlice): IglobalSlice => {
        const selectedYearLevel = globalVars.year_level.findIndex(
          (val) => val.value === params.year_level
        );
        const year_levels = produce(globalVars.year_level, (draft) => {
          draft[selectedYearLevel].sections?.push({
            id: params.id,
            title: params.title,
            year_level: params.year_level,
            status: params.status,
          });
        });
        // console.log(`should be new value`, year_levels);
        return {
          globalVars: {
            ...globalVars,
            year_level: [...year_levels],
          },
        };
      }),
    deleteSection: (newSectionArray: Array<ISection>, yearLevel) =>
      set(({ globalVars }: IglobalSlice): IglobalSlice => {
        // Get index of year level
        const selectedYearLevel = globalVars.year_level.findIndex(
          (val) => val.value === yearLevel
        );

        const year_levels = produce(globalVars.year_level, (draft) => {
          draft[selectedYearLevel].sections = newSectionArray;
        });

        return {
          globalVars: {
            ...globalVars,
            year_level: [...year_levels],
          },
        };
      }),
    setSchoolYear: (school_year) =>
      set(({ globalVars }: IglobalSlice): IglobalSlice => {
        return {
          globalVars: {
            ...globalVars,
            school_year,
          },
        };
      }),
    setAuditTrailType: (audit_trail_type_array) =>
      set(({ globalVars }: IglobalSlice): IglobalSlice => {
        return {
          globalVars: {
            ...globalVars,
            audit_trail_type: audit_trail_type_array,
          },
        };
      }),
  },
});
