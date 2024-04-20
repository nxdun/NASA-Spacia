import { useState } from "react";
import LandingBody from "src/components/userSpace/subcomps/landingBody";
import { Container, Grid, Skeleton } from "@mui/material";
import Header from "src/components/userSpace/subcomps/header";
// import DynamicBackdrop from "src/components/common/backdrop";

const Userspace = () => {
  const [value, setValue] = useState(0); // Initially, show the LandingBody component
  // const [loading, setLoading] = useState(false); //loadintg state

  const logsOut = () => {
    window.location.href = "/logout";
  };

  const style2 = {
    height: `800px`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: `10vh`,
    left: "0",
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header value={value} setValue={setValue} logsOut={logsOut}  />
        </Grid>
        <Grid item xs={12}>
          {value === 0 ? (
            <LandingBody />
          ) : (
            <Skeleton
          variant="rectangular"
          sx={{ bgcolor: "green" }}
          style={style2}
        />
          )}
        </Grid>
      </Grid>
      {/* <DynamicBackdrop open={loading} /> */}
    </Container>
  );
};

export default Userspace;
