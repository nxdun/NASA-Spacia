import { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "@mui/material";
import { gsap } from "gsap";

const NASAImagesComponent = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/planetary/apod?api_key=0NGSKRUWdabzSnuMW4wjI7lqvjnRKPchis0gVDHc&count=10"
        );
        const urls = response.data.map((item) => item.hdurl);
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    // GSAP animations
    gsap.from(".image-container", {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });
  }, [imageUrls]);

  return (
    <Stack spacing={0}>
      {/* Render the fetched images */}
      {imageUrls.map((imageUrl, index) => (
        <div className="image-container" key={index}>
          <img
            className="section-image"
            src={imageUrl}
            alt={`NASA Image ${index}`}
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "100vh",
            }}
          />
        </div>
      ))}
    </Stack>
  );
};

export default NASAImagesComponent;
