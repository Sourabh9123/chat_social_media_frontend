import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import PostSlice from "./PostSlice";
import ProfileSlice from "./ProfileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: PostSlice,
    profile: ProfileSlice,
  },
});

export default store;
