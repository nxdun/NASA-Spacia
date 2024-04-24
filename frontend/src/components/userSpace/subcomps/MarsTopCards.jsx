import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const MarsTopCards = () => {
  const cardData = [
    {
      image: "../../../../public/spacia.png",
      title: "Title 1",
      description: "Description for Card 1",
      handleClick: () => handleButtonClick(1),
    },
    {
      image: "../../../../public/spacia.png",
      title: "Title 2",
      description: "Description for Card 2",
      handleClick: () => handleButtonClick(2),
    },
    {
      image: "../../../../public/spacia.png",
      title: "Title 3",
      description: "Description for Card 3",
      handleClick: () => handleButtonClick(3),
    },
  ];

  const handleButtonClick = (cardIndex) => {
    // Function to handle button click for each card
    console.log(`Button clicked for card ${cardIndex}`);
    // Replace this with your desired functionality
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={8} lg={6}>
        <Card sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <Grid container spacing={2}>
            {cardData.map((data, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="Card image"
                    height="140"
                    image={data.image}
                    fontSize="large"
                    color="primary"
                    backgroundColor="white"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={data.handleClick}>
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MarsTopCards;
