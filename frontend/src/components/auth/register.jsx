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
      image: "../../../../public/image1.jpg",
      title: "Title 1",
      description: "Description for Card 1",
      handleClick: () => handleButtonClick(1),
    },
    {
      image: "../../../../public/image2.jpg",
      title: "Title 2",
      description: "Description for Card 2",
      handleClick: () => handleButtonClick(2),
    },
    {
      image: "../../../../public/image3.jpg",
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
        <Card sx={{
          opacity: 0.8,
          background: "rgba(234, 234, 234, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "none",
        }}>
          <Grid container spacing={2}>
            {cardData.map((data, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
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
