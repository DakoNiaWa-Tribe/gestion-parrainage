/* eslint-disable react/prop-types */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination, Navigation, Mousewheel, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import CandidatCard from "./candidat";


const Swippercarrousel= ({cardRef,candidats})=>{
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
        {candidats.map((candidat, index) => (
          <SwiperSlide key={index} className=" relative h-full w-[60%]!  ">
            {/* <div className="relative w-full h-[70vh] rounded-xl shadow-lg overflow-hidden"
            >
              <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <h2 className="text-white text-lg font-bold">Image {index + 1}</h2>
              </div>
            </div> */}
          <CandidatCard userDetails={candidat} />

          </SwiperSlide>
        ))}
      </Swiper>
        </>
      )

};
const SwipperCards= ({cardRef,candidats})=>{
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
      {candidats.map((candidat, index) => (
        <SwiperSlide key={index} className=" relative h-full w-[60%]!  ">
          {/* <div className="relative w-full h-[70vh] rounded-xl shadow-lg overflow-hidden"
          >
            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
              <h2 className="text-white text-lg font-bold">Image {index + 1}</h2>
            </div>
          </div> */}
          <CandidatCard userDetails={candidat} />
        </SwiperSlide>
      ))}
    </Swiper>
</>
  )
 

};
const Loader = () =>{
  return <>
   <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div
        className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
      >
        <div
          className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
        ></div>
      </div>
    </div>
  </>
}

const Swiper3DCarousel = ({mode}) => {

  const [candidats, setCandidats] = useState([]);
  const [Load, setLoad] = useState(true);
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
  useEffect(() => {
    // Simuler une requête API avec des données de test
    const mockData = [
      {
        firstName: "Jean",
        lastName: "Dupont",
        profilImg: "/img/tet1.png",
        birthDate: "12/06/1980",
        votingOffice: "Bureau 45",
        party: 1,
        slogan: "Un avenir meilleur pour tous !",
      },
      {
        firstName: "Marie",
        lastName: "Curie",
        profilImg: "/img/tet.jpg",
        birthDate: "07/11/1867",
        votingOffice: "Bureau 12",
        party: 2,
        slogan: "Science et progrès !",
      },
      {
        firstName: "Nelson",
        lastName: "Mandela",
        profilImg: "/img/tete-chat-profil_372268-573.jpg",
        birthDate: "18/07/1918",
        votingOffice: "Bureau 27",
        party: 3,
        slogan: "Liberté et justice !",
      },
    ];
    
    setTimeout(() => setCandidats(mockData), 1000); // Simulation du délai de chargement
  }, []);

 
  useEffect(() => {
    if (candidats.length > 0) {
      setLoad(false);
    }
  }, [candidats]);

  return (
    Load ? (
      <Loader />
    ) : (
      <div className="flex items-center justify-center w-full h-full !overflow-visible bg-gray-900">
        {mode === "carrousel" ? (
          <Swippercarrousel cardRef={cardRef} candidats={candidats} />
        ) : (
          <SwipperCards cardRef={cardRef} candidats={candidats} />
        )}
      </div>
    )
  );
};

export default Swiper3DCarousel;
