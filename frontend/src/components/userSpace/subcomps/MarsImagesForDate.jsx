import { useRef } from "react";
import propval from "prop-types";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "src/styles/image-gallery.css";
import {
  useMarsRoverPicsVariant,
  sendImageToServer,
} from "src/services/fetchFromServers";
import { Fab, Skeleton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

/*
 * MarsImagesGallery component displays the images of the Mars rover
 * @param {object} p - The props object
 * @returns {JSX.Element} - The JSX element
 */
const MarsImagesForDate = (p) => {
  const images = [];
  const { loading, imageUrls } = useMarsRoverPicsVariant(p);
  imageUrls.forEach((url) => {
    images.push({
      original: url.img_src,
      thumbnail: url.img_src,
    });
  });
  console.log("..images", images);
  console.log("..loading", loading);
  const imageGalleryRef = useRef(null);

  //SAVE IMAGE TO SERVER
  const handlePlusClick = () => {
    const currentIndex = imageGalleryRef.current.getCurrentIndex();
    console.log("currentIndex", currentIndex);
    //add image to the server user db
    if (images[currentIndex]) {
      sendImageToServer(
        images[currentIndex].title,
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

export default MarsImagesForDate;

MarsImagesForDate.propTypes = {
  p: propval.object,
};
