import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  is_error: null,
  data: {},
};

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
export const getAllComment = createAsyncThunk(
  "getAllComment",
  async (post_id, { getState, rejectWithValue }) => {
    console.log("Inside thunk of getAllComment");
    console.log("Thunk post id:", post_id);

    const state = getState();
    const token = state.auth.access_token;
    const url = `http://localhost:8000/post/comment/${post_id}/`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(url, { headers });
      console.log(response.data, "Data fetched in thunk");
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch comments"
      );
    }
  }
);
export const editComment = createAsyncThunk(
  "comment/editComment",
  async ({ comment_data, comment_id }, { getState, rejectWithValue }) => {
    console.log(comment_id, comment_data, " --------------id in thunk");

    const state = getState();
    const token = state.auth.access_token;
    const url = `http://localhost:8000/post/comment_id/${comment_id}/`; // Ensure the correct path is used

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.put(url, comment_data, { headers }); // Use axios.put for updating
      return response.data; // Return response data if successful
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "An error occurred"); // Proper error handling
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
      return await response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data); // Use rejectWithValue to return errors
    }
  }
);

const PostCommentsSlice = createSlice({
  name: "PostCommentsSlice",
  initialState,
  reducers: {
    clearOldComments: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllComment.pending, (state) => {
      state.is_error = false;
      state.status = "loading";
    });
    builder.addCase(getAllComment.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data; // Directly use payload
    });
    builder.addCase(getAllComment.rejected, (state, action) => {
      state.is_error = true;
      state.status = "failed";
      state.error_message = action.error.message; // Ensure you set the error message
    });

    builder.addCase(editComment.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editComment.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(editComment.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    builder.addCase(DeleteComment.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(DeleteComment.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(DeleteComment.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(createComment.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default PostCommentsSlice.reducer;
export const { clearOldComments } = PostCommentsSlice.actions;
