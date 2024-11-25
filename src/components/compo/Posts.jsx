import { useEffect, useState } from "react";
import Comment from "./CommentComponent";
import { faker } from "@faker-js/faker";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazyload";
import {
  Stack,
  Typography,
  Drawer,
  Divider,
  Button,
  CardMedia,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { getSuggestion } from "../../store/suggestionSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, cleanOldPosts } from "../../store/PostSlice";
import AvatarSection from "../compo/AvatarSection";
import ActionButtons from "../compo/ActionButtons";
import { useInView } from "react-intersection-observer";

function Titile({ title }) {
  return (
    <>
      <Stack key={uuidv4()}>
        <Typography variant="h6" pl={4} fontSize={14} fontFamily={"sans-serif"}>
          {title}
        </Typography>
      </Stack>
    </>
  );
}

function ImageSection({ image }) {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only load once
    threshold: 0.1, // Load when 10% of the component is in view
  });

  return (
    <Stack
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      ref={ref}
    >
      {inView ? (
        <CardMedia
          component="img"
          alt="green iguana"
          image={image}
          sx={{
            height: "300px",
            width: "400px",
            objectFit: "contain",
          }}
        />
      ) : (
        <div style={{ height: "300px", width: "400px", background: "#f0f0f0" }}>
          Loading...
        </div>
      )}
    </Stack>
  );
}

function Posts() {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState([]);
  const url = "http://localhost:8000/post/"; // base url

  const postsFromRedux = useSelector((state) => state.post.posts);
  const current_user = useSelector((state) => state.auth.user_id);
  const nextUrl = useSelector((state) => state.post.next);
  const [hasMore, setHasMore] = useState(false);
  // const [posts, setPosts] = useState([]);
  // console.log(nextUrl, "-------------next");

  const unMount = () => {
    dispatch(cleanOldPosts());
    // console.log("unmount---------------------------- successfully");
  };
  useEffect(() => {
    const getAllPosts = async () => {
      await dispatch(fetchPost(url));
    };

    getAllPosts();
    return () => {
      unMount();
    };
  }, [dispatch]);

  useEffect(() => {
    setPostData(postsFromRedux);
    if (nextUrl) {
      setHasMore(true);
      // console.log("has more ------------------- true  and nexturl", nextUrl);
    }
  }, [postsFromRedux]);

  const fetchMoreData = async () => {
    // console.log("inside fratch more ------------");
    if (!nextUrl) return; // Stop fetching if no next URL is available

    const result = await dispatch(fetchPost(nextUrl)).unwrap();

    // Update state with the new posts and next URL
    // setPosts((prevPosts) => [...prevPosts, ...result.results]); // Assuming `results` contains posts
    // setPostData((prevPosts) => [...prevPosts, ...result.results]);
    // setNextUrl(result.next); // Assuming `next` contains the next page URL
    if (!result.next) {
      setHasMore(false); // Stop fetching when there's no next page
    }
  };
  // console.log(postData.length, " length --------------------------");

  return (
    <InfiniteScroll
      dataLength={postData.length} //This is important field to render the next data
      next={fetchMoreData}
      hasMore={hasMore}
      scrollThreshold={0.3}
      loader={<h4>Loading...</h4>}
      scrollableTarget="scrollableDiv" // Specify the target container
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Stack key={uuidv4()}>
        {postData
          ? postData.map((item) => (
              <Stack key={item.id}>
                {" "}
                {/* Key should only be here */}
                <AvatarSection
                  id={item.author.id}
                  name={item.author.username} // Accessing the item in the map function
                  created_at={item.created_at} // Accessing the item in the map function
                  // src={faker.image.avatar()}
                  img={item.author.profile_picture}
                />
                <Divider flexItem />
                <Titile title={item.title} />
                <ImageSection image={item.image} />
                <Divider flexItem />
                <ActionButtons
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
              </Stack>
            ))
          : null}
      </Stack>
    </InfiniteScroll>
  );
}

export default Posts;
