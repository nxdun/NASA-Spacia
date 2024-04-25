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
import { hatch } from "ldrs";

import "src/styles/index.css";
import proptypes from "prop-types";

const Header = ({ value, setValue, logsOut }) => {
  hatch.register();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const username = localStorage.getItem("username");

  return (
    <AppBar
      sx={{
        background: "rgba(234, 234, 234, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "none",
        position: "absolute",
        width: "100%",
        zIndex: 1,
      }}
    >
      <Toolbar>
        <l-hatch size="28" stroke="4.5" speed="3.5" color="white"></l-hatch>

        {isMatch ? (
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
          </>
        ) : (
          <>
            <Typography
              sx={{ fontSize: "2rem", paddingLeft: "10%", color: "grey" }}
            >
              {
                //if username is not null, display the username
                username ? `Welcome ${username}` : " stranger"
              }
            </Typography>
            <Tabs
              sx={{ marginLeft: "auto" }}
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Tab label="Nasa Image of the day" />
              <Tab label="Mars Rover Photos" />
            </Tabs>
            <Button
              sx={{
                marginLeft: "auto",
                background: "rgba(255, 46, 99, 0.3)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "none",
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

//validate prop types
Header.propTypes = {
  value: proptypes.number,
  setValue: proptypes.func,
  logsOut: proptypes.func,
};
