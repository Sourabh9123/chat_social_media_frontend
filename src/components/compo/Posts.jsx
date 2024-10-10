import { useEffect, useState } from "react";
import Comment from "./CommentComponent";
import {
  Stack,
  Typography,
  Drawer,
  Divider,
  Button,
  CardMedia,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../store/PostSlice";
import AvatarSection from "../compo/AvatarSection";
import ActionButtons from "../compo/ActionButtons";

function Titile({ title }) {
  return (
    <>
      <Stack>
        <Typography variant="h6" pl={4} fontSize={14} fontFamily={"sans-serif"}>
          {title}
        </Typography>
      </Stack>
    </>
  );
}

function ImageSection({ image }) {
  // console.log(image, "image  --- >");
  return (
    <Stack width={"100%"} justifyContent={"center"} alignItems={"center"}>
      <CardMedia
        component="img"
        alt="green iguana"
        // image="avtar.jpg"
        image={image}
        sx={{
          height: "300px",
          width: "400px",
          objectFit: "contain",
        }}
      />
    </Stack>
  );
}

function Posts() {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState([]);

  const postsFromRedux = useSelector((state) => state.post.posts);
  const current_user = useSelector((state) => state.auth.user_id);

  useEffect(() => {
    const getAllPosts = async () => {
      await dispatch(fetchPost());
    };

    getAllPosts();
  }, [dispatch]);

  useEffect(() => {
    setPostData(postsFromRedux);
  }, [postsFromRedux]);

  return (
    <Stack
      key={uuidv4()}
      direction={"row"}
      spacing={2}
      width={"100%"}
      p={2}
      // justifyContent={"center"}
      // alignItems={"center"}
    >
      <Stack
        direction={"column"}
        spacing={1}
        width={"60%"}
        p={2}
        sx={{
          maxHeight: "450px", // Set the max height (adjust as needed)
          overflowY: "auto", // Enable vertical scrolling
          "&::-webkit-scrollbar": {
            width: "6px", // Width of the scrollbar
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1", // Scrollbar track color
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Scrollbar thumb (draggable part) color
            borderRadius: "10px", // Rounded edges for the thumb
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555", // Color when hovering over the scrollbar
          },
        }}
      >
        {postData
          ? postData.map((item) => (
              <>
                <AvatarSection
                  key={item.id.slice(0, 7)}
                  name={item.author.first_name + " " + item.author.last_name} // Accessing the item in the map function
                  created_at={item.created_at} // Accessing the item in the map function
                />
                <Divider flexItem />
                <Titile key={item.id.slice(0, 9)} title={item.title} />
                <ImageSection key={item.id} image={item.image} />
                <Divider flexItem />
                <ActionButtons
                  key={item.id.slice(0, 6)}
                  total_likes={item.total_likes}
                  liked_by={item.likes}
                  comments={item.comments}
                  total_comments={item.total_comments}
                  post_id={item.id}
                  saved_post={item.saved_post}
                  liked_by_me={item.likes.some(
                    (i) => i.user.id === current_user
                  )}
                />
              </>
            ))
          : null}
      </Stack>

      <Stack
        width={"40%"}
        direction={"column"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        opend
      </Stack>
    </Stack>
  );
}

export default Posts;
