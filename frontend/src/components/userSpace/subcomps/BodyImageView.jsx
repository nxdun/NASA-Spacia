import  { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "src/styles/image-gallery.css";
import { useFetchFromNasaApi } from "src/services/fetchFromServers";

const BodyImageView = () => {
  const { loading, imageUrls } = useFetchFromNasaApi();
  const [images, setImages] = useState([]);



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

  return <ImageGallery items={images} />;
};

export default BodyImageView;
