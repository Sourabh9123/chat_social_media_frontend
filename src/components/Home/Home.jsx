import Posts from "../compo/Posts";
import { Stack, Pagination } from "@mui/material";
import SuggestionUsers from "../compo/SuggestionUsers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSuggestion } from "../../store/suggestionSlice";
import PaginationComponent from "../compo/PaginationComponent";
import { v4 as uuidv4 } from "uuid";
function Home() {
  const { suggestions, count, next, previous } = useSelector(
    (state) => state.suggestion
  );
  // const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    const getProfileSuggestions = async () => {
      const page_no = 1;
      const res = await dispatch(
        getSuggestion({ page_no: 1, searchTerm: null })
      );
      console.log({ suggestions, count, next, previous }, "res of sugg");
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
            count={count}
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
