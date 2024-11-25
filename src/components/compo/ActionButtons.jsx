import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Drawer,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";

import EditComment from "./CommentEdit";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { useDispatch, useSelector } from "react-redux";
import { createOrRemoveLike } from "../../store/PostSlice";
import {
  createComment,
  fetchPost,
  DeleteComment,
  savedPost,
  cleanOldPosts,
  decreaseNoOfComments,
  increaseNoOfComments,
} from "../../store/PostSlice";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CommentDrawer from "./CommentDrawer";
import { getAllComment, clearOldComments } from "../../store/PostCommentSlice";
// import { decreaseNoOfComments } from "../../store/PostSlice";

function ActionButtons({
  total_likes,
  liked_by,
  total_comments,
  // comments,
  post_id,
  liked_by_me,
  saved_post,
}) {
  const user_id = useSelector((state) => state.auth.user_id);
  const dispatch = useDispatch();
  // const comments = useSelector((state) => state.comment.data);
  // console.log("comments------------------------------", post_id);

  const [bgColor, setBgColor] = useState("transparent");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(total_likes); // Store total likes in local state
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer state
  const [newComment, setNewComment] = useState(""); // New comment state
  const comments = useSelector((state) => state.comment.data);

  const handleHeartClick = async () => {
    const response = await dispatch(createOrRemoveLike(post_id));
    if (response && response.payload) {
      if (response.payload.data === "like Removed") {
        setLikeCount((prevCount) => prevCount - 1); // Decrease the like count
      } else {
        setLikeCount((prevCount) => prevCount + 1); // Increase the like count
      }
      setIsLiked((prevState) => !prevState); // Toggle the like state
    }
  };

  const handleDeleteComment = async (id) => {
    const response = await dispatch(DeleteComment(id)); // this deleteing comment
    await dispatch(getAllComment(post_id));
    // total_comments = total_comments - 1;
    //  dispatch(deleteComment(post_id));
    await dispatch(decreaseNoOfComments({ post_id })); // this is decreasing no of comments
    if (response.payload.status === 204) {
      dispatch(getAllComment(post_id));
    }
  };

  const handleSavePostClick = (post_id) => {
    setBgColor((prev) => (prev === "blue" ? "white" : "blue"));
    console.log(post_id);
    const response = dispatch(savedPost(post_id));
    // console.log(response);
  };

  const handleEditComment = (id) => {
    console.log(id, " edit comments-------------------");
    dispatch(getAllComment(post_id));
  };
  useEffect(() => {
    // dispatch( )
    // dispatch(getAllComment(post_id));
  }, []);

  const handleCommentClick = async () => {
    setDrawerOpen(true); // Open the drawer when comment icon is clicked
    // here to dispatch for comments
    await dispatch(clearOldComments());

    await dispatch(getAllComment(post_id));
  };

  const closeDrawer = () => {
    setDrawerOpen(false); // Close the drawer
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      // console.log("New comment added:", newComment);
      // console.log("New comment added:", post_id);
      //comment_data
      const comment_data = {
        text: newComment,
      };
      const response = await dispatch(createComment({ comment_data, post_id }));
      await dispatch(increaseNoOfComments({ post_id }));
      // console.log(
      //   response,
      //   "--------------------------------respone of comment"
      // );
      // console.log("cleaning up ...");
      await dispatch(clearOldComments());
      await dispatch(getAllComment(post_id));
      // console.log("fetching post ...");
      // dispatch(fetchPost());
      // console.log(" posts fatched ...");

      setNewComment(""); // Clear input after submitting
    }
  };

  useEffect(() => {
    // const run = async () => {
    //   console.log(post_id);
    //   const res = await getAllComment(post_id);
    //   console.log(
    //     res,
    //     " getAllcomments ______________________________________________-----------"
    //   );
    // };
    // run();

    const likedByCurrentUser = liked_by.some(
      (item) => item.user.id === user_id
    );
    setIsLiked(likedByCurrentUser); // Set initial like state
  }, [liked_by, user_id, post_id]);

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack
          spacing={4}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          pl={4}
        >
          <IconButton
            onClick={handleHeartClick}
            color="primary"
            sx={{ width: "20px" }}
          >
            {isLiked ? (
              <FavoriteIcon sx={{ color: "red", fontSize: 24 }} />
            ) : (
              <FavoriteBorderOutlinedIcon
                sx={{ color: "#000", fontSize: 24 }}
              />
            )}
            <Typography
              variant="body"
              fontSize={16}
              fontFamily={"inherit"}
              ml={1}
              color="#0313fc"
            >
              {likeCount} {/* Display the updated like count */}
            </Typography>
          </IconButton>

          <IconButton
            onClick={handleCommentClick}
            color="primary"
            sx={{ width: "20px" }}
          >
            <CommentOutlinedIcon sx={{ color: "#000", fontSize: 24 }} />
            <Typography
              variant="body"
              fontSize={16}
              fontFamily={"inherit"}
              ml={1}
              color="#0313fc"
            >
              {total_comments}
            </Typography>
          </IconButton>
        </Stack>

        <Stack
          spacing={4}
          pr={4}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IconButton
            onClick={() => console.log("Notification clicked")}
            color="primary"
            sx={{ width: "20px" }}
          >
            <ReportOutlinedIcon />
          </IconButton>

          <IconButton
            onClick={() => handleSavePostClick(post_id)}
            color="primary"
            sx={{ width: "20px" }}
          >
            {saved_post ? (
              <BookmarkAddedIcon />
            ) : (
              <BookmarkBorderIcon
                sx={{ backgroundColor: bgColor, borderRadius: "50%" }}
              />
            )}
          </IconButton>
        </Stack>
      </Stack>

      {/* Drawer for comments */}

      {/* <CommentDrawer
         drawerOpen={drawerOpen}
        closeDrawer={closeDrawer}
        post_id={post_id}
      /> */}

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <Stack
          p={2}
          width={350}
          role="presentation"
          height="100%" // Take full height of the drawer
          spacing={2}
          justifyContent="space-between"
        >
          <Typography variant="h6" fontWeight="bold">
            Comments
          </Typography>

          {/* Scrollable list of comments */}
          <Box
            sx={{
              flexGrow: 1, // Allow the comment list to grow and take remaining space
              overflowY: "auto", // Enable vertical scrolling
              maxHeight: "60vh", // Set a maximum height, adjust as needed
            }}
          >
            <List>
              {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      // Conditionally render the edit icon if the current user is the owner of the comment
                      user_id === comment.user.id ? (
                        <Stack direction={"row"} spacing={1}>
                          {/* <IconButton
                            sx={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                            }}
                            edge="end"
                            aria-label="edit"
                            onClick={() => handleEditComment(comment.id)} // Add edit handler
                          >
                            <EditIcon sx={{ fontSize: 16, color: "blue" }} />
                          </IconButton> */}
                          <EditComment
                            commentId={comment.id}
                            commentText={comment.text}
                            postId={post_id}
                          />
                          <IconButton
                            sx={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                            }}
                            edge="end"
                            aria-label="edit"
                            onClick={() => handleDeleteComment(comment.id)} // Add edit handler
                          >
                            <DeleteForeverIcon
                              sx={{ fontSize: 16, color: "blue" }}
                            />
                          </IconButton>
                        </Stack>
                      ) : null
                    }
                  >
                    <ListItemText
                      primary={comment.text}
                      secondary={`by ${comment.user.username}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography>No comments yet</Typography>
              )}
            </List>
          </Box>

          {/* Input for new comment */}
          <Box>
            <TextField
              fullWidth
              placeholder="Add a comment..."
              variant="standard"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              sx={{ mt: 2 }} // Margin top for spacing
            >
              Add Comment
            </Button>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
}

export default ActionButtons;
