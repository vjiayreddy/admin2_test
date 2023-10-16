import React, { useRef } from "react";
import Box from "@material-ui/core/Box";
import Slider from "react-slick";
//UI
import SlideComponent from "./slide";
import NextButtonComponent from "../common/NextButton";
import PrevButtonComponent from "../common/PerviousButton";

// Utils
import { heroSliderSettings } from "../../../../utils/sliderSettings";

const HeroSliderComonent = () => {
  const slider = useRef(null);
  return (
    <section id="mpf-app-banner-slider" className="mpf_bannder_slider">
      <Slider ref={slider} {...heroSliderSettings}>
        <SlideComponent />
        <SlideComponent />
        <SlideComponent />
      </Slider>
      <div className="sliderButtons">
        <Box pl={2}>
          <PrevButtonComponent
            onClick={() => {
              slider.current.slickPrev();
            }}
          />
        </Box>
        <Box pr={2}>
          <NextButtonComponent
            onClick={() => {
              slider.current.slickNext();
            }}
          />
        </Box>
      </div>
    </section>
  );
};

export default HeroSliderComonent;
