export const joinClass = (...classes: Array<string | undefined>) => {
  return classes
    .filter((classFragment) => typeof classFragment !== `undefined`)
    .filter(Boolean)
    .join(` `);
};

// export const joinClass = (...classes: Array<string>) => {
//   return classes.filter(Boolean).join(" ");
// };
