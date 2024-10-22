import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  is_error: null,
  followers: [],
  data: [],
  following: [],
};

export const getAllFollowers = createAsyncThunk(
  "getAllFollowers",
  async (user_id, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://127.0.0.1:8000/api/profile/details/${user_id}/`;
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

const userRelatedSlice = createSlice({
  name: "userRelatedSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFollowers.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(getAllFollowers.fulfilled, (state, action) => {
      state.status = "success";
      state.followers = action.payload.data.followers;
      state.following = action.payload.data.following;
      state.data = action.payload.data;
      console.log(action.payload, "from post init");
    });
    builder.addCase(getAllFollowers.rejected, (state, action) => {
      (state.is_error = true), (state.error_message = action.error);
      state.status = "error";
    });
  },
});

export default userRelatedSlice.reducer;
