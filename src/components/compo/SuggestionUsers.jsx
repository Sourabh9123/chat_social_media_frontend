import React from "react";
import { Stack, Avatar, Typography, Button, Pagination } from "@mui/material";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

function SuggestionUsers({ profiles }) {
  // console.log(profiles, " - -----------------------");

  return (
    <Stack direction={"column"}>
      {profiles && profiles.length > 0 ? (
        profiles.map((profile) => (
          <Stack
            key={uuidv4()}
            direction={"row"}
            spacing={3}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={2}
          >
            {/* <Avatar src={faker.image.avatar()} /> */}
            <Avatar src={profile.profile_picture} />
            <Typography fontFamily={"monospace"}>{profile.username}</Typography>
            <Button
              sx={{ width: "140px", paddingX: "10px", paddingY: "5px" }}
              size="small"
            >
              Follow
            </Button>
          </Stack>
        ))
      ) : (
        <Typography>No suggestions available</Typography>
      )}
    </Stack>
  );
}

export default SuggestionUsers;
