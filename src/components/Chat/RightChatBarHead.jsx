import React from "react";
import { Stack, Divider, Box, Avatar, Typography, Button } from "@mui/material";

function RightChatBarHead() {
  return (
    <>
      <Box sx={{ height: "50px", bgcolor: "#f5f1eb", width: "100%" }}>
        <Stack direction={"row"} alignItems={"center"} sx={{ width: "100%" }}>
          <Stack sx={{ marginLeft: "15px", marginTop: "5px", width: "10%" }}>
            {" "}
            <Avatar src="avtar.jpg" />
          </Stack>
          <Stack
            sx={{ width: "40%" }}
            direction={"column"}
            justifyItems={"center"}
          >
            {" "}
            <Typography
              sx={{
                fontSize: "15px",
                fontFamily: "monospace",
              }}
            >
              Sourabh_das081
            </Typography>
            <Stack direction={"row"} spacing={3}>
              {" "}
              <Typography
                sx={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                }}
              >
                Online
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                }}
              >
                Typing...
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            width={"150px"}
            height={"25px"}
            justifySelf={"end"}
          >
            <Button
              //   variant="contained"

              size="small"
              sx={{
                borderRadius: "10px",
                padding: "2px 8px", // Adjust padding for a smaller look
                fontSize: "12px", // Optional: Adjust font size for smaller text
                // minWidth: "auto",
                bgcolor: "#14c767",
                color: "whitesmoke",
                "&:hover": {
                  backgroundColor: "#14ccff", // Change color on hover
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              View Profile
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Divider />
    </>
  );
}

export default RightChatBarHead;
