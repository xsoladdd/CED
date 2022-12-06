import { useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import Card, { CardHeader } from "../../../../../../components/Card";
import TableLoading from "../../../../../../components/Table/Loading";
import Tooltip from "../../../../../../components/Tooltip";
import {
  ActivateSchoolYearDocument,
  GetSchoolYearsDocument,
} from "../../../../../../graphQL/generated/graphql";
import { client } from "../../../../../../graphQL/helper";
import useStore from "../../../../../../store/useStore";
import { joinClass } from "../../../../../../utils/joinClass";
import { generateInput } from "../../../Shared/Components/StudentDetails/Components/helper";
const SchoolYearCard: React.FC = () => {
  const {
    globalVars: { school_year, setSchoolYear },
  } = useStore();
  const [activateSchoolYear] = useMutation(ActivateSchoolYearDocument, {
    onCompleted: (val) => {
      client.cache.reset();
      setSchoolYear(val.activateSchoolYear?.value as string);
    },
    refetchQueries: [GetSchoolYearsDocument],
  });
  const { data, loading } = useQuery(GetSchoolYearsDocument);

  const formik = useFormik({
    initialValues: {
      school_year: "",
    },
    onSubmit: (value) => {
      activateSchoolYear({
        variables: {
          sy: value.school_year,
        },
      });
    },
  });

  const filterCard = (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-5 pb-4">
          {generateInput({
            required: true,
            isHorizontal: true,
            id: `school_year`,
            label: "School Year:",
            onChange: formik.handleChange,
            value: formik.values.school_year,
            error: formik.errors.school_year,
            touched: formik.touched.school_year,
            placeholder: "Format: ####-####",
            className: "w-3/5",
          })}
          <button className=" btn btn-sm btn-info" type="submit">
            Set
          </button>
          <button className=" btn btn-sm btn-ghost" type="reset">
            Reset
          </button>
        </div>
      </form>
    </>
  );

  const activeArea = (
    <div className="flex gap-5 pb-4">
      <p className="text-sm">Active School Year - {school_year}</p>
    </div>
  );

  const tableTemplate = (
    <table className="table table-compact w-1/3 mx-auto table-zebra shadow-lg">
      <thead>
        <tr>
          <th className="w-3/4">SCHOOL YEAR</th>
          <th className="w-1/4">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {loading && <TableLoading>Please select year to continue</TableLoading>}
        {data?.getSchoolYears?.length === 0 && (
          <TableLoading>No data found</TableLoading>
        )}
        {data?.getSchoolYears &&
          data?.getSchoolYears.map((val, idx) => (
            <tr key={idx}>
              <td>{val?.name}</td>
              <td>
                <Tooltip text={!val?.isActive && "Activate School Year"}>
                  <button
                    className={joinClass(
                      "btn btn-xs",
                      val?.isActive ? `btn-ghost` : `btn-success`
                    )}
                    onClick={() => {
                      if (val?.name) {
                        activateSchoolYear({ variables: { sy: val.name } });
                      }
                    }}
                    disabled={val?.isActive}
                  >
                    {val?.isActive ? "Activated" : "Activate"}
                  </button>
                </Tooltip>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
  return (
    <>
      <Card
        className="w-full"
        bordered={false}
        header={<CardHeader title="Manage Schoolyear" />}
      >
        {filterCard}
        {activeArea}
        {tableTemplate}
      </Card>
    </>
  );
};
export default SchoolYearCard;
