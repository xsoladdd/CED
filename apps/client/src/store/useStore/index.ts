import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { generateStore } from "./slices";

const useStore = create(devtools(generateStore));

export default useStore;
