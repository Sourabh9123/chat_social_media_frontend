import { Stack, Typography, Avatar, IconButton } from "@mui/material";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";

import FormattedDate from "../compo/DateFormate";

function AvatarSection({ name, created_at, img, id }) {
  // console.log("avatar", name, created_at);
  const baseURL = "http://localhost:8000/media/";
  const navigate = useNavigate();

  const redirectToProfile = (user_id) => {
    navigate("/profile/other", { state: { user_id } });
  };
  return (
    <Stack
      direction={"row"}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack
        direction={"row"}
        spacing={3}
        sx={{
          alignItems: "center",
        }}
      >
        <IconButton
          size={"small"}
          sx={{
            width: 40,
            height: 40,
          }}
          onClick={() => redirectToProfile(id)}
        >
          <Avatar src={`${baseURL}${img}`} />
        </IconButton>

        <Typography
          variant="h6"
          fontFamily={"sans-serif"}
          letterSpacing={1}
          fontSize={15}
          onClick={() => redirectToProfile(id)}
          sx={{
            cursor: "pointer",
          }}
        >
          {name}
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="body" fontSize={"12px"} fontFamily={"sans-serif"}>
          <FormattedDate isoString={created_at} />
        </Typography>
      </Stack>
    </Stack>
  );
}

export default AvatarSection;
