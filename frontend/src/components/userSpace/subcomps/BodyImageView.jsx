import { useEffect, useState, useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "src/styles/image-gallery.css";
import {
  useFetchFromNasaApi,
  sendImageToServer,
} from "src/services/fetchFromServers";
import { Fab, Tooltip  } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const BodyImageView = () => {
  const { loading, imageUrls } = useFetchFromNasaApi();
  const [images, setImages] = useState([]);
  const imageGalleryRef = useRef(null);

  // Send the current image to the server when the plus button is clicked
  const handlePlusClick = () => {
    const currentIndex = imageGalleryRef.current.getCurrentIndex();
    //add image to the server user db
    if (images[currentIndex]) {
      sendImageToServer(
        images[currentIndex].title,
        images[currentIndex].original
      );
    }
  };

  //hook to update the images
  useEffect(() => {
    if (!loading) {
      console.log("Image urls:", imageUrls);
      const imageItems = imageUrls.map((url) => ({
        original: url.hdurl,
        thumbnail: url.thumb,
        title: url.title,
      }));
      setImages(imageItems);
    }
  }, [loading, imageUrls]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ImageGallery
        ref={imageGalleryRef}
        items={images}
        thumbnailPosition="left"
        autoPlay="true"
        autoPlayInterval="5000"
        onErrorImageURL="src/assets/spacia.svg"
      />
      <Tooltip title="Save to your collection" arrow>
      <Fab

        aria-label="add"
        sx={{
          backgroundColor: "#FF2E63",
          position: "absolute",
          bottom: "5vh",
          right: "5vh", 
        }}
        onClick={handlePlusClick}
      >
        {" "}
        <AddIcon />
      </Fab>
      </Tooltip>
    </>
  );
};

export default BodyImageView;
