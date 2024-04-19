import  { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useFetchFromNasaApi } from "src/services/fetchFromNasa";

const BodyImageView = () => {
  const { loading, imageUrls } = useFetchFromNasaApi();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!loading) {
      const imageItems = imageUrls.map((url) => ({
        original: url,
        thumbnail: url,
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
