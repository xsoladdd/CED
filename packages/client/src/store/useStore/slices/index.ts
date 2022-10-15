import { GetState, SetState } from "zustand";
import { fishSlice } from "./fish";
import { routerSlice } from "./router";
import { userSlice } from "./user";

export const generateStore = (set: SetState<any>, get: GetState<any>) => ({
  ...fishSlice(set, get),
  ...routerSlice(set, get),
  ...userSlice(set, get),
});
