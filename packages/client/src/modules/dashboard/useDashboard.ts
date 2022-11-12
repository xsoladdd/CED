import { useQuery } from "@apollo/client";
import { GetMeDocument } from "../../graphQL/generated/graphql";
import useStore from "../../store/useStore";

const useDashboard = () => {
  const {
    user: { setData },
    // globalVars: { setGlobalVars },
  } = useStore();

  // Fetch for employee Level
  const { loading: employeeDatailsQueryLoading } = useQuery(GetMeDocument, {
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

  // const { loading: getGlobalVarsQueryLoading } = useQuery(
  //   Get_Global_Vars_QueryDocument,
  //   {
  //     onCompleted: (value) => {
  //       console.log(value.get_globa_vars.school_year);
  //       setGlobalVars({
  //         school_year: {
  //           ...value.get_globa_vars.school_year,
  //           id: "",
  //           identifier: "",
  //         },
  //       });
  //     },
  //   }
  // );

  // Fetch for global variables

  return { loading: employeeDatailsQueryLoading };
};

export default useDashboard;
