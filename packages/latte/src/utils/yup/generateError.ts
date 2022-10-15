export const minError = (min: number): string => {
  return `Must be at least ${min} characters`;
};

export const maxError = (max: number): string => {
  return `Must be at most ${max} characters`;
};
