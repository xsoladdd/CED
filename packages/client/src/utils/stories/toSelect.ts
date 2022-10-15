export const toSelect = <T>(arr: T[]) => ({
  control: {
    type: `select`,
    options: arr,
  },
});
