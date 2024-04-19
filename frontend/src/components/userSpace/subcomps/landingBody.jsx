import { Skeleton } from "@mui/material";
import BodyImageView from "src/components/userSpace/subcomps/BodyImageView";

const LandingBody = () => {
  const h = 69;
  const top = 0;
  const style1 = {
    height: `69vh`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: `30vh`,
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
      <div style={style1}>
        <BodyImageView />
      </div>
      <div style={style2}>
        <Skeleton variant="rectangular" sx={{ bgcolor: "yellow" }}style={style2}/>
      </div>
    </>
  );
};

export default LandingBody;
