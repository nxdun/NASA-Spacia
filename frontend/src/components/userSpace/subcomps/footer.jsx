import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Footer = () => {
  const [isAppBarVisible, setIsAppBarVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrollAtEnd =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setIsAppBarVisible(isScrollAtEnd);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      sx={{
        background: "rgba(234, 234, 234, 1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "none",
        position: "fixed",
        bottom: 0,
        height: "5vh",
        top: "auto",
        width: "100%",
        zIndex: 1,
        visibility: isAppBarVisible ? "visible" : "hidden",
      }}
    >
      <Toolbar>
        {isMatch ? (
          <>
            <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
              Spacia
            </Typography>
          </>
        ) : (
          <>{/* additional content here for larger screens */}</>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
