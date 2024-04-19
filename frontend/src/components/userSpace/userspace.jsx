// Userspace component
import Header from "src/components/userSpace/subcomps/header";
import LandingBody from "src/components/userSpace/subcomps/landingBody";
// import Footer from "src/components/userSpace/subcomps/footer";
import { Container, Grid } from "@mui/material";
import "src/styles/index.css";

const Userspace = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <LandingBody />
        </Grid>
        {/* <Footer /> */}
      </Grid>
    </Container>
  );
};

export default Userspace;
