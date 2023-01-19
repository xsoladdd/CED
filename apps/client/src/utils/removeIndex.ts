export const removeIndex = (arr: Array<any>, index: number): Array<any> => {
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};
