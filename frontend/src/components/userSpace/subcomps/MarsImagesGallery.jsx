import { useRef } from "react";
import propval from "prop-types";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "src/styles/image-gallery.css";
import {
  useMarsRoverPics,
  sendImageToServer,
} from "src/services/fetchFromServers";
import { Fab, Skeleton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

/*
 * MarsImagesGallery component displays the images of the Mars rover
 * @param {object} p - The props object
 * @returns {JSX.Element} - The JSX element
 */
const MarsImagesGallery = (p) => {
  const images = [];
  const { imageUrls } = useMarsRoverPics(p);
  imageUrls.forEach((url) => {
    images.push({
      title:`IMG: ${p.rover} + ${p.button}`,
      original: url.img_src,
      thumbnail: url.img_src,
    });
  });
  const imageGalleryRef = useRef(null);

  //SAVE IMAGE TO SERVER
  const handlePlusClick = () => {
    const currentIndex = imageGalleryRef.current.getCurrentIndex();
    console.log("cccurrentIndex\n", images[currentIndex].title,images[currentIndex].original );
    //add image to the server user db
    if (images[currentIndex]) {
      sendImageToServer(
        //set current rover + camtype as title
        images[currentIndex].title
        ,
        images[currentIndex].original
      );
    }
  };

  return (
    <>
      {images.length > 0 && (
        <>
          <ImageGallery
            
            ref={imageGalleryRef}
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            thumbnailPosition="left"
          />
          <Tooltip title="Save Image" aria-label="add">
            <Fab
              color="primary"
              aria-label="add"
              style={{ position: "absolute", right: "20px", bottom: "20px" }}
              onClick={handlePlusClick}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </>
      ) || <Skeleton variant="rectangular" width={"100%"} height={"50vh"} />}
    </>
  );
};

export default MarsImagesGallery;

MarsImagesGallery.propTypes = {
  p: propval.object,
};
