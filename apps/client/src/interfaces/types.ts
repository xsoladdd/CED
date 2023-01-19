export interface IReturn<T> {
  data?: T;
  status: 1 | 0;
  error_title?: string;
  error_params?: any;
}
export interface IError {
  title: string;
  params?: any;
}
