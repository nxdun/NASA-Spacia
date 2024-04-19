import BodyImageView from "src/components/userSpace/subcomps/BodyImageView";
const LandingBody = () => {
  const h = 90;
  const top = 30;
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
    <div style={style1}>
    <BodyImageView /> 
    </div>
  );
};

export default LandingBody;
