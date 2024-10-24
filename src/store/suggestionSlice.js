import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  is_error: null,
  suggestions: [],
  count: null,
  next: null,
  previous: null,
  currentSearchTerm: "",
};

export const getSuggestion = createAsyncThunk(
  "getSuggestion",
  async ({ page_no, searchTerm }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.access_token;
    // if (!page_no) {
    //   return;
    // }

    let url = `http://127.0.0.1:8000/api/profile/suggestion/?page=${page_no}`;
    if (searchTerm) {
      url += `&search=${encodeURIComponent(searchTerm)}`;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(url, { headers }); // Use axios.post instead of axios.Post
      //   console.log({ data: response.data, statusCode: response.status });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data); // Use rejectWithValue to return errors
    }
  }
);

const suggestionSlice = createSlice({
  name: "suggestionSlice",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.currentSearchTerm = action.payload; // Update the search term
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSuggestion.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(getSuggestion.fulfilled, (state, action) => {
      state.status = "success";
      console.log(action.payload);

      state.suggestions = action.payload.results;
      state.count = Math.ceil(action.payload.count / 5); // dividing with total number of content a have
      state.next = action.payload.next;
      state.previous = action.payload.previous;
    });
    builder.addCase(getSuggestion.rejected, (state, action) => {
      state.status = "error";
      state.is_error = true;
    });
  },
});

export const { setSearchTerm } = suggestionSlice.actions;
export default suggestionSlice.reducer;
