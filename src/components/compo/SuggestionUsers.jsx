import React from "react";
import { Stack, Avatar, Typography, Button, Pagination } from "@mui/material";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollow } from "../../store/FollowSlice";
import { getSuggestion } from "../../store/suggestionSlice";
import { useNavigate } from "react-router-dom";

function SuggestionUsers({ profiles }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.username);
  const currentUserId = useSelector((state) => state.auth.user_id);

  // console.log(profiles, " - -----------------------");

  const handleUnFollow = async (user_id) => {
    const res = await dispatch(unFollow(user_id));
    console.log(res);
    await dispatch(getSuggestion({ page_no: 1, searchTerm: null }));
  };
  const handleFollow = async (user_id) => {
    const res = await dispatch(followUser(user_id));
    console.log(res);
    await dispatch(getSuggestion({ page_no: 1, searchTerm: null }));
  };

  const redirectToProfile = (user_id) => {
    navigate("/profile/other", { state: { user_id } });
  };

  const isCurrentUserOrNot = (user_id) => {
    if (currentUserId === user_id) {
      navigate("/profile");
    } else {
      redirectToProfile(user_id);
    }
  };

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
            <Avatar
              sx={{ cursor: "pointer" }}
              src={profile.profile_picture}
              onClick={() => isCurrentUserOrNot(profile.user)}
            />
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => isCurrentUserOrNot(profile.user)}
              fontFamily={"monospace"}
            >
              {profile.username}{" "}
            </Typography>
            {profile.is_following ? (
              <Button
                sx={{ width: "140px", paddingX: "10px", paddingY: "5px" }}
                size="small"
                onClick={() => handleUnFollow(profile.user)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                sx={{ width: "140px", paddingX: "10px", paddingY: "5px" }}
                size="small"
                onClick={() => {
                  if (currentUser === profile.username) {
                    navigate("/profile"); // Define this function for viewing the current user's profile
                  } else {
                    handleFollow(profile.user);
                  }
                }}
              >
                {currentUser === profile.username ? " view " : "Follow"}
              </Button>
            )}
          </Stack>
        ))
      ) : (
        <Typography>No suggestions available</Typography>
      )}
    </Stack>
  );
}

export default SuggestionUsers;
