import { IyearLevel } from "../../../../store/useStore/slices/global/types";

export const generateSectionYear = (
  yearCode: string,
  sectionCode: string,
  yearLevelArray: Array<IyearLevel>
): { year: string; section: string } => {
  const getYearLevelArr = yearLevelArray.filter(
    ({ value }) => value.toLocaleLowerCase() === yearCode.toLocaleLowerCase()
  );
  if (getYearLevelArr.length === 0) {
    return { section: "", year: "" };
  }
  const yearLevel = getYearLevelArr[0];
  const getSectionArr = yearLevel.sections?.filter(
    ({ id }) => id === sectionCode
  );
  if (!getSectionArr || getSectionArr?.length === 0) {
    return { year: yearLevel.title, section: "" };
  }
  return { year: yearLevel.title, section: getSectionArr[0].title };
};
