import React from "react";
import {
  Stack,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import Container from "@mui/material/Container";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleprofileClick = () => {
    navigate("/profile");
    console.log("profile clicked");
  };

  const navigateToHome = () => {
    navigate("/");
    console.log("profile clicked");
  };

  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={4}
      p={2}
      sx={{
        width: "100%",
        height: "70px",
        bgcolor: "#d5d9e0",
        color: "black",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        spacing={2}
        alignItems={"center"}
      >
        <IconButton
          sx={{
            width: 40,
            height: 40,
          }}
          onClick={navigateToHome}
        >
          <Box
            component="img"
            src="avtar.jpg"
            alt="avatar"
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "serif",
            fontWeight: "500",
            letterSpacing: "2px",
          }}
        >
          Chatify
        </Typography>
      </Stack>
      <Stack flexGrow={1} justifyContent={"center"} alignItems={"center"}>
        <TextField
          size="small"
          color="primary"
          label="Search here..."
          onChange={(e) => console.log(e.target.value)}
          // variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Search"
                  color="primary"
                  onClick={() => console.log(" search clicked")}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: "30vw", // Set the width

            // Control the width
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px", // Rounder border
              fontSize: "13px", // Smaller font size
              padding: "2px 20px", // Adjust padding for smaller height
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "blue", // Default underline color
            },

            "& .MuiInputLabel-root": {
              fontSize: "14px", // Smaller label font
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "blue", // Hover color (when not focused)
            },
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={6}
      >
        <IconButton
          onClick={handleprofileClick}
          color="primary"
          sx={{
            width: "20px",
          }}
        >
          <PersonIcon />
        </IconButton>
        <IconButton
          onClick={() => console.log(" chat  clicked")}
          color="primary"
          sx={{
            width: "20px",
          }}
        >
          <Badge
            badgeContent={1}
            max={10}
            color="success"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.6rem",
                height: "15px",
                minWidth: "15px",
                padding: "0 4px",
              },
            }}
          >
            <GroupAddIcon />
          </Badge>
        </IconButton>
        <IconButton
          onClick={() => console.log(" chat  clicked")}
          color="primary"
          sx={{
            width: "20px",
          }}
        >
          <Badge
            badgeContent={1}
            max={10}
            color="success"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.6rem",
                height: "15px",
                minWidth: "15px",
                padding: "0 4px",
              },
            }}
          >
            <ChatIcon />
          </Badge>
        </IconButton>

        <IconButton
          onClick={() => console.log(" Notification clicked")}
          color="primary"
          sx={{
            width: "20px",
          }}
        >
          <Badge
            badgeContent={100}
            max={99}
            color="success"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.6rem",
                height: "15px",
                minWidth: "15px",
                padding: "0 4px",
              },
            }}
          >
            <NotificationsActiveIcon />
          </Badge>
        </IconButton>
        <IconButton
          color="primary"
          sx={{
            width: "20px",
          }}
          onClick={() => console.log(" Setting clicked")}
          size="small"
        >
          <Badge
            badgeContent={1}
            max={10}
            color="success"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.6rem",
                height: "15px",
                minWidth: "15px",
                padding: "0 4px",
              },
            }}
          >
            {" "}
            <SettingsIcon />
          </Badge>
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default Header;
