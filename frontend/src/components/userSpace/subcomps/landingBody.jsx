import BodyImageView from "src/components/userSpace/subcomps/BodyImageView";
 import ImageLists from "src/components/userSpace/subcomps/imageList";

const LandingBody = () => {
  const style1 = {
    height: `80vh`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: `16vh`,
    left: "0",
    zIndex: 4,
  };

  const style2 = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: `100vh`, // Position below the first skeleton
    left: "0",
    zIndex: 3,
  };
  return (
    <>
      <div style={style1}>
          <BodyImageView />
      </div>
      <div style={style2}>
        <ImageLists/>
      </div>
    </>
  );
};

export default LandingBody;
