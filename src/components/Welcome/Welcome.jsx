import React from "react";

import Carousel from "react-elastic-carousel";

import "./Welcome.css";
import Page1 from "./CarouselPages/Page1";
import Page2 from "./CarouselPages/Page2";
import Page3 from "./CarouselPages/Page3";
import Page4 from "./CarouselPages/Page4/Page4";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <Carousel className="carousel" itemsToShow={1} showArrows={false}>
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
      </Carousel>
    </div>
  );
};

export default Welcome;
