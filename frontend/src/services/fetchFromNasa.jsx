import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchFromNasaApi = () => {
  const [imageUrls, setImageUrls] = useState([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}&count=10`
        );

        // Extract hdurl and thumbnail_url from response
        const urls = response.data.map((item) => ({
          hdurl: item.hdurl,
          thumb: item.url,
        }));
        setImageUrls(urls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { loading, imageUrls };
};
