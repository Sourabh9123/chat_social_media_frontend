import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { editComment } from "../../store/PostCommentSlice";
import { fetchPost } from "../../store/PostSlice";

function EditComment({ commentId, commentText }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  console.log({ commentId, commentText });
  const [editedText, setEditedText] = useState(commentText);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleTextChange = (e) => {
    setEditedText(e.target.value); // Update the state as user types
  };

  const handleSave = (comment_id) => {
    // You can call an API or dispatch an action here to save the edited comment
    console.log(commentId);
    console.log("Edited comment text:", editedText);

    dispatch(
      editComment({
        comment_data: { text: editedText },
        comment_id: comment_id,
      })
    );
    dispatch(fetchPost());
    handleClose(); // Close the modal after saving
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
        }}
        edge="end"
        aria-label="edit"
      >
        <EditIcon sx={{ fontSize: 16, color: "blue" }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Comment
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={editedText} // Controlled input using value
            onChange={handleTextChange} // Update the text as user types
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => handleSave(commentId)}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default EditComment;
