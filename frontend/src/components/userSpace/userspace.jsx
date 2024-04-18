//userspace landing page

import Lenis from "@studio-freight/lenis";
import NASAImagesComponent from "src/services/fetchFromNasa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const userspace = () => {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  gsap.registerPlugin(ScrollTrigger);
  console.log(`triggered ${ScrollTrigger}`);

  //test gsap working
  gsap.to(".section-image", {
    yPercent: 100,
    duration: 2,
  });

  //set div font color to red

  return (
    <div>
      <h1>Userspace</h1>
      <NASAImagesComponent />
    </div>
  );
};

export default userspace;
