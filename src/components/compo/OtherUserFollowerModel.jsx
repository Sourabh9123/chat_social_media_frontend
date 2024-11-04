// this is use for both followers and following because it is not related to current user

import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  ListItemText,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { getOthersFollowers } from "../../store/ProfileSlice";
import { useNavigate } from "react-router-dom";

import { unFollow, followUser } from "../../store/FollowSlice";
import { getFollowers } from "../../store/FollowSlice";

///
//
//// this is use for both followers and following because it is not related to current user

const OtherUserFollowerModel = ({ user_id }) => {
  const currentUser = useSelector((state) => state.auth.user_id);
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/media/";
  const dispatch = useDispatch();
  const followers = useSelector((state) => state.profile.otherFollowers);
  const follower_counts = useSelector((state) => state.follow.followers_counts);
  const data = useSelector((state) => state.userRelated.data);

  useEffect(() => {
    const get_others_followers = async () => {
      dispatch(getFollowers(user_id));
      const res = await dispatch(getOthersFollowers(user_id)); // will get info of user followers
      console.log(res);
    };
    get_others_followers();

    // dispatch(getOtherFollowings(user_id)); // will get info of user followings

    // console.log(data);
  }, [dispatch, user_id]);
  console.log(followers, "followers others ");

  const followOrUnfollowUser = async (
    user_to_follow_id,
    alerdy_follow,
    isMyProfile
  ) => {
    if (isMyProfile) {
      navigate("/profile");
    }
    if (alerdy_follow) {
      //unfollw
      console.log(
        "is followd by user is true",
        user_to_follow_id,
        alerdy_follow,
        user_id
      );
      const res = await dispatch(unFollow(user_to_follow_id));
      dispatch(getOthersFollowers(user_id));
      console.log(res, "unfollowed user");
    } else {
      followUser;
      const res = await dispatch(followUser(user_to_follow_id));
      console.log(res, "followed user");
      dispatch(getOthersFollowers(user_id));
      console.log(
        "is followd by user is False",
        user_to_follow_id,
        user_id,
        alerdy_follow
      );
      //follw user with this id user_to_follow_id
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Button to open modal */}
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          height: "40px",
          padding: "2px 8px",
          fontSize: "10px",
        }}
      >
        Followers {follower_counts || 0}
      </Button>

      {/* Modal for displaying followers */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxHeight: "60vh",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}
        >
          <Typography variant="h6" component="h2">
            Followers
          </Typography>

          {/* List of followers */}
          <List>
            {followers && followers.length > 0 ? (
              followers.map((follower) => (
                <ListItem key={follower.id}>
                  <ListItemAvatar>
                    <Avatar
                      src={`${baseURL}${follower.profile_picture}`}
                      alt={follower.first_name}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    // primary={follower.first_name + " " + follower.last_name}
                    // primary={follower.username}

                    primary={follower.follower}
                  />
                  <Stack width={"50px"}>
                    {" "}
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        ml: 2, // Adds some left margin for spacing
                        fontSize: "10px", // Smaller font size
                        paddingX: "4px", // Reduce horizontal padding (left and right)
                        paddingY: "5px",
                        minWidth: "70px", // Set a minimum width to control button size
                      }} // Adds some left margin for spacing
                      onClick={() =>
                        followOrUnfollowUser(
                          follower.user_id,
                          follower.is_followed_by_current_user,
                          currentUser === follower.user_id //this is say is my profile
                        )
                      }
                    >
                      {currentUser === follower.user_id
                        ? "view"
                        : follower.is_followed_by_current_user
                        ? "Unfollow"
                        : "Follow"}
                    </Button>
                  </Stack>
                </ListItem>
              ))
            ) : (
              <Typography>No followers found</Typography>
            )}
          </List>

          {/* Close button */}
          <Button onClick={handleClose} variant="outlined" size="small">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default OtherUserFollowerModel;
