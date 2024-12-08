import React, { useState, useRef } from "react";
import { Input, Box, Stack } from "@mui/material";
import { CiShare2 } from "react-icons/ci";
import { BsEmojiSmile } from "react-icons/bs";
function ChatBottom() {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const messageChange = async (e) => {
    // console.log(e.target.value);
    // setMessage(e.target.value);
    if (e.key === "Enter") {
      console.log(inputRef.current.value);
    }
    // console.log(e);
  };
  return (
    <>
      <Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack
            sx={{
              width: "5%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BsEmojiSmile style={{ color: "blue", fontSize: "20px" }} />
          </Stack>
          <Stack sx={{ width: "87%" }}>
            {" "}
            <Input
              inputRef={inputRef}
              placeholder="Enter text"
              inputProps={{ "aria-label": "description" }}
              onKeyDown={messageChange}
            />
          </Stack>
          <Stack sx={{ width: "8%" }}>
            <CiShare2 style={{ color: "blue", fontSize: "20px" }} />
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default ChatBottom;
