"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination, Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "https://mdbootstrap.com/img/new/textures/full/243.jpg",
  "https://mdbootstrap.com/img/new/textures/full/102.jpg",
  "https://mdbootstrap.com/img/new/textures/full/106.jpg",
  "https://mdbootstrap.com/img/new/textures/full/107.jpg",
  "https://mdbootstrap.com/img/new/textures/full/266.jpg",
  "https://mdbootstrap.com/img/new/textures/full/247.jpg",
  "https://mdbootstrap.com/img/new/textures/full/277.jpg",
  "https://mdbootstrap.com/img/new/textures/full/259.jpg",
];

const Swiper3DCarousel = () => {
  return (
    <div className="flex items-center justify-center w-full h-full overflow-visible!  bg-gray-900">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView='auto'
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        mousewheel={{ forceToAxis: true }}
        coverflowEffect={{
          rotate: 0,
          stretch: 60,
          depth: 100, // Augmente la profondeur pour un meilleur effet
          modifier: 5,
          slideShadows: true, // Supprime les ombres pour un effet propre
        }}
        modules={[EffectCoverflow, Autoplay, Navigation, Pagination, Mousewheel]}
        className="w-full max-w-5xl overflow-visible!  "
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className=" relative h-full w-[60%]!  ">
            <div className="relative w-full h-[70vh] rounded-xl shadow-lg overflow-hidden">
              <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <h2 className="text-white text-lg font-bold">Image {index + 1}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swiper3DCarousel;
