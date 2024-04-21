import { useEffect, useState, useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "src/styles/image-gallery.css";
import { useFetchFromNasaApi } from "src/services/fetchFromServers";
import "src/assets/spacia.svg";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const BodyImageView = () => {
  const { loading, imageUrls } = useFetchFromNasaApi();
  const [images, setImages] = useState([]);
  const imageGalleryRef = useRef(null);
  const plusClick = () => { 
    console.log("plus clicked current url:", images[imageGalleryRef.current.getCurrentIndex()]);
  }

  useEffect(() => {
    if (!loading) {
      console.log("Image urls:", imageUrls);
      // Convert imageUrls to ImageGallery items
      const imageItems = imageUrls.map((url) => ({
        original: url.hdurl,
        thumbnail: url.thumb,
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
      <Fab color="primary" aria-label="add" sx={{position : "sticky" }} onClick={plusClick}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default BodyImageView;
