import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  is_error: null,
  followers: [],
  following: [],
};

export const getFollowers = createAsyncThunk(
  "getFollowers",
  async (user_id, { getState, rejectWithValue }) => {
    console.log(user_id);
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://127.0.0.1:8000/api/profile/follow/${user_id}/?type=followers`;
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

export const getFollowing = createAsyncThunk(
  "getFollowing",
  async (user_id, { getState, rejectWithValue }) => {
    console.log(user_id);
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://127.0.0.1:8000/api/profile/follow/${user_id}/?type=following`;
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

// example data { user_id : "uuid"}
const followUser = createAsyncThunk(
  "followUser",
  async (data, { getState }) => {
    console.log(data);
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://127.0.0.1:8000/api/profile/follow/${user_id}/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(url, data, { headers });
    } catch (error) {
      console.log(error);
    }
  }
);

const followSlice = createSlice({
  name: "followSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFollowers.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(getFollowers.fulfilled, (state, action) => {
      state.status = "success";
      state.followers = action.payload;
    });
    builder.addCase(getFollowers.rejected, (state, action) => {
      state.status = "error";
      state.is_error = true;
    });
    builder.addCase(getFollowing.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(getFollowing.fulfilled, (state, action) => {
      state.status = "success";
      state.following = action.payload;
    });
    builder.addCase(getFollowing.rejected, (state, action) => {
      state.status = "error";
      state.is_error = true;
    });
  },
});

export default followSlice.reducer;
