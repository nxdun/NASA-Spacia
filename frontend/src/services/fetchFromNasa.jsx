import { useState, useEffect } from "react";
import axios from "axios";


export const NASAImagesComponent = () => {
  // State to store image URLs
  const [imageUrls, setImageUrls] = useState([]);

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
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    // Call the fetchImages function
    fetchImages();
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts

  return (
    <div>
      <h2>NASA Images</h2>
      <div>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`NASA Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

