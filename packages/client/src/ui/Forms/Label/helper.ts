import { toBoolean } from "../../../utils/stories/toBoolean";

export const getRequiredClass = (
  required: boolean,
  text: string | undefined
): string | undefined => {
  return required && typeof text !== "undefined"
    ? "before:content-['*'] before:mr-0.5 before:text-red-500"
    : undefined;
};

export const labelArgsTypes = {
  required: toBoolean(),
};
