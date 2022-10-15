import {
  IcolorVariantTypes,
  IsizeVariantTypes,
} from "../../../helper/vars/types";

export interface ITextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  children?: React.ReactChildren;
  color?: IcolorVariantTypes | "ghost";
  size?: IsizeVariantTypes;
  isBordered?: boolean;
  isResizable?: boolean;
}
