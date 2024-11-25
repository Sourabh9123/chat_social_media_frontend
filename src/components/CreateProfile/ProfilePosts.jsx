import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Stack,
  Box,
  Typography,
  Divider,
  ImageList,
  ImageListItem,
} from "@mui/material";
import UserProfileDetails from "./UserProfileDetails";

function ProfilePosts() {
  useEffect(() => {
    console.log("need to get all post from user");
  }, []);
  const handleClick = (id) => {
    console.log(id);
  };
  return (
    <>
      <Stack
        width={"100vw"}
        alignItems={"center"}
        sx={{
          width: "100vw",
          height: "80vh",
          overflowY: "scroll",
          // Enables vertical scrolling
        }}
      >
        <Stack spacing={2} width={"80vw"}>
          <UserProfileDetails />
        </Stack>
        <Stack>
          <ImageList
            // variant="quilted"
            sx={{ width: 1000, height: 600 }}
            cols={5}
            rowHeight={164}
          >
            {itemData.map((item) => (
              <ImageListItem
                key={item.img.slice(0, 7)}
                onClick={() => handleClick(item.id)}
                sx={{ cursor: "pointer" }}
              >
                <img
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Stack>
      </Stack>
    </>
  );
}

const itemData = [
  {
    id: uuidv4(),
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    id: uuidv4(),
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    id: uuidv4(),
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    id: uuidv4(),
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    id: uuidv4(),
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    id: uuidv4(),
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    id: uuidv4(),
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    id: uuidv4(),
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    id: uuidv4(),
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    id: uuidv4(),
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    id: uuidv4(),
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    id: uuidv4(),
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
];

export default ProfilePosts;
