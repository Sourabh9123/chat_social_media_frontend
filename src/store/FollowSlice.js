import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  is_error: null,
  followers: [],
  followers_counts: null,
  following: [],
  following_counts: null,
  response: [],
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
      console.log(response.data, "----------------- followers");
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
export const followUser = createAsyncThunk(
  "followUser",
  async (user_id, { getState }) => {
    console.log(user_id);
    const data = { user_id: user_id };
    const state = getState();
    const token = state.auth.access_token;
    const my_user_id = state.auth.user_id;
    const url = `http://127.0.0.1:8000/api/profile/follow/${my_user_id}/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : "Network error"
      );
    }
  }
);

//  removefollower mine

export const removefollower = createAsyncThunk(
  "removefollower",
  async (user_id, { getState, rejectWithValue }) => {
    console.log(user_id);

    const state = getState();
    const token = state.auth.access_token;
    const url = `http://127.0.0.1:8000/api/profile/remove/follower/${user_id}/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.delete(url, { headers });

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : "Network error"
      );
    }
  }
);
export const unFollow = createAsyncThunk(
  "unFollow",
  async (user_id, { getState, rejectWithValue }) => {
    console.log(user_id, "follow slice");

    const state = getState();
    const token = state.auth.access_token;
    const url = `http://127.0.0.1:8000/api/profile/unfollow/${user_id}/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : "Network error"
      );
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
      state.followers_counts = action.payload.length || 0;
      console.log("count followers ", state.followers_counts);
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
      state.following_counts = action.payload.length || 0;
      console.log("count followings ", state.following_counts);
    });
    builder.addCase(getFollowing.rejected, (state, action) => {
      state.status = "error";
      state.is_error = true;
    });
    builder.addCase(followUser.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.status = "success";
      state.response = action.payload;
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.status = "error";
      state.is_error = true;
    });
    builder.addCase(removefollower.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(removefollower.fulfilled, (state, action) => {
      state.status = "success";
      state.response = action.payload;
    });
    builder.addCase(removefollower.rejected, (state, action) => {
      state.status = "error";
      state.is_error = true;
    });
    builder.addCase(unFollow.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(unFollow.fulfilled, (state, action) => {
      state.status = "success";
      state.response = action.payload;
      console.log(action, "unfollow slice ");
    });
    builder.addCase(unFollow.rejected, (state, action) => {
      state.status = "error";
      state.is_error = true;
    });
  },
});

export default followSlice.reducer;
