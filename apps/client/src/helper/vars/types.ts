import {
  colorVariant,
  flatColorVariant,
  mainColorVariant,
  sizeVariantRO,
} from "./constants";

export type ImainColorVariant = typeof mainColorVariant[number];
export type IflatColorVariant = typeof flatColorVariant[number];
export type IcolorVariantTypes = typeof colorVariant[number];

export type IsizeVariantTypes = typeof sizeVariantRO[number];

export type Mutable<T> = {
  -readonly [k in keyof T]: T[k];
};
