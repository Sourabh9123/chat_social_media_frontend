import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

initialState = {
  instance: null,
  isConnected: false,
  error: null,
};

export const initializeWebSocket = createAsyncThunk(
  "webSocket/initializeWebSocket",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const ws = new WebSocket("ws://your-websocket-url");

      ws.onopen = () => {
        dispatch(setConnectionStatus(true));
      };

      ws.onclose = () => {
        dispatch(setConnectionStatus(false));
      };

      // Dispatch actions for messages if needed
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        // Handle incoming messages by dispatching actions here, if required
      };

      return ws; // Return WebSocket instance as payload
    } catch (error) {
      return rejectWithValue("WebSocket connection failed");
    }
  }
);

const ChatWebSocketSlice = createSlice({
  name: "webSocket",
  initialState: {
    instance: null,
    isConnected: false,
    error: null,
  },
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeWebSocket.fulfilled, (state, action) => {
        state.instance = action.payload;
        state.error = null;
      })
      .addCase(initializeWebSocket.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setConnectionStatus } = ChatWebSocketSlice.actions;
export default ChatWebSocketSlice.reducer;

// this is how we'll use this
// const dispatch = useDispatch();
// const webSocket = useSelector((state) => state.webSocket.instance);

// useEffect(() => {
//   if (!webSocket) {
//     dispatch(initializeWebSocket());
//   }
// }, [dispatch, webSocket]);
