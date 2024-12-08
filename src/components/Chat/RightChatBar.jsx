import React from "react";
import RightChatBarHead from "./RightChatBarHead";
import DisplayConversations from "./DisplayConversations";
import { Box, Stack } from "@mui/material";
import ChatBottom from "./ChatBottom";

function RightChatBar() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Stack direction={"column"} gap={1}>
          <Stack>
            {" "}
            <RightChatBarHead />
          </Stack>

          <Stack
            sx={{
              width: "100%",
            }}
          >
            {" "}
            <DisplayConversations />
          </Stack>

          <Stack>
            {" "}
            <ChatBottom />
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default RightChatBar;
