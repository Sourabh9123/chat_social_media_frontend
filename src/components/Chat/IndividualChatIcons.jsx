import { Box, Stack, Avatar, Typography, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";

function IndividualChatIcons() {
  const [time, setTime] = useState("");

  // Function to get the current time in HH:mm AM/PM format
  const getTime = () => {
    const currentDateTime = new Date();
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return currentDateTime.toLocaleTimeString([], options); // e.g., "03:15 PM"
  };

  // Set the time when the component loads
  useEffect(() => {
    setTime(getTime());
  }, []);

  return (
    <>
      {" "}
      <Box sx={{ width: "100%", marginY: "10px" }}>
        <Stack direction={"row"} spacing={2} alignItems={"center"} marginX={1}>
          <Stack sx={{ width: "15%" }}>
            <Avatar src="avtar.jpg" />
          </Stack>
          <Stack sx={{ width: "60%" }}>
            <Typography
              textAlign={"left"}
              fontSize={"12px"}
              justifyContent={"center"}
            >
              Sourabh
            </Typography>
            <Typography
              textAlign={"left"}
              fontSize={"10px"}
              justifyContent={"center"}
              // flexGrow={2}
            >
              hey there!!! am using Chatify
            </Typography>
          </Stack>
          <Stack sx={{ width: "25%" }}>
            <Typography fontSize={"10px"} sx={{ marginTop: "10px" }}>
              {time}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Divider />
    </>
  );
}

export default IndividualChatIcons;
