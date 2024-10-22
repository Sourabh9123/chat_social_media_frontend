import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  access_token: null,
  refresh_token: null,
  username: null,
  user_id: null,
  profile_picture: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  is_error: null,
};

export const LoginUser = createAsyncThunk("LoginUser", async (data) => {
  try {
    const url = "http://127.0.0.1:8000/auth/login/";
    const response = await axios.post(url, data);
    console.log(response, "user info ");
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
      state.profile_picture = action.payload.profile_picture;
    },
    undoUser: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.user_name = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.status = "success";
      state.access_token = action.payload.token.access;
      state.refresh_token = action.payload.token.refresh;
      state.username = action.payload.user_data.username;
      state.user_id = action.payload.user_data.id;
      state.profile_picture = action.payload.user_data.profile_picture;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.status = "error";
      state.is_error = true;
    });
  },
});

export const { setUser, undoUser } = authSlice.actions;
export default authSlice.reducer;
