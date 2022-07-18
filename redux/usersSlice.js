import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";
// import axios from "axios";

const initialState = {
  allUsers: {
    loading: false,
    users: [],
  },
  newAddedUser: {
    loading: false,
    user: {},
  },
  currentUser: {
    loading: false,
    user: null,
    singleScoreTimeline: null,
  },
  deleteUser: {
    loading: false,
    modalVisible: false,
    userId: "",
  },
  updateUser: {
    loading: false,
    user: null,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // set initial page loader
    // currentUserScoreTimeline: (state, { payload }) => {
    //   const currentState = current(state);
    //   const dateString = payload;
    //   if (!dateString) {
    //     state.currentUser.singleScoreTimeline = null;
    //   } else {
    //     const foundDate = currentState.currentUser.user.scoreTimelines.find(
    //       (scoreTimeline) =>
    //         new Date(scoreTimeline.date).toLocaleDateString() === dateString
    //     );
    //     state.currentUser.singleScoreTimeline = foundDate ? foundDate : null;
    //   }
    //   // state.pageLoading = newInitialPageLoading;
    // },
    // userDelete
    //show modal
    showUserDeleteModal: (state, { payload }) => {
      const userId = payload;

      state.deleteUser.userId = userId;
      state.deleteUser.modalVisible = true;
    },
    // delete modal
    handleUserDeleteCancel: (state) => {
      state.deleteUser.userId = "";
      state.deleteUser.modalVisible = false;
    },
  },

  extraReducers: (builder) => {
    // Thunk syncUsers
    builder.addCase(syncUsers.pending, (state) => {
      state.allUsers.loading = true;
    });
    builder.addCase(syncUsers.fulfilled, (state, { payload }) => {
      const response = payload;
      state.allUsers.loading = false;
      state.allUsers.users = response;
    });
    builder.addCase(syncUsers.rejected, (state, action) => {
      state.allUsers.loading = false;
      // state.error = action.error.message;
    });

    // Thunk addUsers
    builder.addCase(addUsers.pending, (state) => {
      state.newAddedUser.loading = true;
    });
    builder.addCase(addUsers.fulfilled, (state, { payload }) => {
      const response = payload;
      state.newAddedUser.loading = false;
      state.newAddedUser.user = response;
    });
    builder.addCase(addUsers.rejected, (state, action) => {
      state.newAddedUser.loading = false;
      // state.error = action.error.message;
      console.log(action.error.message);
    });

    // Thunk updateUser
    builder.addCase(updateUser.pending, (state) => {
      state.updateUser.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      const response = payload;
      state.updateUser.loading = false;
      state.updateUser.user = response;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.updateUser.loading = false;
      // state.error = action.error.message;
      console.log(action.error.message);
    });

    // Thunk syncUser
    builder.addCase(syncUser.pending, (state) => {
      state.currentUser.loading = true;
    });
    builder.addCase(syncUser.fulfilled, (state, { payload }) => {
      const response = payload;
      state.currentUser.loading = false;
      state.currentUser.user = response;
    });
    builder.addCase(syncUser.rejected, (state, action) => {
      state.currentUser.loading = false;
      state.currentUser.user = null;
      // state.error = action.error.message;
      console.log(action.error.message);
    });

    // Thunk currentUserScoreTimeline
    builder.addCase(
      currentUserScoreTimeline.fulfilled,
      (state, { payload }) => {
        const response = payload;
        state.currentUser.singleScoreTimeline = response;
      }
    );

    // Thunk asyncDeleteUser
    builder.addCase(asyncDeleteUser.pending, (state) => {
      state.deleteUser.loading = true;
    });
    builder.addCase(asyncDeleteUser.fulfilled, (state, { payload }) => {
      const response = payload;
      const currentUserId = current(state).currentUser.user
        ? current(state).currentUser.user._id
        : "";
      const deletedUserId = current(state).deleteUser.userId;

      if (currentUserId === deletedUserId) {
        state.currentUser.loading = false;
        state.currentUser.user = null;
        state.currentUser.singleScoreTimeline = null;
      }
      state.deleteUser.loading = false;
      state.deleteUser.userId = "";
      state.deleteUser.modalVisible = false;
    });
    builder.addCase(asyncDeleteUser.rejected, (state, action) => {
      state.deleteUser.loading = false;
      state.deleteUser.modalVisible = false;
      console.log(action.error.message);
    });
  },
});

// Async Actions
export const syncUsers = createAsyncThunk(
  "syncUsers",
  async (sync = false, thunkAPI) => {
    const { allUsers } = thunkAPI.getState().users;

    if (sync && allUsers.users.length) return allUsers.users;

    try {
      const response = await axios.get("/api/users");
      return response.data.body.users;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const syncUser = createAsyncThunk(
  "syncUser",
  async (userIdOrSlug, thunkAPI) => {
    try {
      const response = await axios.get(`/api/users/${userIdOrSlug}`);
      return response.data.body.user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addUsers = createAsyncThunk("addUsers", async (body, thunkAPI) => {
  try {
    const response = await axios.post("/api/users", { ...body });
    notification["success"]({
      message: "A new user created!",
      // placement: "top",
    });
    thunkAPI.dispatch(syncUsers());
    return response.data.body.newUser;
  } catch (error) {
    console.log(error.response.data.split(" "));

    let errorMessage = "";

    if (error.response.data) {
      const errArr = error.response.data.split(" ");
      if (errArr[0] === "E11000") {
        errorMessage = "A user is already created with this email address";
      }
    } else {
      errorMessage = "something went wrong!";
    }

    errorMessage = errorMessage;
    notification["error"]({
      message: errorMessage,
      // placement: "top",
    });
    return thunkAPI.rejectWithValue({
      error: errorMessage,
    });
  }
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ userId, body }, thunkAPI) => {
    const { images, ...restOfBody } = body;

    try {
      // first upload
      const imageFormData = new FormData();
      // let uploadImage = false;

      // console.log(images);
      // if (!images.avatar[0].uid || images.avatar[0].uid !== "-1") {
      imageFormData.append("avatar", images.avatar[0].originFileObj);
      // uploadImage = true;
      // console.log("run");
      // }
      // if (!images.cover[0].uid || images.cover[0].uid !== "-2") {
      imageFormData.append("cover", images.cover[0].originFileObj);
      // uploadImage = true;
      // console.log("run");
      // }

      // if (uploadImage) {
      const imageResponse = await axios.put(
        `/api/users/upload-profile-images`,
        imageFormData,
        {
          headers: { "Content-type": "multipart/form-data; boundary=XXX" },
        }
      );

      console.log(imageResponse);
      // }

      const response = await axios.put(`/api/users/${userId}`, restOfBody);
      notification["success"]({
        message: "Updated successful!",
        // placement: "top",
      });
      thunkAPI.dispatch(syncUser(userId));
      return response.data.body.updatedUser;
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

export const currentUserScoreTimeline = createAsyncThunk(
  "currentUserScoreTimeline",
  async (dateString, thunkAPI) => {
    const currentState = thunkAPI.getState();
    // const dateString = payload;
    if (!dateString) {
      return null;
    } else {
      const user = currentState.users.currentUser.user;
      thunkAPI.dispatch(syncUser(user._id));
      const foundDate = user.scoreTimelines.find(
        (scoreTimeline) =>
          new Date(scoreTimeline.date).toLocaleDateString() === dateString
      );

      return foundDate;
    }

    // state.pageLoading = newInitialPageLoading;
  }
);

export const asyncDeleteUser = createAsyncThunk(
  "deleteUser",
  async (_, thunkAPI) => {
    const { userId } = thunkAPI.getState().users.deleteUser;
    // console.log(userId);
    try {
      const response = await axios.delete(`/api/users/${userId}`);
      notification["success"]({
        message: "User deleted!",
      });
      thunkAPI.dispatch(syncUsers()); // need to update here
      return response.data.body.deletedUser;
    } catch (error) {
      notification["error"]({
        message: errorMessage,
      });
      return thunkAPI.rejectWithValue({
        error: errorMessage,
      });
    }
  }
);

export const { showUserDeleteModal, handleUserDeleteCancel } =
  usersSlice.actions;
// export const {
//   visibleGlobalSearch,
//   hideGlobalSearch,
//   visibleCart,
//   hideCart,
//   setInitialPageLoading,
// } = usersSlice.actions;

export default usersSlice.reducer;
