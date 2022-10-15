export const isDarkmode = (mode: string | undefined): boolean => {
  if (mode === `dark`) {
    return true;
  }
  return false;
};
