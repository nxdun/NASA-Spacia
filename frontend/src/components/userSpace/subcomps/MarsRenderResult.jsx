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

const MarsRenderResult = ({ rover, button }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isValidDate, setIsValidDate] = useState(true);

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

  const roverMissionDates = {
    Opportunity: { start: "2004-01-25", end: "2018-06-10" },
    Curiosity: { start: "2012-08-06", end: "2023-04-24" },
    Spirit: { start: "2004-01-04", end: "2010-03-22" },
  };

  const getRoverDatePeriod = (rover) => {
    const { start, end } = roverMissionDates[rover];
    return `Mission Period: ${start} to ${end}`;
  };

  const getAbbr = (name) => {
    return Object.keys(ButtonAbbr).find((key) => ButtonAbbr[key] === name);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    validateDate(date);
  };

  const validateDate = (date) => {
    const roverDates = roverMissionDates[rover];
    if (roverDates) {
      const startDate = new Date(roverDates.start);
      const endDate = new Date(roverDates.end);
      setIsValidDate(date >= startDate && date <= endDate);
    }
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              style={{ display: "flex", justifyContent: "center" }} // Use flexbox for centering
            >
              <DatePicker
                label="Select Date"
                renderInput={(params) => <TextField {...params} style={{ textAlign: "center" }}/>}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Typography gutterBottom variant="h5" component="div">
            {rover && getRoverDatePeriod(rover)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isValidDate}
          >
            Fetch Images
          </Button>
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
