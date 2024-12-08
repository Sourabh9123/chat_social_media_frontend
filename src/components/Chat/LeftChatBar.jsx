import { Stack, Typography, Box } from "@mui/material";
import React from "react";
import IndividualChatIcons from "./IndividualChatIcons";

function LeftChatBar() {
  return (
    <>
      <Stack bgcolor={"#34b7eb"}>
        <Stack
          sx={
            {
              // borderRadius: "16px", // Adjust the radius as needed
              // Add some padding for better appearance
            }
          }
        >
          <Typography
            textAlign={"center"}
            fontSize={15}
            fontFamily={"cursive"}
            color="blue"
            padding={1}
          >
            Messages
          </Typography>
        </Stack>
        <Stack
          bgcolor={"#f7fafa"}
          sx={{
            borderRadius: "16px 16px 0 0", // top left , top right , bottom left , bottom right
          }}
        >
          <Box
            sx={{
              marginX: "5px",
              marginY: "9px",
              overflowY: "auto",
              height: "450px",
              width: "100%",
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
            <IndividualChatIcons />
            <IndividualChatIcons />
            <IndividualChatIcons />
            <IndividualChatIcons />
            <IndividualChatIcons />
            <IndividualChatIcons />
            <IndividualChatIcons />
            <IndividualChatIcons />
            <IndividualChatIcons />
            <IndividualChatIcons />
            <IndividualChatIcons />
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

export default LeftChatBar;
