import { ReactNode } from "react";

export interface ITableHeader {
  name: string;
  id: string | number;
  width?: string;
}

export interface ITableDataType<T> {
  col: Array<ITableHeader>;
  data: Array<T>;
}

export interface ITableProps {
  children?: ReactNode;
  columns: Array<ITableHeader>;
  isLoading?: boolean;
  hasFooter?: boolean;
  isZebra?: boolean;
  isCompact?: boolean;
  isEmpty?: boolean;
}
