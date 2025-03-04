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


const Swippercarrousel= ({cardRef,Candidatss,setSelectedcandidat,setParainer,Parainer,isconnected})=>{
      return (
        <>
          <Swiper
          ref={cardRef}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={Candidatss?.candidats?.length > 2 ? true : false}
          autoplay={{
            delay: 60000,
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
        {Candidatss?.candidats?.length > 0 ? (
  Candidatss.candidats.map((candidat, index) => (
    <SwiperSlide key={index} className="relative h-full w-[60%]!">
      <CandidatCard 
        candidatDetails={candidat} 
        setSelectedcandidat={setSelectedcandidat} 
        setParainer={setParainer}  
        Parainer={Parainer} 
        isconnected={isconnected}
      />
    </SwiperSlide>
  ))
) : (
  <p className="text-white">Aucun candidat disponible</p>
)}
      </Swiper>
        </>
      )

};
const SwipperCards= ({cardRef,Candidatss,setSelectedcandidat,setParainer,Parainer,isconnected})=>{

  return(

    <>
    <Swiper
        ref={cardRef}
        effect="cards"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={Candidatss?.candidats?.length > 2 ? true : false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        mousewheel={{ forceToAxis: true }}
        modules={[Autoplay, Navigation, Pagination, Mousewheel, EffectCards]}
      className="w-full max-w-5xl overflow-visible!  "
    >
      {Candidatss?.candidats?.length > 0 ? (
  Candidatss.candidats.map((candidat, index) => (
    <SwiperSlide key={index} className="relative h-full w-[60%]!">
      <CandidatCard 
        candidatDetails={candidat} 
        setSelectedcandidat={setSelectedcandidat} 
        setParainer={setParainer}  
        Parainer={Parainer} 
        isconnected={isconnected}
      />
    </SwiperSlide>
  ))
) : (
  <p className="text-white">Aucun candidat disponible</p>
)}
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

const Swiper3DCarousel = ({mode,setParainer,setSelectedcandidat,Parainer,isconnected}) => {
   const baseRef = useRef(null);
  const [Candidatss, setCandidatss] = useState([]);
  const [Load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const cardRef =useRef(null);
  const fetchCandidates = async () => {
    setError("");
    try {
      const response = await fetch("https://backend-fast-api-i1g8.onrender.com/candidat/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        mode: "cors", // Active CORS
        credentials: "include", 
      });
  
      if (!response.ok) throw new Error("Erreur lors de la récupération des candidats");
      console.log("connected to api")
      const data = await response.json();
      console.log("donne",data)

      setCandidatss(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoad(false);
    }
  };
  
  useEffect(() => {
    fetchCandidates();
  }, []);
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
    anime({
      targets: baseRef.current, // Cible la div référencée
      opacity: [0,1],
      delay : 1200,
    duration: 1900, // Durée de l'animation 
      easing: 'easeInOutQuad', // Animation fluide
    });
  }, [Load]);
  
  return (
    Load ? (
      <Loader />
    ) : ( error != null ?  
      <div 
        ref={baseRef}
        className="flex items-center justify-center w-full h-full !overflow-visible bg-gray-900">
        {mode === "carrousel" ? (
          <Swippercarrousel cardRef={cardRef} Candidatss={Candidatss} setSelectedcandidat={setSelectedcandidat} setParainer={setParainer} Parainer={Parainer} isconnected={isconnected} />
        ) : (
          <SwipperCards cardRef={cardRef} Candidatss={Candidatss} setSelectedcandidat={setSelectedcandidat} setParainer={setParainer} Parainer={Parainer} isconnected={isconnected}  />
        )}
      </div>
      : 
      <div
      id="alert-box"
      className={`p-3 rounded-lg mb-4 ${
       'bg-red-100 text-red-600'
      }`}
    >
      {error}
    </div>
    )
  );
};

export default Swiper3DCarousel;
