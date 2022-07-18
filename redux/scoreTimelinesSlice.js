import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";
import { syncUsers } from "./usersSlice";
// import axios from "axios";

const initialState = {
  all: {
    loading: false,
    data: [],
  },
  new: {
    loading: false,
    data: {},
  },
  update: {
    loading: false,
    data: {},
  },
};

export const scoreTimelinesSlice = createSlice({
  name: "scoreTimelines",
  initialState,
  reducers: {
    // set initial page loader
    // setInitialPageLoading: (state, { payload }) => {
    //   const newInitialPageLoading = payload; // true|false
    //   state.pageLoading = newInitialPageLoading;
    // },
  },

  extraReducers: (builder) => {
    // Thunk syncUsers
    builder.addCase(syncScoreTimelines.pending, (state) => {
      state.all.loading = true;
    });
    builder.addCase(syncScoreTimelines.fulfilled, (state, { payload }) => {
      const response = payload;
      state.all.loading = false;
      state.all.data = response;
    });
    builder.addCase(syncScoreTimelines.rejected, (state, action) => {
      state.all.loading = false;
      // state.error = action.error.message;
    });

    // Thunk addScoreTimeline
    builder.addCase(addScoreTimeline.pending, (state) => {
      state.new.loading = true;
    });
    builder.addCase(addScoreTimeline.fulfilled, (state, { payload }) => {
      const response = payload;
      state.new.loading = false;
      state.new.data = response;
    });
    builder.addCase(addScoreTimeline.rejected, (state, action) => {
      state.new.loading = false;
      // state.error = action.error.message;
    });
    // Thunk updateScoreTimeline
    builder.addCase(updateScoreTimeline.pending, (state) => {
      state.update.loading = true;
    });
    builder.addCase(updateScoreTimeline.fulfilled, (state, { payload }) => {
      const response = payload;
      state.update.loading = false;
      state.update.data = response;
    });
    builder.addCase(updateScoreTimeline.rejected, (state, action) => {
      state.update.loading = false;
      // state.error = action.error.message;
    });
  },
});

// Async Actions
export const syncScoreTimelines = createAsyncThunk(
  "syncScoreTimelines",
  async (sync = false, thunkAPI) => {
    // if sync (true) previous data thakle previous data nahole new data
    const { all } = thunkAPI.getState().scoreTimelines;

    if (sync && all.data.length) return all.data;

    try {
      const response = await axios.get("/api/score-timelines");
      return response.data.body.scoreTimelines;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addScoreTimeline = createAsyncThunk(
  "addScoreTimeline",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post("/api/score-timelines", { ...body });
      notification["success"]({
        message: "A new score timeline is created!",
        // placement: "top",
      });
      thunkAPI.dispatch(syncUsers());
      return response.data.body.newScoreTimeline;
    } catch (error) {
      let errorMessage = "Something went wrong!";
      errorMessage = errorMessage;
      notification["error"]({
        message: errorMessage,
        // placement: "top",
      });
      return thunkAPI.rejectWithValue({
        error: errorMessage,
      });
    }
  }
);

export const updateScoreTimeline = createAsyncThunk(
  "updateScoreTimeline",
  async ({ scoreTimelineId, body }, thunkAPI) => {
    try {
      const response = await axios.put(
        `/api/score-timelines/${scoreTimelineId}`,
        { ...body }
      );
      notification["success"]({
        message: "Score timeline is updated!",
        // placement: "top",
      });
      thunkAPI.dispatch(syncUsers());
      return response.data.body.updatedScoreTimeline;
    } catch (error) {
      let errorMessage = "Something went wrong!";
      errorMessage = errorMessage;
      notification["error"]({
        message: errorMessage,
        // placement: "top",
      });
      return thunkAPI.rejectWithValue({
        error: errorMessage,
      });
    }
  }
);

// export const { setInitialPageLoading, setIsM nobileDevice, setMobileDrawer } =
//   usersSlice.actions;
// export const {
//   visibleGlobalSearch,
//   hideGlobalSearch,
//   visibleCart,
//   hideCart,
//   setInitialPageLoading,
// } = usersSlice.actions;

export default scoreTimelinesSlice.reducer;
