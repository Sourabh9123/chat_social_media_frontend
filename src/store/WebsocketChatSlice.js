import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  instance: null,
  isConnected: false,
  error: null,
};

export const initializeWebSocket = createAsyncThunk(
  "webSocket/initializeWebSocket",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState();
      const access_token = state.auth.access_token;
      const ws = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/?token=${access_token}`
      );

      ws.onopen = () => {
        // dispatch(setConnectionStatus(true));
        console.log("on open");
      };

      ws.onclose = () => {
        // dispatch(setConnectionStatus(false));
      };

      const sendMessage = async (ws) => {
        const message = {
          type: "chat_message",
          message: "testing message",
          sender: "123id",
          receiver: "321id",
        };
        console.log(JSON.stringify(message), " ------------------------------");
        ws.send(JSON.stringify(message));
      };

      // Dispatch actions for messages if needed
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        // Handle incoming messages by dispatching actions here, if required
        console.log(message);
      };

      return ws; // Return WebSocket instance as payload
    } catch (error) {
      return rejectWithValue("WebSocket connection failed");
    }
  }
);

const ChatWebSocketSlice = createSlice({
  name: "webSocket",
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      // state.isConnected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeWebSocket.fulfilled, (state, action) => {
        // state.instance = action.payload;
        console.log("fullfeild ...");
        state.error = null;
      })
      .addCase(initializeWebSocket.rejected, (state, action) => {
        // state.error = action.payload;
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
