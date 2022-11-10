import { useQuery } from "@apollo/client";
import {
  Employee_Detail_QueryDocument,
  Get_Global_Vars_QueryDocument,
} from "../../graphQL/generated/graphql";
import useStore from "../../store/useStore";

const useDashboard = () => {
  const {
    user: { setData },
    globalVars: { setGlobalVars },
  } = useStore();

  // Fetch for employee Level
  const { loading: employeeDatailsQueryLoading } = useQuery(
    Employee_Detail_QueryDocument,
    {
      onCompleted: (data) => {
        const { employee_id, id, role, profile } = data.employee_detail;

        setData({
          employee_id,
          id,
          role,
          profile: {
            id: "",
            first_name: profile?.first_name ? profile?.first_name : "",
            middle_name: profile?.middle_name,
            last_name: profile?.last_name ? profile?.last_name : "",
          },
        });
      },
    }
  );

  const { loading: getGlobalVarsQueryLoading } = useQuery(
    Get_Global_Vars_QueryDocument,
    {
      onCompleted: (value) => {
        console.log(value.get_globa_vars.school_year);
        setGlobalVars({
          school_year: {
            ...value.get_globa_vars.school_year,
            id: "",
            identifier: "",
          },
        });
      },
    }
  );

  // Fetch for global variables

  return { loading: employeeDatailsQueryLoading || getGlobalVarsQueryLoading };
};

export default useDashboard;
