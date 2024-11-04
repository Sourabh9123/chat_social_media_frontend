import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  is_error: null,
  data: [],
  otherProfile: [],
  otherFollowers: [],
  otherFollowings: [],
};

// get other user's followers

export const getOtherFollowings = createAsyncThunk(
  "getOtherFollowings",
  async (user_id, { getState, rejectWithValue }) => {
    console.log("inside profile slice  ", user_id);
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://127.0.0.1:8000/api/profile/other/user/followings/${user_id}/`;
    // other/user/followers/<uuid:user_id>
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(url, { headers }); // Use axios.post instead of axios.Post
      // return { data: response.data, statusCode: response.status };
      console.log(
        "inside profile slice,--------------------------------------"
      );
      console.log(response.data.followings);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data); // Use rejectWithValue to return errors
    }
  }
);

export const getOthersFollowers = createAsyncThunk(
  "getOthersFollowers",
  async (user_id, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://127.0.0.1:8000/api/profile/other/user/followers/${user_id}/`;
    // other/user/followers/<uuid:user_id>
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(url, { headers }); // Use axios.post instead of axios.Post
      // return { data: response.data, statusCode: response.status };
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data); // Use rejectWithValue to return errors
    }
  }
);

// this is for other user's user profile
export const getOthersProfile = createAsyncThunk(
  "getOthersProfile",
  async (user_id, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://127.0.0.1:8000/api/profile/other/${user_id}/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(url, { headers }); // Use axios.post instead of axios.Post
      // return { data: response.data, statusCode: response.status };
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data); // Use rejectWithValue to return errors
    }
  }
);

// this is current user's profile login user
export const getProfile = createAsyncThunk(
  "getProfile",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://127.0.0.1:8000/api/profile/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(url, { headers }); // Use axios.post instead of axios.Post
      // return { data: response.data, statusCode: response.status };
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data); // Use rejectWithValue to return errors
    }
  }
);

const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload.data;
      console.log(state.data, "from post init");
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      (state.is_error = true), (state.error_message = action.error);
      state.status = "error";
    });
    builder.addCase(getOthersProfile.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(getOthersProfile.fulfilled, (state, action) => {
      state.status = "success";
      state.otherProfile = action.payload.data;
      console.log(state.otherProfile, "from post init");
    });
    builder.addCase(getOthersProfile.rejected, (state, action) => {
      (state.is_error = true), (state.error_message = action.error);
      state.status = "error";
    });
    builder.addCase(getOthersFollowers.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(getOthersFollowers.fulfilled, (state, action) => {
      state.status = "success";
      state.otherFollowers = action.payload.followers;
    });
    builder.addCase(getOthersFollowers.rejected, (state, action) => {
      (state.is_error = true), (state.error_message = action.error);
      state.status = "error";
    });
    builder.addCase(getOtherFollowings.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(getOtherFollowings.fulfilled, (state, action) => {
      state.status = "success";
      state.otherFollowings = action.payload.followings;
    });
    builder.addCase(getOtherFollowings.rejected, (state, action) => {
      (state.is_error = true), (state.error_message = action.error);
      state.status = "error";
    });
  },
});

export default ProfileSlice.reducer;
