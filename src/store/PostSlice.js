import { RestoreFromTrashSharp } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  is_error: null,
  posts: [],
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
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.access_token;
    const url = "http://localhost:8000/post/";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(url, { headers });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const PostSlice = createSlice({
  name: "PostSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.status = "success";
      state.posts = action.payload.data;
      console.log(state.posts, "from post init");
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
  },
});

export default PostSlice.reducer;
