import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
  name: "Laksers Sports",
  metaTitle: "Dashbord - laskers sports",
  pageLoading: true,
  mobile: {
    isMobileDevice: false,
    isMobileDrawer: false,
  },
  isNotDashbord: false,
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    // set initial page loader
    setInitialPageLoading: (state, { payload }) => {
      const newInitialPageLoading = payload; // true|false
      state.pageLoading = newInitialPageLoading;
    },

    // mobile
    // set mobile device
    setIsMobileDevice: (state, { payload }) => {
      const newIsMobileDevice = payload; // true|false
      state.mobile.isMobileDevice = newIsMobileDevice;
    },
    // set mobile drawer
    setMobileDrawer: (state, { payload }) => {
      const newIsMobileDrawer = payload; // true|false
      state.mobile.isMobileDrawer = newIsMobileDrawer;
    },
  },

  // extraReducers: (builder) => {
  // },
});

export const { setInitialPageLoading, setIsMobileDevice, setMobileDrawer } =
  optionsSlice.actions;
// export const {
//   visibleGlobalSearch,
//   hideGlobalSearch,
//   visibleCart,
//   hideCart,
//   setInitialPageLoading,
// } = optionsSlice.actions;

export default optionsSlice.reducer;
