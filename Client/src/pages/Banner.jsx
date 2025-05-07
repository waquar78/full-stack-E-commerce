import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerImages = [
  "https://img.freepik.com/psd-premium/modelo-de-banner-para-venda-de-moda-online_23-2148585403.jpg?w=2000",
  "https://img.freepik.com/premium-psd/fashion-sale-banner-template_23-2149087432.jpg?w=2000",
  "https://img.freepik.com/premium-psd/fashion-sale-banner-template_23-2149051756.jpg?w=2000"
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full overflow-hidden my-4">
      <Slider {...settings}>
        {bannerImages.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-screen max-h-[250px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
