import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";

const SlickComponent = ({ settings, children }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const $slider = $(sliderRef.current);
    $slider.slick(settings);

    return () => {
      $slider.slick("unslick");
    };
  }, [settings]);

  return (
    <div ref={sliderRef} className="slick-slider">
      {children}
    </div>
  );
};

export default SlickComponent;
