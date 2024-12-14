import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  is_error: false,
  status: false,
};

export const getPreviousChats = createAsyncThunk(
  "getPreviousChats",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://127.0.0.1:8000/api/chat/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(url, { headers });
      console.log(response.data, "----------------- ");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const UserPreviousChatSlice = createSlice({
  name: "UserPreviousChatSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPreviousChats.fulfilled, (state, action) => {
      // console.log(action.payload.data);
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(getPreviousChats.rejected, (state, action) => {
      state.status = "error";
      state.is_error = true;
    });
    builder.addCase(getPreviousChats.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
  },
});

export default UserPreviousChatSlice.reducer;
