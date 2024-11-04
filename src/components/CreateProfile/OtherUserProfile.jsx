import React from "react";
import { useLocation } from "react-router-dom";
import OtherDetailsProfile from "./OtherDetailsProfile";
import { Stack } from "@mui/material";

function OtherUserProfile() {
  const location = useLocation();
  const { user_id } = location.state;
  console.log(user_id, " ----user ----------------------------");
  return (
    <>
      OtherUserProfile
      <Stack
        width={"100vw"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack width={"80vw"} justifyContent={"center"} alignItems={"center"}>
          <OtherDetailsProfile user_id={user_id} />
        </Stack>
      </Stack>
    </>
  );
}

export default OtherUserProfile;
