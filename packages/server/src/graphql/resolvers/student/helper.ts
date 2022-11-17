import { GraphQLError } from "graphql";
import { conn } from "../../../config/db";
import { GlobalVars } from "../../../models/GlobalVars";
import { errorType } from "../../../utils/errorType";
import { globalVarsType } from "../../../utils/globalVarsType";
import { Student } from "../../generated";

export const mapStudentStatus = async (
  student: Array<Student>
): Promise<Array<Student>> => {
  const globalVarsRepo = conn.getRepository(GlobalVars);
  const SY = await globalVarsRepo.findOne({
    where: { identifier: globalVarsType.school_year },
  });
  if (!SY) {
    throw new GraphQLError("Cannot fetch school year from global vars", {
      extensions: {
        code: errorType.SERVER_ERROR,
      },
    });
  }

  return student.map((props) => {
    if (props.enrollment_records?.length !== 0) {
      // Check array if there is school year same as Sy now
      const selected = props.enrollment_records?.filter(
        (props) => props?.SY === SY.value
      );
      if (selected?.length === 1) {
        return { ...props, status: "E" };
      } else {
        return { ...props, status: "A" };
      }
    } else return { ...props, status: "NE" };
  });
};
