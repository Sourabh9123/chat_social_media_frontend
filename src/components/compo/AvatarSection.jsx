import { Stack, Typography, Avatar, IconButton } from "@mui/material";
import { faker } from "@faker-js/faker";

import FormattedDate from "../compo/DateFormate";

function AvatarSection({ name, created_at }) {
  // console.log("avatar", name, created_at);
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
        >
          <Avatar src={faker.image.avatar()} />
        </IconButton>

        <Typography
          variant="h6"
          fontFamily={"sans-serif"}
          letterSpacing={1}
          fontSize={15}
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
