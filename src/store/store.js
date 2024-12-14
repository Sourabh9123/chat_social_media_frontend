import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import PostSlice from "./PostSlice";
import ProfileSlice from "./ProfileSlice";
import userRelatedSlice from "./userRelatedSlice";
import PostCommentsSlice from "./PostCommentSlice";
import FollowSlice from "./FollowSlice";
import suggestionSlice from "./suggestionSlice";
import ChatWebSocketSlice from "./WebsocketChatSlice";
import UserPreviousChatSlice from "./UserPreviousChatSlice";

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
    userpreviousChats: UserPreviousChatSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredPaths: ["some.nested.path"], // Ignore specific paths in state
  //       ignoredActionPaths: ["meta.arg", "payload.timestamp"], // Ignore specific paths in actions
  //       ignoredActions: ["some/actionType"], // Ignore specific action types
  //     },
  //   }),
});

export default store;
