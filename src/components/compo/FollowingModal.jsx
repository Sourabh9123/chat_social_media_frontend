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
import { unFollow } from "../../store/FollowSlice";

function FollowingModal({ user_id }) {
  const baseURL = "http://localhost:8000/media/";
  const dispatch = useDispatch();
  const following = useSelector((state) => state.userRelated.following);
  const data = useSelector((state) => state.userRelated.data);
  useEffect(() => {
    dispatch(getAllFollowers(user_id)); // will get info of user followers
    console.log(data);
  }, [dispatch]);

  const handleUnfollow = async (id) => {
    const res = await dispatch(unFollow(id));
    console.log(res);
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
          height: "40px", // Increase this slightly for better visibility
          padding: "2px 8px", // Minimal padding
          fontSize: "10px", // Smaller font size
        }}
      >
        Following {data.following_count || 0}
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
            {following && following.length > 0 ? (
              following.map((follower) => (
                <ListItem key={follower.id}>
                  <ListItemAvatar>
                    <Avatar
                      src={`${baseURL}${follower.profile_picture}`}
                      alt={follower.first_name}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={follower.username} />
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
                      onClick={() => handleUnfollow(follower.id)}
                    >
                      unfollow
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

export default FollowingModal;
