export interface IModalProps {
  status?: boolean;
  handleClose?: () => void;
  handleProceed?: () => void;
  color?: "red" | "blue" | "green";
}
