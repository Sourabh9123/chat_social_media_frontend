import React from "react";
import { Box, Stack, Divider, Typography } from "@mui/material";

function DisplayConversations() {
  return (
    <>
      <Box
        sx={{
          paddingX: "20px",
          overflowY: "auto",
          height: "390px",
          width: "98%",

          scrollbarWidth: "thin", // Firefox
          scrollbarColor: "#6b6b6b #e0e0e0", // Firefox colors
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#e0e0e0",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#6b6b6b",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#4a4a4a",
          },
        }}
      >
        <Stack direction={"column"}>
          <Stack
            alignSelf={"left"}
            sx={{
              // border: "1px solid black",
              width: "40%",
              border: "2px solid red",
            }}
          >
            <Typography fontSize={14}>left messages lorem200</Typography>
          </Stack>

          <Stack
            alignSelf={"end"}
            width={"40%"}
            sx={{
              border: "2px solid red",
            }}
          >
            <Typography textAlign={"right"} fontSize={14}>
              Right messages
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default DisplayConversations;
