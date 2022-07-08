import { configureStore } from "@reduxjs/toolkit";
import optionsSlice from "./optionsSlice";

const store = configureStore({
  reducer: {
    options: optionsSlice,
  },
  devTools: true,
});

export default store;
