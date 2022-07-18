import { configureStore } from "@reduxjs/toolkit";
import optionsSlice from "./optionsSlice";
import scoreTimelinesSlice from "./scoreTimelinesSlice";
import usersSlice from "./usersSlice";

const store = configureStore({
  reducer: {
    options: optionsSlice,
    users: usersSlice,
    scoreTimelines: scoreTimelinesSlice,
  },
  devTools: true,
});

export default store;
