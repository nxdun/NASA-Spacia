import { useEffect, useState, useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "src/styles/image-gallery.css";
import { useFetchFromNasaApi, sendImageToServer } from "src/services/fetchFromServers";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const BodyImageView = () => {
  const { loading, imageUrls } = useFetchFromNasaApi();
  const [images, setImages] = useState([]);
  const imageGalleryRef = useRef(null);

  // Send the current image to the server when the plus button is clicked
  const handlePlusClick = () => { 
    const currentIndex = imageGalleryRef.current.getCurrentIndex();
    if (images[currentIndex]) {
      sendImageToServer(images[currentIndex].title, images[currentIndex].original);
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
        onErrorImageURL="src/assets/spacia.svg"
      />
      <Fab color="primary" aria-label="add" sx={{ position: "sticky" }} onClick={handlePlusClick}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default BodyImageView;
