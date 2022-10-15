export interface INavLink {
  path: string;
  name: string;
}

export interface IHeader {
  links?: Array<INavLink>;
  title: string;
}
