import Posts from "../compo/Posts";
import { Stack, Pagination } from "@mui/material";
import SuggestionUsers from "../compo/SuggestionUsers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSuggestion } from "../../store/suggestionSlice";
import PaginationComponent from "../compo/PaginationComponent";
import { initializeWebSocket } from "../../store/WebsocketChatSlice";
import { v4 as uuidv4 } from "uuid";
function Home() {
  const { suggestions, count, next, previous } = useSelector(
    (state) => state.suggestion
  );
  // const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  // const webSocket = useSelector((state) => state.webSocket.instance);
  const [socket, setSocket] = useState(null);
  const access_token = useSelector((state) => state.auth.access_token);

  useEffect(() => {
    if (access_token) {
      const ws = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/?token=${access_token}`
      );
      ws.onopen = () => {
        console.log("connection Estiblished");
      };
      ws.onclose = () => {
        console.log("connection closed");
      };
      ws.onmessage = (event) => {
        console.log("message received ", JSON.parse(event.data));
      };
      setSocket(ws);
    }
  }, [access_token]);

  // useEffect(() => {
  //   if (!webSocket) {
  //     dispatch(initializeWebSocket());
  //     console.log("websocket trying to connect");
  //   }
  // }, [dispatch, webSocket]);
  useEffect(() => {
    const getProfileSuggestions = async () => {
      const page_no = 1;
      const res = await dispatch(
        getSuggestion({ page_no: 1, searchTerm: null })
      );
      // console.log({ suggestions, count, next, previous }, "res of sugg");
    };
    getProfileSuggestions();
  }, [dispatch]);

  // const handlePaginationChange = (event, value) => {
  //   dispatch(getSuggestion(value));
  //   setCurrentPage(value);
  //   console.log(event);
  //   console.log(value);
  // };

  return (
    <>
      <Stack direction={"row"} spacing={2} width={"100%"} p={2}>
        <Stack
          // direction={"column"}
          id="scrollableDiv"
          spacing={1}
          width={"60%"}
          p={2}
          sx={{
            maxHeight: "450px", // Set the max height (adjust as needed)
            overflowY: "auto", // Enable vertical scrolling
            "&::-webkit-scrollbar": {
              width: "6px", // Width of the scrollbar
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1", // Scrollbar track color
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888", // Scrollbar thumb (draggable part) color
              borderRadius: "10px", // Rounded edges for the thumb
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555", // Color when hovering over the scrollbar
            },
          }}
        >
          <Posts />
        </Stack>
        <Stack
          width={"40%"}
          // direction={"column"}
          // justifyContent={"start"}
          // alignItems={"center"}
          p={2}
          sx={{
            maxHeight: "450px", // Set the max height (adjust as needed)
            overflowY: "auto", // Enable vertical scrolling
            "&::-webkit-scrollbar": {
              width: "6px", // Width of the scrollbar
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1", // Scrollbar track color
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888", // Scrollbar thumb (draggable part) color
              borderRadius: "10px", // Rounded edges for the thumb
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555", // Color when hovering over the scrollbar
            },
          }}
        >
          {suggestions && <SuggestionUsers profiles={suggestions} />}

          {/* <Pagination
            count={count} // `totalPages` is passed dynamically from the backend totalPages
            page={currentPage} // Current page is dynamically set  currentPage
            onChange={handlePaginationChange} // A function to handle page changes  handlePageChange
            variant="outlined"
            shape="rounded"
            color="primary"
          /> */}

          <PaginationComponent
            count={count ?? 0}
            // next={next}
            // previous={previous}
            // suggestions={suggestions}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default Home;

{
  /* {suggestions && suggestions.length > 0 ? (
            <SuggestionUsers profiles={suggestions} />
          ) : null} */
}
