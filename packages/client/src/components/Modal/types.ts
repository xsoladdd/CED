import { ReactNode } from "react";
import { IcolorVariantTypes, IsizeVariantTypes } from "../../helper/vars/types";

export interface IModalProps {
  status?: boolean;
  handleClose?: () => void;
  title: string;
  footer?: ReactNode;
  size?: Exclude<IsizeVariantTypes, "xs">;
}

export interface ISubmitButtonType {
  handleSubmit?: () => void;
  text?: string;
  className?: string;
  color?: IcolorVariantTypes;
}

export interface IModalHeaderProps {
  title: string;
}

export interface IModalFooterProps {
  quote?: React.ReactNode;
}
