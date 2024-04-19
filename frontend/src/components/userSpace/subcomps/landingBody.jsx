import { Box, Skeleton } from "@mui/material";

const landingBody = () => {
  const h = 50;
  const top = 9;
  const style1 = {
    height: `${h}vh`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: `${top}vh`,
    left: "0",
  };

  const style2 = {
    height: `${h}vh`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: `${h + top}vh`, // Position below the first skeleton
    left: "0",
  };


  return (
    <>
      <Box>
       
      </Box>

      <Box>
        <Skeleton
          style={style2}
          sx={{ bgcolor: "white" }}
          variant="rectangular"
          position="absolute"
        />
      </Box>
    </>
  );
};

export default landingBody;
