import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  access_token: null,
  refresh_token: null,
  user_name: null,
  user_id: null,
};

export const LoginUser = createAsyncThunk("LoginUser", async (data) => {
  try {
    const url = "http://127.0.0.1:8000/auth/login/";
    const response = await axios.post(url, data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log(action.payload);
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.user_name = action.payload.user_name;
      state.user_id = action.payload.user_id;
    },
    undoUser: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.user_name = null;
    },
  },
});

export const { setUser, undoUser } = authSlice.actions;
export default authSlice.reducer;
