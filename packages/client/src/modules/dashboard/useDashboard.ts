import { useQuery } from "@apollo/client";
import {
  GetGlobalVarsDocument,
  GetMeDocument,
  GetYearLevelSectionsDocument,
} from "../../graphQL/generated/graphql";
import useStore from "../../store/useStore";
import { IyearLevel } from "../../store/useStore/slices/global/types";

const useDashboard = () => {
  const {
    user: { setData },
    globalVars: { setAuditTrailType, setSchoolYear, setYearLevelSection },
  } = useStore();

  // Fetch for employee Level
  const { loading: getMeLoading } = useQuery(GetMeDocument, {
    onCompleted: (data) => {
      if (data.getMe) {
        const { employee_id, id, role, profile, partial_password } = data.getMe;
        setData({
          employee_id,
          id,
          role,
          partial_password,
          profile: {
            first_name: profile?.first_name ? profile?.first_name : "",
            middle_name: profile?.middle_name,
            last_name: profile?.last_name ? profile?.last_name : "",
          },
        });
      }
    },
  });
  // Fetch School_year
  const { loading: getGlobalVarsLoading } = useQuery(GetGlobalVarsDocument, {
    onCompleted: (values) => {
      if (values.getGlobalVars) {
        const { audit_trail_types, school_year } = values.getGlobalVars;
        // console.log(audit_trail_types);
        setAuditTrailType(audit_trail_types as string[]);
        setSchoolYear(school_year);
      }
    },
  });

  // Fetch getYearLevelSections
  const { loading: getYearLevelSectionsLoading } = useQuery(
    GetYearLevelSectionsDocument,
    {
      onCompleted: (values) => {
        if (
          values.getYearLevelSections &&
          values.getYearLevelSections.length !== 0
        ) {
          const mappedArray: Array<IyearLevel> =
            values.getYearLevelSections.map((vars) => ({
              id: vars?.id ? vars?.id : "",
              title: vars?.name ? vars?.name : "",
              value: vars?.value ? vars?.value : "",
              sections: vars?.sections
                ? vars?.sections.map((sectionVars) => ({
                    title: sectionVars?.name ? sectionVars?.name : "",
                    id: sectionVars?.id ? sectionVars?.id : "",
                    year_level: vars?.value,
                    status: true,
                  }))
                : [],
            }));
          setYearLevelSection(mappedArray);
        }
      },
    }
  );

  return {
    loading:
      getMeLoading || getGlobalVarsLoading || getYearLevelSectionsLoading,
  };
};

export default useDashboard;
