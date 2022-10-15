export const convertEpochToTimestamp = (date: number) => {
  return new Date(date * 1000);
};
