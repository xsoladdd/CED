import { Mutable } from "./types";

export const mainColorVariantRO = ["primary", "secondary", "accent"] as const;
export const flatColorVariantRO = [
  "warning",
  "error",
  "success",
  "info",
] as const;

export const flatColorVariantROXD = ["warning", "error", "success", "info"];
export const colorVariantRO = [
  ...mainColorVariantRO,
  ...flatColorVariantRO,
] as const;
export const mainColorVariant = mainColorVariantRO as Mutable<
  typeof mainColorVariantRO
>;
export const flatColorVariant = flatColorVariantRO as Mutable<
  typeof flatColorVariantRO
>;
export const colorVariant = colorVariantRO as Mutable<typeof colorVariantRO>;

export const sizeVariantRO = [`xs`, `sm`, `md`, `lg`] as const;
export const sizeVariant = sizeVariantRO as Mutable<typeof sizeVariantRO>;
