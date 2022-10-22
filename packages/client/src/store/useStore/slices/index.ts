import { GetState, SetState } from "zustand";
import { fishSlice } from "./fish";
import { routerSlice } from "./router";
import { studentSlice } from "./student";
import { userSlice } from "./user";

export const generateStore = (set: SetState<any>, get: GetState<any>) => ({
  ...fishSlice(set, get),
  ...routerSlice(set, get),
  ...userSlice(set, get),
  ...studentSlice(set, get),
});
