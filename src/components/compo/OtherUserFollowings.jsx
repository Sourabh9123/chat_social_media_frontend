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
  ListItemText,
  Stack,
} from "@mui/material";
import { getAllFollowers } from "../../store/userRelatedSlice";
import { useDispatch, useSelector } from "react-redux";
import { unFollow, followUser } from "../../store/FollowSlice";
import { getOtherFollowings } from "../../store/ProfileSlice";
import { getFollowing } from "../../store/FollowSlice";
import { useNavigate } from "react-router-dom";

function OtherUserFollowings({ user_id }) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user_id);
  const baseURL = "http://localhost:8000/media/";
  const dispatch = useDispatch();
  const followings = useSelector((state) => state.profile.otherFollowings);
  const data = useSelector((state) => state.userRelated.data);
  const following_counts = useSelector(
    (state) => state.follow.following_counts
  );
  useEffect(() => {
    const get_others_followings = async () => {
      const numbers = await dispatch(getFollowing(user_id));
      console.log(numbers, "------------------------- numbers of followings");

      const res = await dispatch(getOtherFollowings(user_id));
      console.log(res);
    };
    get_others_followings();
    // will get info of user followers
    // console.log(data);
  }, [dispatch, user_id]);
  console.log(followings, "followings");

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const followOrUnfollowUser = async (
    user_to_follow_id,
    alerdy_follow,
    isMyProfile
  ) => {
    // console.log({ user_to_follow_id, alerdy_follow, isMyProfile });
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
      dispatch(getOtherFollowings(user_id));
      console.log(res, "unfollowed user");
    } else {
      const res = await dispatch(followUser(user_to_follow_id));
      console.log(res, "followed user");
      dispatch(getOtherFollowings(user_id));
      console.log(
        "is followd by user is False",
        user_to_follow_id,
        user_id,
        alerdy_follow
      );
      //follw user with this id user_to_follow_id
    }
  };

  return (
    <div>
      {/* Button to open modal */}
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          height: "40px", // Increase this slightly for better visibility
          padding: "2px 8px", // Minimal padding
          fontSize: "10px", // Smaller font size
        }}
      >
        Following {following_counts || 0}
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
            {followings && followings.length > 0 ? (
              followings.map((follower) => (
                <ListItem key={follower.id}>
                  <ListItemAvatar>
                    <Avatar
                      src={`${baseURL}${follower.profile_picture}`}
                      alt={follower.first_name}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={follower.following} />
                  <Stack width={"40px"}>
                    {" "}
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        ml: 2, // Adds some left margin for spacing
                        fontSize: "10px", // Smaller font size
                        paddingX: "4px", // Reduce horizontal padding (left and right)
                        minWidth: "65px", // Set a minimum width to control button size
                      }} // Adds some left margin for spacing
                      onClick={() =>
                        followOrUnfollowUser(
                          follower.user_id,
                          follower.is_followed_by_current_user,
                          currentUser === follower.user_id //this is say is my profile
                        )
                      }
                    >
                      {/* unfollow */}
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
}

export default OtherUserFollowings;
