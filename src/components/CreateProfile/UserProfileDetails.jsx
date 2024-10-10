import { useEffect, useState } from "react";
import { Stack, Box, Typography, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../store/ProfileSlice";

function UserProfileDetails() {
  const dispatch = useDispatch();
  //   const [profileData, setProfileData] = useState([]);
  const profileData = useSelector((state) => state.profile.data);
  const baseURL = "http://localhost:8000";

  useEffect(() => {
    const getUserProfile = async () => {
      await dispatch(getProfile());
    };
    getUserProfile();
  }, []);

  useEffect(() => {
    dispatch(getProfile());
    console.log(profileData);
  }, [dispatch]);

  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        px={4}
        py={4}
        spacing={10}
      >
        <Stack width={"40%"} alignItems={"center"}>
          <Box
            component="img"
            src={`${baseURL}${profileData.profile_picture}`}
            alt="avatar"
            sx={{
              width: 250,
              height: 250,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Stack>
        <Stack
          direction={"column"}
          width={"40%"}
          spacing={1}
          justifyContent={"center"}
        >
          <Typography
            justifySelf="center" // This won't work unless it's in a grid or flex container
            fontFamily="sans-serif"
            fontWeight={400}
            fontSize={20}
            lineHeight={1.5} // Add line height for better readability
            color="primary.main" // Change the color to a primary theme color
            textAlign="center" // Center the text
            sx={{
              margin: "20px", // Add margin around the text
              padding: "10px", // Add padding for inner spacing
              border: "1px solid", // Optional: Add a border
              borderColor: "grey.300", // Optional: Set border color
              borderRadius: "5px", // Optional: Round the corners
              backgroundColor: "background.paper", // Optional: Set a background color
              transition: "0.3s", // Optional: Add a transition for hover effect
              "&:hover": {
                // Optional: Add hover effect
                backgroundColor: "grey.100",
              },
            }}
          >
            {profileData.full_name}
          </Typography>
          <Stack
            width="100%"
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={4} // Optional: add spacing between items
            sx={{
              padding: "20px", // Add padding around the stack
              backgroundColor: "background.default", // Set a background color
              borderRadius: "8px", // Round the corners of the stack
              boxShadow: 1, // Add a subtle shadow
            }}
          >
            <Box
              sx={{
                padding: "10px", // Add padding inside the box
                border: "1px solid", // Add a border
                borderColor: "grey.300", // Border color
                borderRadius: "5px", // Round corners of the box
                textAlign: "center", // Center text inside the box
                backgroundColor: "background.paper", // Box background color
                transition: "0.3s", // Transition for hover effect
                "&:hover": {
                  // Hover effect
                  backgroundColor: "grey.100",
                  transform: "scale(1.05)", // Slight scale on hover
                },
              }}
            >
              <Typography variant="body1" px={2}>
                {" "}
                {profileData.total_post}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "10px",
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: "5px",
                textAlign: "center",
                backgroundColor: "background.paper",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "grey.100",
                  transform: "scale(1.05)",
                },
              }}
            >
              <Typography variant="body1">
                Followers{" "}
                <Box
                  component="span"
                  sx={{
                    color: "primary.main", // Color for the number
                    fontWeight: "bold", // Bold the number for emphasis
                    fontSize: "15px", // Increase font size of the number
                    justifyContent: "center",
                    paddingX: "2px",
                  }}
                >
                  {profileData.followers_count}
                </Box>{" "}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "10px",
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: "5px",
                textAlign: "center",
                backgroundColor: "background.paper",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "grey.100",
                  transform: "scale(1.05)",
                },
              }}
            >
              <Typography variant="body1">
                Following{" "}
                <Box
                  component="span"
                  sx={{
                    color: "primary.main", // Color for the number
                    fontWeight: "bold", // Bold the number for emphasis
                    fontSize: "15px", // Increase font size of the number
                    justifyContent: "center",
                    paddingX: "2px",
                  }}
                >
                  {profileData.following_count}
                </Box>
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              padding: "15px", // Add padding for inner spacing
              marginTop: "20px", // Space from the previous section
              border: "1px solid", // Add a border around the bio
              borderColor: "grey.300", // Set the border color
              borderRadius: "5px", // Round the corners
              backgroundColor: "background.paper", // Background matching the theme
              textAlign: "center", // Center the bio text
              boxShadow: 1, // Subtle shadow to elevate the bio box
              transition: "0.3s", // Transition for hover effect
              "&:hover": {
                backgroundColor: "grey.100", // Change background color on hover
                transform: "scale(1.02)", // Slight scale on hover for interaction
              },
            }}
          >
            <Typography
              variant="body1"
              fontStyle="italic"
              fontFamily="sans-serif"
            >
              A passionate developer who loves building user-friendly interfaces
              and learning new technologies. This is where the bio content goes.
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Divider
        sx={{
          marginY: 2, // Vertical margin (top and bottom)
          borderColor: "grey.300", // Set the color of the divider line
          borderWidth: "1px", // Set the thickness of the divider
          width: "100%", // Make the divider full width
          borderStyle: "solid", // Ensure solid border style
          opacity: 0.8, // Optional: Reduce opacity for a softer look
        }}
      />
    </div>
  );
}

export default UserProfileDetails;
