import { textVariant } from "./helper";

export type TtextVariant = typeof textVariant[number];

export interface ITextProps extends React.HTMLProps<HTMLHeadingElement> {
  variant?: TtextVariant;
}
