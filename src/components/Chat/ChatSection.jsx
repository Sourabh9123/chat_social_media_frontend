import React from "react";
import LeftChatBar from "./LeftChatBar";
import RightChatBar from "./RightChatBar";
import { Stack, Box } from "@mui/material";
import ChatBottom from "./ChatBottom";

function ChatSection() {
  return (
    <>
      <Stack direction="row" spacing={2} sx={{ width: "100%", marginX: 3 }}>
        <Box sx={{ width: "25%" }}>
          <LeftChatBar />
        </Box>
        <Box sx={{ width: "73%" }}>
          <RightChatBar />
        </Box>
      </Stack>
    </>
  );
}

export default ChatSection;
