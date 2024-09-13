
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Slider from "react-slick";
import { useRef, useState } from 'react';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import "./Zoom.css";

const Zoom = ({ images, disCount }) => {
   const [bigImageSize, setBigImageSize] = useState([800, 800]);
  // const [smallImageSize, setSmallImageSize] = useState([120, 100]);

  const zoomSliderBig = useRef(); 
  const zoomSlider = useRef(); 

  // Slider settings for the main (big) image
  const settings2 = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false, 
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,  // Adjust based on your layout
    slidesToScroll: 1,
    centerMode: false, // Disable center mode to align everything to the left
    fade: false,
    arrows: true,
  };
  

  // Function to change images in both sliders when clicked
  const goto = (index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  return (
    <>
      {/* Main Slider with big images */}
      <Slider {...settings2} className="product-galary-slider-big" ref={zoomSliderBig}>
        {images?.length !== 0 && images?.map((item, index) => (
          <div className="item" key={index}>
            <div className="product-zoom">
              <InnerImageZoom
                // zoomType="hover"
                src={item}  // Dynamic image from the images array
                 width={bigImageSize[0]}
                 height={bigImageSize[1]}
              />
            </div>
          </div>
        ))}
      </Slider>

      {/* Thumbnail Slider */}
      <div className="zoom-galary-bottom mt-3">
        <Slider {...settings} className="product-galary-slider" ref={zoomSlider}>
          {images?.length !== 0 && images?.map((item, index) => (
            <div className="item-box" key={index}>
              <img
                src={item}  // Dynamic image from the images array
                alt={`thumbnail-${index}`}
                onClick={() => goto(index)}  // Click to change big image
                // width={smallImageSize[0]}
                // height={smallImageSize[1]}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Zoom;








