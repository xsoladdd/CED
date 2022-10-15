import { colorVariant, sizeVariant } from "../../../helper/vars/constants";
import { toBoolean } from "../../../utils/stories/toBoolean";
import { toEnum } from "../../../utils/stories/toEnum";

export const calendarArgsTypes = {
  color: toEnum([...colorVariant, "ghost"]),
  isBordered: toBoolean(),
  size: toEnum(sizeVariant),
};
