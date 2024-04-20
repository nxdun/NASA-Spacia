import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchFromNasaApi = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${
            import.meta.env.VITE_NASA_API_KEY
          }&count=10`
        );

        // Extract hdurl and thumbnail_url from response
        const urls = response.data.map((item) => ({
          hdurl: item.hdurl,
          thumb: item.url,
          title: item.title,
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

export const useFetchFromLocalimages = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_AUTH_SERVER}/v1/auth/retrieveimage/`,
          {
            username: localStorage.getItem("username"),
          },
          {
            headers: {
              // Specify your headers here
              'auth': localStorage.getItem("auth"), // Example header
            }
          }
        );
        console.log("useFetchFromLocalimages Response recived", response.data);

        // Extract hdurl and thumbnail_url from response
        const urls = response.data.images.map((item) => ({
          title: item.title,
          url: item.url,
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
