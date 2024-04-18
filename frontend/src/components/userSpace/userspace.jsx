import Header from "src/components/userSpace/subcomps/header";
import DailyLanding from "src/components/userSpace/subcomps/dailyLanding";
import ImageList from "src/components/userSpace/subcomps/imageList";
import Footer from "src/components/userSpace/subcomps/footer";
import { Container } from "@mui/material";

const userspace = () => {
  return (
    <Container>
      <Header />
      <DailyLanding />
      <ImageList />
      <Footer />
    </Container>
  );
};

export default userspace;
