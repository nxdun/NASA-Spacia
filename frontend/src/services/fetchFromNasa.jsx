import { useState, useEffect } from "react";
import axios from "axios";

export const FetchFromNasaApi = () => {
  // State to store image URLs
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch images from NASA API
    const fetchImages = async () => {
      try {
        // Make a GET request to the NASA API endpoint for images
        const response = await axios.get(
          "https://api.nasa.gov/planetary/apod?api_key=0NGSKRUWdabzSnuMW4wjI7lqvjnRKPchis0gVDHc&count=10"
        );

        // Extract image URLs from the response data
        const urls = response.data.map((item) => item.hdurl);

        // Set the image URLs in state
        setImageUrls(urls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    // Call the fetchImages function
    fetchImages();
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts

  // Return a promise that resolves with the image URLs once they are available
  return new Promise((resolve, reject) => {
    if (loading) {
      // If still loading, wait for images to load
      const interval = setInterval(() => {
        if (!loading) {
          clearInterval(interval);
          resolve(imageUrls);
        }
      }, 100);
    } else {
      // If not loading, resolve immediately
      resolve(imageUrls);
      reject("Error fetching images");
    }
  });
};
