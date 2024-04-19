import { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
const Header = () => {
  const logsOut = () => {
    window.location.href = "/logout";
  };
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      sx={{
        background: "rgba(234, 234, 234, 0.1)", // Semi-transparent background color
        backdropFilter: "blur(10px)", // Apply background blur
        WebkitBackdropFilter: "blur(10px)", // Webkit version for Safari
        boxShadow: "none", // Remove box shadow to maintain the glass effect
        position: "absolute",
        width: "100%",
        zIndex: 1, // Ensure the AppBar stays on top of other content
      }}
    >
      <Toolbar>
        <PublicRoundedIcon sx={{ transform: "scale(2)" }} />
        {isMatch ? (
          <>
            <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
              Spacia
            </Typography>
          </>
        ) : (
          <>
            <Tabs
              sx={{ marginLeft: "auto" }}
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Tab label="Nasa Image of the day" />
              <Tab label="api2" />
            </Tabs>
            <Button
              sx={{
                marginLeft: "auto",
                background: "rgba(255, 46, 99, 0.3)", // Semi-transparent background color
                backdropFilter: "blur(10px)", // Apply background blur
                WebkitBackdropFilter: "blur(10px)", // Webkit version for Safari
                boxShadow: "none", // Remove box shadow to maintain the glass effect
                zIndex: 1,
              }}
              variant="contained"
              onClick={logsOut}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
