import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const useFetchFromNasaApi = () => {
  /*
   * Fetch images from the NASA API
   */
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
  /*
   * Fetch images from the local server
   */
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
              auth: localStorage.getItem("auth"), // Example header
            },
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

export const sendImageToServer = async (title, url) => {
  /*
   * Send the image to the server
   * @param title: title of the image
   * @param url: url of the image
   */
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_AUTH_SERVER}/v1/auth/appendimage/`,
      {
        username: localStorage.getItem("username"),
        title: title,
        url: url,
      },
      {
        headers: {
          auth: localStorage.getItem("auth"),
        },
      }
    );
    console.log("send image to server Success", response.data);
    Swal.fire({
      icon: "success",
      title: "Image saved successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Error sending image to server:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: "Please try again later",
    });
  }
};

export const useMarsNasaApi = (p) => {
  /*
   * Fetch images from the Mars Rover API
   * @param p: object containing rover, button and date
   */
  const [res, setres] = useState([]);
  const [loading, setLoading] = useState(true);
  //convert date to earth_time
  const date = new Date(p.date);
  const earth_time = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  //make p.date = 2013-04-23T18:30:00.000Z to 2013-04-23
  setLoading(true);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${
          p.rover
        }/photos?sol=0&earth_time=${earth_time}&camera=${p.button}&api_key=${
          import.meta.env.VITE_NASA_API_KEY
        }`
      );
      setres(response.data.photos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `error fetching images: ${error}`,
        footer: "Please try again later",
      });
      setLoading(false);
    }
  };

  fetchImages();

  return { loading, res };
};

export const useMarsRoverPics = (p) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log(`https://api.nasa.gov/mars-photos/api/v1/rovers/${p.rover}/photos?sol=1&api_key=${
          import.meta.env.VITE_NASA_API_KEY
        }`);
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${p.rover}/photos?sol=1&api_key=${
            import.meta.env.VITE_NASA_API_KEY
          }`
        );
        // Extract img_src and rover full name from response
        const urls = response.data.photos.map((item) => ({
          img_src: item.img_src,
        }));

        setImageUrls(urls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, [p.rover]);



  return { loading, imageUrls };
};
