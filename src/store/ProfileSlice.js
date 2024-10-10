import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  is_error: null,
  data: [],
};

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
  },
});

export default ProfileSlice.reducer;
