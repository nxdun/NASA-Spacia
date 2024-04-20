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
import { ping } from "ldrs";

import "src/styles/index.css";
import proptypes from "prop-types";

const Header = ({ value, setValue, logsOut }) => {
  ping.register();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

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
        <l-ping
          size="45"
          speed="2"
          color="pink"
          sx={{ transform: "scale(2)" }}
        ></l-ping>

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
            <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
              Spacia
            </Typography>
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
