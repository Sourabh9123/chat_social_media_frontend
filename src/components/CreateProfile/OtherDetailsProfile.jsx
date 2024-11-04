import { useEffect, useState } from "react";
import { Stack, Box, Typography, Divider, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import FollowersModal from "../compo/FollowersModal";
import FollowingModal from "../compo/FollowingModal";
import OtherUserFollowerModel from "../compo/OtherUserFollowerModel";
import OtherUserFollowings from "../compo/OtherUserFollowings";
import { getOthersProfile } from "../../store/ProfileSlice";

function OtherDetailsProfile({ user_id }) {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.otherProfile);
  // const profileData = [];
  const [loading, setLoading] = useState(true);
  const baseURL = "http://localhost:8000";
  const handleTotalPostsClick = () => {
    console.log("Total Posts button clicked");
  };

  useEffect(() => {
    console.log(user_id, "-----------------------------------------");
    const get_user_profile = async () => {
      const res = await dispatch(getOthersProfile(user_id));
      console.log(res);
    };
    get_user_profile();
  }, [user_id]);

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        px={4}
        py={4}
        spacing={10}
      >
        <Stack width={"40%"} alignItems={"center"}>
          <Box
            component="img"
            src={`${baseURL}${profileData?.profile_picture}`}
            alt="avatar"
            sx={{
              width: 250,
              height: 250,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Stack>
        <Stack
          direction={"column"}
          width={"40%"}
          spacing={1}
          justifyContent={"center"}
        >
          <Typography
            fontFamily="sans-serif"
            fontWeight={400}
            fontSize={20}
            lineHeight={1.5}
            color="primary.main"
            textAlign="center"
            sx={{
              margin: "20px",
              padding: "10px",
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: "5px",
              backgroundColor: "background.paper",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "grey.100",
              },
            }}
          >
            {profileData?.username}
          </Typography>

          <Stack
            width="100%"
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={4}
            sx={{
              padding: "10px",
              backgroundColor: "background.default",
              borderRadius: "8px",
              boxShadow: 1,
            }}
          >
            <Button variant="contained" onClick={handleTotalPostsClick}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  paddingX: "2px",
                }}
              >
                Posts{" "}
                <Box
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    paddingX: "2px",
                  }}
                >
                  {profileData?.total_post}
                </Box>
              </Typography>
            </Button>

            <OtherUserFollowerModel user_id={user_id} />

            <OtherUserFollowings user_id={user_id} />
          </Stack>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              padding: 1, // Add padding for better spacing
              backgroundColor: "background.paper", // Optional background color
              borderRadius: "8px", // Rounded corners for a modern look
              boxShadow: 1, // Add shadow for a subtle elevation effect
            }}
          >
            <Typography
              textAlign="center"
              variant="body1" // Use a larger, predefined typography variant
              sx={{
                fontWeight: 400, // Make the text slightly bolder for readability
                fontSize: "16px", // Set a custom font size if needed
                color: "text.primary", // Ensure good contrast with the background
                lineHeight: 1.7, // Increase line height for better text spacing
                paddingX: 2, // Add horizontal padding to the text
              }}
            >
              {profileData?.bio}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider
        sx={{
          marginY: 2,
          borderColor: "grey.300",
          borderWidth: "1px",
          width: "100%",
          borderStyle: "solid",
          opacity: 0.8,
        }}
      />
    </>
  );
}

export default OtherDetailsProfile;
