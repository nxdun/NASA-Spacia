import Header from "src/components/userSpace/subcomps/header";
// import DailyLanding from "src/components/userSpace/subcomps/dailyLanding";
// import ImageList from "src/components/userSpace/subcomps/imageList";
// import Footer from "src/components/userSpace/subcomps/footer";
import { Container, Grid, Skeleton } from "@mui/material";
import "src/styles/index.css";

const Userspace = () => {
  return (
    <Container width>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item xs={12}>
          <Skeleton
            sx={{ bgcolor: "pink" }}
            variant="rectangular"
            width="100%"
            height="90vh"
          />
        </Grid>

        <Grid item xs={12}>
          <Skeleton
            sx={{ bgcolor: "black" }}
            variant="rectangular"
            width="100%"
            height="800px"
          />
        </Grid>

        <Grid item xs={12}>
          <Skeleton
            sx={{ bgcolor: "yellow" }}
            variant="rectangular"
            width="100%"
            height="10vh"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Userspace;
