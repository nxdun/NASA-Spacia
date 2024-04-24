import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { ButtonGroup } from "@mui/material";
import MarsRenderResult from "src/components/userSpace/subcomps/MarsRenderResult";

const MarsTopCards = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(null);
  const [selectedRover, setSelectedRover] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  // Display card data
  const cardData = [
    {
      id: 1,
      image: "../../../public/rover-o.jpg",
      title: "Opportunity Rover",
      description:
        "Meet Opportunity, the resilient explorer roaming the Martian surface since 2004. This intrepid robot has defied all odds, surviving dust storms and harsh conditions to unveil the secrets of Mars. With its keen eye and unwavering spirit, Opportunity continues to inspire generations with its groundbreaking discoveries.",
      buttons: [
        "Front Hazard Avoidance Camera",
        "Rear Hazard Avoidance Camera",
        "Navigation Camera",
        "Panoramic Camera",
        "Miniature Thermal Emission Spectrometer (Mini-TES)",
      ],
    },
    {
      id: 2,
      image: "../../../public/rover-c.jpg",
      title: "Curiosity Rover",
      description:
        "Curiosity, the modern marvel of Martian exploration, is not just a robot; it's a testament to human ingenuity and curiosity. Armed with cutting-edge instruments and an insatiable thirst for knowledge, Curiosity has been unraveling the mysteries of Mars since its touchdown in 2012. From ancient lakebeds to towering mountains",
      buttons: [
        "Front Hazard Avoidance Camera",
        "Rear Hazard Avoidance Camera",
        "Mast Camera",
        "Chemistry and Camera Complex",
        "Mars Hand Lens Imager",
        "Mars Descent Imager",
        "Navigation Camera",
      ],
    },
    {
      id: 3,
      image: "../../../public/rover-s.png",
      title: "Spirit Rover",
      description:
        "Spirit, the pioneering rover that blazed a trail on the Martian frontier, embodies the spirit of exploration and discovery. From its humble beginnings in 2004, Spirit ventured into the unknown, traversing rugged terrain and enduring Martian winters to unlock the secrets of the red planet. Though silent now, Spirit's legacy lives on",
      buttons: [
        "Front Hazard Avoidance Camera",
        "Rear Hazard Avoidance Camera",
        "Navigation Camera",
        "Panoramic Camera",
        "Miniature Thermal Emission Spectrometer (Mini-TES)",
      ],
    },
  ];

  // Button click handler
  const handleButtonClick = (id, roverTitle) => {
    if (showMoreInfo === id) {
      setShowMoreInfo(null);
      setSelectedRover(null);
      setSelectedButton(null);
    } else {
      setShowMoreInfo(id);
      setSelectedRover(roverTitle);
      setSelectedButton(null);
    }
  };

  // Button click handler for camera buttons
  const handleCameraButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div style={{ paddingTop: "10vh", overflowY: "hidden" }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8} lg={10}>
          <Card
            sx={{
              position: "relative",
              overflow: "visible",
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
          >
            <Grid container spacing={2}>
              {cardData.map((data) => (
                <Grid item xs={12} md={4} key={data.id}>
                  <Card
                    sx={{
                      backgroundColor:
                        showMoreInfo === data.id
                          ? "rgba(234, 234, 234, 0.3)"
                          : "rgba(234, 234, 234, 0.05)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      transition:
                        "transform 0.3s ease, background-color 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        backgroundColor: "rgba(234, 234, 234, 0.25)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="Card image"
                      height="140"
                      image={data.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {data.title}
                      </Typography>
                      <Typography variant="body2" color="grey">
                        {data.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => handleButtonClick(data.id, data.title)}
                      >
                        {showMoreInfo === data.id ? "Hide Info" : "Learn More"}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
          {showMoreInfo !== null && (
            <Slide
              direction="up"
              in={showMoreInfo !== null}
              mountOnEnter
              unmountOnExit
            >
              <Card
                sx={{
                  position: "relative",
                  marginTop: "20px",
                  backgroundColor: "rgba(234, 234, 234, 0.15)",
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
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ textAlign: "center" }}
                  >
                    Cameras on {selectedRover}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ButtonGroup
                    variant="text"
                    aria-label="text button group"
                    color="secondary"
                  >
                    {cardData
                      .find((data) => data.id === showMoreInfo)
                      ?.buttons.map((button, index) => (
                        <Button
                          key={index}
                          size="small"
                          onClick={() => handleCameraButtonClick(button)}
                        >
                          {button}
                        </Button>
                      ))}
                  </ButtonGroup>
                </CardActions>
              </Card>
            </Slide>
          )}
          {selectedButton && (
            <MarsRenderResult
              rover={selectedRover}
              button={selectedButton}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MarsTopCards;
