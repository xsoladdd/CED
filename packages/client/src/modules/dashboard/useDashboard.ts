import { useQuery } from "@apollo/client";
import {
  GetGlobalVarsDocument,
  GetMeDocument,
} from "../../graphQL/generated/graphql";
import useStore from "../../store/useStore";

const useDashboard = () => {
  const {
    user: { setData },
    globalVars: { setAuditTrailType, setSchoolYear },
  } = useStore();

  // Fetch for employee Level
  const { loading: getMeLoading } = useQuery(GetMeDocument, {
    onCompleted: (data) => {
      if (data.getMe) {
        const { employee_id, id, role, profile } = data.getMe;
        setData({
          employee_id,
          id,
          role,
          profile: {
            first_name: profile?.first_name ? profile?.first_name : "",
            middle_name: profile?.middle_name,
            last_name: profile?.last_name ? profile?.last_name : "",
          },
        });
      }
    },
  });

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

  // Fetch for global variables

  return { loading: getMeLoading || getGlobalVarsLoading };
};

export default useDashboard;
