import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const MarsRenderResult = ({ rover, button }) => {
  console.log(rover, button);

  const ButtonAbbr = {
    "FHAZ": "Front Hazard Avoidance Camera",
    "RHAZ": "Rear Hazard Avoidance Camera",
    "MAST": "Mast Camera",
    "CHEMCAM": "Chemistry and Camera Complex",
    "MAHLI": "Mars Hand Lens Imager",
    "MARDI": "Mars Descent Imager",
    "NAVCAM": "Navigation Camera",
    "PANCAM": "Panoramic Camera",
    "MINITES": "Miniature Thermal Emission Spectrometer (Mini-TES)",
  };

  //get the abbreviation for the given full name
    const getAbbr = (name) => {
        return Object.keys(ButtonAbbr).find((key) => ButtonAbbr[key] === name);
    };
  return (
    <div style={{ paddingTop: "20px" }}>
      <Card
        sx={{
          backgroundColor: "rgba(234, 234, 234, 0.3)",
          color: "white",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Selected Rover: {rover}
          </Typography>
          <Typography variant="body2" color="grey">
            Selected Button: {button} ({getAbbr(button)})
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

MarsRenderResult.propTypes = {
  rover: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
};

export default MarsRenderResult;
