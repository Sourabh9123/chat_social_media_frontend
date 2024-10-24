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
import { getAllFollowers } from "../../store/userRelatedSlice";
import { useDispatch, useSelector } from "react-redux";
import { removefollower } from "../../store/FollowSlice";

const FollowersModal = ({ user_id }) => {
  const baseURL = "http://localhost:8000/media/";
  const dispatch = useDispatch();
  const followers = useSelector((state) => state.userRelated.followers);
  const data = useSelector((state) => state.userRelated.data);
  useEffect(() => {
    dispatch(getAllFollowers(user_id)); // will get info of user followers
    console.log(data);
  }, [dispatch, user_id]);

  const handleRemoveFollower = async (id) => {
    const user_id = id;
    const res = await dispatch(removefollower(user_id));
    // dispatch(getAllFollowers(user_id));
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
          height: "40px",
          padding: "2px 8px",
          fontSize: "10px",
        }}
      >
        Followers {data.followers_count || 0}
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
                    primary={follower.username}
                  />
                  <Stack width={"30px"}>
                    {" "}
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        ml: 2, // Adds some left margin for spacing
                        fontSize: "10px", // Smaller font size
                        paddingX: "4px", // Reduce horizontal padding (left and right)
                        minWidth: "50px", // Set a minimum width to control button size
                      }} // Adds some left margin for spacing
                      onClick={() => handleRemoveFollower(follower.id)}
                    >
                      Remove
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

export default FollowersModal;
