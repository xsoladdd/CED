interface IFishSlice {
  fish: {
    fishes: number;
    eatFish: () => void;
  };
}

export const fishSlice: StoreSlice<IFishSlice> = (set) => ({
  fish: {
    fishes: 10,
    eatFish: () =>
      set(
        ({ fish }: IFishSlice): IFishSlice => ({
          fish: {
            ...fish,
            fishes: fish.fishes > 1 ? fish.fishes - 1 : 0,
          },
        })
      ),
  },
});
