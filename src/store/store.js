import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import PostSlice from "./PostSlice";
import ProfileSlice from "./ProfileSlice";
import userRelatedSlice from "./userRelatedSlice";
import PostCommentsSlice from "./PostCommentSlice";
import FollowSlice from "./FollowSlice";
import suggestionSlice from "./suggestionSlice";
import ChatWebSocketSlice from "./WebsocketChatSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: PostSlice,
    profile: ProfileSlice,
    comment: PostCommentsSlice,
    userRelated: userRelatedSlice,
    follow: FollowSlice,
    suggestion: suggestionSlice,
    webSocket: ChatWebSocketSlice,
  },
});

export default store;
