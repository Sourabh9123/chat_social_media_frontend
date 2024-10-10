import { useRef } from "react";
import { Stack, Input } from "@mui/material";
import { faker } from "@faker-js/faker";

function Comment({ comment }) {
  const commentRef = useRef();

  const HandleSubmitComment = (event) => {
    if (event.key === "Enter") {
      // Ensure the ref is defined

      console.log("msg send to server... -> ", commentRef.current.value);
      commentRef.current.value = "";
    }
  };

  return (
    <Stack pt={4} pl={3} width={"100%"} spacing={2}>
      <Input
        type="text"
        inputRef={commentRef}
        fullWidth
        placeholder="comment here...  "
        onKeyDown={HandleSubmitComment}
      />

      <Stack>
        {/* {comment.map((text, index) => {
          return (
            <Stack pl={3} key={index}>
              text.text
            </Stack>
          );
        })} */}
      </Stack>
    </Stack>
  );
}

export default Comment;
