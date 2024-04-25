import { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import MarsImagesGallery from "src/components/userSpace/subcomps/MarsImagesGallery";
import MarsImagesForDate from "src/components/userSpace/subcomps/MarsImagesGallery";
// import AnotherComponent from "./AnotherComponent"; // Import the AnotherComponent here

const MarsRenderResult = ({ rover, button }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isValidDate, setIsValidDate] = useState(false);
  const [showAll, setShowAll] = useState(false); // State to control showing all images
  const [showSelected, setShowSelected] = useState(false); // State to control showing selected date component

  // Contains all abbreviations for the buttons with their full names
  const ButtonAbbr = {
    FHAZ: "Front Hazard Avoidance Camera",
    RHAZ: "Rear Hazard Avoidance Camera",
    MAST: "Mast Camera",
    CHEMCAM: "Chemistry and Camera Complex",
    MAHLI: "Mars Hand Lens Imager",
    MARDI: "Mars Descent Imager",
    NAVCAM: "Navigation Camera",
    PANCAM: "Panoramic Camera",
    MINITES: "Miniature Thermal Emission Spectrometer (Mini-TES)",
  };

  // Contains all the mission dates for the rovers
  const roverMissionDates = {
    Opportunity: { start: "2004-01-25", end: "2018-06-10" },
    Curiosity: { start: "2012-08-06", end: "2023-04-24" },
    Spirit: { start: "2004-01-04", end: "2010-03-22" },
  };

  // Get the mission period for the rover
  const getRoverDatePeriod = (rover) => {
    const { start, end } = roverMissionDates[rover];
    return `Mission Period: ${start} to ${end}`;
  };

  // Get the abbreviation for the button
  const getAbbr = () => {
    return Object.keys(ButtonAbbr).find((key) => ButtonAbbr[key] === button);
  };

  // Handle date change event
  const handleDateChange = (date) => {
    setSelectedDate(date);
    validateDate(date);
  };

  // Validate the date
  const validateDate = (date) => {
    const roverDates = roverMissionDates[rover];
    if (roverDates) {
      const startDate = new Date(roverDates.start);
      const endDate = new Date(roverDates.end);
      setIsValidDate(date >= startDate && date <= endDate);
    }
  };

  // Handle fetch all images
  const handleFetchAll = () => {
    setShowAll(true);
    setShowSelected(false); // Hide selected date component if visible
  };

  // Handle fetch images for selected date
  const handleFetchSelected = () => {
    setShowSelected(true);
    setShowAll(false); // Hide all images component if visible
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
        <CardContent style={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleFetchAll}
          >
            Fetch All Images For {button}
          </Button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography gutterBottom variant="h5" component="div" style={{color:"grey"}}>
              {rover && getRoverDatePeriod(rover)}
            <DemoContainer
              components={["DatePicker"]}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <DatePicker
                label="Select Date"
                renderInput={(params) => (
                  <TextField {...params} style={{ textAlign: "center" }} />
                )}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </DemoContainer>
                </Typography >
          </LocalizationProvider>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleFetchSelected}
            onChange={handleDateChange}
            disabled={!isValidDate}
          >
            Fetch For {button} on Selected Date
          </Button>

          {/* Conditionally render components based on state */}
          {showAll && (
            <MarsImagesGallery
              rover={rover.toString()}
              button={getAbbr()}
            />
          )}
          {showSelected && (
            <MarsImagesForDate
            rover={rover.toString()}
            button={getAbbr()}
            date={selectedDate}
          />
          )}
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
