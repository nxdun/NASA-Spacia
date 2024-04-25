import propval from "prop-types";
import { useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "src/styles/image-gallery.css";
import { useMarsRoverPics } from "src/services/fetchFromServers";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


const MarsImagesGallery = (p) => {
  const images = [];
  const { loading, imageUrls } = useMarsRoverPics(p);
  imageUrls.forEach((url) => {
    images.push({
      original: url.img_src,
      thumbnail: url.img_src,
    });
  });
  console.log("..images", images);
  console.log("..loading", loading);
  // const imageGalleryRef = useRef(null);

  //SAVE IMAGE TO SERVER
  const handlePlusClick = () => {
    // const currentIndex = imageGalleryRef.current.getCurrentIndex();
    // console.log("currentIndex", currentIndex);
    // //add image to the server user db
    // if (images[currentIndex]) {
    //   sendImageToServer(
    //     images[currentIndex].title,
    //     images[currentIndex].original
    //   );
    // }
  };



  return (
    <>
      <ImageGallery
        // ref={imageGalleryRef}
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

export default MarsImagesGallery;

MarsImagesGallery.propTypes = {
  p: propval.object,
};
