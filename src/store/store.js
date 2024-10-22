import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import PostSlice from "./PostSlice";
import ProfileSlice from "./ProfileSlice";
import userRelatedSlice from "./userRelatedSlice";
import PostCommentsSlice from "./PostCommentSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: PostSlice,
    profile: ProfileSlice,
    comment: PostCommentsSlice,
    userRelated: userRelatedSlice,
  },
});

export default store;
