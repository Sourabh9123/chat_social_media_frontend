import React from "react";

import { useState, useEffect } from "react";
import { Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestion } from "../../store/suggestionSlice";

function PaginationComponent({ count }) {
  // console.log(count ?? 0, " ----------------------------------------");
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationChange = (event, value) => {
    // Fetch data for the clicked page
    dispatch(getSuggestion({ page_no: value }));
    setCurrentPage(value);
    console.log(event);
    console.log(value);
  };

  return (
    <Stack pl={4} justifyContent={"center"} width={"100%"}>
      <Pagination
        count={count} // Total pages
        page={currentPage} // Current page
        onChange={handlePaginationChange} // Handle page change
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </Stack>
  );
}

export default PaginationComponent;
