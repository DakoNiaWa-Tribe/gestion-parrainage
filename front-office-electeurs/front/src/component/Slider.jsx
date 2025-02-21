/* eslint-disable react/prop-types */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination, Navigation, Mousewheel, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef } from "react";
import anime from "animejs";

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

const Swippercarrousel= ({cardRef})=>{
      return (
        <>
          <Swiper
    ref={cardRef}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          mousewheel={{ forceToAxis: true }}
          coverflowEffect={
                {
                  rotate: 0,
                  stretch: 60,
                  depth: 100,
                  modifier: 5,
                  slideShadows: true,
                }
              
          }
          modules={[EffectCoverflow, Autoplay, Navigation, Pagination, Mousewheel]}
        className="w-full max-w-5xl overflow-visible!  "
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className=" relative h-full w-[60%]!  ">
            <div className="relative w-full h-[70vh] rounded-xl shadow-lg overflow-hidden"
            >
              <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <h2 className="text-white text-lg font-bold">Image {index + 1}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        </>
      )

};
const SwipperCards= ({cardRef})=>{
  return(

    <>
    <Swiper
    ref={cardRef}
        effect="cards"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        mousewheel={{ forceToAxis: true }}
        modules={[Autoplay, Navigation, Pagination, Mousewheel, EffectCards]}
      className="w-full max-w-5xl overflow-visible!  "
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className=" relative h-full w-[60%]!  ">
          <div className="relative w-full h-[70vh] rounded-xl shadow-lg overflow-hidden"
          >
            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
              <h2 className="text-white text-lg font-bold">Image {index + 1}</h2>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
</>
  )
 

};
const Swiper3DCarousel = ({mode}) => {
  const cardRef =useRef(null);
  useEffect(() => {
    anime({
            targets: cardRef.current, // Cible la div référencée
            opacity: [0,1],
            scale: [0.95,1],
          duration: 600, // Durée de l'animation 
            easing: 'easeInOutQuad', // Animation fluide
          });
    
  }, [mode]);
  return (
    <div className="flex items-center justify-center w-full h-full overflow-visible!  bg-gray-900">
              { mode === "carrousel" ? (<Swippercarrousel cardRef={cardRef} /> ):( <SwipperCards cardRef={cardRef} />)}
    </div>
  );
};

export default Swiper3DCarousel;
