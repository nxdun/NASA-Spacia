import { useState } from "react";
import LandingBody from "src/components/userSpace/subcomps/landingBody";
import MarsRoverPics from "src/components/userSpace/subcomps/MarsRoverPics";
import { Container, Grid } from "@mui/material";
import Header from "src/components/userSpace/subcomps/header";
//TODO:change value 1 to 0
//added it for debug purposes
const Userspace = () => {
  const [value, setValue] = useState(0); // Initially, show the LandingBody component 

  const logsOut = () => {
    window.location.href = "/logout";
  };



  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header value={value} setValue={setValue} logsOut={logsOut} />
        </Grid>
        <Grid item xs={12}>
          {value === 0 ? <LandingBody /> : <MarsRoverPics />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Userspace;
