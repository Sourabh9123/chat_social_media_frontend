import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllComment,
  createComment,
  DeleteComment,
  // Ensure this action is imported
} from "../../store/PostCommentSlice";
import { fetchPost } from "../../store/PostSlice";
import EditComment from "./CommentEdit";
import {
  Modal,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function CommentDrawer({ drawerOpen, closeDrawer, post_id }) {
  console.log("inside drawer", post_id);
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comment.data);
  const current_user = useSelector((state) => state.auth.user_id);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const getAllComments = async () => {
      if (post_id) {
        console.log("dispatching action for all comments");
        const res = await dispatch(getAllComment(post_id));
        console.log(res);
      }
    };
    getAllComments();
  }, [dispatch, post_id]);

  const handleDeleteComment = async (id) => {
    const response = await dispatch(DeleteComment(id));
    if (response.payload.status === 204) {
      // dispatch(fetchPost(post_id)); // Refresh comments after delete
      dispatch(getAllComment(post_id));
    } else {
      // Handle delete error
      console.error("Failed to delete comment");
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const comment_data = { text: newComment };
      const response = await dispatch(createComment({ comment_data, post_id }));
      if (response.payload) {
        // dispatch(fetchPost(post_id)); // Refresh comments after adding a comment
        dispatch(getAllComment(post_id));
        setNewComment(""); // Clear input after submitting
      } else {
        // Handle add error
        console.error("Failed to add comment");
      }
    }
  };

  const handleEditComment = (id) => {
    // Handle edit comment logic
    console.log("Editing comment:", id);
  };

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
      <Stack
        p={2}
        width={350}
        role="presentation"
        height="100%"
        spacing={2}
        justifyContent="space-between"
      >
        <Typography variant="h6" fontWeight="bold">
          Comments
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: "60vh",
          }}
        >
          <List>
            {comments && comments.length > 0 ? (
              comments.map((comment, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    current_user === comment.user.id ? (
                      <Stack direction={"row"} spacing={1}>
                        {/* <EditComment
                          commentId={comment.id}
                          commentText={comment.text}
                        /> */}
                        <IconButton
                          sx={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                          }}
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEditComment(comment.id)}
                        >
                          <EditIcon sx={{ fontSize: 16, color: "blue" }} />
                        </IconButton>
                        <IconButton
                          sx={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                          }}
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteComment(comment.id)}
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
                    secondary={`by ${comment.user.first_name} ${comment.user.last_name}`}
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
            sx={{ mt: 2 }}
          >
            Add Comment
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );
}

export default CommentDrawer;
