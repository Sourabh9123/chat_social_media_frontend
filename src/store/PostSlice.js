import { RestoreFromTrashSharp } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  is_error: null,
  posts: [],
  next: "",
  getPostPictures: [],
};

export const savedPost = createAsyncThunk(
  "savedPost",
  async (post_id, { getState, rejectWithValue }) => {
    console.log("post id in", post_id);
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://127.0.0.1:8000/post/saved-posts/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const data = { post_id: post_id };
    try {
      const response = await axios.post(url, data, { headers }); // Use axios.post instead of axios.Post
      // return { data: response.data, statusCode: response.status };
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data); // Use rejectWithValue to return errors
    }
  }
);

export const createComment = createAsyncThunk(
  "createComment",
  async ({ comment_data, post_id }, { getState, rejectWithValue }) => {
    console.log(post_id, comment_data, " --------------id in thunk");
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://localhost:8000/post/comment/${post_id}/`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const data = comment_data; // Define it with const or let

    try {
      const response = await axios.post(url, data, { headers }); // Use axios.post instead of axios.Post
      // return { data: response.data, statusCode: response.status };
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data); // Use rejectWithValue to return errors
    }
  }
);

export const createOrRemoveLike = createAsyncThunk(
  "createOrRemoveLike",
  async (id, { getState, rejectWithValue }) => {
    console.log(id, " --------------id in thunk");
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://localhost:8000/post/like/${id}/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const data = {}; // Define it with const or let

    try {
      const response = await axios.post(url, data, { headers }); // Use axios.post instead of axios.Post
      // return { data: response.data, statusCode: response.status };
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data); // Use rejectWithValue to return errors
    }
  }
);

export const DeleteComment = createAsyncThunk(
  "deleteComment",
  async (id, { getState }) => {
    const state = getState();
    const token = state.auth.access_token;
    const url = `http://localhost:8000/post/comment_id/${id}/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.delete(url, { headers });

      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPost = createAsyncThunk(
  "fetchPost",
  async (url, { getState }) => {
    const state = getState();
    const token = state.auth.access_token;

    // let url = "http://localhost:8000/post/";
    // if (next !== "") {
    //   console.log("next --- urls", state.next);
    // }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(url, { headers });
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getPostPictures = createAsyncThunk(
  "getPostPictures",
  async (_, { getState }) => {
    const url = "";
    const state = getState();
    const token = state.auth.access_token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const PostSlice = createSlice({
  name: "PostSlice",
  initialState,
  reducers: {
    cleanOldPosts: (state) => {
      state.posts = [];
    },
    decreaseNoOfComments: (state, action) => {
      const { post_id } = action.payload;
      const post = state.posts.find((p) => p.id === post_id);
      if (post && post.total_comments > 0) {
        post.total_comments = post.total_comments - 1;
        // console.log("total comments------------------", post.total_comments);
      }
    },
    increaseNoOfComments: (state, action) => {
      const { post_id } = action.payload;
      const post = state.posts.find((p) => p.id === post_id);
      if (post && post.total_comments) {
        post.total_comments = post.total_comments + 1;
        // console.log("total comments------------------", post.total_comments);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.status = "success";
      console.log("post after paginate", action.payload.results);
      state.posts = [...state.posts, ...action.payload.results];
      // state.posts = action.payload.results;
      state.next = action.payload.next;
      // console.log(state.posts, "from post init");
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      (state.is_error = true), (state.error_message = action.error);
      state.status = "error";
    });
    builder.addCase(createOrRemoveLike.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(createOrRemoveLike.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(createOrRemoveLike.rejected, (state, action) => {
      (state.is_error = true), (state.error_message = action.error);
      state.status = "error";
    });
    builder.addCase(getPostPictures.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(getPostPictures.fulfilled, (state, action) => {
      state.status = "success";
      state.getPostPictures = action.payload;
    });
    builder.addCase(getPostPictures.rejected, (state, action) => {
      (state.is_error = true), (state.error_message = action.error);
      state.status = "error";
    });
  },
});

export default PostSlice.reducer;

export const { cleanOldPosts, decreaseNoOfComments, increaseNoOfComments } =
  PostSlice.actions;
